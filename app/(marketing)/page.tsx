import { Hero } from '@/components/Hero';
import { LogoCloud } from '@/components/LogoCloud';
import { BentoGrid } from '@/components/BentoGrid';
import { CTASection } from '@/components/CTASection';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <LogoCloud />
      <BentoGrid />
      <CTASection />
    </main>
  );
}
