export class AppConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  getClientId(): string {
    return this.clientId;
  }

  getClientSecret(): string {
    return this.clientSecret;
  }

  getRedirectUri(): string {
    return this.redirectUri;
  }

  getAuthHeader(): string {
    return 'Basic ' + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
  }
}
