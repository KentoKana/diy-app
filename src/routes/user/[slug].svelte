<script>
  import { loggedInUser, isLoggedIn } from "../../stores/user-store.js";
  import { fetchUser } from "../../utils/fetch-data";
  import jwtdecode from "jwt-decode";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import Spinner from "svelte-spinner";

  let jwt;
  onMount(async () => {
    jwt = localStorage.getItem("usertoken");
    if (jwt) {
      const uid = jwtdecode(jwt).uid;
      fetchUser(uid);
    } else {
      goto("/login");
    }
  });
</script>

<section class="user-profile">
  {#if jwt}
    <h1>{$loggedInUser.username}</h1>
  {:else}
    <h1>
      <div>Loading</div>
      <Spinner size="50" speed="750" color="#A82124" thickness="2" gap="40" />
    </h1>
  {/if}
</section>
