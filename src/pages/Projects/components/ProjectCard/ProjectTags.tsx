interface ProjectTagsProps {
  tags: string[];
}

export function ProjectTags({ tags }: ProjectTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map(tag => (
        <span 
          key={tag} 
          className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}