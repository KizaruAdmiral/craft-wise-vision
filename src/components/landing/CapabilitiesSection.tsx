import { useScrollReveal } from '@/hooks/useScrollReveal';

interface CapabilityCardProps {
  title: string;
  titleEn: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  delay: number;
}

function CapabilityCard({ title, titleEn, description, features, icon, delay }: CapabilityCardProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="glass-card rounded-2xl p-6 lg:p-8 h-full group hover:shadow-glass-xl transition-all duration-500 cursor-default">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
          <div className="text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">
          {titleEn}
        </span>

        {/* Description */}
        <p className="text-muted-foreground mt-4 mb-6 text-sm leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Hover line */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">了解详情</span>
            <svg 
              className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const capabilities = [
  {
    title: '销售智能',
    titleEn: 'Sales Intelligence',
    description: 'AI 赋能销售团队，从线索评分到成交预测，全面提升销售效能。',
    features: ['智能线索评分', '销售预测分析', '客户画像洞察', '话术智能推荐'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: '营销自动化',
    titleEn: 'Marketing Automation',
    description: '精准触达目标客户，AI 驱动的内容生成与投放优化。',
    features: ['智能内容生成', '多渠道自动化', 'A/B测试优化', 'ROI 实时追踪'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    title: '供应链优化',
    titleEn: 'Supply Chain AI',
    description: '从需求预测到库存优化，让供应链成为竞争优势。',
    features: ['需求智能预测', '库存动态优化', '供应商评估', '物流路径规划'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: '全链路咨询',
    titleEn: 'AI Strategy',
    description: 'AI 转型战略规划，从评估到落地的全程陪伴。',
    features: ['AI成熟度评估', '转型路线图', '组织能力建设', '持续迭代优化'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export function CapabilitiesSection() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-12 lg:py-16 relative bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div 
          ref={headerRef}
          className={`text-center mb-8 lg:mb-12 transition-all duration-700 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-mono text-xs text-accent uppercase tracking-wider">
            Our Capabilities
          </span>
          <h2 className="text-headline mt-2 mb-3">四大核心能力</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            覆盖企业 AI 转型的全链路场景
          </p>
        </div>

        {/* Capability cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={i} {...cap} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
