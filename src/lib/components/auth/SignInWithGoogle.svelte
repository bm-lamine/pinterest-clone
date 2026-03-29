<script lang="ts">
  import { authClient } from "$lib/auth/client";
  import { Button } from "$lib/components/ui/button";
  import { GoogleIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  async function onClick() {
    await authClient.signIn.social({
      provider: "google",
    });
  }
</script>

<Button
  variant="outline"
  id="sign-in-with-google"
  type="button"
  onclick={onClick}
>
  <HugeiconsIcon icon={GoogleIcon} />
  Sign in with Google
</Button>
