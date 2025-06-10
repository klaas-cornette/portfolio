<template>
  <section id="about" class="about">
    <h2 class="about__title">
      {{ __t('home.about.title') }}
      <span class="about__underline"></span>
    </h2>

    <div class="about__content">
      <div class="about__text">
        <p>{{ __t('home.about.text1') }}</p>
        <p>{{ __t('home.about.text2') }}</p>
        <p>{{ __t('home.about.text3') }}</p>

        <div class="about__tags">
          <div v-for="tag in tags"
               :key="tag"
               class="about__tag">
            {{ __t(`home.about.tag.${tag}`) }}
          </div>
        </div>
      </div>

      <div class="about__features">
        <div v-for="feature in features" :key="feature.label" class="about__feature">
          <span class="about__feature-icon">{{ feature.icon }}</span>
          <span class="about__feature-text">{{ __t(feature.label) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { __t } from '@/core/locale'

  const tags = ['frontend', 'backend', 'fullstack']

  const features = [
    { icon: '💼', label: 'home.about.feature1' },
    { icon: '🧑‍💻', label: 'home.about.feature2' },
    { icon: '🌍', label: 'home.about.feature3' },
    { icon: '🛠️', label: 'home.about.feature4' }
  ]
</script>

<style scoped lang="scss">
.about {
  padding: var(--padding-l) 0;
  max-width: 130rem;
  width: 100%;
  margin: 0 auto;

  @media screen and (max-width: 1350px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }


  &__title {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
    position: relative;
    color: var(--app-white);
    margin-bottom: var(--margin-l);
  }

  &__underline {
    display: block;
    width: 6rem;
    height: 0.4rem;
    background-color: var(--app-primary);
    margin: 0.5rem auto 0;
    border-radius: 4px;
    margin-top: 1.5rem;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: var(--margin-l);
  }

  &__text {
    flex: 1;
    min-width: 45rem;

    @media screen and (max-width: 600px) {
      min-width: auto;
      
    }

    p {
      margin-bottom: var(--margin-s);
      color: var(--app-white);
      font-size: 1.8rem;
      line-height: 1.7;
    }
  }

  &__tags {
    display: flex;
    gap: var(--margin-s);
    margin-top: var(--margin-m);
    flex-wrap: wrap;
  }

  &__tag {
    background-color: var(--app-accent);
    color: var(--app-white);
    padding: var(--padding-s) var(--padding-m);
    border-radius: 1.8rem;
    font-size: 1.6rem;
    font-weight: 500;
  }

  &__features {
    flex: 1;
    display: grid;
    min-width: 61rem;
    grid-template-columns: repeat(2, 1fr);
    height: 1rem;
    gap: var(--margin-m);
    padding: var(--padding-m);
    max-width: 40rem;
    margin-top: 5rem;

    @media screen and (max-width: 1140px) {
      height: fit-content;
      margin: 0 auto;
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(1, 1fr);
      max-width: 100%;
      min-width: auto;
    }
  }





  &__feature {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 7rem;
    gap: var(--margin-xs);
    background-color: var(--app-accent);
    padding: var(--padding-s) var(--padding-m);
    border-radius: 1rem;
    color: var(--app-white);
    font-size: 1.8rem;
  }

  &__feature-text {
    font-weight: 500;
  }
}
</style>
