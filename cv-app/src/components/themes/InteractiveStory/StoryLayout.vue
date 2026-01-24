<script setup lang="ts">
import type { CVData } from '../../../stores/useCVStore';
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import {
  Rocket,
  ChevronDown,
  Star,
  Zap,
  Atom,
  Linkedin,
  Github
} from 'lucide-vue-next';

const props = defineProps<{ data: CVData }>();

// Warp Field Starfield Logic
const canvas = ref<HTMLCanvasElement | null>(null);
let animationFrame: number;

onMounted(() => {
  if (!canvas.value) return;
  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  let stars: { x: number; y: number; z: number; px: number; py: number }[] = [];
  let numStars = 1000;
  let speed = 0.5;
  let warpSpeed = 0.5;

  const initStars = () => {
    stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * window.innerWidth - window.innerWidth / 2,
        y: Math.random() * window.innerHeight - window.innerHeight / 2,
        z: Math.random() * window.innerWidth,
        px: 0,
        py: 0
      });
    }
  };

  const update = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.value!.width, canvas.value!.height);
    ctx.translate(canvas.value!.width / 2, canvas.value!.height / 2);

    for (let i = 0; i < numStars; i++) {
      let s = stars[i]!;
      s.z -= speed + warpSpeed;

      if (s.z <= 0) {
        s.z = canvas.value!.width;
        s.x = Math.random() * window.innerWidth - window.innerWidth / 2;
        s.y = Math.random() * window.innerHeight - window.innerHeight / 2;
      }

      let x = s.x * (canvas.value!.width / s.z);
      let y = s.y * (canvas.value!.width / s.z);

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${1 - s.z / canvas.value!.width})`;
      ctx.arc(x, y, (1 - s.z / canvas.value!.width) * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.translate(-canvas.value!.width / 2, -canvas.value!.height / 2);
    animationFrame = requestAnimationFrame(update);
  };

  const resize = () => {
    canvas.value!.width = window.innerWidth;
    canvas.value!.height = window.innerHeight;
    initStars();
  };

  // Scroll accelerates warp (Optimized: No new animation per pixel)
  let scrollTimeout: any;
  window.addEventListener('scroll', () => {
    warpSpeed = Math.min(15, window.scrollY * 0.05);

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      gsap.to({ v: warpSpeed }, {
        v: 0.5,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: function () { warpSpeed = this.targets()[0].v }
      });
    }, 100);
  });

  window.addEventListener('resize', resize);
  resize();
  update();

  // Entrance Reveal
  gsap.from('.odyssey-node', {
    opacity: 0,
    scale: 0.8,
    y: 50,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '.odyssey-node',
      start: 'top 80%'
    }
  });
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
});
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans selection:bg-rose-500/40 relative overflow-x-hidden">

    <!-- Reactive Starfield Background -->
    <canvas ref="canvas" class="fixed inset-0 z-0 pointer-events-none opacity-40"></canvas>

    <!-- Hero / Quantum Launch -->
    <section class="min-h-screen flex flex-col items-center justify-center p-8 text-center relative z-10">
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>

      <div class="relative z-10 space-y-12 animate-quantum">
        <div
          class="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/[0.08] border border-white/10 text-cyan-400 text-[10px] font-black tracking-[0.6em] uppercase mb-4">
          Neural Signal Established // 1997
        </div>

        <h1 class="text-[clamp(5rem,20vw,16rem)] font-black tracking-[-0.06em] leading-[0.7] uppercase relative">
          <span
            class="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl font-black italic tracking-[1em] text-rose-500 opacity-50">Odyssey</span>
          Infinite
        </h1>

        <p class="text-3xl md:text-5xl font-black max-w-5xl mx-auto leading-none tracking-tighter italic text-zinc-300">
          Navigating the complex dimensions of <span
            class="bg-gradient-to-r from-blue-400 to-rose-400 bg-clip-text text-transparent">Solutions & Data.</span>
        </p>

        <div class="flex flex-col items-center gap-10 pt-20">
          <div
            class="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center animate-bounce group cursor-pointer hover:bg-white hover:text-black transition-all">
            <ChevronDown class="w-8 h-8" />
          </div>
        </div>
      </div>
    </section>

    <!-- The Logs / Quantum Nodes -->
    <main class="max-w-[1400px] mx-auto py-60 px-8 relative z-10">

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div class="lg:col-span-12 flex items-center gap-10 mb-20">
          <Atom class="w-12 h-12 text-rose-500 animate-spin" />
          <h2 class="text-5xl md:text-8xl font-black tracking-tighter uppercase italic">Timeline_Index</h2>
        </div>

        <div class="lg:col-span-12 space-y-60 relative">
          <!-- Central quantum path link -->
          <div
            class="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 via-rose-500 to-transparent opacity-20 hidden lg:block">
          </div>

          <div v-for="(exp, index) in data.experience" :key="exp.id"
            class="odyssey-node grid grid-cols-1 lg:grid-cols-12 items-center gap-12 group"
            :class="index % 2 === 0 ? '' : 'lg:flex-row-reverse'">
            <!-- Quantum Node -->
            <div class="hidden lg:flex lg:col-span-12 justify-center relative">
              <div
                class="w-24 h-24 rounded-[2.5rem] bg-black border-2 border-zinc-800 flex items-center justify-center z-10 group-hover:bg-rose-500 group-hover:border-rose-500 group-hover:scale-110 transition-all duration-700 shadow-[0_0_50px_rgba(0,0,0,1)]">
                <span class="text-3xl font-black text-zinc-700 group-hover:text-white transition-colors">{{ index + 1 <
                  10 ? '0' + (index + 1) : index + 1 }}</span>
              </div>
            </div>

            <!-- Details -->
            <div class="lg:col-span-5 space-y-4" :class="index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'">
              <span class="text-xs font-black text-rose-500 tracking-[0.4em] uppercase">{{ exp.period }}</span>
              <h3 class="text-4xl md:text-6xl font-black leading-none group-hover:italic transition-all">{{ exp.company
                }}</h3>
              <div class="flex flex-wrap gap-4 justify-start lg:justify-end"
                :class="index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'">
                <span v-for="tech in exp.technologies" :key="tech"
                  class="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{{ tech }}</span>
              </div>
            </div>

            <div class="lg:col-span-5">
              <div
                class="bg-zinc-900 border border-white/5 p-10 rounded-[3.5rem] hover:bg-black transition-all duration-700 relative overflow-hidden will-change-transform translate-z-0">
                <div class="absolute top-0 right-0 p-6 opacity-10">
                  <Zap class="w-12 h-12" />
                </div>
                <h4
                  class="text-2xl font-black text-white mb-6 underline decoration-rose-500 decoration-4 underline-offset-8">
                  {{ exp.role }}</h4>
                <p class="text-xl text-zinc-400 font-medium leading-relaxed">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Haptic Interaction Area (Skills) -->
    <section class="py-60 px-8 relative z-10 overflow-hidden">
      <div class="max-w-7xl mx-auto text-center">
        <Star class="w-20 h-20 text-blue-500 mb-12 mx-auto animate-pulse" />
        <h2 class="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-none mb-40">Skill_Matrix
        </h2>

        <div class="flex flex-wrap justify-center gap-12">
          <div v-for="(group, name) in data.skills" :key="name" class="group relative">
            <div
              class="absolute -inset-8 bg-blue-600/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
            <h3 class="text-sm font-black text-zinc-600 uppercase tracking-[0.3em] mb-12">{{ name }}</h3>
            <div class="space-y-4">
              <p v-for="skill in group" :key="skill"
                class="text-3xl md:text-5xl font-black hover:text-rose-500 transition-colors cursor-default italic">
                {{ skill }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Terminal Connect (Footer) -->
    <footer class="py-60 px-8 relative z-10 bg-gradient-to-b from-transparent to-black">
      <div class="max-w-5xl mx-auto text-center space-y-24">
        <div class="space-y-12">
          <Rocket class="w-20 h-20 text-white mx-auto animate-bounce" />
          <h2 class="text-8xl md:text-[14rem] font-black tracking-tighter uppercase italic leading-[0.7]">
            Signal<br><span class="text-transparent webkit-text-stroke-2">Active</span></h2>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-center gap-12">
          <a :href="'mailto:' + data.profile.email"
            class="w-full md:w-auto px-16 py-8 bg-white text-black rounded-[3rem] font-black text-2xl hover:bg-rose-500 hover:text-white transition-all shadow-[0_30px_60px_-15px_rgba(255,255,255,0.3)]">
            ESTABLISH LINK
          </a>
          <div class="flex gap-10">
            <a :href="data.profile.linkedin"
              class="w-24 h-24 rounded-[3rem] bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Linkedin class="w-8 h-8" />
            </a>
            <a :href="data.profile.github"
              class="w-24 h-24 rounded-[3rem] bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Github class="w-8 h-8" />
            </a>
          </div>
        </div>

        <div class="pt-40 text-left">
          <div class="flex gap-4 text-xs font-black text-zinc-700 uppercase tracking-[0.5em]">
            <span>System_Ready</span>
            <span>User_Mehmet</span>
            <span>Location_Earth</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.webkit-text-stroke-2 {
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
}

@keyframes quantum {
  from {
    opacity: 0;
    filter: blur(50px);
    transform: scale(1.1);
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: scale(1);
  }
}

.animate-quantum {
  animation: quantum 2s cubic-bezier(0.23, 1, 0.32, 1) both;
}
</style>
