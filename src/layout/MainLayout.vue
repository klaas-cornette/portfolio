<template>
  <div>
    <div class="main-layout">
      <div class="main-layout__content">
        <app-header />
        <div class="main-layout__box">
          <slot />
        </div>
        <app-footer />
      </div>
    </div>
  </div>
</template>

<script setup>
  import AppHeader from '@/layout/parts/AppHeader.vue'
  import AppFooter from '@/layout/parts/AppFooter.vue'
</script>

<style scoped lang="scss">

.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--app-bg);

  &__box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
}
</style>
