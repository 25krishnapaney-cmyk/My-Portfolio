import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'ai-agent-ecosystem',
    title: 'AI Agent Ecosystem',
    shortDescription: 'An autonomous multi-agent framework powered by large language models for automated reasoning, code generation, and complex workflow execution.',
    description: 'Currently in development: A cutting-edge autonomous AI platform that orchestrates specialized LLM agents to solve complex multi-step tasks, execute code in sandboxed environments, and integrate with external APIs.',
    image: '/projects/ai-study.jpg',
    category: 'AI',
    featured: true,
    technologies: ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'Next.js', 'Docker', 'Redis'],
  },
  {
    slug: 'cloud-devops-platform',
    title: 'Cloud DevOps Suite',
    shortDescription: 'A cloud-native infrastructure automation and real-time monitoring dashboard tailored for scalable microservices.',
    description: 'Currently in development: A comprehensive cloud engineering toolkit leveraging Google Cloud and Kubernetes to streamline CI/CD pipelines, monitor microservice health, and optimize container resource allocation.',
    image: '/projects/devflow.jpg',
    category: 'Web Development',
    featured: true,
    technologies: ['Google Cloud', 'Kubernetes', 'Docker', 'TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    slug: 'intelligent-research-assistant',
    title: 'Intelligent Research Assistant',
    shortDescription: 'An advanced retrieval-augmented generation (RAG) system for semantic scientific literature analysis and synthesis.',
    description: 'Currently in development: An intelligent research platform designed to ingest academic papers, construct high-dimensional vector embeddings, and generate accurate citations and literature reviews using state-of-the-art NLP models.',
    image: '/projects/sentiment.jpg',
    category: 'Research',
    featured: true,
    technologies: ['Python', 'PyTorch', 'Vector DB', 'RAG', 'React', 'Tailwind CSS', 'FastAPI'],
  },
];

export const projectCategories = ['All', 'AI', 'Web Development', 'Hackathon', 'Research', 'Personal'] as const;

