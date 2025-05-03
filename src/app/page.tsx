'use client'

import HeroSection from "@/components/organisms/home/HeroSection"
import TestimonialsSection from "@/components/organisms/home/TestimonialsSection"
import ProblemSolutionSection from "@/components/organisms/home/ProblemSolutionSection"
import FeaturesSection from "@/components/organisms/home/FeaturesSection"
import HowItWorksSection from "@/components/organisms/home/HowItWorksSection"
import CTASection from "@/components/organisms/home/CTASection"

export default function Home() {
  return (
    <>
      <HeroSection/>
      <ProblemSolutionSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <TestimonialsSection/>
      <CTASection/>
    </>
    
  );
}
