import { SocialLink } from '@/types';

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/25krishnapaney-cmyk', icon: 'github' },
  { name: 'LinkedIn', url: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/krishna-pandey-x40020725', icon: 'linkedin' },
  { name: 'Instagram', url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/nadylostfilters?igsh=dTcxcXdxamxucW0z', icon: 'instagram' },
  { name: 'Email', url: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || '25krishnapaney@gmail.com'}`, icon: 'mail' },
];
