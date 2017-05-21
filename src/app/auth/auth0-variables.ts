interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '023h8zWxxcWa2YBLjdNBHMcyLFdslRpJ',
  domain: 'yutse.auth0.com',
  callbackURL: 'http://localhost:4200/#/callback'
};
