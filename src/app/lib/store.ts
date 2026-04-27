/*
export const sessionStore = new Map<string, string>();
export const tokenStore = new Map<string, string>();
*/
const globalForTokenStore = globalThis as unknown as {
  tokenStore: Map<string, string>;
  sessionStore: Map<string, string>;
};

export const tokenStore =
  globalForTokenStore.tokenStore ?? new Map<string, string>();

export const sessionStore =
  globalForTokenStore.sessionStore ?? new Map<string, string>();

if (!globalForTokenStore.tokenStore) {
  globalForTokenStore.tokenStore = tokenStore;
}

if (!globalForTokenStore.sessionStore) {
  globalForTokenStore.sessionStore = sessionStore;
}
