import { Skill } from '@/types';

export const skills: Skill[] = [
  // Programming
  { name: 'Python', icon: '🐍', category: 'Programming' },
  { name: 'Java', icon: '☕', category: 'Programming' },
  { name: 'C', icon: '⚙️', category: 'Programming' },
  { name: 'JavaScript', icon: '✨', category: 'Programming' },
  { name: 'TypeScript', icon: '💎', category: 'Programming' },

  // Frontend
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', category: 'Frontend' },
  { name: 'HTML', icon: '🌐', category: 'Frontend' },
  { name: 'CSS', icon: '🎨', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: '💨', category: 'Frontend' },

  // Backend
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'Express', icon: '🚂', category: 'Backend' },
  { name: 'MySQL', icon: '🗄️', category: 'Backend' },
  { name: 'MongoDB', icon: '🍃', category: 'Backend' },
  { name: 'REST APIs', icon: '🔗', category: 'Backend' },

  // AI/ML
  { name: 'Machine Learning', icon: '🤖', category: 'AI/ML' },
  { name: 'LLMs', icon: '🧠', category: 'AI/ML' },
  { name: 'Prompt Engineering', icon: '💬', category: 'AI/ML' },
  { name: 'Agentic AI', icon: '🤝', category: 'AI/ML' },
  { name: 'Computer Vision', icon: '👁️', category: 'AI/ML' },

  // Cloud
  { name: 'Google Cloud', icon: '☁️', category: 'Cloud' },
  { name: 'GitHub', icon: '🐙', category: 'Cloud' },
  { name: 'Vercel', icon: '▲', category: 'Cloud' },
  { name: 'Firebase', icon: '🔥', category: 'Cloud' },

  // Tools
  { name: 'VS Code', icon: '💻', category: 'Tools' },
  { name: 'Git', icon: '🔀', category: 'Tools' },
  { name: 'Docker', icon: '🐳', category: 'Tools' },
  { name: 'Linux', icon: '🐧', category: 'Tools' },
  { name: 'Figma', icon: '🎯', category: 'Tools' },
];

export const skillCategories = [
  'Programming',
  'Frontend',
  'Backend',
  'AI/ML',
  'Cloud',
  'Tools',
] as const;
