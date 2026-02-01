import { HeroSection } from '@/components/landing/HeroSection';
import { StorySection } from '@/components/landing/StorySection';
import { CapabilitiesSection } from '@/components/landing/CapabilitiesSection';
import { DifferentiatorSection } from '@/components/landing/DifferentiatorSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/landing/Footer';
import { NavBar } from '@/components/NavBar';
import { SectionIndicator } from '@/components/landing/SectionIndicator';
import { useFullPageScroll } from '@/hooks/useFullPageScroll';

const SECTION_COUNT = 6;

const Index = () => {
  const { containerRef, currentSection, scrollToSection, totalSections } = useFullPageScroll({
    sectionCount: SECTION_COUNT,
  });

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-background overflow-x-hidden overflow-y-auto snap-y snap-mandatory"
    >
      <NavBar />
      <SectionIndicator
        currentSection={currentSection}
        totalSections={totalSections}
        onNavigate={scrollToSection}
      />
      
      <div data-section className="min-h-screen snap-start">
        <HeroSection />
      </div>
      <div data-section className="min-h-screen snap-start flex items-center py-8">
        <StorySection />
      </div>
      <div data-section className="min-h-screen snap-start flex items-center py-8">
        <CapabilitiesSection />
      </div>
      <div data-section className="min-h-screen snap-start flex items-center py-8">
        <DifferentiatorSection />
      </div>
      <div data-section className="min-h-screen snap-start flex items-center py-8">
        <TestimonialsSection />
      </div>
      <div data-section className="min-h-screen snap-start">
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
