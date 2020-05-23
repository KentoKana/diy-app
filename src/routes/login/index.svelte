<script>
  import { goto } from "@sapper/app";
  import jwtdecode from "jwt-decode";
  import { isLoggedIn } from "../../stores/store.js";
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
            return res;
          });
      });
  };
</script>

<style lang="scss">
  @import "../../style/global.scss";
  .login {
    .validation-message {
      color: $danger;
    }
  }
</style>

<section class="login">
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <div>
        <label for="email" class="email">E-mail</label>
      </div>
      <input
        type="text"
        placeholder="Please type your username"
        name="email"
        bind:value={inputValues.email}
        id="email" />
      <div class="validation-message">
        {#if validationMessages.email !== ''}{validationMessages.email}{/if}
      </div>
    </div>
    <div>
      <div>
        <label for="password" class="password">Password</label>
      </div>
      <input
        type="password"
        placeholder="Please type your password"
        name="password"
        bind:value={inputValues.password} />
      <div class="validation-message">
        {#if validationMessages.password !== ''}
          {validationMessages.password}
        {/if}
      </div>
      <button type="submit">Login</button>
    </div>
  </form>
</section>
