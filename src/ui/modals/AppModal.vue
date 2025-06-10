<template>
  <div
    class="app-modal"
    :class="[
      { 'opening': openingModal },
      { 'closing': closingModal }
    ]
    "
  >
    <div class="app-modal__overlay" />
    <transition
      name="modal-slide"
      @before-enter="beforeEnterModal"
      @enter="enterModal"
      @leave="leaveModal"
    >
      <div v-if="openModal" class="app-modal__panel">
        <header class="app-modal__header">
          <slot name="header" />
          <button class="app-modal__close" @click="closeModal">
            &times;
          </button>
        </header>
        <div class="app-modal__body mt-m">
          <slot name="body" />
        </div>
        <footer class="app-modal__footer">
          <slot name="footer" />
        </footer>
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { defineEmits, onMounted, ref } from 'vue';

  const emit = defineEmits(['dismiss']);

  const openModal = ref(false);
  const closingModal = ref(false);
  const openingModal = ref(false);

  const closeModal = () => {
    openModal.value = false;
    closingModal.value = true;

    setTimeout(() => {
      emit('dismiss');
    }, 600);
  };

  const beforeEnterModal = (el) => {
    el.style.transform = 'translateY(100px)';
    el.style.opacity = 0;
  };

  const enterModal = (el, done) => {
    el.offsetHeight;
    el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    el.style.transform = 'translateY(0)';
    el.style.opacity = 1;
    done();
  };

  const leaveModal = (el, done) => {
    el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    el.style.transform = 'translateY(100px)';
    el.style.opacity = 0;
    done();
  };

  onMounted(() => {
    openModal.value = true;
    openingModal.value = true;

    document.addEventListener('dismiss', closeModal);
  });

</script>


<style scoped lang="scss">
.app-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    justify-content: flex-end;

    &.opening {
        opacity: 1;
    }

    &.closing {
        opacity: 0;
    }

    &__overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

     &__panel {
        position: relative;
        background-color: var(--app-white);
        display: flex;
        flex-direction: column;
        padding: var(--padding-l);
        padding-top: var(--padding-s);
        border-radius: 0.8rem;
        margin: auto;
        width: 100%;
        max-width: 90rem;
        max-height: 85%;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 6rem;
    }

    &__close {
        background: none;
        border: none;
        font-size: 2rem;
        line-height: 1;
        cursor: pointer;
        color: var(--app-gray-400);
    }

    &__body {
        flex: 1;
        padding: 0 2.4rem;
        overflow-y: auto;
    }

    &__footer {
        display: flex;
        justify-content: flex-end;
        align-items: end;
        gap: 1.6rem;
        padding: 0 2.4rem;
        padding-top: var(--padding-l);
    }
}
</style>
