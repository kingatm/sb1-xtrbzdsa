declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_OMDB_API_KEY: string;
      EXPO_PUBLIC_OMDB_API_URL: string;
    }
  }
}

export {};