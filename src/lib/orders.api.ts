import assert from "assert";
import { AuthTokens } from "./auth/tokens";
import { APIOptions } from "./apioptions";
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
  ReplaceOrderForAccountByOrderIdRequest,
  ReplaceOrderForAccountByOrderIdResponse
} from "./api-types/orders.types";
import { ErrorMessageAndErrors } from "./api-types/api.types";

/**
 * Retrieves orders for a specific Schwab account based on filtering criteria.
 * Corresponds to the 'Get Orders for Account' API endpoint.
 *
 * @async
 * @function getOrdersForAccount
 * @param {GetOrdersForAccountRequest} request - The request object containing filtering parameters.
 * @param {EncryptedAccountNumber} request.accountNumber - Encrypted account number (hashValue). Required.
 * @param {Date} request.fromEnteredTime - Start date/time for filtering orders. Required.
 * @param {Date} request.toEnteredTime - End date/time for filtering orders. Required.
 * @param {number} [request.maxResults] - Maximum number of orders to return. Optional.
 * @param {OrderStatusEnum} [request.status] - Filter orders by status. Optional.
 * @param {AuthTokens} token - Authentication tokens. Required.
 * @param {APIOptions} [apiOptions] - Optional API configuration (e.g., base URI).
 * @returns {Promise<GetOrdersForAccountResponse | ErrorMessageAndErrors>} A promise that resolves to an array of orders matching the criteria or an error object.
 * @throws {Error} Throws an error if required parameters are missing or if the fetch operation fails.
 */
export async function getOrdersForAccount(request: GetOrdersForAccountRequest,
  token: AuthTokens, apiOptions?: APIOptions
): Promise<GetOrdersForAccountResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.fromEnteredTime, 'fromEnteredTime is required');
  assert(request.toEnteredTime, 'toEnteredTime is required');

  const uri = new URL(`/trader/v1/accounts/${request.accountNumber}/orders`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com');

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
        Accept: 'application/json',
      }
    });

    const json = await response.json();
    return (response.ok) ?
      json as GetOrdersForAccountResponse : json as ErrorMessageAndErrors;

  } catch (e: any) {
    throw new Error(`Failed to get orders for account ${request.accountNumber}: ${e.message}`);
  }
}

/**
 * Retrieves a specific order by its ID for a given Schwab account.
 * Corresponds to the 'Get Order' API endpoint.
 *
 * @async
 * @function getOrderForAccountByOrderId
 * @param {GetOrderForAccountByOrderIdRequest} request - The request object.
 * @param {EncryptedAccountNumber} request.accountNumber - Encrypted account number (hashValue). Required.
 * @param {number} request.orderId - The unique ID of the order to retrieve. Required.
 * @param {AuthTokens} token - Authentication tokens. Required.
 * @param {APIOptions} [apiOptions] - Optional API configuration.
 * @returns {Promise<GetOrderForAccountByOrderIdResponse | ErrorMessageAndErrors>} A promise that resolves to the requested order details or an error object.
 * @throws {Error} Throws an error if required parameters are missing or if the fetch operation fails.
 */
