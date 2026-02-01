import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal';
import { useEffect } from 'react';

interface StoryActProps {
  title: string;
  subtitle: string;
  description: string;
  stat?: { value: number; suffix: string; label: string };
  icon: React.ReactNode;
  isReversed?: boolean;
}

function StoryAct({ title, subtitle, description, stat, icon, isReversed }: StoryActProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const countUp = useCountUp(stat?.value || 0, 2000);

  useEffect(() => {
    if (isRevealed && stat) {
      countUp.startAnimation();
    }
  }, [isRevealed]);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16 transition-all duration-700 ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Visual */}
      <div className="flex-1 w-full">
        <div className="glass-card rounded-2xl p-8 lg:p-12 text-center">
          <div className="text-6xl mb-6">{icon}</div>
          {stat && (
            <div className="mt-4">
              <div className="text-5xl lg:text-6xl font-bold text-primary font-mono count-up">
                {countUp.count}
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
            </div>
          )}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 text-center lg:text-left">
        <span className="inline-block font-mono text-xs text-accent uppercase tracking-wider mb-2">
          {subtitle}
        </span>
        <h2 className="text-headline mb-4">{title}</h2>
        <p className="text-body-lg text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

const WarningIcon = () => (
  <svg className="w-16 h-16 mx-auto text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-16 h-16 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-16 h-16 mx-auto text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export function StorySection() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-headline mb-4">为什么传统行业需要不一样的 AI 伙伴？</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            从困境到突破，我们理解您的挑战
          </p>
        </div>

        {/* Three acts */}
        <div className="space-y-24 lg:space-y-32">
          {/* Act 1: The Problem */}
          <StoryAct
            subtitle="第一幕 · 困境"
            title="AI 落地的隐形门槛"
            description="通用 AI 方案往往无法理解传统行业的复杂业务逻辑。销售预测、库存管理、生产调度——每个环节都有行业特有的规则和约束。这就是为什么很多 AI 项目最终沦为「技术实验」。"
            stat={{ value: 80, suffix: '%', label: 'AI项目无法真正落地产生价值' }}
            icon={<WarningIcon />}
          />

          {/* Act 2: The Solution */}
          <StoryAct
            subtitle="第二幕 · 转折"
            title="懂行业的 AI 专家团队"
            description="伯乐团队成员曾在制造、物流、建筑等传统行业深耕多年。我们不只是技术专家，更是您行业的「内部人」。这意味着我们能够设计出真正符合业务逻辑、能够落地执行的 AI 解决方案。"
            stat={{ value: 15, suffix: '+', label: '年行业深耕经验平均值' }}
            icon={<LightbulbIcon />}
            isReversed
          />

          {/* Act 3: The Vision */}
          <StoryAct
            subtitle="第三幕 · 愿景"
            title="与您共建智能化未来"
            description="与伯乐合作，您将获得的不只是一套软件系统，而是一个持续进化的 AI 能力。从销售预测到供应链优化，从营销自动化到战略咨询——我们陪伴您的每一步转型之路。"
            stat={{ value: 3, suffix: 'x', label: '平均投资回报率' }}
            icon={<BoltIcon />}
          />
        </div>
      </div>
    </section>
  );
}
