<template>
  <div class="step-progress">
    <div class="step-progress__header">
      <h1 class="step-progress__title">
        {{ title }}
      </h1>
      <p class="step-progress__counter">
        Step {{ currentStep + 1 }} of {{ steps.length }}
      </p>
    </div>

    <div class="step-progress__bar">
      <div class="step-progress__track" />
      <div class="step-progress__fill" :style="{ width: fillWidth + '%' }" />
    </div>

    <div class="step-progress__labels">
      <div v-for="(step, idx) in steps" :key="idx" class="step-progress__label" :style="labelStyle(idx, true)">
        <p class="step-progress__label--text text-m" :class="{ 'step-progress__label--active': idx <= currentStep }">
          {{ step }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  steps: { type: Array, required: true },
  currentStep: { type: Number, required: true }
})

const fillWidth = computed(() => {
  const maxIndex = props.steps.length - 1
  if (maxIndex < 1) return 0

  const intervalPercent = 100 / maxIndex

  const minimalKick = intervalPercent * 0.1

  return props.currentStep === 0
    ? minimalKick
    : (props.currentStep / maxIndex) * 100
})

function labelStyle(idx, isLabel = false) {
  const maxIndex = props.steps.length - 1
  let left
  if (!isLabel && idx === props.currentStep && idx !== 0) {
    left = fillWidth.value
  } else {
    left = (idx / maxIndex) * 100
  }
  let transform
  if (idx === 0) {
    transform = isLabel
      ? 'translateX(0)'
      : 'translate(0, -50%)'
  } else if (idx === maxIndex) {
    transform = isLabel
      ? 'translateX(-100%)'
      : 'translate(-100%, -50%)'
  } else {
    transform = isLabel
      ? 'translateX(-50%)'
      : 'translate(-50%, -50%)'
  }
  return {
    left: `${left}%`,
    transform
  }
}
</script>

<style lang="scss" scoped>
.step-progress {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--margin-m);
  }

  &__counter {
    align-items: center;
    color: var(--app-gray-600);
  }


  &__bar {
    position: relative;
    height: 0.8rem;
    margin-bottom: var(--margin-s);
  }

  &__track {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--app-gray-200);
    border-radius: 0.8rem;
  }

  &__fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--app-secondary);
    border-radius: 0.8rem;
    width: 0;
    transition: width 0.4s ease-out;
  }

  &__labels {
    display: flex;
    position: relative;
    margin-top: var(--margin-xs);
  }

  &__label {
    flex: 1;
    position: absolute;

    &--text {
      color: var(--app-gray-500);
      text-align: center;
    }

    &--active {
      color: var(--app-black);
      font-weight: 500;
    }
  }
}
</style>