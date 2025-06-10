<template>
  <label v-if="label">{{ label }}</label>
  <div class="app-image-upload-container" data-cy="bi-logo">
    <div class="app-image-upload" @drop.prevent="onDrop" @dragover.prevent>
      <div v-if="previewUrl" class="app-image-upload__preview">
        <img :src="previewUrl" alt="Preview" class="app-image-upload__preview-img">
        <app-button
          class="app-image-upload__remove"
          icon="delete"
          :text="__t('app.buttonImage')"
          @click="removeImage"
        />
      </div>
      <div v-else class="app-image-upload__inner">
        <icon name="image" class="app-image-upload__icon" />
        <p class="app-image-upload__text">
          {{ __t('app.dropImage') }}
        </p>
        <app-button
          class="app-image-upload__browse"
          variant="secondary"
          :text="__t('app.browseFiles')"
          @click="browseFiles"
        />
      </div>
      <input
        ref="inputRef"
        type="file"
        accept="image/*"
        hidden
        @change="onChange"
      >
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import Icon from '@/js/ui/icon/Icon.vue'
  import AppButton from '@/js/ui/buttons/AppButton.vue'
  import { __t } from '@/js/core/locale'

  const props = defineProps({ 
    modelValue: File, 
    label: {
      type: String,
      required: false,
      default: null,
    }, 
  })
  const emit = defineEmits(['update:modelValue'])
  const inputRef = ref(null)
  const previewUrl = ref(null)

  watch(
    () => props.modelValue,
    file => {
      console.log('file', file)
      if (file) {
        if (file instanceof File) {
          const reader = new FileReader()
          reader.onload = e => (previewUrl.value = e.target.result)
          reader.readAsDataURL(file)
        } else if (typeof file === 'string') {
          previewUrl.value = file
        }
      } else {
        previewUrl.value = null
      }
    },
    { immediate: true }
  )

  function browseFiles() {
    inputRef.value.click()
  }
  function onChange(e) {
    emit('update:modelValue', e.target.files[0] || null)
  }
  function onDrop(e) {
    emit('update:modelValue', e.dataTransfer.files[0] || null)
  }
  function removeImage() {
    emit('update:modelValue', null)
  }
</script>

<style scoped lang="scss">
.app-image-upload-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: var(--margin-m);
  background-color: var(--app-white);
  border: 1px solid var(--app-border);
  border-radius: 0.6rem;
  margin-top: var(--margin-s);

  .app-image-upload {
    display: grid;
    place-items: center;
    border: 2px dashed var(--app-border);
    border-radius: var(--border-radius);
    width: 100%;
    height: 20rem;
    cursor: pointer;

    &__inner {
      display: flex;
      align-items: center;
      gap: var(--margin-s);
      flex-direction: column;
    }

    &__icon {
      width: 3.8rem;
      color: var(--app-gray-400);
    }

    &__text {
      color: var(--app-gray-600);
    }

    &__preview {
      display: grid;
    }

    &__preview-img {
      opacity: 0.5;
      grid-area: 1 / 1;
      width: 100%;
      max-height: 20rem;
      object-fit: cover;
      border-radius: var(--border-radius);
    }

    &__remove {
      grid-area: 1 / 1;
      justify-self: center;
      align-self: center;
      background-color: var(--app-red);
      fill: var(--app-white);
    }
  }
}
</style>
