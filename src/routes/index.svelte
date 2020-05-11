<script>
  import ProjectCards from "../components/ProjectCards.svelte";
  export const featuredProjects = [
    {
      title: "Cool Cabinet",
      author: "Booker Dewitt",
      image: "./images/project-placeholder.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      url: "#",
      categories: ["Wood Working"]
    },
    {
      title: "Cool Cabinet",
      author: "Booker Dewitt",
      image: "./images/project-placeholder.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      url: "#",
      categories: ["Wood Working"]
    },
    {
      title: "Cool Cabinet",
      author: "Booker Dewitt",
      image: "./images/project-placeholder.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      url: "#",
      categories: ["Wood Working"]
    },
    {
      title: "Cool Cabinet",
      author: "Booker Dewitt",
      image: "./images/project-placeholder.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      url: "#",
      categories: ["Wood Working"]
    },
    {
      title: "Cool Cabinet",
      author: "Booker Dewitt",
      image: "./images/project-placeholder.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      url: "#",
      categories: ["Wood Working"]
    }
  ];
</script>

<style lang="scss">
  @import "../style/theme.scss";
  section {
    padding: 6em 0;
  }
  .banner {
    &__wrapper {
      display: flex;
      margin: 0 auto;
    }
    &__texts {
      display: flex;
      flex-direction: column;
      max-width: 50%;
      align-self: center;
      padding-right: 10px;
      h1 {
        font-size: 3.3em;
        text-transform: capitalize;
        font-weight: 700;
        margin: 0 0 0.5em 0;
        text-align: left;
      }
      p {
        font-size: 1.5em;
        max-width: 80%;
        color: $grey-300;
      }
    }
    &__image-container {
      max-width: 50%;
      img {
        width: 100%;
        border-radius: $border-radius-lg;
      }
    }
  }

  .featured {
    padding-top: 3em;
  }
</style>

<svelte:head>
  <title>DooIt | Home</title>
</svelte:head>

<section class="banner">
  <div class="container">
    <div class="banner__wrapper">
      <div class="banner__texts">
        <h1>
          Document Your
          <span class="primary-highlight">DIY</span>
          Projects.
          <br />
          Show It Off To The
          <span class="primary-highlight">World</span>
          .
        </h1>
        <p>
          <strong>
            Share Your DIY Passion Projects Across The World Through
            <span class="primary-highlight">DooIt</span>
            .
          </strong>
        </p>
      </div>
      <div class="banner__image-container">
        <img src="./images/banner-image.jpg" alt="" />
      </div>
    </div>
  </div>
</section>

<hr />

<section class="featured">
  <div class="container">
    <div class="featured__wrapper">
      <h2>Picked Out For You</h2>
      <ProjectCards {featuredProjects} />
    </div>
  </div>
</section>
