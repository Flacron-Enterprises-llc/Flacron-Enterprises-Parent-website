export interface AppFeature {
  title: string;
  description: string;
  icon: string;
}

export interface AppFAQ {
  question: string;
  answer: string;
}

export type AppCategory =
  | "Construction"
  | "Business"
  | "Finance"
  | "Growth"
  | "Security"
  | "Sports"
  | "Insurance"
  | "Energy"
  | "Marketing"
  | "Community";

/** Every category, in display order. Filters only show the ones the current product list actually uses. */
export const APP_CATEGORIES: AppCategory[] = [
  "Construction",
  "Insurance",
  "Business",
  "Marketing",
  "Finance",
  "Energy",
  "Security",
  "Sports",
  "Growth",
  "Community",
];

export interface AppDefinition {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  category: AppCategory;
  status: "live" | "beta" | "coming-soon" | "internal";
  targetAudience: string[];
  industries: string[];
  features: AppFeature[];
  benefits: { title: string; description: string }[];
  useCases: string[];
  problem: string;
  solution: string;
  techStack: string[];
  metrics?: { label: string; value: string };
  faqs: AppFAQ[];
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  demoURL?: string;
  /** https URL of a transparent product logo mark. Falls back to initials when missing or when it fails to load. */
  logoUrl?: string;
  /** The product's live website. */
  websiteUrl?: string;
  seo: { title: string; description: string; keywords: string[] };
}

