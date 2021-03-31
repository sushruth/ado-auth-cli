export type Token = {
  access_token?: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: string;
};

export type TokenStore = Omit<Token, "access_token"> & {
  expires_on: string;
};

export type YarnRcRegistryPart = {
  npmRegistries: {
    [K in string]?: {
      npmAlwaysAuth?: boolean;
      npmAuthToken?: string;
    };
  };
};
