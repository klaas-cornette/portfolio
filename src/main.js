import '@/sccs/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { loadTranslations } from "@/core/locale.js";

import Home from '@/flows/home/components/view/ViewHome.vue'
import router from './router'

const main = async () => {
  await loadTranslations();

  const app = createApp(Home)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
}

main();


