import { HeroSlide, PackageItem, BuilderStep, PartnerTypeItem, FaqGroup } from "./types";

// Static imports of the generated premium assets so Vite correctly compiles them in the production bundle
import apartmentSpreadImg from "./assets/images/gourmet_apartment_spread_1782066271656.jpg";
import wickerHamperImg from "./assets/images/wicker_hamper_classic_1782066288761.jpg";
import celebrationImg from "./assets/images/celebration_candlelit_spread_1782066317226.jpg";
import dogWelcomeImg from "./assets/images/dog_welcome_pack_1782066304183.jpg";

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    headlinePrefix: "First 24 Hours, ",
    italicWord: "completely sorted",
    headlineSuffix: "",
    description: "Your flagship pre-arrival welcome hamper. Farm-fresh milk, organic eggs, cured charcuterie, and warm sourdough bread waiting in your kitchen the moment you step inside.",
    bgGradient: "from-dark/95 via-[#1b1915]/95 to-dark/90",
  },
  {
    id: 2,
    headlinePrefix: "A welcome that feels ",
    italicWord: "genuinely special",
    headlineSuffix: "",
    description: "Pour a gorgeous glass of chilled, hand-selected vintage paired beautifully with gold-medal award-winning local cheeses and premium dry nibbles. No supermarket runs required.",
    bgGradient: "from-dark/95 via-[#1c1410]/95 to-dark/90",
  },
  {
    id: 3,
    headlinePrefix: "Skip the supermarket ",
    italicWord: "after the long drive",
    headlineSuffix: "",
    description: "Step into a fully pre-provisioned larder. Artisan breakfast kits, chef-crafted dinner hampers, juices, and children's treats are stacked and cooled in your fridge.",
    bgGradient: "from-dark/95 via-[#161a15]/95 to-dark/90",
  },
  {
    id: 4,
    headlinePrefix: "Birthdays, honeymoons & ",
    italicWord: "milestone moments",
    headlineSuffix: "",
    description: "Surprise someone special with a chilled premium Champagne flute, hand-rolled dark truffles, and gorgeous freshly-cut field wildflowers arranged beautifully on arrival.",
    bgGradient: "from-dark/95 via-[#1f161b]/95 to-dark/90",
  },
];

export const PACKAGES: PackageItem[] = [
  {
    id: "first-24-hours",
    name: "First 24 Hours Sorted",
    price: 89,
    category: "couples,families,groups",
    badge: "Flagship",
    emoji: "🌟",
    description: "An absolute essential. Farmhouse eggs, dry-cured bacon, salted butter, sourdough, fresh milk, and evening charcuterie.",
    imageUrl: apartmentSpreadImg,
    gradientFrom: "from-accent/30",
    gradientTo: "to-accent-light/10",
  },
  {
    id: "wine-cheese-nibbles",
    name: "Wine, Cheese & Nibbles",
    price: 65,
    category: "couples,occasions",
    badge: "Premium",
    emoji: "🍷",
    description: "A bottle of English sparkling or reserve red, paired with three local cheeses, crackers, and house rosemary almonds.",
    imageUrl: wickerHamperImg,
    gradientFrom: "from-[#4B1E2F]/40",
    gradientTo: "to-[#6B2F40]/10",
  },
  {
    id: "family-no-shop",
    name: "Family No-Shop Bundle",
    price: 149,
    category: "families",
    badge: "Family",
    emoji: "🏡",
    description: "Feeds a family of four for the first stay cycle. Pancakes, fruit box, spaghetti night kit, and snacks galore.",
    gradientFrom: "from-sage/30",
    gradientTo: "to-sage-pale/10",
  },
  {
    id: "classic-arrival",
    name: "Classic Arrival Pack",
    price: 39,
    category: "couples,groups",
    badge: "Cozy",
    emoji: "☕",
    description: "Arrive to hot tea and sourdough toast. Artisan butter, strawberry jam, English breakfast tea, freshly ground coffee.",
    gradientFrom: "from-accent-light/20",
    gradientTo: "to-stone/10",
  },
  {
    id: "celebration-ready",
    name: "Celebration Ready",
    price: 75,
    category: "occasions,couples",
    badge: "Celebration",
    emoji: "🥂",
    description: "A bottle of chilled Champagne, dynamic hand-rolled dark chocolate truffles, and a hand-written greeting of your choice.",
    imageUrl: celebrationImg,
    gradientFrom: "from-accent/40",
    gradientTo: "to-[#D4AF37]/10",
  },
  {
    id: "group-house-starter",
    name: "Group House Starter",
    price: 299,
    category: "groups",
    badge: "Group",
    emoji: "🏰",
    description: "Designed for grand weekends. local beers and ciders, shared grazing boards, brunch kits, and sparkling juices.",
    gradientFrom: "from-[#1F2937]/50",
    gradientTo: "to-stone/10",
  },
  {
    id: "dog-friendly-pack",
    name: "Dog-Friendly Welcome Pack",
    price: 25,
    category: "families,groups",
    badge: "Pet-Friendly",
    emoji: "🐾",
    description: "A delightful greeting for your dog. Organic grain-free biscuits, premium chew toys, and clean biodegradable bags.",
    imageUrl: dogWelcomeImg,
    gradientFrom: "from-sage/20",
    gradientTo: "to-stone/10",
  },
  {
    id: "local-hero-hamper",
    name: "Local Hero Hamper",
    price: 79,
    category: "occasions",
    badge: "Bespoke",
    emoji: "🍯",
    description: "100% sourced within 20 miles. Kentish honey, Sussex cider, artisanal sourdough, farm-made preserves, and regional cheeses.",
    gradientFrom: "from-accent-light/35",
    gradientTo: "to-accent-pale/20",
  },
  {
    id: "full-english-kit",
    name: "Full English Breakfast Kit",
    price: 45,
    category: "families,couples",
    badge: "Breakfast",
    emoji: "🍳",
    description: "Award-winning pork sausages, black pudding, outdoor-reared bacon, field mushrooms, vine tomatoes, and farm eggs.",
    gradientFrom: "from-charcoal/20",
    gradientTo: "to-stone/10",
  },
];

