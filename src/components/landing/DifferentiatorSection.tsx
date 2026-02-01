import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal';
import { useEffect } from 'react';

interface MetricCardProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
  delay: number;
}

function MetricCard({ value, suffix, label, description, delay }: MetricCardProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const countUp = useCountUp(value, 2000);

  useEffect(() => {
    if (isRevealed) {
      countUp.startAnimation();
    }
  }, [isRevealed]);

  return (
    <div
      ref={ref}
      className={`glass-card rounded-2xl p-6 lg:p-8 text-center hover:shadow-glass-xl transition-all duration-500 group ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl lg:text-5xl font-bold font-mono mb-2">
        <span className="text-primary">{countUp.count}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="text-lg font-semibold mb-2">{label}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

const metrics = [
  {
    value: 23,
    suffix: '%',
    label: '物流成本降低',
    description: '某大型物流企业通过供应链AI优化实现的年度成本节省',
  },
  {
    value: 40,
    suffix: '%',
    label: '销售转化提升',
    description: '制造业客户在部署销售智能系统后的线索转化率增长',
  },
  {
    value: 60,
    suffix: '%',
    label: '营销效率提升',
    description: '零售连锁品牌在营销自动化后的投入产出比优化',
  },
  {
    value: 3,
    suffix: '个月',
    label: '平均落地周期',
    description: '从方案设计到系统上线产生价值的典型时间框架',
  },
];

const differentiators = [
  {
    title: '行业深度专家',
    description: '不是通用 AI 公司，而是懂您行业的专家。团队核心成员来自制造、物流、建筑行业，平均15年以上行业经验。',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: '可衡量的 ROI',
    description: '每个项目都设定明确的业务指标。我们与您一起追踪效果，确保 AI 投资产生实际回报。',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: '持续陪伴',
    description: '不是一次性项目交付，而是长期的 AI 能力建设伙伴。从方案设计到落地运营，全程陪伴。',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export function DifferentiatorSection() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-12 lg:py-16 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div 
          ref={headerRef}
          className={`text-center mb-8 lg:mb-12 transition-all duration-700 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-mono text-xs text-accent uppercase tracking-wider">
            Why Bole
          </span>
          <h2 className="text-headline mt-2 mb-3">为什么选择伯乐</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            深耕行业 × 可衡量成效 × 持续陪伴
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {metrics.map((metric, i) => (
            <MetricCard key={i} {...metric} delay={i * 100} />
          ))}
        </div>

        {/* Differentiators */}
        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((diff, i) => {
            const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
            return (
              <div
                key={i}
                ref={ref}
                className={`text-center lg:text-left transition-all duration-700 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto lg:mx-0 mb-3 text-primary">
                  {diff.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{diff.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{diff.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
