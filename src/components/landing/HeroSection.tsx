import { useEffect, useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';

import { ArrowRight } from 'lucide-react';

const rollingWords = ['采购', '内勤', '会计', '跟单', '统计', '售后', '代理'];
const PAUSE_WORD = '代理';
const NORMAL_INTERVAL = 1000;
const PAUSE_DURATION = 10000;

function useRollingText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const scheduleNext = useCallback((idx: number) => {
    const nextIdx = (idx + 1) % rollingWords.length;
    const isPause = rollingWords[idx] === PAUSE_WORD;
    const delay = isPause ? PAUSE_DURATION : NORMAL_INTERVAL;
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(nextIdx);
      scheduleNext(nextIdx);
    }, delay);
  }, []);

  useEffect(() => {
    // Start after 5 seconds, then begin rolling
    const initial = setTimeout(() => {
      const next = 1;
      setCurrentIndex(next);
      scheduleNext(next);
    }, NORMAL_INTERVAL);

    return () => {
      clearTimeout(initial);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [scheduleNext]);

  return rollingWords[currentIndex];
}

function RollingWord() {
  const word = useRollingText();
  return (
    <span className="inline-block relative overflow-hidden align-bottom" style={{ width: '3em', height: '1.15em' }}>
      <span
        key={word}
        className="absolute inset-0 flex items-center justify-center gradient-text animate-roll-in whitespace-nowrap"
      >
        {word}
      </span>
    </span>
  );
}

const partnerLogos = [
  { name: '大型制造集团', abbr: 'MFG' },
  { name: '国际物流企业', abbr: 'LOG' },
  { name: '建筑工程公司', abbr: 'CON' },
  { name: '零售连锁品牌', abbr: 'RET' },
  { name: '能源科技集团', abbr: 'ENR' },
  { name: '金融科技服务', abbr: 'FIN' },
  { name: '医疗健康产业', abbr: 'MED' },
  { name: '新能源汽车', abbr: 'NEV' },
];
export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden noise-bg">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-30 animate-float"
          style={{
            background: 'radial-gradient(circle, hsl(209 70% 33% / 0.2) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(18 50% 54% / 0.2) 0%, transparent 70%)',
            animation: 'float 4s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
            {/* Spacer for NavBar */}
        <div className="h-16 md:h-20" />

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <h1 
              className={`text-display mb-6 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="block text-foreground">您还未拥有自己的</span>
              <span className="block text-foreground">
                AI{' '}
                <RollingWord />
                {' '}吗？
              </span>
            </h1>

            <p 
              className={`text-body-lg text-muted-foreground mb-4 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              企业的人工智能技能升级伙伴，全方位协助您应用 AI
            </p>

            <div 
              className={`mb-8 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            />

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Button
                onClick={scrollToContact}
                size="lg"
                className="group bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 text-lg px-8 py-6 rounded-xl overflow-hidden relative"
              >
                <span className="flex items-center justify-center transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                  获取方案
                </span>
                <ArrowRight className="w-5 h-5 absolute inset-0 m-auto transition-all duration-300 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass-card border-primary/20 hover:border-primary/40 text-lg px-8 py-6 rounded-xl transition-all duration-300"
              >
                查看案例
              </Button>
            </div>
          </div>

          {/* Right: 3D Scene */}
          <div 
            className={`transition-all duration-700 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="w-full h-[400px] lg:h-[500px] rounded-2xl bg-muted/30 border border-border/20 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Placeholder</span>
            </div>
          </div>
        </div>

        {/* Partner logos - Auto scrolling banner */}
        <div 
          className={`mt-20 transition-all duration-700 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-center text-sm text-muted-foreground mb-6">
            已服务行业领先企业
          </p>
          <div className="relative overflow-hidden">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="flex animate-scroll hover:[animation-play-state:paused]">
              {/* First set */}
              {partnerLogos.map((partner, i) => (
                <div
                  key={`first-${i}`}
                  className="bg-card/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 group cursor-default flex-shrink-0 mx-2 border border-border/10"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary/60 group-hover:text-primary transition-colors">
                      {partner.abbr}
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partnerLogos.map((partner, i) => (
                <div
                  key={`second-${i}`}
                  className="bg-card/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 group cursor-default flex-shrink-0 mx-2 border border-border/10"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary/60 group-hover:text-primary transition-colors">
                      {partner.abbr}
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
