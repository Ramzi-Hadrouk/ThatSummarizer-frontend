//--------used in main page adn blockrendred function 
export interface Block {
    __component: string;
    id: string;
    
  } ;

//---------used in feature-section component:
export interface FeatureItem {
    id: number;
    heading: string;
    subheading: string;
    icon: string;
} ;

export interface FeaturesSection {
    id: number;
    __component: string;
    title: string | null;
    description: string | null;
    features: FeatureItem[];
} ;

//------ used in hero-section component :
interface ImageAttributes {
    url: string;
    alternativeText: string | null;
  }
  
  interface ImageData {
    id: number;
    attributes: ImageAttributes;
  }
  
  interface Image {
    data: ImageData;
  }
  
  interface Link {
    id: number;
    name: string;
    url: string;
    isExternal: boolean;
  }
  
  export interface HeroSection {
    id: number;
    __component: string; // Should be "sections.hero-section"
    heading: string;
    subheading: string;
    image: Image;
    link: Link[];
  }

  export interface Footer{
    id:number ;
    logo:Link;
    button : Link;
  }