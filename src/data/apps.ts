export interface AppFeature {
  title: string;
  description: string;
  icon: string;
}

export interface AppFAQ {
  question: string;
  answer: string;
}

export interface AppDefinition {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  category: "Construction" | "Business" | "Finance" | "Growth" | "Security" | "Sports" | "Insurance";
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
      { title: "Save 60% on Estimation Time", description: "AI cuts manual estimation from days to minutes." },
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
    metrics: { label: "Active Projects", value: "2,400+" },
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
    id: "flacron-connect-ai",
    slug: "flacronconnect-ai",
    name: "FlacronConnect AI",
    tagline: "Lead generation and customer engagement powered by AI.",
    shortDescription:
      "Intelligent CRM and outreach automation that finds, nurtures, and converts leads for growing businesses.",
    longDescription:
      "FlacronConnect AI is an end-to-end growth platform that combines AI-driven lead generation, automated multi-channel outreach, and intelligent CRM into one streamlined system. Stop chasing cold leads and start converting warm prospects. Built for small businesses, agencies, and sales teams that want to grow faster without hiring more staff.",
    category: "Business",
    status: "live",
    targetAudience: ["Small Business Owners", "Sales Teams", "Marketing Agencies", "B2B Companies", "Startup Founders"],
    industries: ["Business Services", "Marketing", "Real Estate", "Finance", "Professional Services"],
    features: [
      {
        title: "AI Lead Discovery",
        description: "Automatically find high-quality prospects matching your ideal customer profile across multiple data sources.",
        icon: "Search",
      },
      {
        title: "Automated Outreach Sequences",
        description: "Multi-channel follow-up sequences via email, SMS, and social — personalised by AI for each lead.",
        icon: "Mail",
      },
      {
        title: "Smart CRM Pipeline",
        description: "Visual sales pipeline with AI-powered lead scoring, deal health alerts, and next-action recommendations.",
        icon: "Kanban",
      },
      {
        title: "Conversation Intelligence",
        description: "AI analyses every sales conversation to surface insights, coaching tips, and winning patterns.",
        icon: "MessageSquare",
      },
      {
        title: "Revenue Forecasting",
        description: "Predictive models give you an accurate picture of pipeline revenue weeks ahead of closing.",
        icon: "TrendingUp",
      },
    ],
    benefits: [
      { title: "3× More Leads", description: "AI sourcing surfaces more qualified leads than manual prospecting." },
      { title: "Automated Follow-Up", description: "Never miss a follow-up — sequences run automatically on your schedule." },
      { title: "Close Deals Faster", description: "AI insights cut sales cycles by identifying the right moment to act." },
      { title: "Full Visibility", description: "See every deal, every interaction, and every revenue forecast in one view." },
    ],
    useCases: [
      "B2B lead generation for service businesses",
      "Automated sales follow-up for small teams",
      "Client pipeline management for agencies",
      "Inbound lead nurturing and qualification",
      "Revenue forecasting for sales managers",
    ],
    problem:
      "Most businesses lose revenue because their follow-up is inconsistent, their CRM is underused, and their sales team spends more time on admin than actually selling.",
    solution:
      "FlacronConnect AI automates the entire lead-to-customer journey — from discovery to close — so your team focuses on relationships while the AI handles the rest.",
    techStack: ["React", "Node.js", "OpenAI", "MongoDB"],
    metrics: { label: "Deals Closed", value: "18K+" },
    faqs: [
      { question: "Do I need technical skills to use it?", answer: "No. FlacronConnect AI is designed for non-technical users with a guided setup and intuitive dashboard." },
      { question: "What channels does the outreach cover?", answer: "Email, SMS, LinkedIn, and WhatsApp — all managed from one inbox." },
      { question: "Can I import my existing contacts?", answer: "Yes. You can import from CSV, Google Contacts, or connect your existing CRM." },
      { question: "Is there a free trial?", answer: "Yes. You can start a 14-day free trial with no credit card required." },
    ],
    primaryCTA: { label: "Get Started Free", href: "/book-demo" },
    secondaryCTA: { label: "Book a Demo", href: "/book-demo" },
    demoURL: "/book-demo",
    seo: {
      title: "FlacronConnect AI — Lead Generation & CRM Platform | Flacron Enterprises",
      description: "AI-powered lead generation, automated outreach, and smart CRM for growing businesses. Close more deals with less manual work.",
      keywords: ["lead generation", "AI CRM", "sales automation", "outreach platform", "small business CRM"],
    },
  },
  {
    id: "rapid-claim-pro",
    slug: "rapidclaimpro",
    name: "RapidClaimPro",
    tagline: "Claims intake and automation that resolves faster.",
    shortDescription:
      "End-to-end claims management platform to simplify intake, reduce fraud, and accelerate resolution for insurers and adjusters.",
    longDescription:
      "RapidClaimPro reimagines the insurance claims lifecycle. From first notice of loss to final settlement, every step is streamlined with intelligent automation, real-time status tracking, and AI-driven fraud detection. Insurers resolve claims faster, policyholders get answers sooner, and adjusters spend time on complex decisions — not paperwork.",
    category: "Insurance",
    status: "beta",
    targetAudience: ["Insurance Carriers", "Claims Adjusters", "Third-Party Administrators", "InsurTech Companies", "Policyholders"],
    industries: ["Insurance", "Finance", "Property & Casualty", "Health Insurance"],
    features: [
      {
        title: "Digital First Notice of Loss",
        description: "Mobile-friendly claim submission with photo uploads, GPS tagging, and instant acknowledgement.",
        icon: "Smartphone",
      },
      {
        title: "AI Document Processing",
        description: "OCR and NLP extract, validate, and classify claim documents in under 30 seconds.",
        icon: "FileSearch",
      },
      {
        title: "Fraud Detection Engine",
        description: "Behavioural and network-analysis models flag suspicious claims before any payment is issued.",
        icon: "ShieldAlert",
      },
      {
        title: "Automated Adjudication",
        description: "Rule-based plus ML automation approves straightforward claims instantly, routing complex ones to adjusters.",
        icon: "CheckCircle",
      },
      {
        title: "Policyholder Self-Service Portal",
        description: "Real-time claim status, document uploads, and live chat — all accessible without calling an agent.",
        icon: "Users",
      },
    ],
    benefits: [
      { title: "10× Faster Resolution", description: "Automation cuts average claim resolution from weeks to hours." },
      { title: "Reduce Fraudulent Payouts", description: "AI flags suspicious patterns before payments are approved." },
      { title: "Lower Processing Costs", description: "Straight-through processing reduces cost per claim significantly." },
      { title: "Better Policyholder Experience", description: "Self-service and real-time updates reduce call centre volume." },
    ],
    useCases: [
      "Property damage claim intake and processing",
      "Auto insurance claim automation",
      "Health claim adjudication and routing",
      "Fraud detection and prevention",
      "Multi-channel policyholder communication",
    ],
    problem:
      "Insurance claims are slow, paper-heavy, and frustrating for everyone involved. Fraud is rising, processing costs are climbing, and policyholders expect instant digital experiences.",
    solution:
      "RapidClaimPro digitises and automates the full claims lifecycle — intake, validation, adjudication, and payment — delivering faster resolutions and better outcomes for insurers and policyholders alike.",
    techStack: ["Python", "FastAPI", "Elasticsearch", "Azure ML"],
    faqs: [
      { question: "Is RapidClaimPro suitable for small insurers?", answer: "Yes. It scales from regional carriers to enterprise insurers and can be configured for any line of business." },
      { question: "How does the fraud detection work?", answer: "Our AI analyses claim patterns, policyholder history, and network connections to score every claim for fraud risk before payment." },
      { question: "Can policyholders submit claims on mobile?", answer: "Absolutely. The self-service portal is mobile-first and works on any device without an app download." },
      { question: "How long does integration take?", answer: "Standard integrations take 2–4 weeks. Our team handles the full implementation." },
    ],
    primaryCTA: { label: "Join Beta", href: "/contact" },
    secondaryCTA: { label: "Request Access", href: "/contact" },
    seo: {
      title: "RapidClaimPro — Insurance Claims Automation Platform | Flacron Enterprises",
      description: "Digital claims intake, AI fraud detection, and automated adjudication for insurers and adjusters. Currently in beta.",
      keywords: ["insurance claims automation", "claims management software", "fraud detection", "claims processing", "insurtech"],
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
    status: "coming-soon",
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
    name: "Tchitaka Growth",
    tagline: "Personal growth and transformation for the modern professional.",
    shortDescription:
      "A coaching, motivation, and personal development platform blending mindfulness, AI habits, and community mentorship.",
    longDescription:
      "Tchitaka Growth is a personal development ecosystem rooted in authentic human transformation. It combines guided coaching programmes, AI-driven habit intelligence, peer accountability, and community mentorship to help users align their daily actions with their biggest ambitions. More than an app — it is a movement for purposeful growth.",
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
      "Tchitaka Growth combines structured programmes, AI habit tracking, peer accountability, and expert coaching into one integrated platform that turns inspiration into consistent action.",
    techStack: ["React Native", "Supabase", "OpenAI", "Expo"],
    faqs: [
      { question: "When does Tchitaka Growth launch?", answer: "We are building our founding community now. Join the waitlist to get early access and shape the platform." },
      { question: "Do I need a coach to use it?", answer: "No. The platform is self-guided by default. Coaching is an optional add-on for users who want more personalised support." },
      { question: "Is it suitable for teams or organisations?", answer: "Yes. We plan to offer team and corporate editions for companies investing in employee growth." },
    ],
    primaryCTA: { label: "Join Waitlist", href: "/contact" },
    seo: {
      title: "Tchitaka Growth — Personal Growth & Coaching Platform | Flacron Enterprises",
      description: "AI-powered personal development, habit intelligence, and coaching community for professionals and entrepreneurs. Coming soon.",
      keywords: ["personal development app", "coaching platform", "habit tracking", "growth mindset", "mentorship app"],
    },
  },
  {
    id: "flacron-secure-ai",
    slug: "flacronsecure-ai",
    name: "FlacronSecure AI",
    tagline: "Enterprise cybersecurity powered by AI intelligence.",
    shortDescription:
      "Comprehensive cybersecurity platform for scanning, compliance, breach monitoring, and real-time threat intelligence.",
    longDescription:
      "FlacronSecure AI is a next-generation cybersecurity platform built for organisations that cannot afford to be reactive. Combining AI-driven threat detection, continuous compliance monitoring, dark web scanning, and automated incident response, FlacronSecure AI gives security teams the intelligence and automation they need to stay ahead of evolving threats.",
    category: "Security",
    status: "live",
    targetAudience: ["Enterprise Security Teams", "SOC Analysts", "CISOs", "Managed Security Providers", "Compliance Officers"],
    industries: ["Cybersecurity", "Finance", "Healthcare", "Government", "Enterprise Technology"],
    features: [
      {
        title: "Real-Time Threat Detection",
        description: "AI models process millions of security events per second to surface genuine threats with minimal false positives.",
        icon: "Radar",
      },
      {
        title: "Vulnerability Scanning",
        description: "Continuous scanning of your infrastructure, applications, and endpoints for known and zero-day vulnerabilities.",
        icon: "ScanLine",
      },
      {
        title: "Dark Web Monitoring",
        description: "Monitors dark web sources for leaked credentials, stolen data, and emerging threats targeting your organisation.",
        icon: "Globe",
      },
      {
        title: "Compliance Automation",
        description: "One-click compliance reports for ISO 27001, SOC 2, GDPR, and NIST with continuous evidence collection.",
        icon: "ClipboardCheck",
      },
      {
        title: "Automated Incident Response",
        description: "Pre-built playbooks automatically contain, isolate, and remediate threats without waiting for human intervention.",
        icon: "Zap",
      },
    ],
    benefits: [
      { title: "Detect Threats in Minutes", description: "AI reduces mean time to detect from weeks to minutes." },
      { title: "Stay Compliant Automatically", description: "Continuous evidence collection keeps you audit-ready at all times." },
      { title: "Protect Your Reputation", description: "Breach monitoring catches leaked data before it causes damage." },
      { title: "Reduce Security Team Burnout", description: "Automation handles routine tasks so analysts focus on real threats." },
    ],
    useCases: [
      "Enterprise SOC augmentation and automation",
      "GDPR and ISO 27001 compliance monitoring",
      "Breach detection and dark web monitoring",
      "Vulnerability management for cloud infrastructure",
      "Managed security service provider platform",
    ],
    problem:
      "Cyber threats are evolving faster than security teams can respond. Traditional security tools generate too many alerts, miss sophisticated attacks, and leave compliance as a manual, expensive burden.",
    solution:
      "FlacronSecure AI unifies threat detection, compliance, vulnerability management, and incident response on one intelligent platform — giving teams the automation and intelligence to stay ahead of threats without burning out.",
    techStack: ["Kafka", "Elasticsearch", "Python ML", "Kubernetes"],
    metrics: { label: "Threats Blocked", value: "1.2M+" },
    faqs: [
      { question: "How long does deployment take?", answer: "Cloud-based deployment is live within 24 hours. On-premise options typically take 1–2 weeks." },
      { question: "Which compliance frameworks are supported?", answer: "ISO 27001, SOC 2, GDPR, NIST CSF, PCI-DSS, and HIPAA — with more being added." },
      { question: "Does it replace our existing SIEM?", answer: "It can work alongside your existing SIEM or replace it entirely, depending on your needs." },
      { question: "Is it suitable for small security teams?", answer: "Yes. Automation is specifically designed to give small teams enterprise-level capabilities." },
    ],
    primaryCTA: { label: "Request Access", href: "/book-demo" },
    secondaryCTA: { label: "Book a Demo", href: "/book-demo" },
    demoURL: "/book-demo",
    seo: {
      title: "FlacronSecure AI — Enterprise Cybersecurity Platform | Flacron Enterprises",
      description: "AI-powered threat detection, compliance automation, vulnerability scanning, and breach monitoring for enterprise security teams.",
      keywords: ["cybersecurity platform", "AI threat detection", "compliance automation", "SIEM", "vulnerability scanning"],
    },
  },
];

export function getAppBySlug(slug: string): AppDefinition | undefined {
  return apps.find((app) => app.slug === slug);
}
