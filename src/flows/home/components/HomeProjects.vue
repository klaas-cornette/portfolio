<template>
  <section id="projects" class="projects">
    <div class="projects__container">
      <h2 class="projects__title">
        {{ __t('home.projects.title') }}
        <span class="projects__underline" />
      </h2>

      <div class="projects__grid">
        <project-card
          v-for="project in projects"
          :key="project.title"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { __t } from '@/core/locale'
  import ProjectCard from './ProjectCard.vue'

  const projects = [
    {
      title: __t('projects.music_collab.title'),
      key: 'music_collab',
      tags: ['Docker', 'js', 'laravel'],
      image: '/images/music-collab.png',
      link: 'https://github.com/pgmgent-2324-datamanagement/php-backoffice-klaas-cornette',
      primary: true
    },
    {
      title: __t('projects.gentse_feesten.title'),
      key: 'gentse_feesten',
      tags: ['js', 'html', 'css'],
      image: '/images/gentse-feesten.png',
      link: 'https://github.com/pgmgent-atwork-1/opdracht-2-gentse-feesten-2022-klaas-cornette',
      secondary: true
    },
    {
      title: __t('projects.skate_flow.title'),
      key: 'skate_flow',
      tags: ['Flutter', 'supabase', 'dart'],
      image: '/images/skate-flow.png',
      link: 'https://github.com/klaas-cornette/skate_app',
      primary: true
    },
    {
      title: __t('projects.pgm_remake.title'),
      key: 'pgm_remake',
      tags: ['react', 'tailwind'],
      image: '/images/pgm.png',
      link: 'https://github.com/pgmgent-pgm-4/pgm-platform-klaas-cornette',
      secondary: true
    },
    {
      title: __t('projects.party_gram.title'),
      key: 'party_gram',
      tags: ['react-native', 'supabase', 'expo'],
      image: '/images/party-gram.png',
      link: 'https://github.com/pgmgent-pgm-6/eindopdracht-partygram-klaas-cornette',
      primary: true
    }
  ]
</script>

<style scoped lang="scss">
.projects {
  padding: var(--padding-xl) 0;

  &__container {
    max-width: 130rem;
    margin: 0 auto;

    @media screen and (max-width: 1350px) {
      padding-left: 2rem;
      padding-right: 2rem;
      
    }
  }

  &__title {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
    color: var(--app-white);
  }

  &__underline {
    display: block;
    width: 6rem;
    height: 0.3rem;
    background-color: var(--app-primary);
    margin: 0.5rem auto var(--margin-l);
    border-radius: 4px;
    margin-top: 1.5rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
    gap: var(--margin-m);
  }
}
</style>