export const BUILDER_STEPS: BuilderStep[] = [
  {
    number: 1,
    title: "Choose your base package",
    description: "Every great hamper starts with a premium foundation designed for a perfect first evening.",
    options: [
      { id: "base-none", name: "No Base Package (Custom Only)", price: 0, description: "Build entirely from scratch without an initial set" },
      { id: "base-first-24", name: "First 24 Hours Sorted", price: 89, description: "Includes farm milk, organic eggs, cured meats, and local sourdough bread" },
      { id: "base-classic", name: "Classic Arrival Pack", price: 39, description: "Essential butter, strawberry preserves, breakfast tea, and freshly ground coffee" },
      { id: "base-wine-cheese", name: "Wine, Cheese & Nibbles", price: 65, description: "A fine vintage bottle paired with award-winning English cheeses" },
      { id: "base-family", name: "Family No-Shop Bundle", price: 149, description: "Generous pantry staples, fruit bowl, simple pasta kit, and breakfast" },
      { id: "base-group", name: "Group House Starter", price: 299, description: "Maximized grazing boards, regional beers, cider, and double brunch size packs" },
    ],
  },
  {
    number: 2,
    title: "Add a breakfast box (optional)",
    description: "Wake up to fresh British ingredients ready to cook, or a classic continental spread.",
    options: [
      { id: "breakfast-none", name: "No breakfast box requested", price: 0 },
      { id: "breakfast-traditional", name: "Traditional Full English Kit", price: 45, description: "Premium bacon, farm sausages, vine tomatoes, eggs, and local black pudding" },
      { id: "breakfast-continental", name: "Fresh Continental Bakery Basket", price: 28, description: "Warm butter croissants, pain au chocolat, squeeze juice, and house marmalade" },
      { id: "breakfast-salmon", name: "Luxury Smoked Salmon & Avocado Platter", price: 38, description: "Hampshire smoked salmon, organic Hass avocado, brioche buns, and fresh lemon wedges" },
    ],
  },
  {
    number: 3,
    title: "Pick a first-night dinner (optional)",
    description: "Avoid cooking stress or checking out take-away apps on your night of arrival.",
    options: [
      { id: "dinner-none", name: "No dinner box requested", price: 0 },
      { id: "dinner-pasta", name: "Artisanal Pasta & Truffle Garlic Bread", price: 32, description: "Freshly cut flour-and-egg tagliatelle, wild truffle pesto, and stone-baked garlic baguette" },
      { id: "dinner-pie", name: "Kentish Beef & Ale Gastro Pie", price: 39, description: "A deep-dish award-winning butcher pie with gourmet root veggies, ready for a 30-min oven bake" },
      { id: "dinner-camembert", name: "Charcuterie & Warm Camembert Skillet", price: 34, description: "Baking Camembert, rosemary sprigs, local honey drizzle, and an exceptional cured meat plate" },
    ],
  },
  {
    number: 4,
    title: "Finishing touches",
    description: "Select as many luxuries and local trinkets as you wish to complete the stay.",
    isMultiSelect: true,
    options: [
      { id: "touch-prosecco", name: "Chilled Bottle of Artisanal Prosecco", price: 22, description: "Kept cooled in your accommodation's fridge prior to your check-in" },
      { id: "touch-wildflowers", name: "Freshly Cut Seasonal Wildflower Vase", price: 30, description: "Sourced from local farms, pre-arranged beautifully in a glass jar on the counter" },
      { id: "touch-extra-bread", name: "Extra Sourdough & Farmhouse Butter", price: 8, description: "Perfect as an addition for late-night toast craving" },
      { id: "touch-truffles", name: "Luxury Hand-Rolled Dark Truffles", price: 15, description: "An award-winning box of 6 decadent melt-in-mouth dark cocoa truffles" },
    ],
  },
];

