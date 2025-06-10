<template>
  <main-layout>
    <home-hero />
    <home-about />
    <home-skills />
    <home-projects />
  </main-layout>
</template>

<script setup>
  import MainLayout from '@/layout/MainLayout.vue'
  import HomeHero from '@/flows/home/components/HomeHero.vue'
  import HomeAbout from '@/flows/home/components/HomeAbout.vue'
  import HomeSkills from '@/flows/home/components/HomeSkills.vue'
  import HomeProjects from '@/flows/home/components/HomeProjects.vue'
</script>
