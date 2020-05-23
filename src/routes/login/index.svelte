<script context="module">
  import { goto } from "@sapper/app";
  import jwtdecode from "jwt-decode";

  let email = "";
  let password = "";
  let uid;
  const handleSubmit = () => {
    fetch("http://localhost:3333/api/login", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.token) {
          localStorage.setItem("usertoken", res.token);
          uid = jwtdecode(res.token).uid;

          return fetch(`http://localhost:3333/api/users/${uid}`)
            .then(res => {
              return res.json();
            })
            .then(res => {
              console.log(res);
              return res;
            });
        }
        console.log(res);
        return res;
      });
  };
</script>

<style lang="scss">

</style>

<section class="login">
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="email" class="email">E-mail</label>
      <input
        type="text"
        placeholder="Please type your username"
        name="email"
        bind:value={email}
        id="email" />
    </div>
    <div>
      <label for="password" class="password">Password</label>
      <input
        type="password"
        placeholder="Please type your password"
        name="password"
        bind:value={password} />
      <button type="submit">Login</button>
    </div>
  </form>
</section>
