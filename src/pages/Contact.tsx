import { NavBar } from '@/components/NavBar';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/landing/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: '电话',
    value: '400-888-8888',
    description: '工作日 9:00-18:00',
  },
  {
    icon: Mail,
    label: '邮箱',
    value: 'hello@bole.ai',
    description: '我们会在24小时内回复',
  },
  {
    icon: MapPin,
    label: '地址',
    value: '上海市浦东新区',
    description: '张江高科技园区',
  },
  {
    icon: Clock,
    label: '工作时间',
    value: '周一至周五',
    description: '09:00 - 18:00',
  },
];

export default function Contact() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

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
              Contact Us
            </span>
            <h1 className="text-display mt-4 mb-6">联络我们</h1>
            <p className="text-body-lg text-muted-foreground">
              无论您是想了解更多，还是准备开始合作，我们都期待与您交流。
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="glass-card rounded-2xl p-6 text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-foreground/10 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactSection />

      <Footer />
    </main>
  );
}
