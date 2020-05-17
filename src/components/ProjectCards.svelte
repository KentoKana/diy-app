<script>
  import { fly } from "svelte/transition";
  export let projects;
</script>

<style lang="scss">
  @import "../style/theme.scss";

  .project-cards {
    display: flex;
    flex-wrap: wrap;
  }
  .project-card {
    padding: 15px;
    max-width: 25%;
    display: flex;
    flex-direction: column;
    &__link {
      transition: 0.2s ease all;
      .project-card__texts__description {
        transition: 0.2s ease all;
        position: absolute;
        margin-left: 10px;
        color: #fff;
        font-size: 14px;
        bottom: -20px;
        opacity: 0;
      }

      &:hover {
        color: $secondary-color;
        .project-card__texts__description {
          bottom: 5px;
          opacity: 1;
        }

        img {
          filter: brightness(60%);
        }
      }
    }
    &__texts {
      margin: 10px 0;
      position: relative;
    }
    .image-container {
      width: 100%;
      height: 200px;
      overflow: hidden;
      position: relative;

      img {
        height: 100%;
        transition: 0.2s ease all;
      }
    }
    a {
      text-decoration: none;
    }

    .category {
      margin-top: 0;
      margin-right: 5px;
      display: inline-block;
      background-color: $secondary-color;
      padding: 5px 15px;
      color: white;
      border-radius: 30px;
      font-size: 12px;
      border: 1px solid transparent;
      transition: 0.2s ease all;

      &:hover {
        color: $secondary-color;
        background-color: #fff;
        border: 1px solid $secondary-color;
      }
    }
  }
</style>

<div class="project-cards">
  {#each projects.projects as project}
    <div class="project-card">
      <a class="project-card__link" href={project.slug}>
        <div class="image-container">
          <img src={`./images/${project.thumbnail}`} alt="" />
          <p class="project-card__texts__description">{project.description}</p>
        </div>
        <div class="project-card__texts">
          <h3>{project.name}</h3>
        </div>
      </a>
      <div>
        {#each project.categories as category}
          <a
            href={`/${category.name
              .toLowerCase()
              .split(' ')
              .join('-')}`}
            class="category">
            {category.name}
          </a>
        {/each}
      </div>
    </div>
    <!-- <img runat="server" src="http://localhost:3333/pyramid.png" width="100"> -->
  {/each}
</div>
