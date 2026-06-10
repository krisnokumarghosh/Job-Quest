import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroBanner from "@/components/HeroBanner";
import PricingSection from "@/components/PricingSection";
import SmartJobs from "@/components/SmartJobs";

export default function Home() {
  return <div>
    <HeroBanner/>
    <SmartJobs/>
    <FeaturesSection></FeaturesSection>
    <PricingSection></PricingSection>
    <CTASection></CTASection>
  </div>;
}
