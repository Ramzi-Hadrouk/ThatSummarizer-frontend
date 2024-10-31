// Ensure you import React types correctly
import { FC } from "react";
import FeatureSection from "@/components/feature-section";
import HeroSection from "@/components/hero-section";
import { Block } from "@/utils/interfaces/types";

// Define blockComponents as a Record of string -> Functional Components
const blockComponents: Record<string, FC<any>> = {
  "sections.hero-section": HeroSection,
  "sections.features-section": FeatureSection,
};



// Export the blockRenderer function
 function blockRenderer(block: Block) {
  const Component = blockComponents[block.__component];

  if (Component) {
    return <Component key={block.id} data={block} />;
  }

  return null; // Fallback for missing components
}


export default blockRenderer ;