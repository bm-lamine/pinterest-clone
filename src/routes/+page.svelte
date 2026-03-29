<script>
  import { authClient } from "$lib/auth/client";
  import SignInWithGoogle from "$lib/components/auth/SignInWithGoogle.svelte";
  import SignOut from "$lib/components/auth/SignOut.svelte";

  const session = authClient.useSession();
</script>

<div class="min-h-screen flex items-center justify-center gap-8 flex-col">
  {$session.data?.user.email}
  <SignInWithGoogle />
  <SignOut />
</div>
