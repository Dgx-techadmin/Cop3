import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AIHelperSection } from "@/components/home/AIHelperSection";
import { QuickWinsSection } from "@/components/home/QuickWinsSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <AIHelperSection />
        <QuickWinsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