export async function getOrderForAccountByOrderId(request: GetOrderForAccountByOrderIdRequest,
  token: AuthTokens, apiOptions?: APIOptions
): Promise<GetOrderForAccountByOrderIdResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.orderId, 'orderId is required');

  const uri = new URL(`/trader/v1/accounts/${request.accountNumber}/orders/${request.orderId}`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com');

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

/**
 * Places a new order for a specific Schwab account.
 * Corresponds to the 'Place Order' API endpoint.
 * Note: For multi-leg orders (options, etc.), ensure the `orderLegCollection` in `request.order` is correctly populated.
 *
 * @async
 * @function placeOrderForAccount
 * @param {PostOrderForAccountRequest} request - The request object.
 * @param {EncryptedAccountNumber} request.accountNumber - Encrypted account number (hashValue). Required.
 * @param {Order} request.order - The order object containing all details for the new order. Required.
 * @param {AuthTokens} token - Authentication tokens. Required.
 * @param {APIOptions} [apiOptions] - Optional API configuration.
 * @returns {Promise<PostOrderForAccountResponse | ErrorMessageAndErrors>} A promise that resolves to the details of the successfully placed order (including its new orderId) or an error object. The response often includes the location header pointing to the newly created order.
 * @throws {Error} Throws an error if required parameters are missing or if the fetch operation fails.
 */
export async function placeOrderForAccount(request: PostOrderForAccountRequest,
  token: AuthTokens, apiOptions?: APIOptions): Promise<PostOrderForAccountResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.order, 'order is required');

  const uri = new URL(`/trader/v1/accounts/${request.accountNumber}/orders`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com');

  try {
    const http = await fetch(uri, {
      method: 'POST',
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

/**
 * Deletes (cancels) a specific order by its ID for a given Schwab account.
 * Corresponds to the 'Cancel Order' API endpoint.
 * Note: Only orders in a cancelable state (e.g., WORKING, QUEUED) can be canceled.
 *
 * @async
 * @function deleteOrderForAccountByOrderId
 * @param {DeleteOrderForAccountByOrderIdRequest} request - The request object.
 * @param {EncryptedAccountNumber} request.accountNumber - Encrypted account number (hashValue). Required.
 * @param {number} request.orderId - The unique ID of the order to cancel. Required.
 * @param {AuthTokens} token - Authentication tokens. Required.
 * @param {APIOptions} [apiOptions] - Optional API configuration.
 * @returns {Promise<DeleteOrderForAccountByOrderIdResponse | ErrorMessageAndErrors>} A promise that resolves to an empty object on successful cancellation or an error object if cancellation fails (e.g., order already filled, not found, or not cancelable).
 * @throws {Error} Throws an error if required parameters are missing or if the fetch operation fails.
 */
export async function deleteOrderForAccountByOrderId(
  request: DeleteOrderForAccountByOrderIdRequest, token: AuthTokens, apiOptions?: APIOptions
): Promise<DeleteOrderForAccountByOrderIdResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(request.orderId, 'orderId is required');
  assert(token.getAccessToken(), 'accessToken is required');

  const uri = new URL(`/trader/v1/accounts/${request.accountNumber}/orders/${request.orderId}`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com');

  try {
    const response = await fetch(uri, {
      method: 'DELETE',
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    });

    const json = await response.json();
    return (response.ok) ?
      json as DeleteOrderForAccountByOrderIdResponse : json as ErrorMessageAndErrors;

  } catch (e: any) {
    throw new Error(`Failed to delete order for account ${request.accountNumber}: ${e.message}`);
  }
}

/**
 * Replaces (modifies) an existing order with a new set of order details for a given Schwab account.
 * Corresponds to the 'Replace Order' API endpoint.
 * Note: Only orders in an editable state can be replaced. The entire `order` object must be provided with the desired modifications.
 *
 * @async
 * @function replaceOrderForAccountByOrderId
 * @param {ReplaceOrderForAccountByOrderIdRequest} request - The request object.
 * @param {EncryptedAccountNumber} request.accountNumber - Encrypted account number (hashValue). Required.
 * @param {number} request.orderId - The unique ID of the order to replace. Required.
 * @param {Order} request.order - The new order object containing the updated details. Required.
 * @param {AuthTokens} token - Authentication tokens. Required.
 * @param {APIOptions} [apiOptions] - Optional API configuration.
 * @returns {Promise<ReplaceOrderForAccountByOrderIdResponse | ErrorMessageAndErrors>} A promise that resolves to an empty object on successful replacement or an error object if replacement fails. Some APIs might return the details of the new order upon success.
 * @throws {Error} Throws an error if required parameters are missing or if the fetch operation fails.
 */
export async function replaceOrderForAccountByOrderId(
  request: ReplaceOrderForAccountByOrderIdRequest, token: AuthTokens, apiOptions?: APIOptions
): Promise<ReplaceOrderForAccountByOrderIdResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(request.orderId, 'orderId is required');
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.order, 'order is required');

  const uri = new URL(`/trader/v1/accounts/${request.accountNumber}/orders/${request.orderId}`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com');

  try {
    const http = await fetch(uri, {
      method: 'PUT',
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

/**
 * Retrieves orders across all accounts linked to the authenticated user, based on filtering criteria.
 * Corresponds to the 'Get Orders' API endpoint (without account ID).
 *
 * @async
 * @function getOrdersForAllAccounts
 * @param {GetOrdersForAllAccountsRequest} request - The request object containing filtering parameters.
 * @param {Date} request.fromEnteredTime - Start date/time for filtering orders. Required.
 * @param {Date} request.toEnteredTime - End date/time for filtering orders. Required.
 * @param {number} [request.maxResults] - Maximum number of orders to return. Optional.
 * @param {OrderStatusEnum} [request.status] - Filter orders by status. Optional.
 * @param {AuthTokens} token - Authentication tokens. Required.
 * @param {APIOptions} [apiOptions] - Optional API configuration.
 * @returns {Promise<GetOrdersForAllAccountsResponse | ErrorMessageAndErrors>} A promise that resolves to an array of orders from all linked accounts matching the criteria or an error object.
 * @throws {Error} Throws an error if required parameters are missing or if the fetch operation fails.
 */
export async function getOrdersForAllAccounts(request: GetOrdersForAllAccountsRequest,
  token: AuthTokens, apiOptions?: APIOptions
): Promise<GetOrdersForAllAccountsResponse | ErrorMessageAndErrors> {
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.fromEnteredTime, 'fromEnteredTime is required');
  assert(request.toEnteredTime, 'toEnteredTime is required');

  const uri = new URL('/trader/v1/orders',
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com');

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
        Accept: 'application/json',
      }
    });

    const json = await response.json();
    return (response.ok) ?
      json as GetOrdersForAllAccountsResponse : json as ErrorMessageAndErrors;

  } catch (e: any) {
    throw new Error(`Failed to get orders for all accounts: ${e.message}`);
  }
}

/**
 * Previews an order for a specific Schwab account without actually placing it.
 * Useful for validating the order and getting estimated commission/fees.
 * Corresponds to the 'Preview Order' API endpoint.
 *
 * @async
 * @function placePreviewOrderForAccount
 * @param {PreviewOrderForAccountRequest} request - The request object, mirroring the structure for placing an order.
 * @param {EncryptedAccountNumber} request.accountNumber - Encrypted account number (hashValue). Required.
 * @param {Order} request.order - The order object containing details for the order to be previewed. Required.
 * @param {AuthTokens} token - Authentication tokens. Required.
 * @param {APIOptions} [apiOptions] - Optional API configuration.
 * @returns {Promise<PreviewOrderForAccountResponse | ErrorMessageAndErrors>} A promise that resolves to the preview details (which might include validation results, estimated commissions, and the order structure) or an error object if the preview fails validation.
 * @throws {Error} Throws an error if required parameters are missing or if the fetch operation fails.
 */
export async function placePreviewOrderForAccount(
  request: PreviewOrderForAccountRequest, token: AuthTokens, apiOptions?: APIOptions
): Promise<PreviewOrderForAccountResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');
  assert(token.getAccessToken(), 'accessToken is required');
  assert(request.order, 'order is required');

  const uri = new URL(`/trader/v1/accounts/${request.accountNumber}/previewOrder`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com');

  try {
    const http = await fetch(uri, {
      method: 'POST',
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(request.order),
    });

    const json = await http.json();
    return (http.ok) ?
      json as PreviewOrderForAccountResponse : json as ErrorMessageAndErrors;

  } catch (e: any) {
    throw new Error(`Failed to place order for account ${request.accountNumber}: ${e.message}`);
  }
}


