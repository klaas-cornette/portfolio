<template>
  <button :class="buttonClass" :disabled="isDisabled">
    <span v-if="loading" class="app-button__loader" />

    <span v-else class="app-button__content">
      <icon v-if="icon" :name="icon" class="app-button__icon" />
      <span v-if="text" class="app-button__text">{{ text }}</span>
      <icon v-if="rightIcon" :name="rightIcon" class="app-button__icon--right" />
    </span>
  </button>
</template>

<script setup>
  import { computed } from 'vue'
  import Icon from '@/ui/icons/AppIcon.vue'

  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: null
    },
    variant: {
      type: String,
      required: false,
      default: 'primary'
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    block: {
      type: Boolean,
      required: false,
      default: false
    },
    rightIcon: {
      type: String,
      required: false,
      default: null
    },
  })

  const isDisabled = computed(() => props.disabled || props.loading)
  const buttonClass = computed(() => {
    return [
      'app-button',
      `app-button--${props.variant}`,
      `app-button--${props.size}`,
      {
        'is-loading': props.loading,
        'is-disabled': isDisabled.value,
        'app-button--block': props.block,
        'app-button--has-icon': !!props.icon
      }
    ]
  })
</script>

<style scoped lang="scss">
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.8rem 1.6rem;
  height: 4.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;


  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(1.02);
  }

  &--block {
    width: 100%;
    display: flex;
  }

  &--has-icon {
    .app-button__icon {
      margin-right: 0.8rem;
    }
  }

  &.is-loading,
  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--primary {
    background-color: var(--app-primary);
    color: var(--app-white);
  }

  &--secondary {
    background-color: var(--app-secondary);
    color: var(--app-black);
  }

  &--outline {
    background-color: transparent;
    border: 1px solid var(--app-gray-20);
    color: var(--app-white);
    padding: 0 1.1rem;
  }

  &--success {
    background-color: var(--app-green);
    color: var(--app-white);
    padding: 0 1.1rem;
    height: 3rem;
  }

  &__content {
    display: inline-flex;
    align-items: center;
  }

  &__icon {
    display: inline-flex;
    align-items: center;

    :deep(svg) {
      width: 1.6rem;
      height: 1.6rem;
    }
  }

  &__icon--right {
    display: inline-flex;
    align-items: center;
    margin-left: 1rem;

    :deep(svg) {
      width: 1.6rem;
      height: 1.6rem;
    }
  }

  &__loader {
    width: 1.6rem;
    height: 1.6rem;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

}


@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
