<template>
  <div class="app-multi-select-search">
    <label v-if="label" class="app-multi-select-search__label">{{ label }}</label>
    <div v-if="!dropdownOpen" class="app-multi-select-search__box">
      <div
        class="app-multi-select-search__input"
        @click="toggleDropdown"
      >
        <div v-if="selectedOptions?.length">
          <app-badge
            v-for="(option, index) in selectedOptions"
            :key="index"
            :text="option.label"
            @remove="toggleOption(option)"
          />
        </div>

        <p v-else class="app-multi-select-search__placeholder">
          {{ placeholder }}
        </p>
      </div> 
      <app-button
        v-if="button.boolean"
        class="app-multi-select-search__button"
        variant="outline"
        icon="plus"
        :text="button.text"
        @click="emit('button-clickt')"
      />
    </div>
    <div
      ref="container"
      class="app-multi-select-search__container"
      :style="{ height: containerHeight + 'px' }"
    >
      <div
        v-if="dropdownOpen"
        ref="dropdown" 
        v-click-away="closeDropdown"
        class="app-multi-select-search__dropdown"
      >
        <div class="app-multi-select-search__actions">
          <app-input
            v-model="searchTerm"
            type="text"
            :placeholder="searchPlaceholder"
            class="app-multi-select-search__input--search"
          />
          <app-button
            v-if="addButton"
            class="app-multi-select-search__button"
            variant="success"
            icon="plus"
            :text="__t('app.button-select')"
            @click="addNewOption"
          />
        </div>

        <ul class="app-multi-select-search__options">
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            class="app-multi-select-search__option"
            @click="toggleOption(option)"
          >
            <input
              type="checkbox"
              :checked="isSelected(option)"
              readonly
            >
            <span>{{ option.label }}</span>
            <template v-if="option?.required">
              <div class="app-multi-select-search__toggle">
                <span>required</span>
                <app-toggle
                  :model-value="option.required"
                />
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
    <p v-if="error" class="app-multi-select-search__error-message">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted, nextTick } from 'vue'
  import AppInput from '@/js/ui/input/AppInput.vue'
  import AppButton from '@/js/ui/buttons/AppButton.vue'
  import AppToggle from '@/js/ui/toggle/AppToggle.vue'
  import { __t } from '@/js/core/locale'
  import AppBadge from '../badge/AppBadge.vue'
  import { directive } from "vue3-click-away";

  const props = defineProps({
    value: {
      type: Array,
      default: () => []
    },
    button: {
      type: Object,
      required: false,
      default: () => ({ boolean: false, text: null })
    },
    options: {
      type: Array,
      default: () => []
    },
    addButton: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      required: true
    },
    searchPlaceholder: {
      type: String,
      required: true
    },
    error: {
      type: String,
      default: null
    }
  })

  const emit = defineEmits(['update', 'button-clickt'])

  const dropdownOpen = ref(false)
  const searchTerm    = ref('')
  const allOptions    = ref([...props.options])
  const selectedOptions = ref([])
  const container = ref(null)
  const dropdown = ref(null)
  const containerHeight = ref(null)

  const filteredOptions = computed(() => {
    const term = searchTerm.value.toLowerCase()
    if (!term) return allOptions.value
    return allOptions.value.filter(o =>
      o.label.toLowerCase().includes(term)
    )
  })

  defineOptions({
    directives: {
      ClickAway: directive
    },
  })

  watch(() => props.options, opts => {
    allOptions.value = [...opts]
  })

  watch(() => props.value, val => {
    selectedOptions.value = val;
  })

  watch(dropdownOpen, (isOpen) => {
    if (isOpen){
      updateHeight()
    } else {
      containerHeight.value = 0;
    }
  })

  watch(() => filteredOptions.value?.length, () => {
    if (dropdownOpen.value) updateHeight()
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
    dropdownOpen.value = !dropdownOpen.value
    if (dropdownOpen.value) {
      searchTerm.value = ''
    }
  }

  function closeDropdown() {
    dropdownOpen.value = false
  }

  function isSelected(option) {
    return selectedOptions.value.some(o => o.value === option.value)
  }

  function toggleOption(option) {
    const idx = selectedOptions.value.findIndex(o => o.value === option.value)
    if (idx === -1) {
      selectedOptions.value.push(option)
    } else {
      selectedOptions.value.splice(idx, 1)
    }
    let payload = [];
    selectedOptions.value.forEach(option => {
      payload.push(
        {
          key: option.key,
          label: option.label,
          value: option.value,
          required: option.required
        }
      )
    })
    emit('update', payload)
  }

  function addNewOption() {
    const val = searchTerm.value.trim()
    if (!val) return
    const newOpt = { label: val, value: val }
    allOptions.value.push(newOpt)
    toggleOption(newOpt)
    searchTerm.value = ''
  }

  onMounted(() => {
    selectedOptions.value = [];
    props.value?.forEach(value => {
      const option = props.options.find(option => option.value === value.value)
      if (option) {
        selectedOptions.value.push(option)
      }
    })  
  })
</script>

<style lang="scss" scoped>
.app-multi-select-search {
  position: relative;

  &__label {
    display: block;
    margin-bottom: var(--margin-xs);
    color: var(--app-gray-700);
  }

  &__box {
    display: flex;
    align-items: center;
    gap: var(--margin-s);
  }

  &__input {
    display: flex;
    align-items: center;
    width: 100%;
    height: 4.2rem;
    padding: 0 1rem;
    border: 1px solid var(--app-border);
    background-color: var(--app-white);
    border-radius: 0.8rem;
    cursor: pointer;
  }

  &__toggle {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: var(--margin-s);
    pointer-events: none;
  }

  &__placeholder {
    color: var(--app-gray-400);
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
    align-items: center;
    gap: var(--margin-s);
    margin-bottom: var(--margin-s);
  }

  &__input--search {
    flex: 1;
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
