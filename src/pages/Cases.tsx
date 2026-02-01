import { useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/landing/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';

const industries = ['全部', '制造业', '物流', '零售', '建筑', '能源'];

const cases = [
  {
    id: 1,
    title: '智能排产系统',
    industry: '制造业',
    client: '某大型制造集团',
    challenge: '生产计划复杂，人工排产效率低，交期延误频繁',
    solution: 'AI 驱动的智能排产引擎，实时优化生产计划',
    results: [
      { metric: '排产效率', value: '+65%' },
      { metric: '交期准时率', value: '98%' },
      { metric: '库存周转', value: '+40%' },
    ],
  },
  {
    id: 2,
    title: '物流路径优化',
    industry: '物流',
    client: '国际物流企业',
    challenge: '多仓库调度复杂，运输成本居高不下',
    solution: '基于深度学习的路径规划与调度系统',
    results: [
      { metric: '运输成本', value: '-23%' },
      { metric: '配送时效', value: '+35%' },
      { metric: '车辆利用率', value: '+50%' },
    ],
  },
  {
    id: 3,
    title: '销售预测平台',
    industry: '零售',
    client: '连锁零售品牌',
    challenge: '需求预测不准，库存积压与缺货并存',
    solution: 'AI 销售预测 + 智能补货建议系统',
    results: [
      { metric: '预测准确率', value: '92%' },
      { metric: '库存成本', value: '-30%' },
      { metric: '缺货率', value: '-80%' },
    ],
  },
  {
    id: 4,
    title: '工程进度管理',
    industry: '建筑',
    client: '建筑工程公司',
    challenge: '项目进度不可控，成本超支频繁',
    solution: 'AI 项目管理助手 + 风险预警系统',
    results: [
      { metric: '项目延期', value: '-45%' },
      { metric: '成本超支', value: '-35%' },
      { metric: '沟通效率', value: '+60%' },
    ],
  },
  {
    id: 5,
    title: '能源消耗优化',
    industry: '能源',
    client: '能源科技集团',
    challenge: '能源消耗高，设备维护成本大',
    solution: 'AI 能耗优化 + 预测性维护系统',
    results: [
      { metric: '能源消耗', value: '-18%' },
      { metric: '维护成本', value: '-40%' },
      { metric: '设备寿命', value: '+25%' },
    ],
  },
];

function CaseCard({ caseItem, delay }: { caseItem: typeof cases[0]; delay: number }) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`glass-card rounded-2xl p-8 transition-all duration-700 group cursor-pointer hover:shadow-soft-lg ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
          {caseItem.industry}
        </span>
        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </div>

      <h3 className="text-xl font-semibold mb-2">{caseItem.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{caseItem.client}</p>

      <div className="space-y-3 mb-6">
        <div>
          <span className="text-xs font-medium text-muted-foreground">挑战</span>
          <p className="text-sm">{caseItem.challenge}</p>
        </div>
        <div>
          <span className="text-xs font-medium text-muted-foreground">方案</span>
          <p className="text-sm">{caseItem.solution}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
        {caseItem.results.map((result) => (
          <div key={result.metric} className="text-center">
            <div className="text-lg font-bold text-foreground">{result.value}</div>
            <div className="text-xs text-muted-foreground">{result.metric}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Cases() {
  const [activeFilter, setActiveFilter] = useState('全部');
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const filteredCases = activeFilter === '全部'
    ? cases
    : cases.filter((c) => c.industry === activeFilter);

  return (
    <main className="min-h-screen bg-background">
      <NavBar />
      
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4">
          <div
            ref={heroRef}
            className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
              heroRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Case Studies
            </span>
            <h1 className="text-display mt-4 mb-6">真实案例</h1>
            <p className="text-body-lg text-muted-foreground">
              每一个数字背后，都是一家企业的真实蜕变。探索我们如何帮助传统行业实现 AI 落地。
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === industry
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((caseItem, index) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} delay={index * 100} />
            ))}
          </div>
          
          {filteredCases.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">该行业暂无案例</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
