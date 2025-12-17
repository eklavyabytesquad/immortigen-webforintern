import HeroSection from '../components/HeroSection';
import LongevitySection from '../components/LongevitySection';
import FeaturesSection from '../components/FeaturesSection';
import GetStartedSection from '../components/GetStartedSection';
import TestingPackages from '../components/Packages';
import FaqSection from '../components/FaqSection';

export default function Home() {
  return (
    <div suppressHydrationWarning={true}>
      <HeroSection />
      <LongevitySection />
      <FeaturesSection />
      <GetStartedSection />
      <TestingPackages />
      <FaqSection />
    </div>
  );
}
