<template>
  <div class="app-toggle" role="tablist">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="app-toggle__button"
      :class="{ 'app-toggle__button--active': opt.value === modelValue }"
      :data-cy="`lang-btn-${ opt.value }`"
      role="tab"
      :aria-selected="opt.value === modelValue"
      @click="update(opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: true
    },
    options: {
      type: Array,
      required: true,
      validator(arr) {
        return arr.every(
          o => 'label' in o && 'value' in o
        )
      }
    }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  function update(val) {
    if (val !== props.modelValue) {
      emit('update:modelValue', val)
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .app-toggle {
    display: inline-flex;
    border: 1px solid var(--app-border);
    border-radius: 0.6rem;
    overflow: hidden;
  
    &__button {
      flex: 1;
      padding: var(--padding-s) var(--padding-m);
      background: var(--app-white);
      border: none;
      font-size: 1.2rem;
      color: var(--app-gray-600);
      cursor: pointer;
      transition: background-color var(--effect), color var(--effect);
  
      &:not(:last-child) {
        border-right: 1px solid var(--app-border);
      }
  
      &:hover {
        background-color: var(--app-gray-200);
      }
  
      &--active {
        background-color: var(--app-active-background);
        color: var(--app-black);
      }
    }
  }
  </style>
  