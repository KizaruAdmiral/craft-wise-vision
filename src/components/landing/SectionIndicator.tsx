interface SectionIndicatorProps {
  currentSection: number;
  totalSections: number;
  onNavigate: (index: number) => void;
}

const sectionLabels = ['首页', '故事', '能力', '差异化', '联络'];

export function SectionIndicator({ currentSection, totalSections, onNavigate }: SectionIndicatorProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          className="group relative flex items-center"
          aria-label={`Go to section ${index + 1}`}
        >
          {/* Dot */}
          <div
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSection === index
                ? 'bg-foreground scale-125'
                : 'bg-foreground/30 hover:bg-foreground/50'
            }`}
          />
          
          {/* Label on hover */}
          <span className="absolute right-6 whitespace-nowrap text-sm font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-foreground/70">
            {sectionLabels[index] || `Section ${index + 1}`}
          </span>
        </button>
      ))}
    </div>
  );
}
