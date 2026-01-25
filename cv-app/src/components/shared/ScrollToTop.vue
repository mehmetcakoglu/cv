<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ArrowUp } from 'lucide-vue-next';
import { useCVStore } from '../../stores/useCVStore';

const store = useCVStore();
const isVisible = ref(false);

const handleScroll = () => {
    isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

// Dynamic classes based on theme
const themeClasses = computed(() => {
    switch (store.currentTheme) {
        case 'bento':
            return 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(167,139,250,0.5)] rounded-full';
        case 'swiss':
            return 'bg-rose-500 text-white w-16 h-16 border-2 border-white hover:bg-rose-600 hover:scale-105 rounded-none shadow-[4px_4px_0px_black]';
        case 'story': // Interactive Story
            return 'bg-black/80 border border-cyan-500/50 text-cyan-400 hover:text-white hover:bg-cyan-500 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] rounded-full';
        default:
            return 'bg-black text-white rounded-full';
    }
});
</script>

<template>
    <transition enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-10 scale-50" enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-300 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-10 scale-50">
        <button v-if="isVisible" @click="scrollToTop" :class="[
            'fixed bottom-8 right-8 p-4 transition-all duration-500 group flex items-center justify-center',
            store.currentTheme === 'swiss' ? 'z-[90]' : 'z-50',
            themeClasses
        ]" aria-label="Scroll to top">
            <ArrowUp class="w-6 h-6 transition-transform group-hover:-translate-y-1" />
            <div v-if="store.currentTheme === 'swiss'"
                class="absolute -top-2 -left-24 bg-white text-black text-[10px] font-black uppercase py-1 px-3 rounded border border-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap tracking-widest z-[150]">
                To The Top
            </div>
        </button>
    </transition>
</template>
