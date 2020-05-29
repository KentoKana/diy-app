<script>
  import { goto } from "@sapper/app";
  import { loggedInUser, isLoggedIn } from "../../stores/user-store.js";
  import { fetchUserByJWT } from "../../utils/fetch-data.js";
  import Textfield from "@smui/textfield";
  import Button, { Label } from "@smui/button";
  import Spinner from "svelte-spinner";
  import { onMount } from "svelte";

  let email = "";
  let password = "";
  let inputValues = {
    email: "",
    password: ""
  };
  let validationMessages = { email: "", password: "" };
  let uid;
  let buttonLabel = "Login";
  let isSubmitting = false;
  let jwt;

  onMount(() => {
    jwt = localStorage.getItem("usertoken");
    if (jwt) {
      return fetchUserByJWT(jwt).then(res => {
        uid = res.id;
        goto(`/user/${res.username}`);
      });
    }
  });

  const handleSubmit = () => {
    buttonLabel = "Logging you in...";
    isSubmitting = true;
    fetch("http://localhost:3333/api/login", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: inputValues.email,
        password: inputValues.password
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        buttonLabel = "Login";
        isSubmitting = false;
        if (!res.token) {
          res.forEach(item => {
            validationMessages[item.field] = item.message;
          });
          return;
        }
        localStorage.setItem("usertoken", res.token);
        return fetchUserByJWT(res.token).then(res => {
          goto(`/user/${$loggedInUser.username}`);
        });
      });
  };
</script>

<style lang="scss">
  @import "../../style/theme.scss";
  .login {
    h1 {
      text-align: center;
    }
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 57px);
    .form__wrap {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 500px;
      align-items: center;
      justify-content: center;
      border-radius: $border-radius-lg;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    }
    .form {
      width: 201px;
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      .submit-button {
        display: flex;
        justify-content: flex-end;
        margin: 10px 0;
      }
    }
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons" />
</svelte:head>
{#if process.browser && !jwt && !uid}
  <section class="login">
    <div class="form__wrap">
      <form on:submit|preventDefault={handleSubmit} class="form">
        <h1>
          Login to
          <span class="primary-highlight">DooIt</span>
        </h1>
        <div>
          <Textfield
            type="text"
            name="email"
            label="E-mail"
            bind:value={inputValues.email}
            id="email" />
          <div class="validation-message">
            {#if validationMessages.email !== ''}{validationMessages.email}{/if}
          </div>
        </div>
        <div>
          <Textfield
            type="password"
            name="password"
            label="Password"
            bind:value={inputValues.password} />
          <div class="validation-message">
            {#if validationMessages.password !== ''}
              {validationMessages.password}
            {/if}
          </div>
          <div class="submit-button">
            <Button disabled={isSubmitting} variant="unelevated" type="submit">
              {buttonLabel}
            </Button>
          </div>
        </div>
      </form>
      <p>
        Don't have an account? Register
        <a href="#">here</a>
        !
      </p>
    </div>
  </section>
{/if}
