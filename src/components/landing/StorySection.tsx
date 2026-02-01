import { useState } from 'react';
import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal';
import { useIsMobile } from '@/hooks/use-mobile';

interface FlipCardData {
  subtitle: string;
  title: string;
  description: string;
  stat: { value: number; suffix: string; label: string };
  icon: React.ReactNode;
  hint: string;
}

function FlipCard({ data, delay }: { data: FlipCardData; delay: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const countUp = useCountUp(data.stat.value, 2000);
  const isMobile = useIsMobile();

  const handleFlip = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsFlipped(true);
      countUp.startAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`flip-card w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] cursor-pointer transition-all duration-700 flex-shrink-0 ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={handleFlip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flip-card-front glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
            {data.subtitle}
          </span>
          <div className="text-4xl mb-4">{data.icon}</div>
          <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
          <div className="mt-auto">
            <div className="text-3xl font-bold font-mono">
              {data.stat.value}
              <span className="text-muted-foreground">{data.stat.suffix}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{data.stat.label}</div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground/50">
            {isMobile ? '点击翻转' : data.hint}
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back glass-card rounded-2xl p-6 flex flex-col justify-center">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
            {data.subtitle}
          </span>
          <h3 className="text-lg font-semibold mb-3">{data.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{data.description}</p>
          <div className="mt-auto pt-3 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold font-mono">
                  {countUp.count}
                  <span className="text-muted-foreground">{data.stat.suffix}</span>
                </div>
                <div className="text-xs text-muted-foreground">{data.stat.label}</div>
              </div>
              <div className="text-3xl opacity-30">{data.icon}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const WarningIcon = () => (
  <svg className="w-12 h-12 text-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-12 h-12 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-12 h-12 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const cards: FlipCardData[] = [
  {
    subtitle: '第一幕 · 困境',
    title: 'AI 落地的隐形门槛',
    description: '通用 AI 方案往往无法理解传统行业的复杂业务逻辑。销售预测、库存管理、生产调度——每个环节都有行业特有的规则和约束。这就是为什么很多 AI 项目最终沦为「技术实验」。',
    stat: { value: 80, suffix: '%', label: 'AI项目无法真正落地' },
    icon: <WarningIcon />,
    hint: '悬停查看详情',
  },
  {
    subtitle: '第二幕 · 转折',
    title: '懂行业的 AI 专家',
    description: '伯乐团队成员曾在制造、物流、建筑等传统行业深耕多年。我们不只是技术专家，更是您行业的「内部人」。这意味着我们能够设计出真正符合业务逻辑、能够落地执行的 AI 解决方案。',
    stat: { value: 15, suffix: '+', label: '年行业深耕经验' },
    icon: <LightbulbIcon />,
    hint: '悬停查看详情',
  },
  {
    subtitle: '第三幕 · 愿景',
    title: '共建智能化未来',
    description: '与伯乐合作，您将获得的不只是一套软件系统，而是一个持续进化的 AI 能力。从销售预测到供应链优化，从营销自动化到战略咨询——我们陪伴您的每一步转型之路。',
    stat: { value: 3, suffix: 'x', label: '平均投资回报率' },
    icon: <BoltIcon />,
    hint: '悬停查看详情',
  },
];

export function StorySection() {
  return (
    <section className="py-24 lg:py-32 relative w-full" data-section>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-headline mb-4">为什么传统行业需要不一样的 AI 伙伴？</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            从困境到突破，我们理解您的挑战
          </p>
        </div>

        {/* Flip cards - flexible layout */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 w-full max-w-6xl">
          {cards.map((card, index) => (
            <FlipCard key={card.title} data={card} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
