export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  createdAt: number;
  updatedAt: number;
  authorId: string;
  bookmarkedBy: string[];
}