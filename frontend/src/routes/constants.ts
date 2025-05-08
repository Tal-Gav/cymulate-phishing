export enum Roles {
  User = 1000,
  Admin = 2000,
}

export enum PublicRoutes {
  LOGIN = "/login",
  SIGNUP = "/signup",
  UNAUTHORIZED = "/unauthorized",
  PHISHING = "/free-bitcoin",
}

export enum PrivateRoutes {
  ATTEMPTS = "/attempts",
}
