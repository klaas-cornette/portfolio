<template>
  <div class="app-callout">
    <div class="app-callout__row">
      <div class="app-callout__icon">
        <icon name="call-out" />
      </div>
      <div class="app-callout__body">
        <h3 class="app-callout__title text-l">
          {{ title }}
        </h3>
      </div>
    </div>
    <p class="app-callout__message">
      <slot />
    </p>  
  </div>
</template>
  
  <script setup>
  import { defineProps } from 'vue'
  import Icon from '@/js/ui/icon/Icon.vue'
  
  defineProps({
    title: { type: String, required: true }
  })
  </script>
  
  <style lang="scss" scoped>
  .app-callout {
    display: flex;
    flex-direction: column;
    background-color: var(--app-gray-100);
    border: 1px solid var(--app-border);
    border-radius: 0.8rem;
    padding: var(--padding-m);

    &__row {
      display: flex;
      align-items: center;
      margin-bottom: var(--margin-s);
    }
  
    &__icon {
      margin-right: var(--margin-s);
      background-color: var(--app-white);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--app-gray-700);
  
      :deep(svg) {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  
    &__title {
      color: var(--app-black);
    }
  
    &__message {
      color: var(--app-gray-500);
    }
  }
  </style>
  