import { defineStore } from 'pinia';
import { ref } from 'vue';

export type Theme = 'bento' | 'swiss' | 'story';

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
}

export interface Education {
  id: number;
  degree: string;
  school: string;
  year: string;
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface Skills {
  frontend: string[];
  backend: string[];
  tools: string[];
}

export interface CVData {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: any[];
}

export const useCVStore = defineStore('cv', () => {
  const currentTheme = ref<Theme>('bento');
  const cvData = ref<CVData | null>(null);
  const loading = ref(true);

  async function loadData() {
    try {
      const response = await fetch('/cv-data.json');
      cvData.value = await response.json();
    } catch (e) {
      console.error('Failed to load CV data', e);
    } finally {
      loading.value = false;
    }
  }

  function setTheme(theme: Theme) {
    currentTheme.value = theme;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return { currentTheme, cvData, loading, loadData, setTheme };
});
