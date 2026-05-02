export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  plan: 'basic' | 'premium';
};

export type DynamicCategory = 'Principal' | 'Bônus';

export type Dynamic = {
  id: string;
  title: string;
  description: string;
  category: 'Infantil' | 'Juvenil' | 'Adulto' | 'Técnica';
  pdfUrl: string;
  thumbnailUrl: string;
  completed: boolean;
};

export type CourseProgress = {
  userId: string;
  completedDynamics: string[];
  certificateIssued: boolean;
};
