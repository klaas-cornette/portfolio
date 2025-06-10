<template>
  <div class="app-card">
    <slot />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>

.app-card {
  width: fit-content;
  overflow: hidden;
  background-color: var(--app-white);
  border-radius: 0.8rem;
  border: 1px solid var(--app-border);
  box-shadow: var(--shadow);
  padding: var(--padding-l);
}
</style>
