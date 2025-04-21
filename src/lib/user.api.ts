import { APIOptions } from "./apioptions";
import { AuthTokens } from "./auth/tokens";
import { ErrorMessageAndErrors } from "./api-types/api.types";
import {
  GetUserPreferencesRequest,
  GetUserPreferencesResponse
} from "./api-types/user.types";

export async function getUserPreference(
  request: GetUserPreferencesRequest | null, token: AuthTokens, apiOptions?: APIOptions
): Promise<GetUserPreferencesResponse> {
  const uri = new URL('/trader/v1/userPreference',
    apiOptions?.getBaseUri() || 'https://api.schwabapi.com');

  try {
    const response = await fetch(uri, {
      headers: {
        Authorization: token.getAuthHeader(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    });

    const json = await response.json();

    if (!response.ok) {
      return json as ErrorMessageAndErrors;
    }

    return json as GetUserPreferencesResponse;
  } catch (e: any) {
    throw new Error(`Failed to get user preferences: ${e.message}`);
  }
}
