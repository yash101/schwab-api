import assert from "assert";
import { AuthTokens } from "./auth/tokens";
import { APIOptions } from "./apioptions";
import { ErrorMessageAndErrors } from "./types/api";
import {
  GetTransactionForAccountByTransactionIdRequest,
  GetTransactionForAccountByTransactionIdResponse,
  GetTransactionsForAccountRequest,
  GetTransactionsForAccountResponse
} from "./types/transactions";

export async function getTransactionsForAccount(request: GetTransactionsForAccountRequest,
  token: AuthTokens, apiOptions: APIOptions
): Promise<GetTransactionsForAccountResponse> {
  assert(request.accountNumber, "accountNumber is required");
  assert(request.startDate, "startDate is required");
  assert(request.endDate, "endDate is required");
  assert(request.types, "types is required");

  const uri = new URL(
    `/trader/v1/accounts/${request.accountNumber}/transactions`,
    apiOptions.getBaseUri() || 'https://api.schwabapi.com');

  uri.searchParams.append('startDate', request.startDate.toISOString());
  uri.searchParams.append('endDate', request.endDate.toISOString());
  uri.searchParams.append('types', request.types.join(','));

  if (request.symbol) {
    uri.searchParams.append('symbol', request.symbol);
  }

  try {
    const response = await fetch(uri.toString(), {
      method: 'GET',
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const json = await response.json();
    return (response.ok) ?
      json as GetTransactionsForAccountResponse : json as ErrorMessageAndErrors;
  } catch (e: any) {
    throw new Error(`Error fetching transactions: ${e.message}`);
  }
}

export async function getTransactionForAccountByTransactionId(
  request: GetTransactionForAccountByTransactionIdRequest, token: AuthTokens, apiOptions: APIOptions
): Promise<GetTransactionForAccountByTransactionIdResponse> {
  assert(request.accountNumber, "accountNumber is required");
  assert(request.transactionId, "transactionId is required");

  const uri = new URL(
    `/trader/v1/accounts/${request.accountNumber}/${request.transactionId}`,
    apiOptions.getBaseUri() || 'https://api.schwabapi.com');
  
  try {
    const response = await fetch(uri.toString(), {
      method: 'GET',
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const json = await response.json();
    return (response.ok)
      ? json as GetTransactionForAccountByTransactionIdResponse
      : json as ErrorMessageAndErrors;
  } catch (e: any) {
    throw new Error(`Error fetching transaction: ${e.message}`);
  }
}
