<template>
  <footer class="footer">
    <div class="footer__content">
      <p class="footer__text">
        © {{ new Date().getFullYear() }} Klaas Cornette {{ __t('footer.rights') }}
      </p>

      <div class="footer__icons">
        <a
          v-for="icon in icons"
          :key="icon.name"
          :href="icon.link"
          target="_blank"
          rel="noopener"
          class="footer__icon"
        >
          <app-icon :name="icon.name" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import { __t } from '@/core/locale'
  import AppIcon from '@/ui/icons/AppIcon.vue'

  const icons = [
    { name: 'github', link: 'https://github.com/klaas-cornette' },
    { name: 'linkedin', link: 'www.linkedin.com/in/klaas-cornette-a0b188293' },
  ]
</script>

<style scoped lang="scss">
.footer {
  padding: var(--padding-m) 0;
  background-color: var(--app-bg-secondary);

  &__content {
    max-width: 120rem;
    margin: 0 auto;
    padding: 0 var(--padding-m);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  &__text {
    color: var(--app-white);
    font-size: 1.3rem;
  }

  &__icons {
    display: flex;
    gap: var(--margin-s);
  }

  &__icon {
    color: var(--app-white);
    font-size: 1.6rem;

    &:hover {
      opacity: 0.8;
    }

    :deep(svg) {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
