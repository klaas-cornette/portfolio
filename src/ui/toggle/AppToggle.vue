<template>
  <label class="app-card__toggle">
    <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)">
    <span />
  </label>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue'
  defineProps({
    modelValue: {
      type: Boolean,
      required: true
    }
  })
  defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.app-card__toggle {
    position: relative;
    width: 42px;
    height: 24px;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    span {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--app-gray-200);
        border-radius: 24px;
        transition: var(--effect);

        &::before {
            content: '';
            position: absolute;
            height: 18px;
            width: 18px;
            left: 3px;
            top: 3px;
            background: var(--app-white);
            border-radius: 50%;
            transition: var(--effect);
        }
    }

    input:checked+span {
        background: var(--app-primary);

        &::before {
            transform: translateX(18px);
        }
    }
}
</style>