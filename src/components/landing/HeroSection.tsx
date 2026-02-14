import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

const departments = ['采购', '内勤', '会计', '跟单', '统计', '售后'];

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [slotPhase, setSlotPhase] = useState<'spinning' | 'stopped' | 'resolved'>('spinning');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spinSpeed, setSpinSpeed] = useState(80);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Slot machine logic
  useEffect(() => {
    if (!isLoaded) return;

    const startDelay = setTimeout(() => {
      // Start spinning
      let speed = 80;
      let elapsed = 0;
      const totalSpin = 2500; // spin for 2.5s then decelerate

      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % departments.length);
        elapsed += speed;

        if (elapsed > totalSpin) {
          // Decelerate
          speed = Math.min(speed + 15, 400);
          setSpinSpeed(speed);

          if (speed >= 400) {
            // Stop on a random department
            if (intervalRef.current) clearInterval(intervalRef.current);
            const stopIndex = Math.floor(Math.random() * departments.length);
            setCurrentIndex(stopIndex);
            setSlotPhase('stopped');

            // After a pause, resolve to AI 代理
            setTimeout(() => {
              setSlotPhase('resolved');
            }, 1200);
          }
        }
      }, speed);
    }, 800);

    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoaded]);

  // Re-trigger deceleration with updated speed
  useEffect(() => {
    if (slotPhase !== 'spinning' || spinSpeed <= 80) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % departments.length);
      setSpinSpeed(prev => {
        const next = Math.min(prev + 15, 400);
        if (next >= 400) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          const stopIndex = Math.floor(Math.random() * departments.length);
          setCurrentIndex(stopIndex);
          setSlotPhase('stopped');
          setTimeout(() => setSlotPhase('resolved'), 1200);
        }
        return next;
      });
    }, spinSpeed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [spinSpeed, slotPhase]);

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
        <div className="h-16 md:h-20" />

        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Slot machine area */}
          <div
            className={`mb-8 transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="relative h-[72px] sm:h-[88px] w-[240px] sm:w-[300px] mx-auto overflow-hidden rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm shadow-soft mb-2">
              {/* Slot reel */}
              <div className="absolute inset-0 flex items-center justify-center">
                {slotPhase === 'resolved' ? (
                  <span className="text-3xl sm:text-4xl font-bold gradient-text animate-scale-in">
                    AI 代理
                  </span>
                ) : (
                  <span
                    className={`text-3xl sm:text-4xl font-bold text-foreground transition-all duration-75 ${
                      slotPhase === 'stopped' ? 'text-destructive/80' : ''
                    }`}
                    key={currentIndex}
                  >
                    {departments[currentIndex]}
                  </span>
                )}
              </div>
              {/* Top/bottom fade masks */}
              {slotPhase === 'spinning' && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-card/80 to-transparent z-10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-card/80 to-transparent z-10 pointer-events-none" />
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground/50">
              {slotPhase === 'spinning' && '寻找最需要AI的部门...'}
              {slotPhase === 'stopped' && '就是这里 👆'}
              {slotPhase === 'resolved' && '一键替换，效率翻倍'}
            </p>
          </div>

          {/* Main title */}
          <h1
            className={`text-display mb-6 transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="block text-foreground">您还未拥有自己的</span>
            <span className="block gradient-text">AI 代理吗？</span>
          </h1>

          <p
            className={`text-body-lg text-muted-foreground mb-4 transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            企业的人工智能技能升级伙伴，全方位协助您应用 AI
          </p>

          <div className={`mb-8 transition-all duration-700 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} />

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-500 ${
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

        {/* Partner logos */}
        <div
          className={`mt-20 transition-all duration-700 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-center text-sm text-muted-foreground mb-6">
            已服务行业领先企业
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="flex animate-scroll hover:[animation-play-state:paused]">
              {partnerLogos.map((partner, i) => (
                <div key={`first-${i}`} className="bg-card/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 group cursor-default flex-shrink-0 mx-2 border border-border/10">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary/60 group-hover:text-primary transition-colors">{partner.abbr}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">{partner.name}</span>
                  </div>
                </div>
              ))}
              {partnerLogos.map((partner, i) => (
                <div key={`second-${i}`} className="bg-card/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 group cursor-default flex-shrink-0 mx-2 border border-border/10">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary/60 group-hover:text-primary transition-colors">{partner.abbr}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">{partner.name}</span>
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
