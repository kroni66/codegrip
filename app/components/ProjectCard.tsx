import React from 'react';
import { Card } from '@/components/ui/card';

interface ProjectCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  categoryColor: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  tags,
  category,
  categoryColor
}) => {
  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColor} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100`}></div>
      <Card className="relative bg-neutral-900/80 backdrop-blur-sm border border-neutral-800/50 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl"></div>
            <div className="text-center p-6 relative z-10">
              <h4 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">{title}</h4>
              <p className="text-gray-200 text-sm mb-4 leading-relaxed drop-shadow-md">{description}</p>
              <div className="flex justify-center gap-2">
                {tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full drop-shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
