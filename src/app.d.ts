// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Auth } from "$lib/auth/server";

// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user: Auth["user"];
      session: Auth["session"];
    }
  }
}

export {};
