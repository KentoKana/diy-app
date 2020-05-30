<script>
  import { fetchUserByJWT } from "../utils/fetch-data.js";
  import { onMount } from "svelte";
  import { loggedInUser, isLoggedIn } from "../stores/user-store.js";

  export let segment;

  let token;
  let user;
  onMount(() => {
    token = localStorage.getItem("usertoken");
    if (token) {
      fetchUserByJWT(token).then(res => {
        isLoggedIn.set(true);
        loggedInUser.set(res);
        user = res;
      });
    }
  });
  const logout = () => {
    isLoggedIn.set(false);
    return localStorage.setItem("usertoken", "");
  };
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
    integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
    crossorigin="anonymous" />
</svelte:head>
<nav>
  <ul>
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href="."
        rel="prefetch">
        home
      </a>
    </li>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
        about
      </a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'blog' ? 'page' : undefined}
        href="blog">
        blog
      </a>
    </li>
    {#if !$isLoggedIn}
      <li>
        <a
          rel="prefetch"
          aria-current={segment === 'login' ? 'page' : undefined}
          href="login">
          login
        </a>
      </li>
      <li>
        <a
          href="/register"
          aria-current={segment === 'register' ? 'page' : undefined}>
          register
        </a>
      </li>
    {/if}
    {#if $isLoggedIn}
      <li>
        <a
          rel="prefetch"
          aria-current={segment === `user` ? 'page' : undefined}
          href={`/user/${$loggedInUser.username}`}>
          Hello, {$loggedInUser.username}!
        </a>
      </li>
      <li>
        <a on:click={logout} href="/login">log out</a>
      </li>
    {/if}
  </ul>
</nav>
