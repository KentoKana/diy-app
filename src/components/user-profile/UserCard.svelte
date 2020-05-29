<script>
  import Button from "@smui/button";
  export let userProfileOwner;
  export let loggedInUserIsProfileOwner
</script>

<style lang="scss">
  @import "../style/theme.scss";
  .user-profile-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 30px;
    border-radius: $border-radius-lg;

    .profile-picture {
      &__container {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        margin: 10px 0;
      }
      &__holder {
        height: 100%;
        display: flex;
        justify-content: center;
      }
      height: auto;
    }
    h1 {
      padding: 10px 0;
    }
    .user-description {
      width: 300px;
    }
    .follow-user-btn {
      padding: 20px 0;
    }
  }
</style>

<div class="user-profile-card">
  <div class="profile-picture__container">
    <div class="profile-picture__holder">
      <img class="profile-picture" src="./images/banner-image.jpg" alt="" />
    </div>
  </div>
  <h1>{userProfileOwner.username}</h1>
  <p class="user-description">
    Some dood who loves building DIY projects in his spare time
  </p>
  {#if !loggedInUserIsProfileOwner}
    <div class="follow-user-btn">
      <Button class="follow-user-btn" variant="outlined">+ Follow</Button>
    </div>
  {/if}
</div>
