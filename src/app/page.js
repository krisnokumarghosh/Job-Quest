import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroBanner from "@/components/HeroBanner";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return <div>
    <HeroBanner/>
    <FeaturesSection></FeaturesSection>
    <PricingSection></PricingSection>
    <CTASection></CTASection>
  </div>;
}
