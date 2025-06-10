<template>
  <div class="app-textarea" :class="{ 'app-textarea--error': !!error }">
    <label v-if="label" class="app-textarea__label">{{ label }}</label>
    <textarea
      ref="textareaRef"
      v-model="localValue"
      class="app-textarea__field"
      :placeholder="placeholder"
      :rows="rows"
      @input="onInput"
    />
    <p v-if="error" class="app-textarea__error">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'

  const props = defineProps({
    label: { type: String, required: false, default: null },
    placeholder: { type: String, required: false, default: '' },
    rows: { type: Number, required: false, default: 4 },
    modelValue: { type: String, default: '' },
    error: { type: String, required: false, default: null },
  })

  const emit = defineEmits(['update:modelValue'])
  const localValue = ref(props.modelValue)
  const textareaRef = ref(null)

  watch(
    () => props.modelValue,
    newVal => { localValue.value = newVal }
  )

  function onInput(event) {
    emit('update:modelValue', event.target.value)
  }
</script>

<style scoped lang="scss">
.app-textarea {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__label {
        margin-bottom: var(--margin-s);
        font-size: 1.4rem;
        color: var(--app-gray-800);
    }

    &__field {
        font-size: 1.4rem;
        padding: 0.8rem;
        border: 1px solid var(--app-border);
        border-radius: 0.8rem;
        resize: vertical;
        outline: none;
    }

    &__error {
        margin-top: 0.4rem;
        font-size: 1.2rem;
        color: var(--app-red);
    }

    &--error {
        .app-textarea__field {
            border-color: var(--app-red);
        }
    }
}
</style>