export interface Job {
  id: string;
  title: string;
  description: string;
  level: string | null;
  languageFocus: string | null;
  budget: string | null;
  isPublished: boolean | null;
  createdAt: Date | null;
  updatedAt: Date;
}
