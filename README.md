# `@yash101/schwab-api-client`

yash101's **unofficial** implementation of a client for the Schwab trader and maketdata APIs in TypeScript.

## Documentation

More documentation is coming soon.

View the different connectors in `*.api.ts`. The parameters closely follow the API definition on Schwab's portal. The response structure *should* be identical to Schwab's responses.


Below is a comprehensive README for Charles Schwab’s APIs, with an emphasis on how to gain access, register your application, and start making calls.

## Introduction

Charles Schwab provides a suite of RESTful and streaming APIs to retrieve market data, access account information, and place trades. All access is secured via OAuth 2.0, ensuring client applications never handle raw user credentials.

This repository implements all of the APIs (streaming API coming soon) of the Schwab's Individual Trader API.

## Authn/Authz (Authentication & Authorization)

Every single endpoint requires authentication. This library makes it super easy to set up authentication!

Start by signing up for a developer portal account and create a new *App*. Obtain your **Client ID** and **Client Secret**, which will be necessary to make this work.

### Redirect URI

Schwab's API uses [OAuth 2.0](https://oauth.net/2/) for authentication. This allows you to authenticate and authorize your brokerage account with your app's credentials.

The **Redirect URI** is "return address" for the login flow.

* You register it in the Schwab's developer portal.
* When a user signs in and clicks "Approve", Schwab redirects that user's browser to your redirect URL along with a special code which can be used **only once** to connect the app to the user.
* Your app needs to listen to that URL, grab the code from the query string, then exchange it for the **refresh token** and **access token**.

To make this easier, I made a simple utility you can use to get the initial authorization code. See [this tool](https://devya.sh/tools/schwab-auth) for details on how to use it.

### Authorization Code

There are two primary ways to use this library to exchange your authorization code for a refresh token and access token:

1) You can use the `getInitialTokensFromAuthorizationCode` function to receive tokens:
    ```typescript
    import { AppConfig, getInitialTokensFromAuthorizationCode } from '@yash101/schwab-api-client';

    const appConfig = new AppConfig(
      '<app-client-id>',
      '<app-client-secret>',
      '<app-redirect-uri>');
    const initialAuth = await getInitialTokensFromAuthorizationCode({
      authCode: decodeUriComponent('<your authorization code>'),
      appConfig
    });
    // Store initialAuth.refreshToken securely!
    // initialAuth.accessToken can be used immediately.
    ```
2) You can use the `AutoRefreshAuthTokens` helper class to automate almost all of the auth requirements:
    ```typescript
    import { AppConfig, AutoRefreshAuthTokens } from '@yash101/schwab-api-client';

    const appConfig = new AppConfig('<app-client-id>', '<app-client-secret>', '<app-redirect-uri>');
    // The AutoRefreshAuthTokens class handles getting the initial tokens
    // and subsequent refreshes.
    const tokens = await AutoRefreshAuthTokens.fromAuthCode(
      decodeUriComponent('<your authorization code>'),
      appConfig
    );
    // Start the automatic refresh process (optional, defaults to every 20 mins)
    tokens.start();

    // You can now pass 'tokens' to other API client instances.
    // Access the current access token via tokens.getAccessToken()
    ```

### `AuthTokens` class

All APIs require authentication in terms of a `Bearer` authentication header. The `AuthTokens` class is the base class with all methods, holds the auth and refresh tokens, but does *not* have any significant internal functionality for automatic refreshing.

`AutoRefreshAuthTokens` is a helper class built **on top of** `AuthTokens`. When active (after calling `.start()`), it will automatically refresh your access token periodically. By default, this happens every 20 minutes, but the interval is configurable via the constructor or the `setRefreshInterval` method.

**More Complicated Setups**: Often you may want to deploy this setup in a distributed environment. Since you can only have one valid access token at a time per user and they are short-lived, a common approach would be to fetch access tokens from a shared store (like *Redis*) and have a dedicated service or cron job responsible for refreshing access tokens using the securely stored refresh token. The `AuthTokens` base class can be easily integrated into such a system, allowing you to manually set the token values fetched from your shared store.

## API and Type Definition Accuracy

All APIs and their request/response structures were generated from the online documentation in the Schwab Developer Portal manually, with some help from LLMs.

Currently, no OpenAPI JSON or YAML documentation are available, so automated tools can't be used to validate or generate type definitions.

Expect there to be inaccuracies and issues in the TypeScript type definitions. Please raise [GitHub issues](https://github.com/yash101/schwab-api/issues) if you face any issues.

## Testing

Testing is still TBD. Some unit tests have been written.

This codebase has minimal logic. It's primiarily just an adapter for Schwab's APIs. I'm still identifying the best way to test the APIs since Schwab does not seem to have a paper or test endpoint.
