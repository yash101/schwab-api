import assert from 'assert';
import { APIOptions } from './apioptions';
import { AuthTokens } from './auth/tokens';
import { assert_warn } from './util/Assert';
import { ErrorResponse, FrequencyTypeEnum, GetExpirationChainRequest, GetInstrumentByCusipRequest, GetInstrumentByCUSIPResponse, GetInstrumentsRequest, GetInstrumentsResponse, GetMarketHoursRequest, GetMarketHoursResponse, GetMarketMoversRequest, GetMarketMoversResponse, GetOptionChainsRequest, GetOptionsChainsResponse, GetPriceHistoryRequest, GetQuotesRequest, GetQuotesResponse, GetSingleMarketHoursRequest, GetSingleMarketHoursResponse, GetSingleQuoteRequest, GetSingleQuoteResponse, PeriodTypeEnum } from './types/dataapi';

const CONTENT_TYPE = 'Content-Type';
const APPLICATION_JSON = 'application/json';
const APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded';
const GET = 'GET';

export class DataApi {
  private tokens: AuthTokens;
  private apiOptions: APIOptions;

  private async doApiFetch(path: string, method: string, {
    queryParams,
    body = null,
    headers = {},
  }: {
    queryParams?: URLSearchParams,
    body?: string | any,
    headers?: Record<string, string>,
  } = {}): Promise<Response> {
    assert(this.tokens.getAccessToken(), 'Access token is required');
    assert_warn(this.apiOptions.getBaseUri(), 'Recommended to specify base URL');

    const url = new URL(path, this.apiOptions.getBaseUri() || 'https://api.schwabapi.com');
    const mimeType = headers[CONTENT_TYPE] || APPLICATION_JSON;
    queryParams?.forEach(
      (value, key) => url.searchParams.append(key, value));
    
    const options: RequestInit = {
      method,
      headers: {
        ...headers,
        Authorization: this.tokens.getAuthHeader(),
        Accept: APPLICATION_JSON,
      },
    };

    if (body) {
      if (typeof body !== 'string') {
        switch (mimeType) {
          case 'application/json':
            body = JSON.stringify(body);
            break;
          case 'application/x-www-form-urlencoded':
            body = new URLSearchParams(body).toString();
            break;
          default:
            body = JSON.stringify(body);
            break;
        }
      }

      options.body = body;
      options.headers = options.headers || {};
      options.headers[CONTENT_TYPE] = mimeType;
    }

    try {
      return await fetch(url, options);
    } catch (e: any) {
      throw new Error(`Error fetching data: ${e.message}`);
    }
  }

  constructor(tokens: AuthTokens, apiOptions: APIOptions) {
    this.tokens = tokens;
    this.apiOptions = apiOptions;
  }

  setTokens(tokens: AuthTokens) {
    this.tokens = tokens;
  }

  setApiOptions(apiOptions: APIOptions) {
    this.apiOptions = apiOptions;
  }

  async getQuotes(request: GetQuotesRequest): Promise<GetQuotesResponse> {    
    assert(request.symbols, 'Symbols are required');
    assert(request.symbols.length > 0, 'At least one symbol is required');

    const path = '/marketdata/v1/quotes';
    const queryParams = new URLSearchParams({
      symbols: request.symbols.join(','),
      indicative: request.indicative ? 'true' : 'false',
    });

    if (request.fields) {
      queryParams.append('fields', request.fields.join(','));
    }

    const response = await this.doApiFetch(path, GET, { queryParams });
    const json = await response.json();

    return (response.ok)
      ? json as GetQuotesResponse
      : json as ErrorResponse;
  }

  async getSingleQuote(
    request: GetSingleQuoteRequest
  ): Promise<GetSingleQuoteResponse> {
    assert(request.symbol, 'Symbols are required');
    assert(request.symbol.length === 1, 'Only one symbol is allowed');

    const path = `/marketdata/v1/${request.symbol}/quotes`;
    const queryParams = new URLSearchParams({
      symbols: request.symbol,
    });

    if (request.fields) {
      queryParams.append('fields', request.fields.join(','));
    }

    const response = await this.doApiFetch(path, GET, { queryParams });
    const json = await response.json();

    return (response.ok)
      ? json as GetSingleQuoteResponse
      : json as ErrorResponse;
  }

