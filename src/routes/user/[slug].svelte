<script>
  import UserCard from "../../components/user-profile/UserCard.svelte";
  import { loggedInUser, isLoggedIn } from "../../stores/user-store.js";
  import { fetchUserByJWT } from "../../utils/fetch-data";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import Spinner from "svelte-spinner";

  let jwt;
  onMount(async () => {
    jwt = localStorage.getItem("usertoken");
    if (jwt) {
      fetchUserByJWT(jwt);
    } else {
      goto("/login");
    }
  });
</script>

<style lang="scss">
  .user-profile {
    padding: 2em 0;
  }
</style>

<section class="user-profile">
  <div class="container">
    {#if jwt}
      <UserCard user={$loggedInUser} />
    {:else}
      <h1>
        <div>Loading</div>
        <Spinner size="50" speed="750" color="#A82124" thickness="2" gap="40" />
      </h1>
    {/if}
  </div>
</section>
