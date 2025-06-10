<template>
    <div class="app-search-input">
        <div class="app-search-input__input-wrapper" :class="{ 'has-error': error }">
            <icon name="search" class="app-search-input__icon" />
            <input class="app-search-input__input" type="text" :placeholder="placeholder" v-model="localValue"
                @input="updateValue" />
        </div>
        <p v-if="error" class="app-search-input__error">{{ error }}</p>
    </div>
</template>

<script setup>

import { ref, watch, defineProps, defineEmits } from 'vue'
import Icon from '@/js/ui/icon/Icon.vue'

const props = defineProps({
    label: {
        type: String,
        required: false,
    },
    placeholder: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        required: false,
    },
    error: {
        type: String,
        required: false,
    }
})

const emits = defineEmits(['update:modelValue'])
const localValue = ref(props.modelValue)

watch(() => props.modelValue, newValue => { localValue.value = newValue })

function updateValue(event) {
    localValue.value = event.target.value
    emits('update:modelValue', localValue.value)
}
</script>

<style scoped lang="scss">
.app-search-input {
    position: relative;
    display: flex;
    flex-direction: column;

    gap: 0.5rem;
    width: 26rem;

    &__input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        height: 3.4rem;
        width: 100%;
        border-radius: 0.6rem;
        padding-left: 3.2rem;
        border: 1px solid var(--app-border);

    }

    &__icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);


        :deep(svg) {
            width: 1.4rem;
            height: 1.4rem;
            fill: var(--app-gray-400);
        }
    }

    &__input {
        width: 100%;
        background: transparent;
        outline: none;
        border: none;
    }


    &__error {
        color: var(--app-red);
    }
}

.has-error {
    border: var(--border-width-error) solid var(--color-error);
}
</style>