import assert from "assert";
import { AuthTokens } from "../auth/tokens";
import { APIOptions } from "../shared/apioptions";
import { ErrorMessageAndErrors } from "../shared/shared";
import { GetAccountNumbersResponse, GetAccountsRequest, GetAccountsResponse, GetSingleAccountRequest, GetSingleAccountResponse } from "../types/accounts";
import { NoParametersRequest } from "../types/api";

export async function getAccountNumbers(request?: NoParametersRequest,
  token: AuthTokens, apiOptions?: APIOptions
): Promise<GetAccountNumbersResponse | ErrorMessageAndErrors> {
  const uri = new URL('/accounts/numbers',
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com/v1');

  try {
    const response = await fetch(uri, {
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
      }
    });
  
    const json = await response.json();

    if (!response.ok) {
      return json as ErrorMessageAndErrors;
    }

    return json as GetAccountNumbersResponse;
  } catch (e: any) {
    throw new Error(`Failed to get account numbers: ${e.message}`);
  }
}

/**
 * 
 * @param request optional since all fields are optional
 * @param token 
 * @param apiOptions 
 * @returns 
 */
export async function getAccounts(request?: GetAccountsRequest,
  token: AuthTokens, apiOptions?: APIOptions
): Promise<GetAccountsResponse | ErrorMessageAndErrors> {
  const uri = new URL('/accounts/numbers',
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com/v1');

  if (request?.fields) {
    // this might not be correct
    uri.searchParams.append('fields', request.fields.join(','));
  }

  try {
    const response = await fetch(uri, {
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
      }
    });

    const json = await response.json();
    if (!response.ok) {
      return json as ErrorMessageAndErrors;
    }

    return json as GetAccountsResponse;
  } catch (e: any) {
    throw new Error(`Failed to get accounts: ${e.message}`);
  }
}

/**
 * Get a single account by account number. Note that account number is
 * the encrypted account number, not the plain text account number.
 * 
 * Use the /accountNumbers endpoint to get the encrypted account number, which
 * is called hashValue in the response.
 * 
 * @param request contains required parameters
 * @param token 
 * @param apiOptions 
 * @returns 
 */
export async function getAccount(request: GetSingleAccountRequest,
  token: AuthTokens, apiOptions?: APIOptions
): Promise<GetSingleAccountResponse | ErrorMessageAndErrors> {
  assert(request.accountNumber, 'accountNumber is required');

  const uri = new URL(`/accounts/${request.accountNumber}`,
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com/v1');

  if (request.fields) {
    // this might not be correct
    uri.searchParams.append('fields', request.fields.join(','));
  }

  try {
    const response = await fetch(uri, {
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
      }
    });

    const json = await response.json();
    if (!response.ok) {
      return json as ErrorMessageAndErrors;
    }

    return json as GetSingleAccountResponse;
  } catch (e: any) {
    throw new Error(`Failed to get account: ${e.message}`);
  }
}