export const apps: AppDefinition[] = [
  {
    id: "flacron-build",
    slug: "flacronbuild",
    name: "FlacronBuild",
    tagline: "AI-powered construction and insurance estimation platform.",
    shortDescription:
      "Smart estimation, project management, and compliance tools for contractors, adjusters, inspectors, and property owners.",
    longDescription:
      "FlacronBuild transforms how the construction and insurance industries handle estimation, project planning, and compliance. Powered by AI, it delivers accurate cost estimates in minutes, streamlines field inspections, and keeps every stakeholder aligned from groundbreaking to handover. Built for the complexities of real construction projects — not spreadsheets.",
    category: "Construction",
    status: "live",
    targetAudience: ["General Contractors", "Property Owners", "Insurance Adjusters", "Home Inspectors", "Property Developers"],
    industries: ["Construction", "Insurance", "Real Estate", "Property Management"],
    features: [
      {
        title: "AI Cost Estimation",
        description: "Generate accurate construction cost estimates in minutes using AI trained on thousands of real projects.",
        icon: "Calculator",
      },
      {
        title: "Project Management Dashboard",
        description: "Track milestones, resources, and team progress across multiple sites from one unified dashboard.",
        icon: "LayoutDashboard",
      },
      {
        title: "Field Inspection Tools",
        description: "Mobile-first inspection workflows with photo capture, damage tagging, and instant report generation.",
        icon: "ClipboardCheck",
      },
      {
        title: "Compliance & Permit Tracking",
        description: "Centralised document management for permits, HSE reports, and regulatory deadlines with automated alerts.",
        icon: "ShieldCheck",
      },
      {
        title: "Insurance Integration",
        description: "Direct integration with major insurers for seamless claim initiation, adjuster assignment, and payout tracking.",
        icon: "FileText",
      },
    ],
    benefits: [
      { title: "Faster Estimates", description: "AI cuts manual estimation from days to minutes." },
      { title: "Reduce Cost Overruns", description: "Real-time budget tracking catches overruns before they escalate." },
      { title: "Faster Claims Resolution", description: "Automated inspection reports accelerate insurance claims." },
      { title: "One Platform, Every Stakeholder", description: "Owners, contractors, and adjusters collaborate in one place." },
    ],
    useCases: [
      "Residential renovation cost estimation",
      "Commercial construction project management",
      "Post-disaster insurance damage assessment",
      "Multi-site contractor coordination",
      "Permit and compliance tracking",
    ],
    problem:
      "Construction projects and insurance claims are plagued by slow manual estimates, disconnected tools, and miscommunication between contractors, adjusters, and property owners — leading to cost overruns, delays, and disputed claims.",
    solution:
      "FlacronBuild unifies estimation, project management, and insurance workflows on one AI-powered platform, giving every stakeholder real-time visibility and reducing errors from day one.",
    techStack: ["Next.js", "PostgreSQL", "Python AI", "AWS"],
    faqs: [
      { question: "Who is FlacronBuild for?", answer: "Contractors, property developers, insurance adjusters, home inspectors, and property owners who need a smarter way to estimate, manage, and document construction work." },
      { question: "Does it work on mobile?", answer: "Yes. The inspection and field tools are fully mobile-optimised for on-site use." },
      { question: "Can it integrate with my existing project management tools?", answer: "FlacronBuild offers integrations with popular platforms and an open API for custom connections." },
      { question: "Is my data secure?", answer: "All data is encrypted at rest and in transit. We comply with industry security standards." },
    ],
    primaryCTA: { label: "Start Free Trial", href: "/book-demo" },
    secondaryCTA: { label: "Book a Demo", href: "/book-demo" },
    demoURL: "/book-demo",
    seo: {
      title: "FlacronBuild — AI Construction & Insurance Estimation Platform | Flacron Enterprises",
      description: "AI-powered construction cost estimation, project management, and insurance claims platform for contractors, adjusters, and property owners.",
      keywords: ["construction software", "AI estimation", "insurance claims", "project management", "contractor tools"],
    },
  },
  {
    id: "flacron-sport",
    slug: "flacronsport",
    name: "FlacronSport",
    tagline: "Sports media and fan engagement ecosystem powered by AI.",
    shortDescription:
      "A next-generation platform connecting sports brands, athletes, and fans through AI-driven content, engagement, and community tools.",
    longDescription:
      "FlacronSport is building the future of sports engagement. By combining AI content creation, fan community management, athlete brand tools, and real-time sports data, FlacronSport helps sports organisations, media companies, and athletes grow their audiences and monetise their brand at scale.",
    category: "Sports",
    status: "live",
    targetAudience: ["Sports Clubs & Teams", "Athletes & Agents", "Sports Media Companies", "Fan Communities", "Sports Marketers"],
    industries: ["Sports", "Media & Entertainment", "Marketing", "Broadcasting"],
    features: [
      {
        title: "AI Content Studio",
        description: "Generate match highlights, social posts, and fan-facing content automatically using AI and real-time data.",
        icon: "Video",
      },
      {
        title: "Fan Engagement Hub",
        description: "Polls, predictions, leaderboards, and community spaces that keep fans active between matchdays.",
        icon: "Users",
      },
      {
        title: "Athlete Brand Platform",
        description: "Tools for athletes to grow their personal brand, manage sponsorships, and connect directly with fans.",
        icon: "Star",
      },
      {
        title: "Live Data Integration",
        description: "Real-time scores, stats, and visualisations embedded into every fan experience.",
        icon: "Activity",
      },
      {
        title: "Monetisation Engine",
        description: "Ticketing, merchandise, memberships, and digital collectibles — all managed from one dashboard.",
        icon: "DollarSign",
      },
    ],
    benefits: [
      { title: "Grow Fan Bases Faster", description: "AI-generated content keeps audiences engaged year-round." },
      { title: "New Revenue Streams", description: "Digital memberships and collectibles open monetisation beyond matchdays." },
      { title: "Athlete Brand Growth", description: "Personal brand tools help athletes build audiences and attract sponsors." },
      { title: "Deeper Fan Relationships", description: "Community tools turn passive viewers into active superfans." },
    ],
    useCases: [
      "Football club fan engagement app",
      "Athlete personal brand management",
      "Sports media AI content production",
      "Digital fan club and membership platform",
      "Live sports data visualisation",
    ],
    problem:
      "Sports organisations struggle to keep fans engaged beyond matchdays, athletes lack tools to build direct-to-fan relationships, and media teams spend too much time on manual content production.",
    solution:
      "FlacronSport delivers an integrated ecosystem of AI content tools, fan engagement features, and monetisation infrastructure that works together to grow sports brands and deepen fan loyalty.",
    techStack: ["React Native", "Next.js", "WebSockets", "GCP"],
    faqs: [
      { question: "When will FlacronSport launch?", answer: "We are currently accepting early access partners. Join the waitlist to be among the first organisations onboarded." },
      { question: "Is it for professional clubs only?", answer: "No. FlacronSport is built for any sports organisation — from grassroots clubs to professional teams and individual athletes." },
      { question: "Can it integrate with our existing app?", answer: "Yes. FlacronSport offers an API and SDK for embedding features into existing digital products." },
    ],
    primaryCTA: { label: "Join Waitlist", href: "/contact" },
    seo: {
      title: "FlacronSport — AI Sports Media & Fan Engagement Platform | Flacron Enterprises",
      description: "AI-powered sports content creation, fan engagement, and athlete brand management platform. Coming soon.",
      keywords: ["sports technology", "fan engagement", "sports media AI", "athlete branding", "sports platform"],
    },
  },
  {
    id: "being-tchitaka",
    slug: "beingtchitaka",
    name: "Being Tchitaka OS",
    tagline: "Personal growth and transformation for the modern professional.",
    shortDescription:
      "A coaching, motivation, and personal development platform blending mindfulness, AI habits, and community mentorship.",
    longDescription:
      "Being Tchitaka OS is a personal development ecosystem rooted in authentic human transformation. It combines guided coaching programmes, AI-driven habit intelligence, peer accountability, and community mentorship to help users align their daily actions with their biggest ambitions. More than an app — it is a movement for purposeful growth.",
    category: "Growth",
    status: "coming-soon",
    targetAudience: ["Young Professionals", "Entrepreneurs", "Students & Graduates", "Life Coaches", "Anyone Seeking Growth"],
    industries: ["Personal Development", "Education", "Coaching", "Wellness"],
    features: [
      {
        title: "Guided Growth Programmes",
        description: "Structured 30, 60, and 90-day transformation journeys designed by coaches, psychologists, and mentors.",
        icon: "Compass",
      },
      {
        title: "AI Habit Intelligence",
        description: "Tracks your habits, identifies your peak performance windows, and adapts your daily plan automatically.",
        icon: "Zap",
      },
      {
        title: "Community & Accountability Circles",
        description: "Join small groups with shared goals for peer accountability, celebration, and support.",
        icon: "Users",
      },
      {
        title: "Reflective Journaling",
        description: "AI-prompted journaling that reveals patterns in your thinking and highlights how far you have come.",
        icon: "BookOpen",
      },
      {
        title: "1-on-1 Coaching Access",
        description: "Book sessions with verified coaches and mentors directly through the platform.",
        icon: "MessageCircle",
      },
    ],
    benefits: [
      { title: "Consistent Progress", description: "AI-adapted plans keep you on track even when motivation dips." },
      { title: "Real Community", description: "Accountability circles create genuine human connection and shared momentum." },
      { title: "Proven Frameworks", description: "Programmes are built on research-backed coaching and psychology." },
      { title: "Clarity of Purpose", description: "Journaling and reflection tools help you understand what you truly want." },
    ],
    useCases: [
      "Career transition and professional reinvention",
      "Entrepreneurial mindset development",
      "Health and wellness habit formation",
      "Leadership and confidence building",
      "Graduate early career growth",
    ],
    problem:
      "Personal development content is abundant but fragmented. Most people consume motivational content without changing anything because they lack structure, accountability, and community.",
    solution:
      "Being Tchitaka OS combines structured programmes, AI habit tracking, peer accountability, and expert coaching into one integrated platform that turns inspiration into consistent action.",
    techStack: ["React Native", "Supabase", "OpenAI", "Expo"],
    faqs: [
      { question: "When does Being Tchitaka OS launch?", answer: "We are building our founding community now. Join the waitlist to get early access and shape the platform." },
      { question: "Do I need a coach to use it?", answer: "No. The platform is self-guided by default. Coaching is an optional add-on for users who want more personalised support." },
      { question: "Is it suitable for teams or organisations?", answer: "Yes. We plan to offer team and corporate editions for companies investing in employee growth." },
    ],
    primaryCTA: { label: "Join Waitlist", href: "/contact" },
    seo: {
      title: "Being Tchitaka OS — Personal Growth & Coaching Platform | Flacron Enterprises",
      description: "AI-powered personal development, habit intelligence, and coaching community for professionals and entrepreneurs. Coming soon.",
      keywords: ["personal development app", "coaching platform", "habit tracking", "growth mindset", "mentorship app"],
    },
  },
];

export function getAppBySlug(slug: string): AppDefinition | undefined {
  return apps.find((app) => app.slug === slug);
}
