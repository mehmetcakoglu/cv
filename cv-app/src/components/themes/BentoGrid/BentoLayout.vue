<script setup lang="ts">

import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import {
  Linkedin,
  Github,
  MapPin,
  Mail,
  GraduationCap,
  Cpu,
  Sparkles,
  Globe,
  MousePointer2,
  Quote
} from 'lucide-vue-next';

import { useCVStore } from '../../../stores/useCVStore';
import type { CVData } from '../../../stores/useCVStore';

const props = defineProps<{ data: CVData }>();
const store = useCVStore();

// Animation Refs
const cards = ref<HTMLElement[]>([]);
const hero = ref<HTMLElement | null>(null);
const auroraBlobs = ref<HTMLElement[]>([]);
const matrixLines = ref<SVGPathElement[]>([]);
const matrixCenters = ref<{ x: number, y: number }[]>([]);

// Technical Quote Logic
const quotes = [
  "Architecture is the art of making the invisible, visible.",
  "Simplicity is the soul of efficient software.",
  "Code is the poetry of logic.",
  "Design for the user, engineer for the future.",
  "Scalability is a mindset, not just a metric."
];

const displayedQuote = ref("");
const yearsCount = ref(0);

onMounted(() => {
  // 1. Entrance Stagger for Cards
  gsap.from(cards.value, {
    y: 100,
    opacity: 0,
    scale: 0.9,
    duration: 1,
    stagger: 0.1,
    ease: 'expo.out',
    delay: 0.2
  });

  // 2. Hero Reveal
  gsap.from(hero.value, {
    x: -50,
    opacity: 0,
    duration: 1.5,
    ease: 'power4.out'
  });

  // 3. Animate the Year Counter
  gsap.to(yearsCount, {
    value: 25,
    duration: 2,
    roundProps: 'value',
    ease: 'power2.out'
  });

  // 4. Aurora Background Motion
  auroraBlobs.value.forEach((blob, i) => {
    gsap.to(blob, {
      x: "random(-150, 150)%",
      y: "random(-150, 150)%",
      duration: "random(15, 25)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 2
    });
  });

  // 5. Quote Typewriter Effect
  let quoteIndex = 0;
  const cycleQuote = () => {
    const quote = quotes[quoteIndex] || "";
    let charIndex = 0;
    displayedQuote.value = "";

    const termInterval = setInterval(() => {
      if (charIndex < quote.length) {
        displayedQuote.value += quote[charIndex];
        charIndex++;
      } else {
        clearInterval(termInterval);
        setTimeout(() => {
          quoteIndex = (quoteIndex + 1) % quotes.length;
          cycleQuote();
        }, 3000);
      }
    }, 50);
  };
  cycleQuote();

  const calculateCenters = () => {
    matrixCenters.value = matrixLines.value.map(line => {
      const rect = line.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    });
  };

  calculateCenters();
  window.addEventListener('resize', calculateCenters);

  const handleMouseMove = (e: MouseEvent) => {
    // 1. Quantum Matrix Reactivity (Neural Paths) - Optimized
    if (matrixLines.value.length > 0) {
      matrixLines.value.forEach((line, i) => {
        const center = matrixCenters.value[i];
        if (!center) return;

        const dist = Math.sqrt(Math.pow(e.clientX - center.x, 2) + Math.pow(e.clientY - center.y, 2));

        if (dist < 400) {
          const opacity = Math.max(0.1, 1 - dist / 300);

          // Sync stroke color with localized aurora peaks (Dynamic detection)
          let stroke = '#c084fc'; // Default Purple
          if (dist < 200) {
            // Check relative position to simulate aurora peak sync
            const angle = Math.atan2(e.clientY - center.y, e.clientX - center.x);
            if (angle > -1 && angle < 1) stroke = '#d946ef'; // Fuchsia peak
            else if (angle > 1 && angle < 2.5) stroke = '#e879f9'; // Fuchsia peak
            else if (angle < -1 && angle > -2.5) stroke = '#a78bfa'; // Violet peak
          }

          gsap.to(line, {
            opacity: opacity,
            stroke: stroke,
            strokeDashoffset: dist / 8,
            duration: 0.4,
            ease: 'none',
            overwrite: 'auto'
          });
        } else {
          gsap.to(line, { opacity: 0.05, stroke: 'rgba(139,92,246,0.15)', duration: 0.6 });
        }
      });
    }

    // 2. Iridescent Sheen Reactivity
    cards.value.forEach(card => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    if (hero.value) {
      const rect = hero.value.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hero.value.style.setProperty('--mouse-x', `${x}px`);
      hero.value.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  window.addEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <div
    class="min-h-screen text-white p-6 md:p-12 lg:p-16 font-sans selection:bg-fuchsia-500/30 overflow-hidden relative">

    <!-- Aurora V2: MacOS Aurora (Leopard/Snow Leopard Vibe) -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0118]">
      <!-- Primary Aurora Blobs - Cosmic Purple/Blue/Pink -->
      <div ref="(el) => auroraBlobs.push(el as HTMLElement)"
        class="absolute top-[-20%] left-[-15%] w-[120%] h-[120%] bg-violet-800/40 rounded-full blur-[120px] mix-blend-screen animate-liquid-slow">
      </div>
      <div ref="(el) => auroraBlobs.push(el as HTMLElement)"
        class="absolute bottom-[-30%] right-[-15%] w-[110%] h-[130%] bg-fuchsia-700/30 rounded-full blur-[140px] mix-blend-screen animate-liquid-medium">
      </div>
      <div ref="(el) => auroraBlobs.push(el as HTMLElement)"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-pink-600/30 rounded-full blur-[160px] mix-blend-overlay">
      </div>
      <div ref="(el) => auroraBlobs.push(el as HTMLElement)"
        class="absolute top-[10%] right-[10%] w-[80%] h-[80%] bg-violet-400/20 rounded-full blur-[100px] mix-blend-screen animate-liquid-fast">
      </div>
      <div ref="(el) => auroraBlobs.push(el as HTMLElement)"
        class="absolute bottom-[20%] left-[20%] w-[70%] h-[70%] bg-fuchsia-900/50 rounded-full blur-[130px] mix-blend-screen">
      </div>

      <!-- Subtle Texture Layer -->
      <div
        class="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none">
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">

      <!-- HERO: Radiant Architect -->
      <div ref="hero"
        class="md:col-span-8 group relative overflow-hidden iridescent-card p-8 md:p-16 rounded-[4rem] shadow-2xl transition-all duration-700 hover:scale-[1.01] will-change-transform translate-z-0 overflow-hidden">
        <!-- Dynamic Gradient Border -->
        <div
          class="absolute inset-0 border-2 border-white/10 rounded-[4rem] z-20 pointer-events-none group-hover:border-fuchsia-400/40 transition-all duration-700">
        </div>
        <!-- Internal Light Leak -->
        <div
          class="absolute -top-40 -right-40 w-80 h-80 bg-fuchsia-500/10 blur-[100px] group-hover:bg-fuchsia-400/20 transition-all duration-700">
        </div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-10">
            <span
              class="px-5 py-2 rounded-full bg-violet-500/10 text-violet-300 text-[10px] font-black tracking-[0.4em] uppercase border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              Core Architect 2.0
            </span>
          </div>

          <h1 class="text-[clamp(3.5rem,10vw,8rem)] font-black tracking-[-0.04em] leading-[0.85] mb-10">
            <span
              class="bg-gradient-to-br from-zinc-100 via-pink-200 to-fuchsia-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              {{ data.profile.name }}
            </span>
          </h1>

          <p class="text-2xl md:text-4xl text-zinc-300 font-medium max-w-2xl leading-[1.05] tracking-tighter">
            Pioneering <span class="text-white italic underline decoration-fuchsia-500/40">resilient</span> software
            ecosystems for a hyper-speed era.
          </p>

          <div class="mt-16 flex flex-wrap gap-4">
            <div ref="cards" class="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/5">
              <MapPin class="w-5 h-5 text-violet-400" />
              <span class="text-sm font-bold text-zinc-200 tracking-tight">{{ data.profile.location }}</span>
            </div>
            <div ref="cards"
              class="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 group/btn cursor-pointer hover:bg-white/10 hover:border-fuchsia-500/50 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-fuchsia-500/20">
              <Sparkles class="w-5 h-5 text-fuchsia-400 group-hover/btn:rotate-12 transition-transform" />
              <span
                class="text-sm font-bold text-zinc-200 tracking-tight group-hover/btn:text-white transition-colors">{{
                  Math.floor(yearsCount) }}+ Years
                Legacy</span>
            </div>
          </div>
        </div>
        <!-- Decorative subtle grid in hero -->
        <div
          class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        </div>
      </div>

      <!-- Social Hub -->
      <div ref="cards"
        class="md:col-span-4 iridescent-card border border-white/5 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group will-change-transform">
        <div
          class="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        </div>

        <!-- Rotating Orbital Background -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/5 rounded-full animate-spin-slow pointer-events-none">
        </div>
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] border border-fuchsia-500/10 rounded-full animate-spin-reverse-slow pointer-events-none">
        </div>

        <div class="relative z-10 h-full flex flex-col justify-between">
          <div class="flex justify-between items-center">
            <h3 class="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300">Secure Signal</h3>
            <div class="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse shadow-[0_0_10px_#d946ef]"></div>
          </div>

          <!-- Floating 3D Tiles -->
          <div class="space-y-6 my-10">
            <a :href="data.profile.linkedin" target="_blank"
              class="flex items-center gap-5 p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] hover:bg-violet-700 hover:border-violet-500 group/tile transition-all duration-500 hover:scale-105 hover:-rotate-2 shadow-xl">
              <Linkedin class="w-6 h-6 text-violet-400 group-hover/tile:text-white transition-colors" />
              <span class="font-black tracking-tight text-lg group-hover/tile:text-white">LinkedIn</span>
            </a>
            <a :href="data.profile.github" target="_blank"
              class="flex items-center gap-5 p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] hover:bg-white hover:border-white group/tile transition-all duration-500 hover:scale-105 hover:rotate-2 shadow-xl">
              <Github class="w-6 h-6 text-zinc-400 group-hover/tile:text-black transition-colors" />
              <span class="font-black tracking-tight text-lg group-hover/tile:text-black">GitHub</span>
            </a>
          </div>

          <a :href="'mailto:' + data.profile.email"
            class="w-full py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all active:scale-95 group/pulse">
            <Mail class="w-4 h-4 group-hover/pulse:animate-bounce" />
            Direct Message
          </a>
        </div>
      </div>

      <!-- Quantum Matrix -->
      <div ref="cards"
        class="md:col-span-5 iridescent-card border border-white/[0.03] p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group will-change-transform">
        <div
          class="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        </div>

        <!-- Interactive Neural Paths (Quantum Matrix) -->
        <svg
          class="absolute inset-0 w-full h-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
          viewBox="0 0 400 600">
          <g fill="none" stroke="rgba(139,92,246,0.4)" stroke-width="1.5">
            <path v-for="n in 12" :key="n" :ref="(el) => matrixLines.push(el as SVGPathElement)"
              :d="`M ${Math.random() * 400} 0 Q ${Math.random() * 400} 300 ${Math.random() * 400} 600`"
              stroke-dasharray="1000" stroke-dashoffset="1000" />
          </g>
        </svg>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-12">
            <div
              class="w-12 h-12 bg-fuchsia-500/10 rounded-2xl flex items-center justify-center border border-fuchsia-500/20 group-hover:bg-fuchsia-500 transition-colors duration-500">
              <Cpu class="w-6 h-6 text-fuchsia-400 group-hover:text-white" />
            </div>
            <h3 class="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300">Quantum Mastery</h3>
          </div>

          <div class="flex flex-wrap gap-2.5">
            <span v-for="skill in Object.values(data.skills).flat()" :key="skill"
              class="px-5 py-3 bg-zinc-900 border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 transition-all cursor-default">
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Glitch Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        </div>
      </div>

      <!-- Experience (Timeline) -->
      <div ref="cards"
        class="md:col-span-7 bg-white/95 backdrop-blur-xl p-12 md:p-16 rounded-[4rem] shadow-2xl text-black relative will-change-transform border border-white/20">
        <div class="flex items-center justify-between mb-16 relative z-10">
          <h2 class="text-4xl font-black tracking-tighter uppercase italic">Mission_Log</h2>
          <Globe class="w-8 h-8 text-violet-500 animate-spin-slow" />
        </div>

        <div class="space-y-16 relative z-10">
          <div v-for="exp in data.experience.slice(0, 3)" :key="exp.id"
            class="group relative pl-12 border-l-2 border-zinc-100 hover:border-violet-600 transition-colors duration-700">
            <div
              class="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-violet-600 scale-0 group-hover:scale-100 transition-transform">
            </div>
            <div class="flex flex-col md:flex-row md:justify-between mb-4">
              <div>
                <h4 class="text-3xl font-black text-black leading-none">{{ exp.role }}</h4>
                <p class="text-zinc-400 font-bold text-xs uppercase tracking-widest mt-2">{{ exp.company }}</p>
              </div>
              <span class="text-[10px] font-black font-mono text-zinc-500 uppercase mt-2 md:mt-2">{{ exp.period
                }}</span>
            </div>
            <p class="text-zinc-500 text-xl font-medium leading-[1.2] max-w-2xl mb-8 tracking-tight italic">"{{
              exp.description }}"</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in exp.technologies" :key="tech"
                class="px-3 py-1 bg-zinc-50 text-[9px] font-black text-zinc-400 rounded-lg uppercase tracking-widest border border-zinc-100">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education (Frost Glass) -->
      <div ref="cards"
        class="md:col-span-4 iridescent-card border border-white/5 p-12 rounded-[4rem] text-white flex flex-col justify-between group overflow-hidden relative shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-bl from-violet-600/10 to-transparent opacity-50"></div>
        <GraduationCap
          class="w-16 h-16 text-violet-500 opacity-20 mb-10 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-700" />
        <div class="relative z-10">
          <h3 class="text-[10px] font-black uppercase tracking-[0.5em] mb-10 text-zinc-300">Core Academy</h3>
          <div v-for="edu in data.education" :key="edu.id" class="mb-10 last:mb-0">
            <p class="text-2xl font-black leading-none mb-2">{{ edu.school }}</p>
            <p class="text-[10px] text-zinc-300 font-black uppercase tracking-widest">{{ edu.degree }}</p>
          </div>
        </div>
      </div>

      <!-- Terminal Wisdom (Restored & Radiant) -->
      <div ref="cards"
        class="md:col-span-4 border border-white/10 p-12 rounded-[4rem] text-center flex flex-col items-center justify-center group relative overflow-hidden iridescent-card shadow-2xl">
        <!-- Accent Aura for Quote box -->
        <div
          class="absolute -bottom-20 -left-20 w-60 h-60 bg-fuchsia-500/20 blur-[80px] group-hover:bg-fuchsia-400/30 transition-all duration-700">
        </div>

        <div class="relative z-10 w-full text-left">
          <Quote class="w-10 h-10 text-fuchsia-400 mb-6 drop-shadow-[0_0_15px_rgba(232,121,249,0.4)]" />
          <p class="text-xl md:text-2xl font-black italic tracking-tighter leading-[1.1] text-zinc-100 min-h-[100px]">
            &ldquo;{{ displayedQuote }}&rdquo;<span class="text-fuchsia-400 animate-pulse">_</span>
          </p>
          <div class="mt-8 pt-8 border-t border-white/10">
            <p class="text-[10px] font-black uppercase tracking-[0.4em] text-fuchsia-400/80">Terminal_Wisdom // 2026</p>
          </div>
        </div>
      </div>

      <!-- Experience Log (Shifted Footer) -->
      <div ref="cards" @click="store.setTheme('story')"
        class="md:col-span-8 bg-white/5 backdrop-blur-2xl border border-white/10 p-12 md:p-24 rounded-[5rem] text-center flex flex-col items-center justify-center group cursor-pointer hover:bg-white/10 transition-all overflow-hidden relative shadow-2xl hover:shadow-violet-500/20">
        <div class="relative z-10">
          <MousePointer2 class="w-12 h-12 text-violet-500 mx-auto mb-10 animate-bounce" />
          <h2 class="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-12 italic">
            Shift Your<br><span
              class="text-zinc-100 opacity-100 group-hover:text-violet-400 transition-colors duration-700">Dimension</span>
          </h2>
          <p class="text-zinc-400 font-black uppercase tracking-[0.8em] text-[10px]">Mehmet Çakoğlu // Infinite Loop</p>
        </div>
        <div
          class="absolute inset-0 border border-white/5 rounded-[5rem] scale-98 group-hover:scale-100 transition-transform duration-1000">
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes liquid-slow {

  0%,
  100% {
    transform: scale(1) translate(0, 0) rotate(0deg);
    opacity: 0.4;
  }

  33% {
    transform: scale(1.1) translate(5%, -5%) rotate(5deg);
    opacity: 0.6;
  }

  66% {
    transform: scale(0.95) translate(-3%, 7%) rotate(-3deg);
    opacity: 0.5;
  }
}

@keyframes liquid-medium {

  0%,
  100% {
    transform: scale(1) translate(0, 0) rotate(0deg);
    opacity: 0.3;
  }

  50% {
    transform: scale(1.15) translate(-8%, 5%) rotate(-8deg);
    opacity: 0.5;
  }
}

@keyframes liquid-fast {

  0%,
  100% {
    transform: scale(1) translate(0, 0);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.2) translate(10%, -10%);
    opacity: 0.7;
  }
}

