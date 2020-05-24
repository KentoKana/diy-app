<script>
  import { goto } from "@sapper/app";
  import jwtdecode from "jwt-decode";
  import { isLoggedIn } from "../../stores/store.js";
  import Textfield from "@smui/textfield";
  import Button, { Label } from "@smui/button";
  let email = "";
  let password = "";
  let inputValues = {
    email: "",
    password: ""
  };
  let validationMessages = { email: "", password: "" };
  let uid;
  const handleSubmit = () => {
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
        if (!res.token) {
          res.forEach(item => {
            validationMessages[item.field] = item.message;
          });
          return;
        }

        localStorage.setItem("usertoken", res.token);
        uid = jwtdecode(res.token).uid;

        return fetch(`http://localhost:3333/api/users/${uid}`)
          .then(res => {
            return res.json();
          })
          .then(res => {
            isLoggedIn.update(status => (status = true));
            console.log($isLoggedIn);
            return res;
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
      // background-color: grey;
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
<section class="login">
  <div class="form__wrap">
    <form on:submit|preventDefault={handleSubmit} class="form">
      <h1>Login to <span class="primary-highlight">DooIt</span></h1>
      <div>
        <Textfield
          type="text"
          placeholder="Please type your username"
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
          placeholder="Please type your password"
          name="password"
          label="Password"
          bind:value={inputValues.password} />
        <div class="validation-message">
          {#if validationMessages.password !== ''}
            {validationMessages.password}
          {/if}
        </div>
        <div class="submit-button">
          <Button variant="unelevated" type="submit">Login</Button>
        </div>
      </div>
    </form>
    <p>
      Don't have an account? Register
      <a href="@">here</a>
      !
    </p>
  </div>
</section>
