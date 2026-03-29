<script lang="ts">
  import { authClient } from "$lib/auth/client";
  import { Button } from "$lib/components/ui/button";

  async function onClick() {
    await authClient.signOut();
  }
</script>

<Button id="sign-out-button" onclick={onClick}>Sign Out</Button>
