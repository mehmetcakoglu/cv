<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import gsap from 'gsap';
import { useCVStore } from '../../stores/useCVStore';

const store = useCVStore();
const cursor = ref<HTMLElement | null>(null);
const cursorDot = ref<HTMLElement | null>(null);
const isHovered = ref(false);
const activeType = ref('');

// Theme-aware cursor colors
const cursorColors = computed(() => {
    const isMaxTheme = store.currentTheme === 'swiss';
    return {
        border: isMaxTheme ? 'rgba(229, 9, 20, 0.6)' : 'rgba(255, 255, 255, 0.2)',
        borderHover: isMaxTheme ? 'rgba(229, 9, 20, 0.9)' : 'rgba(255, 255, 255, 0.5)',
        bgHover: isMaxTheme ? 'rgba(229, 9, 20, 0.1)' : 'rgba(255, 255, 255, 0.1)',
        dot: isMaxTheme ? '#E50914' : '#ffffff',
        text: isMaxTheme ? 'text-red-600' : 'text-white',
    };
});

const moveCursor = (e: MouseEvent) => {
    if (!cursor.value || !cursorDot.value) return;

    // Dot follows exactly
    gsap.to(cursorDot.value, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
    });

    // Main cursor follows with lag/smoothness
    gsap.to(cursor.value, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
    });
};

const handleOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const trigger = target.closest('a, button, .cursor-poll, [data-magnetic]');

    if (trigger) {
        isHovered.value = true;
        activeType.value = trigger.getAttribute('data-cursor-type') || 'magnetic';

        gsap.to(cursor.value, {
            scale: 2.5,
            backgroundColor: cursorColors.value.bgHover,
            borderColor: cursorColors.value.borderHover,
            duration: 0.3,
        });
    }
};

const handleOut = () => {
    isHovered.value = false;
    activeType.value = '';

    gsap.to(cursor.value, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: cursorColors.value.border,
        duration: 0.3,
    });
};

onMounted(() => {
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleOut);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', moveCursor);
    window.removeEventListener('mouseover', handleOver);
    window.removeEventListener('mouseout', handleOut);
});
</script>

<template>
    <div class="fixed inset-0 pointer-events-none z-[999] no-print">
        <!-- Main Outer Cursor -->
        <div ref="cursor" :style="{ borderColor: cursorColors.border }"
            class="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border rounded-full mix-blend-difference">
        </div>

        <!-- Exact Center Dot -->
        <div ref="cursorDot" :style="{ backgroundColor: cursorColors.dot }"
            class="fixed top-0 left-0 w-1 h-1 -ml-0.5 -mt-0.5 rounded-full mix-blend-difference"></div>

        <!-- Hover Text/Label if active -->
        <div v-if="isHovered && activeType === 'view'" :class="cursorColors.text"
            class="fixed top-0 left-0 -translate-x-1/2 -translate-y-12 text-[10px] font-black uppercase tracking-[0.2em]">
            View
        </div>
    </div>
</template>

<style scoped>
/* Ensure the cursor is hidden globally when this is active */
:global(body) {
    cursor: none !important;
}

:global(a),
:global(button),
:global(.cursor-pointer) {
    cursor: none !important;
}
</style>
