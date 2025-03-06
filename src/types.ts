export type Status = 'implemented' | 'coming-soon' | 'planned';

export interface Checkpoint {
  id: number;
  title: string;
  status: Status;
  description: string;
  videoUrl?: string | null;
  videoDuration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  requirements: {
    language: string;
    level: number;
  }[];
  sections?: {
    title: string;
    content: string;
  }[];
}

export type Theme = 'dark' | 'light';