
import { AuthTokens } from './tokens';
import { AppConfig } from './appconfig';

/**
 * Exchanges an authorization code for initial authentication tokens.
 * 
 * @param authCode - The authorization code received from the authorization server. 
 * Ensure this is URL-decoded before passing it to this function.
 * @param clientId - The client ID of the application.
 * @param clientSecret - The client secret of the application.
 * @param redirectUri - The redirect URI used during the authorization process.
 * @param apiUri - (Optional) The base URI of the API endpoint.
 * 
 * @returns A promise that resolves to an `AuthTokens` object containing the access token,
 * refresh token, and their respective expiration times.
 * 
 * @throws Will throw an error if the API call to exchange the authorization code fails.
 */
export async function getInitialTokensFromAuthorizationCode({
  authCode, appConfig, apiUri = 'https://api.schwabapi.com/v1/oauth/token'
}: {
  authCode: string, appConfig: AppConfig, apiUri?: string
}): Promise<{
  accessToken: string,
  refreshToken: string,
  accessTokenExpiresAt: Date,
  refreshTokenExpiresAt: Date,
  type: string,
  scope: string,
  id_token: string,
}> {
  // Perform API call to exchange the authorization code for tokens
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: appConfig.getRedirectUri(),
  });
  
  try {
    const request = await fetch(apiUri, {
      headers: {
        Authorization: appConfig.getAuthHeader(),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: params.toString(),
    });

    if (!request.ok) {
      const errorData = await request.json().catch(() => ({}));
      throw new Error(`Failed to exchange authorization code: ${request.statusText}`);
    }

    const data = await request.json();

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      accessTokenExpiresAt: new Date(Date.now() + 1000 * (Number(data.expires_in) - 120)),
      refreshTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6),
      type: data.token_type,
      scope: data.scope,
      id_token: data.id_token,
    }
  } catch (e: any) {
    throw new Error(`Failed to exchange authorization code: ${e.message}`);
  }
}

export async function getNewAccessToken({
  authTokens, appConfig, apiUri = 'https://api.schwabapi.com/v1/oauth/token'
}: {
  authTokens: AuthTokens, appConfig: AppConfig, apiUri?: string
}): Promise<{
  accessToken: string,
  refreshToken: string,
  accessTokenExpiresAt: Date,
  type: string,
  scope: string,
  id_token: string,
}> {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: authTokens.getRefreshToken(),
  });

  try {
    const request = await fetch(apiUri, {
      headers: {
        Authorization: appConfig.getAuthHeader(),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: params.toString(),
    });

    if (!request.ok) {
      const errorData = await request.json().catch(() => ({}));
      throw new Error(`Failed to refresh access token: ${request.statusText}`);
    }

    const data = await request.json();

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      accessTokenExpiresAt: new Date(Date.now() + 1000 * (Number(data.expires_in) - 120)),
      type: data.token_type,
      scope: data.scope,
      id_token: data.id_token,
    };
  } catch (e: any) {
    throw new Error(`Failed to refresh access token: ${e.message}`);
  }
}
