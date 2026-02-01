import { HeroSection } from '@/components/landing/HeroSection';
import { StorySection } from '@/components/landing/StorySection';
import { CapabilitiesSection } from '@/components/landing/CapabilitiesSection';
import { DifferentiatorSection } from '@/components/landing/DifferentiatorSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <StorySection />
      <CapabilitiesSection />
      <DifferentiatorSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
