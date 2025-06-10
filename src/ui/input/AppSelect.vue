<template>
  <div class="app-select">
    <label v-if="label" class="app-select__label">{{ label }}</label>
    <div class="app-select__wrapper" :class="{ 'app-select--error': error }" @click="toggleDropdown">
      <div class="app-select__display">
        <span v-if="!multiple">{{ displayText }}</span>
        <div v-else class="app-select__multiple">
          <span v-if="selectedOptions.length === 0" class="app-select__placeholder">{{ placeholder }}</span>
          <span v-for="option in selectedOptions" :key="option.value" class="app-select__tag">
            {{ option.label }}
          </span>
        </div>
      </div>
      <div class="app-select__arrow" :class="{ 'app-select__arrow--open': open }" />
    </div>
    <ul v-if="open" class="app-select__dropdown">
      <li
        v-for="option in options"
        :key="option.value"
        class="app-select__option"
        @click.stop="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
    <p v-if="error" class="app-select__error-message">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
  import { ref, defineProps, defineEmits, computed } from 'vue';

  const props = defineProps({
    label: { type: String, required: false, default: '' },
    options: { type: Array, required: true },
    placeholder: { type: String, required: true },
    modelValue: { type: [String, Number, Array, null], default: null },
    error: { type: String, required: false, default: '' },
    multiple: { type: Boolean, default: false },
  });
  const emits = defineEmits(['update:modelValue']);
  const open = ref(false);

  const selectedOptions = computed(() => {
    if (!props.modelValue || (Array.isArray(props.modelValue) && props.modelValue.length === 0)) {
      return [];
    }
    return props.options.filter(o =>
      props.multiple
        ? props.modelValue.includes(o.value)
        : props.modelValue === o.value
    );
  });

  const displayText = computed(() =>
    selectedOptions.value.length > 0
      ? selectedOptions.value[0].label
      : props.placeholder
  );

  function toggleDropdown() {
    open.value = !open.value;
  }

  function selectOption(option) {
    if (props.multiple) {
      const current = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
      const next = current.includes(option.value)
        ? current.filter(v => v !== option.value)
        : [...current, option.value];
      emits('update:modelValue', next);
    } else {
      emits('update:modelValue', option.value);
      open.value = false;
    }
  }
</script>

<style lang="scss" scoped>
.app-select {
    display: flex;
    flex-direction: column;
    position: relative;

    &--error {
        border: 0.1rem solid red;
    }

    &__label {
        font-size: 1.2rem;
        margin-bottom: var(--margin-xs);
    }

    &__wrapper {
        display: flex;
        align-items: center;
        height: 3rem;
        width: 100%;
        padding: 0.8rem 1.4rem;
        border: 1px solid var(--app-border);
        background-color: var(--app-white);
        border-radius: 0.6rem;
        cursor: pointer;
        position: relative;
    }

    &__display {
        flex: 1;
        font-size: 1.2rem;
        color: var(--app-black);

        &>span {
            vertical-align: middle;
        }
    }

    &__placeholder {
        color: var(--app-black);
    }

    &__multiple {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    &__tag {
        background-color: var(--app-primary);
        color: var(--app-black);
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        font-size: 0.9rem;
    }

    &__arrow {
        position: absolute;
        right: 1.4rem;
        top: 50%;
        width: 1rem;
        height: 1rem;
        border-right: 0.15rem solid var(--app-black);
        border-bottom: 0.15rem solid var(--app-black);
        transform: translateY(-50%) rotate(45deg);
        transition: transform 0.2s ease-in-out;

        &--open {
            transform: translateY(-50%) rotate(225deg);
        }
    }

    &__dropdown {
        position: absolute;
        top: calc(100% + 0.1rem);
        left: 0;
        width: 100%;
        max-height: 15rem;
        overflow-y: auto;
        margin: 0;
        padding: 0;
        list-style: none;
        border: 1px solid var(--app-border);
        border-top: none;
        background: var(--app-white);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 10;
    }

    &__option {
        padding: 0.8rem 1.4rem;
        font-size: 1rem;
        font-family: 'Inter', sans-serif;
        border-bottom: 1px solid #e3e3e3;
        cursor: pointer;

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background-color: #f9f9f9;
        }
    }

    &__error-message {
        color: red;
        font-size: 0.9rem;
        margin-top: 0.3rem;
        padding-left: 1.4rem;
    }
}
</style>
