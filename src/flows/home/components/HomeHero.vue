<template>
  <section id="home" class="hero">
    <div class="hero__content">
      <h1>
        {{ __t('home.title.part1') }}
        <span class="hero__highlight">{{ __t('home.title.highlight') }}</span>
        {{ __t('home.title.part2') }}
      </h1>
      <p class="hero__subtitle">{{ __t('home.subtitle') }}</p>

      <div class="hero__socials">
        <a
          v-for="icon in icons"
          :key="icon.name"
          :href="icon.link"
          target="_blank"
          rel="noopener"
          class="hero__icon"
        >
          <app-icon :name="icon.name" />
        </a>
      </div>

      <app-button :text="__t('home.cta')" @click="scrollToProjects"/>
    </div>

    <div class="hero__image">
      <img src="@/assets/avatar.png" alt="Hero Image" />
    </div>
  </section>
</template>

<script setup>
  import { __t } from '@/core/locale'
  import AppButton from '@/ui/buttons/AppButton.vue'
  import AppIcon from '@/ui/icons/AppIcon.vue'

  const icons = [
    { name: 'github', link: 'https://github.com/klaas-cornette' },
    { name: 'linkedin', link: 'www.linkedin.com/in/klaas-cornette-a0b188293' },
  ]

  function scrollToProjects() {
    const el = document.getElementById('projects')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
</script>

<style scoped lang="scss">
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--padding-xl) 0;
  max-width: 130rem;
  width: 100%;
  margin: 0 auto;

  &__content {
    flex: 1;
  }

  h1 {
    max-width: 50rem;
    color: var(--app-white);
    font-size: 4.2rem;
    font-weight: bold;
    line-height: 1.2;
  }

  &__highlight {
    color: var(--app-primary);
  }

  &__subtitle {
    margin-top: var(--margin-s);
    font-size: 1.6rem;
    color: var(--app-gray-70);
  }

  &__socials {
    display: flex;
    gap: var(--margin-s);
    margin: var(--margin-m) 0;

     :deep(svg) {
      width: 2.4rem;
      height: 2.4rem;
      fill: var(--app-gray-70);

      &:hover {
        fill: var(--app-primary);
      }
     }
  }

  &__icon {
    font-size: 2rem;
    color: var(--app-white);

    &:hover {
      opacity: 0.8;
    }
  }

  &__image {
    flex: 1;
    display: flex;
    justify-content: center;

    img {
      width: 100%;
      max-width: 300px;
      border-radius: 50%;
      border: 2px solid var(--app-primary);
    }
  }
}
</style>
