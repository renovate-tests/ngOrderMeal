import { environment } from 'environments/environment';

interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: environment.clientId,
  domain: 'yutse.auth0.com',
  callbackURL: environment.host + '/#/callback'
};
