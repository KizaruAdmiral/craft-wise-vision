import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

export function ContactSection() {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const magneticBtn = useMagneticButton<HTMLButtonElement>(0.15);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('提交成功！我们将在24小时内与您联系。');
    setFormData({ name: '', company: '', phone: '', email: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-12 lg:py-16 relative">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-accent uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="text-headline mt-2 mb-4">获取您的专属方案</h2>
            <p className="text-muted-foreground">
              留下您的信息，我们的行业专家将在24小时内与您联系
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-accent font-medium">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              限量企业诊断名额开放中
            </div>
          </div>

          {/* Form */}
          <div className="glass-card rounded-2xl p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名 *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="您的姓名"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">公司 *</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="公司名称"
                    className="bg-background/50"
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">电话 *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="联系电话"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="电子邮箱"
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  ref={magneticBtn.ref}
                  onMouseMove={magneticBtn.onMouseMove}
                  onMouseLeave={magneticBtn.onMouseLeave}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 magnetic-btn bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 py-6 text-lg"
                >
                  {isSubmitting ? '提交中...' : '获取方案'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="magnetic-btn glass-card border-primary/20 hover:border-primary/40 py-6"
                >
                  查看案例
                </Button>
              </div>
            </form>

            {/* Trust signals */}
            <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                信息安全加密
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                ISO27001认证
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                24小时内响应
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
