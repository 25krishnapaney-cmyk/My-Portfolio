import { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    title: 'AI/ML Intern',
    company: 'TechVision Labs',
    type: 'Internship',
    period: 'Jun 2025 — Aug 2025',
    description: 'Worked on developing computer vision pipelines for automated quality inspection in manufacturing environments.',
    highlights: [
      'Built a real-time defect detection system achieving 96% accuracy',
      'Reduced inspection time by 40% compared to manual processes',
      'Deployed models using Docker and Kubernetes on GCP',
    ],
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Docker', 'GCP'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Freelance',
    type: 'Freelance',
    period: 'Jan 2025 — Present',
    description: 'Designing and developing modern web applications for startups and small businesses.',
    highlights: [
      'Delivered 5+ production web applications',
      'Specialized in React/Next.js with headless CMS integration',
      'Maintained 100% client satisfaction rating',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  },
  {
    title: 'Smart India Hackathon — Finalist',
    company: 'SIH 2025',
    type: 'Hackathon',
    period: 'Dec 2025',
    description: 'Led a team of 6 to build an AI-powered solution for rural healthcare access, reaching the national finals.',
    highlights: [
      'Developed a telemedicine platform with AI symptom checker',
      'Integrated multi-language support for regional accessibility',
      'Presented to a panel of government officials and industry leaders',
    ],
    technologies: ['React', 'Python', 'GPT-4', 'Firebase', 'Twilio'],
  },
  {
    title: 'Technical Lead — Coding Club',
    company: 'University CS Society',
    type: 'Leadership',
    period: 'Aug 2024 — Present',
    description: 'Leading a team of 20 members organizing workshops, hackathons, and competitive programming events.',
    highlights: [
      'Organized 10+ technical workshops with 500+ attendees',
      'Mentored 30+ junior students in web development and DSA',
      'Launched the university\'s first open-source initiative',
    ],
  },
  {
    title: 'Open Source Contributor',
    company: 'Various Projects',
    type: 'Volunteer',
    period: 'Mar 2024 — Present',
    description: 'Contributing to open-source projects in the React and AI ecosystems.',
    highlights: [
      'Contributed to 3 major open-source libraries',
      'Fixed critical bugs and added new features',
      'Participated in Hacktoberfest 2024',
    ],
    technologies: ['TypeScript', 'React', 'Python', 'Git'],
  },
];
