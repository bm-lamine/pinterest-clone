import { building } from "$app/environment";
import { auth } from "$lib/auth/server";
import { svelteKitHandler } from "better-auth/svelte-kit";

export async function handle({ event, resolve }) {
  const data = await auth.api.getSession({
    headers: event.request.headers,
  });

  if (data) {
    event.locals.user = data.user;
    event.locals.session = data.session;
  }

  return svelteKitHandler({ event, resolve, auth, building });
}
