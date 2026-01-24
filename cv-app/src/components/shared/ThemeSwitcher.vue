<script setup lang="ts">
import { useCVStore, type Theme } from '../../stores/useCVStore';
import { LayoutGrid, Type, Milestone } from 'lucide-vue-next';

const store = useCVStore();

const themes = [
  { id: 'bento' as Theme, label: 'Ultra', icon: LayoutGrid, description: 'Bento Ultra' },
  { id: 'swiss' as Theme, label: 'Max', icon: Type, description: 'Editorial Max' },
  { id: 'story' as Theme, label: 'Infinite', icon: Milestone, description: 'Odyssey Infinite' },
];
</script>

<template>
  <div class="fixed top-8 right-8 z-[100] no-print">
    <div
      class="flex gap-1 p-1 bg-black/80 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-[1.5rem] transition-all duration-500 hover:shadow-[0_12px_48px_rgba(0,0,0,0.6)]">
      <button v-for="theme in themes" :key="theme.id" @click="store.setTheme(theme.id)"
        class="relative px-6 py-3 rounded-[1.2rem] flex items-center gap-2 group transition-all duration-500 overflow-hidden"
        :class="store.currentTheme === theme.id ? 'text-black' : 'text-zinc-400 hover:text-white'">
        <!-- Active Background Morph -->
        <div v-if="store.currentTheme === theme.id"
          class="absolute inset-0 bg-white rounded-[1.1rem] z-0 layout-active-shadow"></div>

        <component :is="theme.icon"
          class="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:scale-110" />
        <span class="text-sm font-bold tracking-tight relative z-10">{{ theme.label }}</span>

        <!-- Tooltip or description on hover -->
        <div
          class="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:-bottom-12 bg-white text-black text-[10px] font-bold px-2 py-1 rounded transition-all duration-300 pointer-events-none whitespace-nowrap tracking-widest uppercase border border-black/10">
          {{ theme.description }}
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.layout-active-shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
