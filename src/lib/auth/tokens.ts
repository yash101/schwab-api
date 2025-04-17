import { AppConfig } from "./appconfig";
import { getInitialTokensFromAuthorizationCode, getNewAccessToken } from "./auth";
import { decodeIdToken, IDToken } from "./idtoken";

/**
 * Represents a set of authentication tokens, including access and refresh tokens,
 * along with their expiration times. Provides methods to retrieve, set, and check
 * the expiration status of these tokens.
 */
export class AuthTokens {
  protected accessToken: string = '';
  protected refreshToken: string = '';
  protected scope: string = '';
  protected idToken: IDToken;

  protected atExpiresAt: Date;
  protected rtExpiresAt: Date;

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  getAccessTokenExpiresAt(): Date {
    return this.atExpiresAt;
  }

  getRefreshTokenExpiresAt(): Date {
    return this.rtExpiresAt;
  }

  getUserId(): IDToken {
    return this.idToken;
  }

  getScope(): string {
    return this.scope;
  }

  isAccessTokenExpired(): boolean {
    return this.atExpiresAt <= new Date();
  }

  isRefreshTokenExpired(): boolean {
    return this.rtExpiresAt <= new Date();
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  setRefreshToken(token: string): void {
    this.refreshToken = token;
  }

  setAccessTokenExpiresAt(expiresAt: Date): void {
    this.atExpiresAt = expiresAt;
  }

  setRefreshTokenExpiresAt(expiresAt: Date): void {
    this.rtExpiresAt = expiresAt;
  }

  setIdToken(token: IDToken): void {
    this.idToken = token;
  }

  setScope(scope: string): void {
    this.scope = scope;
  }

  getAuthHeader(): string {
    return `Bearer ${this.accessToken}`;
  }
}

/**
 * Represents a set of authentication tokens with automatic refresh capabilities.
 * Inherits from AuthTokens and adds functionality to refresh the access token
 * using the refresh token at regular intervals.
 */
export class AutoRefreshAuthTokens extends AuthTokens {
  protected refreshInterval?: NodeJS.Timeout;
  protected appConfig: AppConfig;
  protected refreshIntervalTimer: number;

  constructor(appConfig: AppConfig, refreshToken: string, accessToken?: string,
    refreshInterval: number = 1000 * 60 * 20
  ) {
    super();
    this.refreshToken = refreshToken;
    this.accessToken = accessToken || '';
    this.appConfig = appConfig;
    this.refreshIntervalTimer = refreshInterval;
  }

  private doRefreshAccessToken(retries?: number): void {
    if (retries && retries > 5) {
      console.error('Failed to refresh access token after 5 retries. No longer attempting to refresh.');
      clearInterval(this.refreshInterval);
      return;
    }

    // Perform API call to refresh the access token
    getNewAccessToken({
      authTokens: this,
      appConfig: this.appConfig,
    })
    .then((response) => {
      this.setAccessToken(response.accessToken);
      this.setAccessTokenExpiresAt(response.accessTokenExpiresAt);
      this.setIdToken(decodeIdToken(Buffer.from(response.id_token, 'base64')));

      if (response.refreshToken && response.refreshToken !== this.refreshToken) {
        this.setRefreshToken(response.refreshToken);
        this.setRefreshTokenExpiresAt(new Date(Date.now() + 1000 * 60 * 60 * 24 * 6));
      }
    })
    .catch(e => {
      console.error(`Failed to refresh access token: ${e.message}`);

      // Try again
      setTimeout(() => {
        if (!retries) {
          retries = 0;
        }

        this.doRefreshAccessToken(retries + 1);
      }, 60 * 1000);
    });
  }

  start() {
    if (this.refreshInterval) {
      this.stop();
    }

    // every 20 minutes
    this.refreshInterval = setInterval(() => {
      this.doRefreshAccessToken()
    }, this.refreshIntervalTimer);
  }

  stop() {
    clearInterval(this.refreshInterval);
    this.refreshInterval = undefined;
  }

  public static async fromAuthCode(
    code: string, appConfig: AppConfig, apiUri?: string
  ): Promise<AutoRefreshAuthTokens> {
    if (!apiUri) {
      apiUri = 'https://api.schwabapi.com/v1/oauth/token';
    }

    const initialAuth = await getInitialTokensFromAuthorizationCode({
      authCode: code,
      appConfig,
      apiUri,
    });

    const tokens = new AutoRefreshAuthTokens(
      appConfig, initialAuth.refreshToken, initialAuth.accessToken);

    tokens.setAccessTokenExpiresAt(initialAuth.accessTokenExpiresAt);
    tokens.setRefreshTokenExpiresAt(initialAuth.refreshTokenExpiresAt);
    tokens.setIdToken(decodeIdToken(Buffer.from(initialAuth.id_token, 'base64')));
    tokens.setScope(initialAuth.scope);    

    return tokens;
  }
}
