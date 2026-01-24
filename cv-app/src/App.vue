<script setup lang="ts">
import { onMounted } from 'vue';
import { useCVStore } from './stores/useCVStore';
import ThemeSwitcher from './components/shared/ThemeSwitcher.vue';
import ScrollToTop from './components/shared/ScrollToTop.vue';
import MagneticCursor from './components/shared/MagneticCursor.vue';
import BentoGrid from './components/themes/BentoGrid/BentoLayout.vue';
import SwissMinimal from './components/themes/SwissMinimal/SwissLayout.vue';
import InteractiveStory from './components/themes/InteractiveStory/StoryLayout.vue';

const store = useCVStore();

onMounted(() => {
  store.loadData();
});
</script>

<template>
  <div v-if="store.cvData" class="min-h-screen">
    <MagneticCursor />
    <ThemeSwitcher />
    <ScrollToTop />

    <transition mode="out-in" enter-active-class="transition duration-700 ease-out"
      enter-from-class="opacity-0 scale-95 blur-xl" enter-to-class="opacity-100 scale-100 blur-0"
      leave-active-class="transition duration-500 ease-in" leave-from-class="opacity-100 blur-0"
      leave-to-class="opacity-0 blur-2xl">
      <component
        :is="store.currentTheme === 'bento' ? BentoGrid : store.currentTheme === 'swiss' ? SwissMinimal : InteractiveStory"
        :data="store.cvData" />
    </transition>
  </div>
  <div v-else class="min-h-screen bg-black flex items-center justify-center">
    <div class="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
  </div>
</template>

<style>
/* Global resets for the Wow effect */
body {
  cursor: none !important;
  user-select: none;
  background: black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: auto !important;
  /* Managed by GSAP/ScrollTrigger better */
}

/* Optimization layer for high-end animations */
.bento-card,
.odyssey-node,
.skew-item,
.parallax-item {
  backface-visibility: hidden;
  perspective: 1000px;
  transform: translate3d(0, 0, 0);
  will-change: transform, opacity;
}

::-webkit-scrollbar {
  display: none;
}
</style>
