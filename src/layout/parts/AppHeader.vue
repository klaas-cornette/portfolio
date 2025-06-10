<template>
  <header class="app-header">
    <div class="app-header__container">
      <div class="app-header__logo">
        <p><span class="app-header__logo-highlight">C</span>ornette <span class="app-header__logo-highlight">K</span>laas</p>
      </div>

      <nav class="app-header__nav">
        <a href="#home">{{ __t('nav.home') }}</a>
        <a href="#about">{{ __t('nav.about') }}</a>
        <a href="#skills">{{ __t('nav.skills') }}</a>
        <a href="#projects">{{ __t('nav.projects') }}</a>
      </nav>

      <app-button
        class="app-header__locale-toggle"
        variant="outline"
        :text="locale.toUpperCase()"
        @click="toggleLocale"
      />
    </div>
  </header>
</template>

<script setup>
  import { ref } from 'vue'
  import { __t, switchLocale, currentLocale } from '@/core/locale'
  import AppButton from '@/ui/buttons/AppButton.vue'

  const locale = ref(currentLocale())

  const toggleLocale = () => {
    locale.value = locale.value === 'nl' ? 'en' : 'nl'
    switchLocale(locale.value)
  }
</script>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--app-bg-secondary);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: var(--padding-s) 0;

  &__locale-toggle {
    width: 5rem;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background-color: var(--app-gray-20);
    }
  }

  &__container {
    max-width: 130rem;
    margin: 0 auto;
    padding: 0 var(--padding-m);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
     p {
      font-weight: 600;
      font-size: 1.8rem;
      color: var(--app-white)
    }
    &-highlight {
      color: var(--app-primary);
    }
  }

  &__nav {
    display: flex;
    gap: var(--margin-l);

    @media screen and (max-width: 550px) {
      display: none;
      
    }

    a {
      color: var(--app-white);
      font-weight: 500;
      text-decoration: none;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.75;
      }
    }
  }
}
</style>
