<template>
  <transition name="toast">
    <div class="toast-wrapper">
      <div ref="toast" class="app-toast toast-enter-active" :class="[type, {'with-title': title}]">
        <div class="toast-icon">
          <icon :name="type" />
        </div>
        <div class="toast-content">
          <template v-if="title">
            <h3 class="title">
              {{ title }}
            </h3>
            <p class="message">
              {{ message }}
            </p>
          </template>
          <p v-else class="title">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
  import {defineProps, defineEmits, onMounted, ref} from 'vue';
  import Icon from '@/js/ui/icon/Icon.vue';


  const props = defineProps({
    message: {
      required: true,
      type: String
    },
    type: {
      required: false,
      type: String,
      default: 'success'
    },
    title: {
      required: false,
      type: String,
      default: null
    },
    duration: {
      required: false,
      type: Number,
      default: 4000
    }
  });

  const emit = defineEmits(['dismiss']);
  const toast = ref(null);

  onMounted(() => {
    setTimeout(() => {
      toast.value.classList.remove('toast-enter-active');
      toast.value.classList.add('toast-leave-active');
    }, props.duration);

    setTimeout(() => {
      emit('dismiss');
    }, props.duration + 500);
  });
</script>

<style lang="scss">
.toast-wrapper {
  position: fixed;
  z-index: 99999;
  bottom: 0;
  width: 100vw;
  padding: var(--padding-s);
  display: flex;
  pointer-events: none;
}

.app-toast {
  width: 100%;
  height: min-content;
  min-height: 4.6rem;
  display: flex;
  align-items: center;
  border-radius: 0.4rem;
  padding: var(--padding-s);
  background-color: var(--app-success);
  font-size: 1.6rem;

  @media (min-width: 720px) {
    min-width: 30rem;
    width: auto;
    margin-left: auto;
  }


  p.message {
    font-size: 1.6rem;
  }


  &.with-title {
    display: flex;
    align-items: start;

    .title {
      line-height: 1;
      font-size: 1.4rem;
    }

    p.message {
      margin-top: var(--margin-xs);
      font-size: 1.4rem;
      color: var(--app-secondary-200);
      margin-bottom: 0;
      line-height: 1.4;
    }
  }

  &.success {
    background-color: var(--app-success);
    color: var(--app-white);

    .toast-icon {
      color: var(--app-white);
    }
  }

  &.error {
    background-color: var(--app-error);

    .toast-icon {
      color: var(--app-white);
    }

    p.message {
      color: var(--app-white);
    }
  }

  &.alert {
    .toast-icon {
      color: var(--app-white);
    }
  }

  .toast-icon {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--app-white);
  }

  .toast-content {
    margin-left: var(--margin-s);

    .title {
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--app-white);
      margin-bottom: 0;
    }
  }
}

/* Animation Definitions */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

.toast-enter-active {
  animation: fadeIn 0.2s forwards;
}

.toast-leave-active {
  animation: fadeOut 0.2s forwards;
}
</style>
