
import assert from "assert";
import { AuthTokens } from "../auth/tokens";
import { APIOptions } from "../shared/apioptions";
import { ErrorMessageAndErrors } from "../shared/shared";
import {
  DeleteOrderForAccountByOrderIdRequest,
  DeleteOrderForAccountByOrderIdResponse,
  GetOrderForAccountByOrderIdRequest,
  GetOrderForAccountByOrderIdResponse,
  GetOrdersForAccountRequest,
  GetOrdersForAccountResponse,
  GetOrdersForAllAccountsRequest,
  GetOrdersForAllAccountsResponse,
  PostOrderForAccountRequest,
  PostOrderForAccountResponse,
  PreviewOrderForAccountRequest,
  PreviewOrderForAccountResponse,
  ReplaceOrderForAccountByOrderIdRequest
} from "../types/orders";

/**
 * Retrieves orders for a specific account.
 *
 * @param request - The request object containing the necessary parameters.
 * @param request.accountNumber - Encrypted account number (hashValue) to retrieve orders for. Required.
 * @param request.maxResults - The maximum number of results to return. Optional. Default = 3000
 * @param request.fromEnteredTime - The start date and time for the orders to retrieve. Required.
 * @param request.toEnteredTime - The end date and time for the orders to retrieve. Required.
 * @param request.status - filter the status of the orders. Optional.
 * @param token - The authentication tokens used to authorize the request.
 * @param apiOptions - Optional API configuration options, such as base URI.
 * @returns A promise that resolves to an object containing the orders or an error message with details.
 */
export async function getOrdersForAccount(request: GetOrdersForAccountRequest,
  token: AuthTokens, apiOptions?: APIOptions
): Promise<GetOrdersForAccountResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.fromEnteredTime, 'fromEnteredTime is required');
  assert(request.toEnteredTime, 'toEnteredTime is required');

  const uri = new URL(`/accounts/${request.accountNumber}/orders`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com/v1');

  if (request.maxResults) {
    uri.searchParams.append('maxResults', request.maxResults.toString());
  }

  if (request.status) {
    uri.searchParams.append('status', request.status);
  }

  uri.searchParams.append('fromEnteredTime', request.fromEnteredTime.toISOString());
  uri.searchParams.append('toEnteredTime', request.toEnteredTime.toISOString());

  try {
    const response = await fetch(uri, {
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
      }
    });

    const json = await response.json();
    return (response.ok) ?
      json as GetOrdersForAccountResponse : json as ErrorMessageAndErrors;

  } catch (e: any) {
    throw new Error(`Failed to get orders for account ${request.accountNumber}: ${e.message}`);
  }
}

export async function getOrderForAccountByOrderId(request: GetOrderForAccountByOrderIdRequest,
  token: AuthTokens, apiOptions?: APIOptions
): Promise<GetOrderForAccountByOrderIdResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.orderId, 'orderId is required');

  const uri = new URL(`/accounts/${request.accountNumber}/orders/${request.orderId}`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com/v1');

  try {
    const response = await fetch(uri, {
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
      }
    });

    const json = await response.json();
    return (response.ok) ?
      json as GetOrderForAccountByOrderIdResponse : json as ErrorMessageAndErrors;

  } catch (e: any) {
    throw new Error(`Failed to get order for account ${request.accountNumber}: ${e.message}`);
  }
}

export async function placeOrderForAccount(request: PostOrderForAccountRequest,
  token: AuthTokens, apiOptions?: APIOptions): Promise<PostOrderForAccountResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.order, 'order is required');

  const uri = new URL(`/accounts/${request.accountNumber}/orders`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com/v1');

  try {
    const http = await fetch(uri, {
      method: 'POST',
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.order),
    });

    const json = await http.json();
    return (http.ok) ?
      json as PostOrderForAccountResponse : json as ErrorMessageAndErrors;

  } catch (e: any) {
    throw new Error(`Failed to place order for account ${request.accountNumber}: ${e.message}`);
  }
}

export async function deleteOrderForAccountByOrderId(
  request: DeleteOrderForAccountByOrderIdRequest, token: AuthTokens, apiOptions?: APIOptions
): Promise<DeleteOrderForAccountByOrderIdResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(request.orderId, 'orderId is required');
  assert(token.getAccessToken(), 'accessToken is required');

  const uri = new URL(`/accounts/${request.accountNumber}/orders/${request.orderId}`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com/v1');

  try {
    const response = await fetch(uri, {
      method: 'DELETE',
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
      }
    });

    const json = await response.json();
    return (response.ok) ?
      json as DeleteOrderForAccountByOrderIdResponse : json as ErrorMessageAndErrors;

  } catch (e: any) {
    throw new Error(`Failed to delete order for account ${request.accountNumber}: ${e.message}`);
  }
}

export async function replaceOrderForAccountByOrderId(
  request: ReplaceOrderForAccountByOrderIdRequest, token: AuthTokens, apiOptions?: APIOptions
): Promise<PostOrderForAccountResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(request.orderId, 'orderId is required');
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.order, 'order is required');

  const uri = new URL(`/accounts/${request.accountNumber}/orders/${request.orderId}`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com/v1');

  try {
    const http = await fetch(uri, {
      method: 'PUT',
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.order),
    });

    const json = await http.json();
    return (http.ok) ?
      json as PostOrderForAccountResponse : json as ErrorMessageAndErrors;

  } catch (e: any) {
    throw new Error(`Failed to replace order for account ${request.accountNumber}: ${e.message}`);
  }
}

export async function getOrdersForAllAccounts(request: GetOrdersForAllAccountsRequest,
  token: AuthTokens, apiOptions?: APIOptions
): Promise<GetOrdersForAllAccountsResponse | ErrorMessageAndErrors> {
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.fromEnteredTime, 'fromEnteredTime is required');
  assert(request.toEnteredTime, 'toEnteredTime is required');

  const uri = new URL('/orders',
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com/v1');

  if (request.maxResults) {
    uri.searchParams.append('maxResults', request.maxResults.toString());
  }

  uri.searchParams.append('fromEnteredTime', request.fromEnteredTime.toISOString());
  uri.searchParams.append('toEnteredTime', request.toEnteredTime.toISOString());

  try {
    const response = await fetch(uri, {
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
      }
    });

    const json = await response.json();
    return (response.ok) ?
      json as GetOrdersForAllAccountsResponse : json as ErrorMessageAndErrors;

  } catch (e: any) {
    throw new Error(`Failed to get orders for all accounts: ${e.message}`);
  }
}


export async function placePreviewOrderForAccount(
  request: PreviewOrderForAccountRequest, token: AuthTokens, apiOptions?: APIOptions
): Promise<PreviewOrderForAccountResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.order, 'order is required');

  const uri = new URL(`/accounts/${request.accountNumber}/previewOrder`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com/v1');

  try {
    const http = await fetch(uri, {
      method: 'POST',
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.order),
    });

    const json = await http.json();
    return (http.ok) ?
      json as PostOrderForAccountResponse : json as ErrorMessageAndErrors;

  } catch (e: any) {
    throw new Error(`Failed to place order for account ${request.accountNumber}: ${e.message}`);
  }
}

