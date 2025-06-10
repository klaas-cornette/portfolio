<template>
  <label
    class="app-checkbox"
    :class="{ 'app-checkbox--disabled': disabled }"
  >

    <input
      class="app-checkbox__input"
      type="checkbox"
      :disabled="disabled"
      :checked="modelValue"
      @change="onChange"
    >

    <span class="app-checkbox__box">
      <span class="app-checkbox__checkmark" />
    </span>
    {{ label }}
  </label>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue'


  defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: null
    },
  })
  const emit = defineEmits(['update:modelValue'])

  function onChange(event) {
    emit('update:modelValue', event.target.checked)
  }
</script>

<style scoped lang="scss">
.app-checkbox {
  display: inline-flex;
  align-items: center;

  cursor: pointer;
  user-select: none;

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  &__box {
    position: relative;
    width: 1.4rem;
    height: 1.4rem;
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    margin-right: 0.6rem;
    background-color: #fff;
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  &__checkmark {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.4rem;
    height: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0; 
    transition: opacity 0.1s ease;

    &::before {
      content: "";
      display: block;
      width: 0.5rem;
      height: 0.9rem;
      border-right: 2px solid #fff;
      border-bottom: 2px solid #fff;
      transform: rotate(45deg);
      margin-bottom: 0.3rem;
    }
  }

  &__input:checked + .app-checkbox__box {
    background-color: var(--app-primary);
    border-color: var(--app-primary);
  }
  &__input:checked + .app-checkbox__box .app-checkbox__checkmark {
    opacity: 1;
  }

}
</style>
