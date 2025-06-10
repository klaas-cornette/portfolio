<template>
  <section id="skills" class="skills">
    <div class="skills__container">
      <h2 class="skills__title">
        {{ __t('home.skills.title') }}
        <span class="skills__underline" />
      </h2>

      <div class="skills__grid">
        <div class="skills__bars">
          <app-skill-bar
            v-for="skill in skills"
            :key="skill.label"
            :label="__t(`home.skills.${skill.label}`)"
            :value="skill.value"
            :color="skill.color"
          />
        </div>

        <div class="skills__stack">
          <h3>{{ __t('home.skills.stackTitle') }}</h3>
          <ul class="skills__stack-list">
            <li v-for="tech in techs" :key="tech.label">
              <img class="skills__icon" :src="`/images/${tech.icon}.png`" />
              <span>{{ tech.label }}</span>
            </li>
          </ul>
          
          <p class="skills__cv"  @click="downloadCv()"><img class="skills__icon" src="/images/download.png"/>{{ __t('home.download-cv') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { __t } from '@/core/locale'
  import AppSkillBar from '@/ui/indicators/AppProgressionBar.vue'

  const skills = [
    { label: 'html', value: 95, color: 'pink' },
    { label: 'css', value: 80, color: 'pink' },
    { label: 'js', value: 90, color: 'pink' },
    { label: 'node', value: 75, color: 'blue' },
    { label: 'php', value: 60, color: 'blue' },
    { label: 'testing', value: 35, color: 'blue' }
  ]

  const techs = [
    { icon: 'react', label: 'React & Next.js' },
    { icon: 'Vue', label: 'Vue.js' },
    { icon: 'nodejs', label: 'Node.js' },
    { icon: 'docker', label: 'Docker' },
    { icon: 'github', label: 'GitHub' },
    { icon: 'php', label: 'PHP & Laravel' },
    { icon: 'mysql', label: 'MySQL & MongoDB' },
    { icon: 'tailwind', label: 'Tailwind CSS' },
    { icon: 'figma', label: 'Figma' },
    { icon: 'cypress', label: 'Cypress' },
    { icon: 'markdown', label: 'Markdown' },
    { icon: 'react', label: 'React-Native' },
    { icon: 'flutter', label: 'Flutter' },
    { icon: 'dart', label: 'dart' },
    { icon: 'ts', label: 'TypeScript' }
  ]

  function downloadCv() {
    const link = document.createElement('a')
    link.href = '/files/cv-klaas-cornette.pdf'
    link.download = 'cv-klaas-cornette.pdf'
    link.click()
  }
</script>

<style scoped lang="scss">
.skills {
  background-color: var(--app-bg-secondary);

  &__container {
    padding: var(--padding-xl) 0;
    max-width: 130rem;
    width: 100%;
    margin: 0 auto;
  }

  &__title {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
    color: var(--app-white);
  }

  &__underline {
    display: block;
    width: 6rem;
    height: 0.3rem;
    background-color: var(--app-secondary);
    margin: 0.5rem auto var(--margin-l);
    border-radius: 4px;
    margin-top: 1.5rem;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--margin-l);
    align-items: flex-start;
  }

  &__icon {
    width: 2rem;
    height: 2rem;
    margin-right: var(--margin-xs);
  }

  &__cv {
    display: flex;
    color: var(--app-secondary);
    font-size: 1.6rem;
    cursor: pointer;
    margin-top: var(--margin-l);
    padding: var(--padding-s);
    text-align: center;
    width: fit-content;

    &:hover {
      opacity: 0.8;
    }
  }

  &__bars {
    flex: 1;
    min-width: 28rem;
    display: flex;
    flex-direction: column;
    gap: var(--margin-s);
  }

  &__stack {
    background: var(--app-accent);
    padding: var(--padding-m);
    border-radius: 1.6rem;
    flex: 1;
    min-width: 280px;

    h3 {
      font-size: 2rem;
      color: var(--app-white);
      margin-bottom: var(--margin-m);
    }
  }

  &__stack-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    gap: var(--margin-m);
    list-style: none;
    padding: 0;
    margin-bottom: var(--margin-m);

    li {
      display: flex;
      align-items: center;
      gap: var(--margin-xs);
      color: var(--app-white);
      font-size: 1.6rem;

      :deep(svg) {
        width: 2rem;
        height: 2rem;
      }
    }
  }
}
</style>
