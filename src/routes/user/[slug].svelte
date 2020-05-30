<script context="module">
  export async function preload({ params, query }) {
    return await this.fetch(
      `http://localhost:3333/api/getUserByUsername/${params.slug}`
    )
      .then(res => {
        return res.json();
      })
      .then(user => {
        return { userProfileOwner: user };
      });
  }
</script>

<script>
  import UserCard from "../../components/user-profile/UserCard.svelte";
  import { loggedInUser, isLoggedIn } from "../../stores/user-store.js";
  import { fetchUserByUsername } from "../../utils/fetch-data";
  import { goto } from "@sapper/app";
  import { onMount, beforeUpdate } from "svelte";
  import Spinner from "svelte-spinner";

  let jwt;
  let loggedInUserIsProfileOwner = false;
  let section;
  export let userProfileOwner;
  onMount(async () => {
    jwt = localStorage.getItem("usertoken");
  });
  beforeUpdate(() => {
    if (userProfileOwner.id === $loggedInUser.id) {
      loggedInUserIsProfileOwner = true;
    }
  });
</script>

<style lang="scss">
  .user-profile {
    padding: 2em 0;
  }
</style>

<section class="user-profile" bind:this={section}>
  <div class="container">
    {#if userProfileOwner}
      <UserCard {userProfileOwner} {loggedInUserIsProfileOwner} />
    {:else}
      <h1>
        <div>Loading</div>
        <Spinner size="50" speed="750" color="#A82124" thickness="2" gap="40" />
      </h1>
    {/if}
  </div>
</section>
