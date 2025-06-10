<template>
  <div class="project-card">
    <div class="project-card__image">
      <img :src="project.image" :alt="project.title" />
    </div>
    <div class="project-card__content">
      <h3>{{ project.title }}</h3>
      <div class="project-card__tags">
        <template v-if="project.primary">
          <div v-for="tag in project.tags" :key="tag" class="project-card__tag">
            <p>{{ tag }}</p>
          </div>
        </template>
        <template v-if="project.secondary">
          <div v-for="tag in project.tags" :key="tag" class="project-card__tag-secondary">
            <p>{{ tag }}</p>
          </div>
        </template>
      </div>
      <p>{{ description }}</p>
      <button class="project-card__button" @click="redirect(project)">
        {{ __t('home.projects.moreInfo') }}
      </button>
    </div>
  </div>
</template>

<script setup>
  import { __t } from '@/core/locale'
  import { computed } from 'vue'

  const props = defineProps({
    project: {
      type: Object,
      required: true
    }
  })

  const description = computed(() => __t(`projects.${props.project.key}.description`))

  function redirect(project) {
    if (project.link) {
      window.open(project.link, '_blank')
    } else {
      console.warn('No link provided for project:', project.title)
    }
  }
</script>

<style scoped lang="scss">
.project-card {
  background-color: var(--app-bg-secondary);
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__image {
    height: 18rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    padding: var(--padding-m);

    h3 {
      color: var(--app-white);
      font-size: 2rem;
      margin-bottom: var(--margin-s);
    }

    p {
      font-size: 1.4rem;
      color: var(--app-white);
      margin: var(--margin-s) 0;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--margin-s);
    margin-bottom: var(--margin-s);
  }

  &__tag {
      background-color: #4c3953;
      
      padding: var(--padding-xs) var(--padding-s);
      border-radius: 0.5rem;
      font-size: 1.2rem;
  
      p {
      color: var(--app-primary);
      margin: 0;
      }
  }

  &__tag-secondary {
    background-color: #244b5f;
    padding: var(--padding-xs) var(--padding-s);
    border-radius: 0.5rem;
    font-size: 1.2rem;

    p {
      color: var(--app-secondary);
      margin: 0;
    }
  }

  &__button {
    background-color: var(--app-accent);
    color: var(--app-white);
    border: none;
    padding: var(--padding-s) var(--padding-m);
    border-radius: 0.5rem;
    font-size: 1.6rem;
    cursor: pointer;
    transition: background-color var(--effect);

    &:hover {
      background-color: var(--app-primary-hover);
    }
  }
}
</style>
