/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Screen = 'home' | 'about' | 'portfolio' | 'contact';

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'design' | 'branding' | 'all';
  description: string;
  fullStory: string;
  image: string;
  tags: string[];
  client: string;
  year: string;
  results: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Service {
  iconName: 'Layout' | 'Compass' | 'Sparkles' | 'Fingerprint' | 'TrendingUp' | 'Shield';
  title: string;
  description: string;
  features: string[];
}
