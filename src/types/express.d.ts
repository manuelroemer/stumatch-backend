declare global {
  namespace Express {
    interface User {
      /**
       * The user's ID in the DB.
       * Injected during authentication.
       */
      id: string;
    }
  }
}

export {};
