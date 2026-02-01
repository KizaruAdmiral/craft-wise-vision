import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/landing/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const values = [
  {
    title: '行业深耕',
    description: '我们不是旁观者，而是曾在传统行业一线战斗过的老兵。',
    icon: '🎯',
  },
  {
    title: '务实落地',
    description: '每个方案都经过真实业务场景验证，拒绝纸上谈兵。',
    icon: '⚡',
  },
  {
    title: '持续陪伴',
    description: 'AI 转型不是一次性项目，我们提供长期技术支持与迭代。',
    icon: '🤝',
  },
  {
    title: '知识赋能',
    description: '授人以渔，帮助您的团队掌握 AI 核心技能。',
    icon: '📚',
  },
];

const team = [
  { name: '张明远', role: 'CEO & 创始人', experience: '前某大型制造集团数字化总监' },
  { name: '李慧琳', role: 'CTO', experience: '前某头部互联网公司 AI 算法专家' },
  { name: '王建国', role: '行业顾问', experience: '30年物流供应链管理经验' },
];

function ValueCard({ title, description, icon, delay }: { title: string; description: string; icon: string; delay: number }) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`glass-card rounded-2xl p-8 text-center transition-all duration-700 ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function About() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <main className="min-h-screen bg-background">
      <NavBar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4">
          <div
            ref={heroRef}
            className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
              heroRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-display mt-4 mb-6">懂行业，更懂 AI</h1>
            <p className="text-body-lg text-muted-foreground">
              伯乐团队由行业资深从业者与顶尖 AI 技术专家组成。我们深知传统行业的痛点与机遇，
              致力于将前沿 AI 技术转化为可落地的业务价值。
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Our Mission
                </span>
                <h2 className="text-headline mt-2 mb-4">让每家传统企业都能驾驭 AI</h2>
                <p className="text-muted-foreground leading-relaxed">
                  我们的使命是弥合传统行业与 AI 技术之间的鸿沟。不是用技术术语让您困惑，
                  而是用您听得懂的业务语言，帮您找到 AI 落地的最佳路径。
                </p>
              </div>
              <div className="glass-card rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-sm">01</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">诊断业务痛点</h4>
                      <p className="text-sm text-muted-foreground">深入理解您的业务流程与挑战</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-sm">02</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">设计 AI 方案</h4>
                      <p className="text-sm text-muted-foreground">量身定制可落地的技术路线</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-sm">03</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">陪伴式落地</h4>
                      <p className="text-sm text-muted-foreground">全程技术支持直到见效</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-headline mt-2">核心价值观</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard key={value.title} {...value} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="text-headline mt-2">核心团队</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-foreground/10 flex items-center justify-center">
                  <span className="text-2xl font-semibold">{member.name[0]}</span>
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="text-xs text-muted-foreground/70 mt-1">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
