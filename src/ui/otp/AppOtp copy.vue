<template>
  <div class="verification-code">
    <div class="verification-code__header">
      <p class="verification-code__header-text">
        {{ __t('auth.login.authcode') }}
      </p>
      <div class="verification-code__resend" @click="resendCode">
        <icon name="refresh" class="verification-code__resend-icon" />
        <p class="auth-form__new-code">
          {{ __t('auth.login.newcode') }}
        </p>
      </div>
    </div>

    <div class="verification-code__boxes">
      <input
        v-for="(digit, idx) in codes"
        :key="idx"
        ref="boxes"
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

    <div
      v-if="secondsLeft > 0"
      class="verification-code__timer"
    >
      <icon name="clock" class="verification-code__timer-icon" />
      <p class="verification-code__timer-text text-m">
        {{ __t('auth.code-expires') + displayTime + __t('auth.minutes') }}
      </p>
    </div>
    <p v-if="error" class="error">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onBeforeUnmount } from 'vue'
  import { __t } from '@/js/core/locale'
  import Icon from '@/js/ui/icon/Icon.vue'

  const props = defineProps({
    modelValue:    { type: String, default: '' },
    length:        { type: Number, required: true },
    expireSeconds: { type: Number, required: true },
    error:         { type: String, required: false, default: null },
  })

  const emit = defineEmits(['update:modelValue'])

  const codes       = ref(Array.from({ length: props.length }, (_, i) => props.modelValue[i] || ''))
  const secondsLeft = ref(0)
  const boxes       = ref([])
  let   timerId     = null

  const displayTime = computed(() => {
    const m = Math.floor(secondsLeft.value / 60)
    const s = secondsLeft.value % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  })

  watch(
    () => props.modelValue,
    newVal => {
      codes.value = Array.from({ length: props.length }, (_, i) => newVal[i] || '')
    }
  )

  onBeforeUnmount(() => {
    clearInterval(timerId)
  })

  function startTimer() {
    clearInterval(timerId)
    secondsLeft.value = props.expireSeconds
    timerId = setInterval(() => {
      if (secondsLeft.value > 0) {
        secondsLeft.value--
      } else {
        clearInterval(timerId)
      }
    }, 1000)
  }

  function resendCode() {
    startTimer()
  }

  function emitCode() {
    emit('update:modelValue', codes.value.join(''))
  }

  function onInput(e, idx) {
    const val = e.target.value.replace(/\D/g, '').slice(-1)
    codes.value[idx] = val
    emitCode()
    if (val && idx < props.length - 1) {
      boxes.value[idx + 1]?.focus()
    }
  }

  function onKeydown(e, idx) {
    if (e.key === 'Backspace' && !codes.value[idx] && idx > 0) {
      boxes.value[idx - 1]?.focus()
    }
  }

  function onPaste(e) {
    e.preventDefault()
    const pasted = (e.clipboardData.getData('text') || '')
      .replace(/\D/g, '')
      .slice(0, props.length)
    pasted.split('').forEach((ch, i) => {
      codes.value[i] = ch
      if (boxes.value[i]) boxes.value[i].value = ch
    })
    emitCode()
  }
</script>
<style lang="scss" scoped>
.verification-code {
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--margin-m);

    &-text {
      color: var(--app-gray-700);
    }
  }

  &__resend {
    display: flex;
    align-items: center;
    cursor: pointer;
    
    &:hover {
      p{
        color: var(--app-secondary-hover);
      };
      :deep(svg) {
        fill: var(--app-secondary-hover);
      }
    }

    &-icon {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: var(--margin-xs);
      color: var(--app-secondary);
    }

    .auth-form__new-code {
      color: var(--app-secondary);
    }
  }

  &__boxes {
    display: flex;
    justify-content: space-between;
  }

  &__box {
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

  &__timer {
    display: flex;
    flex-direction: row;
    margin-top: var(--margin-m);
    align-items: center;

    &-text {
      color: var(--app-gray-600);
    }

    &-icon {
      width: 1.4rem;
      height: 1.4rem;
      margin: 0;
      margin-right: var(--margin-xs);
      color: var(--app-gray-600);
    }
  }
}

.error {
  color: var(--app-red);
  text-align: center;
}
</style>
