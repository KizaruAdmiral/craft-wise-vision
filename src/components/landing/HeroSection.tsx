import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { Scene3D } from './Scene3D';
import boleLogo from '@/assets/bole-logo.png';

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
  const magneticBtn = useMagneticButton<HTMLButtonElement>(0.2);
  const secondaryBtn = useMagneticButton<HTMLButtonElement>(0.15);

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
        {/* Logo */}
        <div 
          className={`flex justify-center mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <img 
            src={boleLogo} 
            alt="伯乐 AI" 
            className="h-16 md:h-20 object-contain"
          />
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <h1 
              className={`text-display mb-6 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="block text-foreground">让每一个流程</span>
              <span className="block gradient-text">都成为增长引擎</span>
            </h1>

            <p 
              className={`text-body-lg text-muted-foreground mb-4 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              企业的人工智能技能升级伙伴，全方位协助您应用 AI
            </p>

            <p 
              className={`font-mono text-sm text-muted-foreground/70 mb-8 tracking-wide transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Powered by Industry-Native AI
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Button
                ref={magneticBtn.ref}
                onMouseMove={magneticBtn.onMouseMove}
                onMouseLeave={magneticBtn.onMouseLeave}
                onClick={scrollToContact}
                size="lg"
                className="magnetic-btn bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent-glow hover:shadow-glow-lg transition-all duration-300 text-lg px-8 py-6 rounded-xl"
              >
                获取方案
              </Button>
              <Button
                ref={secondaryBtn.ref}
                onMouseMove={secondaryBtn.onMouseMove}
                onMouseLeave={secondaryBtn.onMouseLeave}
                variant="outline"
                size="lg"
                className="magnetic-btn glass-card border-primary/20 hover:border-primary/40 text-lg px-8 py-6 rounded-xl transition-all duration-300"
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
            <Scene3D />
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
