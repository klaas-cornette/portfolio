<template>
  <span class="app-badge">
    <span class="app-badge__text">{{ text }}</span>
    <button
      type="button"
      class="app-badge__remove"
      aria-label="Remove badge"
      @click="removeBadge"
    >
    
      <Icon
        name="cross"
        class="app-badge__icon"
      />
    </button>
  </span>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue'
  import Icon from '@/ui/icons/AppIcon.vue'

  const props = defineProps({
    text: { type: String, required: true }
  })

  const emit = defineEmits(['remove'])

  function removeBadge() {
    emit('remove', props.text)
  }
</script>

<style lang="scss" scoped>
.app-badge {
  display: inline-flex;
  align-items: center;
  background-color: var(--app-active-background);
  color: var(--app-black);
  border-radius: 0.8rem;
  padding: var(--padding-xs) 0 var(--padding-xs) var(--padding-s);
  font-size: 1.4rem; 
  line-height: 1;
  margin: 0 var(--margin-xs) 0;

  &__remove {
    background: none;
    border: none;
    padding: 0 var(--padding-s) 0 var(--padding-xs);
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--app-gray-500);
    transition: color var(--effect);

    &:hover {
      color: var(--app-error);
    }
  }

  &__icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>