  async getOptionChains(
    request: GetOptionChainsRequest
  ): Promise<GetOptionsChainsResponse> {
    assert(request.symbol, 'Symbol is required');

    if (request.fromDate instanceof Date) {
      request.fromDate = request.fromDate.toISOString();
    }

    if (request.toDate instanceof Date) {
      request.toDate = request.toDate.toISOString();
    }

    const path = `/marketdata/v1/chains`;

    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(request)) {
      if (value !== undefined && value !== null) {
        if (value instanceof Date) {
          queryParams.append(key, value.toISOString());
        } else if (typeof value === 'boolean') {
          queryParams.append(key, value ? 'true' : 'false');
        } else {
          queryParams.append(key, value.toString());
        }
      }
    }

    const response = await this.doApiFetch(path, GET, { queryParams });
    const json = await response.json();
    return (response.ok)
      ? json as GetOptionsChainsResponse
      : json as ErrorResponse;
  }

  async getOptionExpirationChain(request: GetExpirationChainRequest) {
    assert(typeof request === 'string', 'Symbol is required');
    assert(request.length > 0, 'Symbol is required');

    const path = `/marketdata/v1/expirationchain`;
    const queryParams = new URLSearchParams({
      symbol: request,
    });

    const response = await this.doApiFetch(path, GET, { queryParams });
    const json = await response.json();

    return (response.ok)
      ? json as GetOptionsChainsResponse
      : json as ErrorResponse;
  }

  async getPriceHistory(
    request: GetPriceHistoryRequest, validate: boolean = true
  ): Promise<GetOptionsChainsResponse> {
    // Validate the request
    assert(request.symbol, 'Symbol is required');
    
    if (validate) {
      const validPeriods = {
        [PeriodTypeEnum.DAY]: [1, 2, 3, 4, 5, 10],
        [PeriodTypeEnum.MONTH]: [1, 2, 3, 6],
        [PeriodTypeEnum.YEAR]: [1, 2, 3, 5, 10, 15, 20],
        [PeriodTypeEnum.YTD]: [1],
      };

      if (request.periodType && request.period) {
        assert(
          validPeriods[request.periodType],
          `Invalid period type: ${request.periodType}`
        );
        assert(
          validPeriods[request.periodType].includes(request.period),
          `Invalid period: ${request.period} for period type: ${request.periodType}`
        );
      }

      const validFrequencyTypes = {
        [PeriodTypeEnum.DAY]: [ FrequencyTypeEnum.MINUTE ],
        [PeriodTypeEnum.MONTH]: [
          FrequencyTypeEnum.DAILY, FrequencyTypeEnum.WEEKLY ],
        [PeriodTypeEnum.YEAR]: [
          FrequencyTypeEnum.DAILY, FrequencyTypeEnum.WEEKLY,
          FrequencyTypeEnum.MONTHLY ],
        [PeriodTypeEnum.YTD]: [ FrequencyTypeEnum.DAILY,
          FrequencyTypeEnum.WEEKLY, FrequencyTypeEnum.MONTHLY ],
      };

      if (request.frequencyType && request.frequency) {
        assert(
          validFrequencyTypes[request.periodType || PeriodTypeEnum.DAY],
          `Invalid frequency type: ${request.frequencyType}`
        );
        assert(
          validFrequencyTypes[request.periodType || PeriodTypeEnum.DAY]
            .includes(request.frequencyType),
          `Invalid frequency: ${request.frequency} for frequency type: ${request.frequencyType}`
        );
      }

      const validFrequencies = {
        [FrequencyTypeEnum.MINUTE]: [1, 5, 10, 15, 30],
        [FrequencyTypeEnum.DAILY]: [1],
        [FrequencyTypeEnum.WEEKLY]: [1],
        [FrequencyTypeEnum.MONTHLY]: [1],
      };

      if (request.frequencyType && request.frequency) {
        assert(
          validFrequencies[request.frequencyType],
          `Invalid frequency: ${request.frequency} for frequency type: ${request.frequencyType}`
        );
        assert(
          validFrequencies[request.frequencyType].includes(request.frequency),
          `Invalid frequency: ${request.frequency} for frequency type: ${request.frequencyType}`
        );
      }
    }

    const path = `/marketdata/v1/pricehistory`;
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(request)) {
      if (value !== undefined && value !== null) {
        if (value instanceof Date) {
          queryParams.append(key, value.toISOString());
        } else if (typeof value === 'boolean') {
          queryParams.append(key, value ? 'true' : 'false');
        } else {
          queryParams.append(key, value.toString());
        }
      }
    }

    const response = await this.doApiFetch(path, GET, { queryParams });
    const json = await response.json();
    return (response.ok)
      ? json as GetOptionsChainsResponse
      : json as ErrorResponse;
  }

  async getMoversForIndex(
    request: GetMarketMoversRequest
  ): Promise<GetMarketMoversResponse> {
    assert(request.symbol_id, 'Symbol ID is required');

    const path = `/marketdata/v1/movers`;

    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(request)) {
      if (value !== undefined && value !== null) {
        if (value instanceof Date) {
          queryParams.append(key, value.toISOString());
        } else if (typeof value === 'boolean') {
          queryParams.append(key, value ? 'true' : 'false');
        } else {
          queryParams.append(key, value.toString());
        }
      }
    }

    const response = await this.doApiFetch(path, GET, { queryParams });
    const json = await response.json();

    return (response.ok)
      ? json as GetMarketMoversResponse
      : json as ErrorResponse;
  }

  async getMarketHours(
    request: GetMarketHoursRequest
  ): Promise<GetMarketHoursResponse> {
    assert(request.markets, 'Market is required');
    assert(request.markets.length > 0, 'At least one market is required');

    const path = `/marketdata/v1/markets`;

    const queryParams = new URLSearchParams();
    if (request.date instanceof Date) {
      queryParams.append('date', request.date.toISOString().split('T')[0]);
    } else if (typeof request.date === 'string') {
      queryParams.append('date', request.date);
    }

    const response = await this.doApiFetch(path, GET, { queryParams });
    const json = await response.json();

    return (response.ok)
      ? json as GetMarketHoursResponse
      : json as ErrorResponse;
  }

  async getSingleMarketHours(
    request: GetSingleMarketHoursRequest
  ): Promise<GetSingleMarketHoursResponse> {
    assert(request.market, 'Market is required');

    const path = `/marketdata/v1/markets/${request.market}`;
    const queryParams = new URLSearchParams();
    if (request.date instanceof Date) {
      queryParams.append('date', request.date.toISOString().split('T')[0]);
    } else if (typeof request.date === 'string') {
      queryParams.append('date', request.date);
    }

    const response = await this.doApiFetch(path, GET, { queryParams });
    const json = await response.json();
    return (response.ok)
      ? json as GetSingleMarketHoursResponse
      : json as ErrorResponse;
  }

  async getInstruments(
    request: GetInstrumentsRequest
  ): Promise<GetInstrumentsResponse> {
    assert(request.symbol, 'Symbol is required');
    assert(request.projection, 'Projection is required');

    const path = `/marketdata/v1/instruments`;
    const queryParams = new URLSearchParams({
      symbol: request.symbol,
      projection: request.projection,
    });

    const response = await this.doApiFetch(path, GET, { queryParams });
    const json = await response.json();
    return (response.ok)
      ? json as GetInstrumentsResponse
      : json as ErrorResponse;
  }

  async getInstrumentByCUSIPId(
    request: GetInstrumentByCusipRequest
  ): Promise<GetInstrumentByCUSIPResponse> {
    assert(request, 'CUSIP is required');
    assert(typeof request === 'string', 'CUSIP is required');

    const path = `/marketdata/v1/instruments/${request}`;

    const response = await this.doApiFetch(path, GET);
    const json = await response.json();
    return (response.ok)
      ? json as GetInstrumentByCUSIPResponse
      : json as ErrorResponse;
  }
}
