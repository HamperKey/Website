export interface HeroSlide {
  id: number;
  headlinePrefix: string;
  italicWord: string;
  headlineSuffix: string;
  description: string;
  bgGradient: string;
}

export interface PackageItem {
  id: string;
  name: string;
  price: number;
  category: string; // 'couples' | 'families' | 'groups' | 'occasions'
  badge: "Flagship" | "Premium" | "Family" | "Cozy" | "Celebration" | "Group" | "Pet-Friendly" | "Bespoke" | "Breakfast";
  emoji: string;
  description: string;
  imageUrl?: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  emoji?: string;
  category?: string;
  details?: string;
}


export interface BuilderOption {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface BuilderStep {
  number: number;
  title: string;
  description: string;
  isMultiSelect?: boolean;
  options: BuilderOption[];
}

export interface PartnerTypeItem {
  id: string;
  title: string;
  description: string;
  propertiesRange: string;
  iconName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  isLongNotice?: boolean; // highlight the 72h rule
}

export interface FaqGroup {
  category: string;
  items: FaqItem[];
}
