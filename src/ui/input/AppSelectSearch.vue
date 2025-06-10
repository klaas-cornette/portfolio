<template>
  <div class="app-select-search">
    <label v-if="label" class="app-select-search__label">{{ label }}</label>
    <div
      v-if="!toggle"
      class="app-select-search__input"
      @click="toggleDropdown"
    >
      <p v-if="activeOption?.label">
        {{ activeOption.label }}
      </p>
      <p v-else>
        {{ placeholder }}
      </p>
    </div>

    <div
      ref="container"
      class="app-select-search__container"
      :style="{ height: containerHeight + 'px' }"
    >
      <div
        v-if="toggle"
        ref="dropdown"
        v-click-away="closeDropdown"
        class="app-select-search__dropdown"
      >
        <div class="app-select-search__actions">
          <app-input
            v-model="valueString"
            type="text"
            :placeholder="searchPlaceholder"
            class="app-select-search__input--search"
            @update:model-value="onUpdate"
          />

          <app-button
            v-if="addButton"
            class="app-select-search__button"
            variant="success"
            icon="plus"
            :text="__t('app.button-select')"
            @click="addOption"
          />
        </div>

        <ul class="app-select-search__options">
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            class="app-select-search__option"
            @click="selectOption(option)"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>
    <p v-if="error" class="app-select-search__error-message">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
  import { ref, defineProps, defineEmits, computed, watch, defineOptions, nextTick, onMounted } from 'vue'
  import AppButton from '@/js/ui/buttons/AppButton.vue'
  import AppInput from '@/js/ui/input/AppInput.vue'
  import { __t } from '@/js/core/locale'
  import { directive } from "vue3-click-away";

  const props = defineProps({
    value: { type: [String, null, Object], required: true },

    options: { type: Array, default: () => [] },

    addButton: { type: Boolean,required: false, default: false },

    label: { type: String, required: false, default: null },

    placeholder: { type: String, required: true },

    searchPlaceholder: { type: String, required: true },

    error: { type: String, required: false, default: null },

  })

  const emit = defineEmits(['update'])

  const toggle = ref(false)
  const options = ref(props.options);
  const activeOption = ref();
  let valueString = ref('');
  const container = ref(null)
  const dropdown = ref(null)
  const containerHeight = ref(null)

  const filteredOptions = computed(() => {
    const term = valueString.value.toLowerCase()
    if (!term) return options.value
    return options.value.filter(o =>
      o.label.toLowerCase().includes(term)
    )
  })

  defineOptions({
    directives: {
      ClickAway: directive
    },
  })

  watch(() => props.value, (newValue) => {
    if (!newValue?.value) {
      activeOption.value = {label: newValue, value: newValue}
    } 
    else if (typeof newValue === 'object') {
      const option = options.value.find(option => option.value === newValue.value)
      if (option) {
        activeOption.value = option
      }
    } else {
      activeOption.value = null
    }
  })

  watch(() => props.options, (newValue) => {
    options.value = newValue
  })

  watch(toggle, (isOpen) => {
    if (isOpen){
      updateHeight()
    } else {
      containerHeight.value = 0;
    }
  })

  watch(() => filteredOptions.value?.length, () => {
    if (toggle.value) updateHeight()
  })

  function updateHeight() {
    nextTick(() => {
      if (dropdown.value) {
        const height = dropdown.value.scrollHeight + 13;
        containerHeight.value = height;
      }
    })
  }

  function toggleDropdown() {
    toggle.value = !toggle.value
    filteredOptions.value = options.value;
  }

  function closeDropdown() {
    toggle.value = false
  }

  function onUpdate(value) {
    if (value.length === 0) {
      filteredOptions.value = options.value;
    } else {
      const newOptions = filteredOptions.value.filter(option => option.label.toLowerCase().includes(value.toLowerCase()))
      filteredOptions.value = newOptions
      valueString.value = value.toLowerCase();
    }
  }

  function selectOption(option) {
    emit('update', { value: option.value, label: option.label })
    activeOption.value = option
    toggle.value = false
  }

  function addOption() {
    options.value.push({ label: valueString, value: valueString });
    activeOption.value = { label: valueString, value: valueString };
    toggle.value = false
  }

  onMounted(() => {
    if (!props.value?.value) {
      activeOption.value = {label: props.value, value: props.value}
    } 
    else if (typeof props.value === 'object') {
      const option = options.value.find(option => option.value === props.value.value)
      if (option) {
        activeOption.value = option
      }
    } else {
      activeOption.value = null
    }
  })

</script>

<style scoped lang="scss">
.app-select-search {
    position: relative;

    &__input {
        display: flex;
        height: 4.2rem;
        padding-left: 1rem;
        border-radius: 0.8rem;
        background-color: var(--app-white);
        border: 1px solid var(--app-border);
        align-items: center;
        cursor: pointer;
        margin-top: var(--margin-s);
    }

    &__container {
      position: relative;
      overflow: hidden;
      transition: height 0.2s ease;
    }

    &__dropdown {
      position: absolute;
      top: var(--margin-s);
      left: 0;
      width: 100%;
      background: var(--app-white);
      border: 1px solid var(--app-border);
      border-radius: 0.8rem;
      padding: var(--margin-s);
      box-shadow: var(--shadow);
      z-index: 10;
    }

    &__actions {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    &__button {
    flex-shrink: 0;
    height: 4.2rem;
  }

    &__options {
        max-height: 15rem;
        overflow-y: auto;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    &__option {
    display: flex;
    align-items: center;
    padding: var(--padding-s) var(--padding-m);
    cursor: pointer;
    border-radius: 0.4rem;
    transition: background-color var(--effect);

    input {
      margin-right: var(--margin-m);
    }

    &:hover {
      background-color: var(--app-gray-100);
    }
  }

    &__error-message {
      margin-top: var(--margin-xs);
      color: var(--app-error);
    }
}
</style>