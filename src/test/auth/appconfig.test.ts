import { AppConfig } from "../../lib/auth/appconfig";

test('should return the correct app configuration', () => {
	const appConfig = new AppConfig('clientId', 'clientSecret', 'redirectUri');

	expect(appConfig.getClientId()).toBe('clientId');
	expect(appConfig.getClientSecret()).toBe('clientSecret');
	expect(appConfig.getRedirectUri()).toBe('redirectUri');
	expect(appConfig.getAuthHeader()).toBe('Basic Y2xpZW50SWQ6Y2xpZW50U2VjcmV0');
});
