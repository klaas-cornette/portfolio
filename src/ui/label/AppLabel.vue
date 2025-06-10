<template>
  <label :class="labelClass">
    <icon v-if="icon" class="app-label__icon" />
    {{ text }}
  </label>
</template>

<script setup>
  import { defineProps, computed } from "vue";
  import Icon from "@/js/ui/icon/Icon.vue";

  const props = defineProps({
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null
    }
  });

  const labelClass = computed(() => {
    return [
      "app-label",
      "app-label--" + props.type,
    ];
  });
</script>

<style lang="scss" scoped>
.app-label {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;

  &__icon {
    font-size: 1.2rem;
    line-height: 1.2rem;
  }

  &--primary {
    background-color: var(--app-primary);
    color: var(--app-white);
  }

  &--draft {
    background-color: var(--app-draft-bg);
    color: var(--app-draft-text);
  }

  &--published {
    background-color: var(--app-published-bg);
    color: var(--app-published-text);
  }

  &--success {
    background-color: var(--app-green-background);
    color: var(--app-green);
    border: 1px solid var(--app-green);
    width: 10rem;
  }

  &--error {
    background-color: var(--app-red-background);
    color: var(--app-red);
    border: 1px solid var(--app-red);
    width: 10rem;

  }
}
</style>