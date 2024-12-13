export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Alex Thompson",
    role: "Computer Science Student",
    text: "The project experience was invaluable for my career development. I learned so much about real-world applications.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  },
  {
    name: "Sarah Chen",
    role: "Engineering Graduate",
    text: "Working on cutting-edge projects helped me secure my dream job right after graduation.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
  },
  {
    name: "David Kumar",
    role: "Research Assistant",
    text: "The collaborative environment and mentorship opportunities were exceptional.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
  }
];