import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TestimonialProps {
  quote: string;
  author: string;
  title: string;
  company: string;
  delay: number;
}

function TestimonialCard({ quote, author, title, company, delay }: TestimonialProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`glass-card rounded-2xl p-6 lg:p-8 transition-all duration-700 hover:shadow-glass-xl ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Quote icon */}
      <div className="text-4xl text-primary/20 mb-4 font-serif">"</div>
      
      {/* Quote text */}
      <p className="text-foreground leading-relaxed mb-6 italic">
        {quote}
      </p>
      
      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-semibold">
            {author.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-semibold">{author}</div>
          <div className="text-sm text-muted-foreground">
            {title} · {company}
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote: '与伯乐合作后，我们的库存周转率提升了35%，同时缺货率下降了60%。他们真正理解制造业的痛点，给出的方案都能落地。',
    author: '王总',
    title: '供应链总监',
    company: '某大型制造集团',
  },
  {
    quote: '之前尝试过两家AI公司，都因为不理解物流行业而失败。伯乐团队一上来就抓住了我们的核心问题，三个月就看到了效果。',
    author: '李总',
    title: '运营副总裁',
    company: '国际物流企业',
  },
  {
    quote: '销售团队现在完全离不开AI助手了。线索评分、客户画像、话术推荐——每天都在用。转化率提升了40%。',
    author: '张总',
    title: '销售总监',
    company: '建筑工程公司',
  },
];

const achievements = [
  { value: '50+', label: '服务企业' },
  { value: '¥2亿+', label: '帮助客户节省成本' },
  { value: '35%', label: '平均效率提升' },
  { value: '98%', label: '客户续约率' },
];

export function TestimonialsSection() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal<HTMLDivElement>();
  const { ref: achievementsRef, isRevealed: achievementsRevealed } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-12 lg:py-16 relative bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div 
          ref={headerRef}
          className={`text-center mb-8 lg:mb-10 transition-all duration-700 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-mono text-xs text-accent uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-headline mt-2 mb-3">客户的声音</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            来自不同行业的真实反馈
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mb-10">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} delay={i * 100} />
          ))}
        </div>

        {/* Achievement stats */}
        <div
          ref={achievementsRef}
          className={`glass-card rounded-2xl p-6 lg:p-8 transition-all duration-700 ${
            achievementsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, i) => (
              <div 
                key={i} 
                className="text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-2xl lg:text-3xl font-bold font-mono text-primary mb-1">
                  {achievement.value}
                </div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Client logos */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-6">已服务的行业领先企业</p>
          <div className="flex flex-wrap justify-center gap-3 lg:gap-6">
            {['制造业龙头', '国际物流', '建筑集团', '零售连锁', '能源科技', '汽车配件'].map((name, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-lg border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 cursor-default"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