export const PARTNER_TYPES: PartnerTypeItem[] = [
  {
    id: "cottages",
    title: "Cottages & Lodges",
    description: "Give remote self-catering guests a warm welcome, saving them an immediate tedious drive to local supermarkets.",
    propertiesRange: "Perfect for single cottages to country estates.",
    iconName: "Home",
  },
  {
    id: "apartments",
    title: "Serviced Apartments",
    description: "Tailor the arrival for corporate travellers and urban weekenders looking for an instantly stocked kitchen.",
    propertiesRange: "Ideal for city center blocks & boutique stays.",
    iconName: "Building",
  },
  {
    id: "hotels",
    title: "Boutique Hotels",
    description: "Unburden your room service kitchen by outsourcing premium local regional hampers directly to bedrooms.",
    propertiesRange: "Suited for 10-100 room luxury accommodations.",
    iconName: "Hotel",
  },
  {
    id: "villas",
    title: "Villas & Big Houses",
    description: "Provide sprawling group parties with a fully coordinated feast, minimizing host stress upon move-in week.",
    propertiesRange: "Best for properties sleeping 8 to 24+ guests.",
    iconName: "Sparkles",
  },
];

export const FAQ_GROUPS: FaqGroup[] = [
  {
    category: "Booking & Timing",
    items: [
      {
        question: "Why do you require a minimum 72-hour notice period?",
        answer: "To ensure absolute freshness and zero food waste, we source all dairy, baked goods, and meat products dynamically from our regional farms and artisan bakeries upon booking order. This 72-hour notice window guarantees our bakers and farmers can prepare your selection perfectly in time for packing.",
        isLongNotice: true,
      },
      {
        question: "What is your cancellation and amendment policy?",
        answer: "We understand plans change. You can cancel your order for a 100% full refund or amend selection up to 72 hours before your scheduled arrival. Inside that 72-hour window, the local orders are already customized, placed, and dispatched with our farming partners, so cancellations or modifications cannot be refunded.",
      },
      {
        question: "How do you coordinate delivery if I don't have the key?",
        answer: "That is the absolute core of the Hamper*Key* system! We coordinate directly with your hotel front desk, Airbnb host, cottage booking agent, or property manager before your stay. They open the door for our trusted delivery concierge, who sets up your goods, stocks the fridge, and departs before you cross the threshold.",
      },
    ],
  },
  {
    category: "Coverage & Delivery",
    items: [
      {
        question: "Where exactly do you deliver today?",
        answer: "We currently cover London (Zones 1-6), South East England (including Kent, Surrey, Sussex, Hampshire, and Hertfordshire), and the East of England (Essex, Suffolk, Norfolk, and Cambridgeshire). We are continuously launching coverage in the South West, Yorkshire, and the Cotswolds soon.",
      },
      {
        question: "How is the food temperature managed in transit?",
        answer: "Our deliveries are made with custom refrigerated vans. Refrigerated components of your hamper are kept at 2–4°C in state-of-the-art wool-insulated packaging with ice packs, which we transfer directly into your property's refrigerator. Dry products sit beautifully in our woven key crates on your counter.",
      },
    ],
  },
  {
    category: "Dietary & Product",
    items: [
      {
        question: "Do you cater for gluten-free, vegan or dairy-free guests?",
        answer: "Absolutely. During checkout (or during the build phase), you can tick standard allergy requirements. In our 'First 24 Hours Sorted' package, we swap out traditional sourdough for gluten-free bread and replace dairy butter with cold-pressed local olive butter or organic oat alternatives.",
      },
      {
        question: "Is the meat and produce organically and humanely sourced?",
        answer: "Yes, we prioritize local animal welfare. All bacon, sausages, and eggs in our breakfast kits come from RSPCA-assured local farms in Kent and Suffolk, where animals are outdoor reared. Our green grocers provide organically grown vine tomatoes and fruits of peak-seasonal freshness.",
      },
    ],
  },
  {
    category: "For Hosts & Property Managers",
    items: [
      {
        question: "How do Property Owners partner with HamperKey?",
        answer: "Host partners can integrate our gourmet booking widget into their email booking confirmation flows or listing notes. When guests purchase a hamper, hosts earn a 10% to 20% passive commission on every order, and it's 100% free with no contract fees for the first 10 listings.",
      },
      {
        question: "Does the guest require our staff to meet your courier?",
        answer: "No. Our couriers are vetted, insured, and highly trained. We establish key safe codes or secure access procedures directly in our Partner Portal with you, allowing us to drop off and arrange the goods independently inside your designated check-in window.",
      },
    ],
  },
];
