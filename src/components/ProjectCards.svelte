<script>
  export let featuredProjects;
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
    &__texts {
      margin: 10px 0;
    }
    .image-container {
      width: 100%;
      height: 200px;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
    a {
      text-decoration: none;
    }
    .category {
      margin: 1em 0;
      display: inline-block;
      background-color: $secondary-color;
      padding: 5px 15px;
      color: white;
      border-radius: 30px;
      font-size: 12px;
      border: 1px solid transparent;
      &:hover {
        color: $secondary-color;
        background-color: #fff;
        border: 1px solid $secondary-color;
        transition: 0.2s ease all;
      }
    }
  }
</style>

<div class="project-cards">
  {#each featuredProjects as project}
    <div class="project-card">
      <a href={project.url}>
        <div class="image-container">
          <img src={project.image} alt="" />
        </div>
        <div class="project-card__texts">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {#each project.categories as category}
            <a
              href={`/${category
                .toLowerCase()
                .split(' ')
                .join('-')}`}
              class="category">
              {category}
            </a>
          {/each}
        </div>
      </a>
    </div>
  {/each}
</div>
