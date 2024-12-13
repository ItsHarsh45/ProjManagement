export interface Milestone {
  year: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const milestones: Milestone[] = [
  {
    year: 2023,
    title: "AI Innovation Lab",
    description: "Launched our innovative AI research lab and completed 50+ student projects",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
  },
  {
    year: 2022,
    title: "Industry Partnerships",
    description: "Established partnerships with leading tech companies and expanded project scope",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
  }
];