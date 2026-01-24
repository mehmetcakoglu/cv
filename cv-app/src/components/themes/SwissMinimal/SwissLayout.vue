<script setup lang="ts">
import type { CVData } from '../../../stores/useCVStore';
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Linkedin, Github, Zap, Star, Globe2, ArrowRight } from 'lucide-vue-next';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{ data: CVData }>();

// Animation Refs
const skewElements = ref<HTMLElement[]>([]);

onMounted(() => {
  // 1. Velocity Skew Effect (Optimized: Reusing tween)
  let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(skewElements.value, "skewY", "deg"),
    clamp = gsap.utils.clamp(-5, 5);

  const skewTween = gsap.to(proxy, {
    skew: 0,
    duration: 0.8,
    ease: "power3",
    paused: true,
    onUpdate: () => skewSetter(proxy.skew)
  });

  ScrollTrigger.create({
    onUpdate: (self) => {
      let skew = clamp(self.getVelocity() / -400); // Higher divisor for smoother feel
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        skewTween.progress(0).play(); // Reuse and restart existing tween
      }
    }
  });

  // 2. Parallax Sections
  gsap.utils.toArray('.parallax-item').forEach((item: any) => {
    gsap.to(item, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // 3. Text Reveal Animation
  gsap.from('.reveal-text', {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1.5,
    ease: "expo.out",
    scrollTrigger: {
      trigger: '.reveal-text',
      start: "top 90%"
    }
  });
});
</script>

<template>
  <div ref="container"
    class="min-h-screen bg-[#fafafa] text-[#050505] font-sans selection:bg-rose-500 selection:text-white overflow-x-hidden">

    <!-- Hero / The Cover -->
    <header
      class="min-h-screen relative flex flex-col justify-center px-10 md:px-24 py-40 max-w-[1700px] mx-auto overflow-hidden">
      <div
        class="absolute -right-20 top-0 text-[30rem] font-black text-zinc-100/50 -z-50 leading-none select-none italic pointer-events-none">
        MAX
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        <div class="lg:col-span-12 space-y-12">
          <div class="flex items-center gap-6 group">
            <div class="h-[3px] w-24 bg-black group-hover:w-40 transition-all duration-700"></div>
            <span class="text-sm font-black uppercase tracking-[0.5em] animate-pulse">Issue No. 25 // 1997-2026</span>
          </div>

          <h1
            class="skew-item text-[clamp(4rem,18vw,20rem)] font-black tracking-[-0.05em] leading-[0.75] uppercase italic will-change-transform translate-z-0">
            {{ data.profile.name.split(' ')[0] }}<br>
            <span class="text-transparent webkit-text-stroke-2">Çakoğlu</span>
          </h1>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <p class="reveal-text text-3xl md:text-5xl font-black italic tracking-tighter leading-[0.9] max-w-2xl">
              {{ data.profile.summary }}
            </p>
            <div class="flex flex-col items-end">
              <Zap class="w-16 h-16 text-rose-500 mb-8 animate-bounce" />
              <p class="text-xs font-black uppercase tracking-widest text-zinc-400">Principal Solutions Lead</p>
              <p class="text-2xl font-black uppercase">{{ data.profile.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Editorial Feature: The Body -->
    <section class="bg-[#050505] text-white py-60 px-10 md:px-24">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-baseline justify-between mb-40 gap-12">
          <h2 class="text-6xl md:text-9xl font-black tracking-tighter italic uppercase leading-none">The Career<br><span
              class="text-rose-500 underline decoration-8 underline-offset-[-10px]">Chronicles</span></h2>
          <div class="text-right">
            <Globe2 class="w-10 h-10 text-white animate-spin-slow mb-4 ml-auto" />
            <p class="text-xs font-black uppercase tracking-widest text-zinc-500">Documenting 2.5 Decades</p>
          </div>
        </div>

        <div class="space-y-60">
          <div v-for="(exp, index) in data.experience" :key="exp.id"
            class="grid grid-cols-1 lg:grid-cols-12 gap-16 group">
            <!-- Large Vertical Number -->
            <div class="lg:col-span-2 relative">
              <span
                class="parallax-item absolute -top-20 left-0 text-[10rem] font-black italic text-zinc-800/40 group-hover:text-rose-500/20 transition-colors">
                0{{ index + 1 }}
              </span>
            </div>

            <div class="lg:col-span-10 skew-item will-change-transform translate-z-0">
              <div class="flex flex-col md:flex-row md:items-baseline gap-4 mb-8">
                <h3
                  class="text-5xl md:text-8xl font-black tracking-tighter group-hover:translate-x-8 transition-transform duration-700">
                  {{ exp.role }}
                </h3>
                <span class="text-xs font-black uppercase tracking-[0.4em] text-rose-500">{{ exp.period }}</span>
              </div>

              <p class="text-2xl font-black uppercase tracking-tight text-white mb-10">{{ exp.company }}</p>

              <p class="text-xl md:text-3xl font-medium text-zinc-400 leading-[1.1] tracking-tight max-w-5xl mb-12">
                {{ exp.description }}
              </p>

              <div class="flex flex-wrap gap-4">
                <span v-for="tech in exp.technologies" :key="tech"
                  class="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest group-hover:bg-rose-500 transition-colors">
                  #{{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dynamic Interlude -->
    <section class="py-40 bg-zinc-100 overflow-hidden">
      <div class="flex items-center gap-10 animate-marquee whitespace-nowrap">
        <span v-for="n in 5" :key="n"
          class="text-8xl md:text-[15rem] font-black uppercase tracking-tighter text-zinc-200 group-hover:text-black transition-colors">
          * ARCHITECTURE * DATA * FULL-STACK * CLOUD * DEVOPS * ARCHITECTURE * DATA * FULL-STACK * CLOUD * DEVOPS *
        </span>
      </div>
    </section>

    <!-- Technical Index -->
    <section class="py-60 px-10 md:px-24 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div class="lg:col-span-4 sticky top-40">
            <Star class="w-20 h-20 text-rose-500 fill-rose-500 mb-12 animate-pulse" />
            <h2 class="text-5xl font-black tracking-tighter uppercase italic leading-none">The Skill<br>Inventory</h2>
            <div class="mt-12 space-y-4">
              <p class="text-xs font-black uppercase tracking-widest text-zinc-400">Total Competencies: 50+</p>
              <p class="text-sm font-medium leading-relaxed max-w-xs">A comprehensive breakdown of technical mastery
                evolved since the dawn of modern web engineering.</p>
            </div>
          </div>

          <div class="lg:col-span-8 space-y-24">
            <div v-for="(group, name) in data.skills" :key="name" class="border-b-4 border-black pb-12 group/skill">
              <div class="flex justify-between items-end mb-8 group-hover/skill:pl-6 transition-all">
                <h3 class="text-4xl font-black uppercase tracking-tighter group-hover/skill:text-rose-500">{{ name }}
                </h3>
                <ArrowRight class="w-8 h-8 group-hover/skill:translate-x-4 transition-transform" />
              </div>
              <div class="flex flex-wrap gap-x-12 gap-y-6">
                <span v-for="skill in group" :key="skill"
                  class="text-2xl md:text-5xl font-bold tracking-tight hover:italic transition-all cursor-default">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Connect / The Back Cover -->
    <footer class="bg-black text-white py-60 px-10 md:px-24 text-center relative overflow-hidden">
      <div
        class="parallax-item absolute top-10 left-10 text-[20rem] font-black text-white/[0.02] italic leading-none pointer-events-none uppercase">
        ENGAGE
      </div>

      <div class="max-w-4xl mx-auto space-y-20 relative z-10">
        <h2 class="text-7xl md:text-[12rem] font-black tracking-tighter uppercase italic leading-[0.8]">
          Initiate<br><span class="text-rose-500">Contact</span></h2>
        <div class="flex flex-col items-center gap-12">
          <a :href="'mailto:' + data.profile.email"
            class="text-3xl md:text-6xl font-black underline decoration-rose-500 decoration-8 underline-offset-10 hover:text-rose-500 transition-colors break-all">
            {{ data.profile.email }}
          </a>
          <div class="flex gap-16">
            <a :href="data.profile.linkedin" target="_blank"
              class="text-xl font-black uppercase tracking-widest border-b-2 border-white hover:pb-4 transition-all flex items-center gap-2">
              <Linkedin class="w-5 h-5" /> LinkedIn
            </a>
            <a :href="data.profile.github" target="_blank"
              class="text-xl font-black uppercase tracking-widest border-b-2 border-white hover:pb-4 transition-all flex items-center gap-2">
              <Github class="w-5 h-5" /> Github
            </a>
          </div>
        </div>
      </div>

      <!-- Colophon -->
      <div
        class="mt-80 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.8em] text-zinc-600 gap-8">
        <span>Mehmet Çakoğlu // ARCHITECTURAL INDEX</span>
        <span>© 1997-2026 ISTANBUL-HQ</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.webkit-text-stroke-2 {
  -webkit-text-stroke: 2px #e5e7eb;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin 15s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}
</style>