.animate-liquid-slow {
  animation: liquid-slow 15s ease-in-out infinite;
}

.animate-liquid-medium {
  animation: liquid-medium 12s ease-in-out infinite;
}

.animate-liquid-fast {
  animation: liquid-fast 10s ease-in-out infinite;
}

.iridescent-card {
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(40px) saturate(220%);
  -webkit-backdrop-filter: blur(40px) saturate(220%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 20px 80px -20px rgba(0, 0, 0, 0.8),
    inset 0 0 20px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.iridescent-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0),
      rgba(255, 255, 255, 0.18) 0%,
      rgba(167, 139, 250, 0.1) 25%,
      rgba(217, 70, 239, 0.05) 50%,
      transparent 80%);
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.iridescent-card:hover::before {
  opacity: 1;
}

/* Subtle Animated Glint */
.iridescent-card::after {
  content: "";
  position: absolute;
  top: -100%;
  left: -100%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg,
      transparent 45%,
      rgba(255, 255, 255, 0.1) 48%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.1) 52%,
      transparent 55%);
  transform: rotate(-45deg);
  transition: all 0.7s;
  pointer-events: none;
  z-index: 2;
  opacity: 0;
}

.iridescent-card:hover::after {
  animation: glint 1.5s ease-in-out infinite;
  opacity: 1;
}

@keyframes glint {
  0% {
    transform: translate(-30%, -30%) rotate(-45deg);
  }

  100% {
    transform: translate(30%, 30%) rotate(-45deg);
  }
}

.webkit-text-stroke-1 {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
}

.webkit-text-stroke-0 {
  -webkit-text-stroke: 0;
}

@keyframes spin-slow {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes spin-reverse-slow {
  from {
    transform: translate(-50%, -50%) rotate(360deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-spin-reverse-slow {
  animation: spin-reverse-slow 15s linear infinite;
}

.animate-spin-slow-simple {
  animation: spin-simple 30s linear infinite;
}

@keyframes spin-simple {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
