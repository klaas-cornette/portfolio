<template>
  <div class="icon">
    <component :is="iconComponent" />
  </div>
</template>

<script setup>
  import { defineAsyncComponent, computed, defineProps } from 'vue';

  const props = defineProps({
    name: {
      type: String,
      required: true
    },
  });

  const icons = {
    'github': defineAsyncComponent(() => import('@/svg/github.svg')),
    'linkedin': defineAsyncComponent(() => import('@/svg/linkedin.svg')),
  };

  const iconComponent = computed(() => {
    return icons[props.name] || null;
  });
</script>

<style scoped lang="scss">
.icon {
  width: fit-content;
}
</style>
