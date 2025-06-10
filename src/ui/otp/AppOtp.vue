<template>
  <div class="verification-code__boxes">
    <input
      v-for="(digit, idx) in codes"
      :key="idx"
      ref="boxes"
      v-cy="`code-box-${idx}`"
      type="text"
      inputmode="numeric"
      maxlength="1"
      class="verification-code__box text-l"
      :value="digit"
      @input="onInput($event, idx)"
      @keydown="onKeydown($event, idx)"
      @paste="onPaste"
    >
  </div>
</template>

<script setup>
  import { ref, watch, nextTick } from 'vue'

  const props = defineProps({
    modelValue: { type: String, default: '' },
    length:     { type: Number, required: true },
  })
  const emit = defineEmits(['update:modelValue'])

  const codes = ref(Array.from({ length: props.length }, (_, i) => props.modelValue[i] || ''))
  const boxes = ref([])

  watch(() => props.modelValue, v => {
    codes.value = Array.from({ length: props.length }, (_, i) => v[i] || '')
  })

  function emitCode() {
    emit('update:modelValue', codes.value.join(''))
  }

  function onInput(e, idx) {
    const val = e.target.value
    codes.value[idx] = val
    emitCode()
    if (val && idx < props.length - 1) {
      nextTick(() => boxes.value[idx + 1]?.focus())
    }
  }

  function onKeydown(e, idx) {
    if (e.key === 'Backspace' && !codes.value[idx] && idx > 0) {
      nextTick(() => boxes.value[idx - 1]?.focus())
    }
  }

  function onPaste(e) {
    e.preventDefault()
    const pasted = (e.clipboardData.getData('text') || '')
      .slice(0, props.length)
    pasted.split('').forEach((ch, i) => {
      codes.value[i] = ch
      if (boxes.value[i]) boxes.value[i].value = ch
    })
    emitCode()
  }
</script>

<style lang="scss" scoped>
.verification-code__boxes {
  display: flex;
  justify-content: space-between;
}

.verification-code__box {
  width: 5.6rem;
  height: 4.8rem;
  text-align: center;
  color: var(--app-gray-700);
  background-color: var(--app-white);
  border: 1px solid var(--app-border);
  border-radius: 0.8rem;
  transition: border var(--effect);

  &:focus {
    outline: none;
    border-color: var(--app-secondary);
  }
}
</style>
