<template>
  <div class="app-skill-bar">
    <div class="app-skill-bar__label">
      <span>{{ label }}</span>
      <span class="app-skill-bar__value">{{ value }}%</span>
    </div>
    <div class="app-skill-bar__track">
      <div
        class="app-skill-bar__fill"
        :style="{ width: value + '%', backgroundColor: barColor }"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: 'pink' 
    }
  })

  const barColor = computed(() => {
    return props.color === 'blue'
      ? 'var(--app-secondary)'
      : 'var(--app-primary)'
  })
</script>

<style scoped lang="scss">
.app-skill-bar {
  margin-bottom: var(--margin-m);

  &__label {
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    margin-bottom: var(--margin-s);
    color: var(--app-white);
  }

  &__track {
    height: 1.2rem;
    background-color: var(--app-gray-20);
    border-radius: 0.4rem;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    transition: width 0.6s ease;
  }

  &__value {
    font-weight: 600;
  }
}
</style>
