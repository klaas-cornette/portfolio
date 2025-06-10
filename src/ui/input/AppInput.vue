<template>
  <div
    class="app-input"
    :class="{
      'app-input--error': !!error,
      'app-input--with-icon': !!icon,
      'app-input--password': isPassword
    }"
    @click="focusInput"
  >
    <label v-if="label" class="app-input__label mb-s">{{ label }}</label>

    <div class="app-input__control">
      <input
        ref="inputRef"
        v-model="localValue"
        :type="actualType"
        :class="{'app-input__has-icon' : icon}"
        class="app-input__field"
        :placeholder="placeholder"
        @input="onInput"
      >

      <div v-if="icon" class="app-input__icon app-input__icon--left">
        <AppIcon :name="icon" />
      </div>

      <button
        v-if="showPasswordToggle"
        type="button"
        class="app-input__toggle"
        @click.stop="toggleShowPassword"
      >
        <AppIcon :name="showPassword ? 'eye-off' : 'eye'" />
      </button>
    </div>

    <p v-if="error" class="app-input__error">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
  import { ref, computed, watch, defineProps, defineEmits } from 'vue'
  import AppIcon from '@/js/ui/icon/Icon.vue'

  const props = defineProps({
    label: { type: String, required: false, default: null },
    type: { type: String, required: true },
    placeholder: { type: String, required: true },
    icon: { type: String, required: false, default: null },
    modelValue: { type: [String, Number, null], required: true },
    error: { type: String, required: false, default: null },
    passwordToggle: { type: Boolean, required: false },
  })

  const emit = defineEmits(['update:modelValue'])
  const localValue = ref(props.modelValue)
  const showPassword = ref(false)

  const actualType = computed(() => {
    if (props.type === 'password' && showPassword.value) {
      return 'text'
    }
    return props.type
  })

  const showPasswordToggle = computed(() => {
    return props.type === 'password' && props.passwordToggle
  })

  watch(
    () => props.modelValue,
    (newVal) => {
      localValue.value = newVal
    }
  )

  function onInput(event) {
    emit('update:modelValue', event.target.value)
  }

  function toggleShowPassword() {
    showPassword.value = !showPassword.value
  }

  const isPassword = computed(() => props.type === 'password')

  const inputRef = ref(null)
  function focusInput() {
    inputRef.value?.focus()
  }
</script>

<style lang="scss" scoped>

.app-input {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__control {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__field {
    flex: 1 1 auto;
    font-size: 1.4rem;
    height: 5rem;
    outline: none;
    padding-left: 1rem;
    border-radius: 0.8rem;
    border: 1px solid var(--app-border);
    color: var(--app-black);
  }

  &__icon {
    position: absolute;
    left: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;

    :deep(svg) {
      width: 1.6rem;
      height: 1.6rem;
      fill: var(--app-gray-400);
    }
  }

  &__has-icon {
    padding-left: 4rem;
  }

  &__toggle {
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    :deep(svg) {
      width: 1.6rem;
      height: 1.6rem;
    }
  }

  &__error {
    margin-top: 0.4rem;
    font-size: 1.2rem;
    color: red;
  }

  &--error {
    .app-input__control {
      border-color: red;
    }
  }
}
</style>
