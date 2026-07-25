import type { LegalDocumentData } from "@/components/LegalDocument";

export const termsAndConditions: LegalDocumentData = {
  title: "Terms and Conditions",
  effectiveDate: "June 19, 2025",
  lastUpdated: "July 17, 2026",
  intro: [
    { type: "p", text: "Welcome to Flacron Enterprises LLC. These Terms and Conditions (“Terms”) govern your access to and use of the websites, applications, platforms, products, software, AI-powered tools, digital services, mobile applications, web applications, and related services owned or operated by Flacron Enterprises LLC." },
    { type: "p", text: "These Terms apply to all current and future products, services, platforms, and applications operated by Flacron Enterprises LLC, including, but not limited to, FlacronBuild, RapidClaimPro, FlacronConnect AI, and other Flacron products or services." },
    { type: "p", text: "These Terms form a legal agreement between you and Flacron Enterprises LLC (“Flacron,” “we,” “our,” or “us”). By accessing or using our websites, applications, platforms, software, products, or services, you agree to be bound by these Terms." },
    { type: "p", text: "If you do not agree with these Terms, you should not access or use our services." },
    { type: "p", text: "Because Flacron operates multiple applications across different industries, certain products may include additional product-specific rules, subscription terms, feature requirements, app-store requirements, or notices. If a product-specific notice conflicts with these general Terms, the product-specific notice will apply only to that product or feature." },
  ],
  sections: [
    {
      heading: "Company Information",
      blocks: [
        { type: "ul", items: ["Legal business name: Flacron Enterprises LLC", "Trade name: Flacron Enterprises", "Website: https://flacronenterprises.com/", "Email: contact@flacronenterprises.com", "Address: 410 E 95th St, Brooklyn, NY 11212, United States"] },
      ],
    },
    {
      heading: "Scope of Services",
      blocks: [
        { type: "p", text: "Flacron provides AI-powered software, digital tools, automation solutions, business applications, reporting tools, lead generation systems, workflow platforms, and industry-specific technology solutions. Our services may support users in areas such as:" },
        { type: "ul", items: ["Construction", "Insurance claims", "Inspections", "Business automation", "Customer communication", "Lead generation", "Sales workflows", "Marketing support", "Salons and service businesses", "Reporting and documentation", "AI-powered business productivity", "Other professional or business services"] },
        { type: "p", text: "Our apps may include FlacronBuild, RapidClaimPro, FlacronConnect AI, and future applications developed or operated by Flacron Enterprises LLC." },
      ],
    },
    {
      heading: "App-Specific Service Descriptions",
      blocks: [
        { type: "p", text: "3.1 FlacronBuild — FlacronBuild may provide construction-related tools, estimate support, document review, project summaries, inspection support, repair scope assistance, reporting, and AI-powered construction workflow features. FlacronBuild is designed to support construction and project workflows, but it does not replace professional judgment from licensed contractors, engineers, architects, inspectors, or other qualified professionals." },
        { type: "p", text: "3.2 RapidClaimPro — RapidClaimPro may provide insurance claim support tools, damage documentation, inspection summaries, repair estimate support, claim report generation, and related workflow features. RapidClaimPro is designed to assist with claim documentation and organization. It is not an insurance company, public adjuster, licensed adjuster, law firm, or insurance decision-maker. It does not guarantee claim approval, coverage, payment, settlement, or insurer acceptance." },
        { type: "p", text: "3.3 FlacronConnect AI — FlacronConnect AI may provide AI-powered business automation, customer communication, lead generation, CRM support, sales workflow assistance, marketing support, appointment support, and follow-up automation. FlacronConnect AI is designed to support business growth and workflow efficiency, but it does not guarantee sales, leads, revenue, conversions, customer acquisition, or business results." },
        { type: "p", text: "3.4 Future Flacron Applications — Future Flacron applications may include additional tools, industries, features, subscriptions, AI workflows, reporting systems, automation services, or mobile applications. These Terms apply to future Flacron apps unless a separate agreement, app-specific notice, or product-specific terms are provided." },
      ],
    },
    {
      heading: "Use of Our Services",
      blocks: [
        { type: "p", text: "You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services to:" },
        { type: "ul", items: ["Violate any applicable law, regulation, or legal requirement", "Infringe the rights of any person or organization", "Upload false, misleading, harmful, abusive, or illegal content", "Attempt to gain unauthorized access to our systems", "Interfere with the security or operation of our website, apps, or services", "Use our services to distribute spam, malware, viruses, or harmful code", "Copy, resell, reverse engineer, or misuse our software or technology", "Use our services for fraudulent, deceptive, discriminatory, or harmful activities", "Submit confidential, personal, customer, claim, project, or business data that you do not have permission to use", "Use our AI tools to create illegal, abusive, misleading, infringing, or harmful content", "Misrepresent AI-generated content as professionally verified when it has not been reviewed by a qualified professional"] },
        { type: "p", text: "We reserve the right to suspend or terminate access to our services if we believe you have violated these Terms." },
      ],
    },
    {
      heading: "Account Registration",
      blocks: [
        { type: "p", text: "Some services may require you to create an account. When creating an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account." },
        { type: "p", text: "You agree to notify us immediately if you believe your account has been accessed without authorization. You are responsible for ensuring that anyone using your account has permission to do so and complies with these Terms." },
        { type: "p", text: "We are not responsible for losses caused by your failure to protect your account information." },
      ],
    },
    {
      heading: "AI-Powered Tools and Generated Outputs",
      blocks: [
        { type: "p", text: "Flacron offers AI-powered tools that may generate reports, estimates, summaries, insights, recommendations, customer communications, business suggestions, claim summaries, construction-related outputs, marketing content, automation workflows, or other digital outputs." },
        { type: "p", text: "You understand and agree that AI-generated outputs may not always be complete, accurate, current, compliant, or suitable for your specific situation." },
        { type: "p", text: "You are responsible for reviewing, verifying, editing, and approving all AI-generated content before relying on it, publishing it, submitting it, using it for business decisions, or sharing it with others." },
        { type: "p", text: "AI-generated outputs should not be considered legal, financial, engineering, insurance, construction, medical, tax, accounting, or professional advice unless reviewed and approved by a qualified professional." },
        { type: "p", text: "Flacron Enterprises LLC is not responsible for decisions made based solely on AI-generated content." },
      ],
    },
    {
      heading: "User Content and Uploaded Materials",
      blocks: [
        { type: "p", text: "Our services may allow you to upload, submit, store, transmit, or process content, including documents, photos, project files, customer information, claim details, construction data, business information, CRM data, messages, marketing information, reports, or other materials (“User Content”)." },
        { type: "p", text: "You retain ownership of your User Content. By submitting User Content to our services, you grant Flacron Enterprises LLC a limited, non-exclusive, worldwide license to use, process, store, transmit, display, analyze, and modify that content solely as necessary to provide, improve, secure, maintain, and support our services." },
        { type: "p", text: "You represent and warrant that:" },
        { type: "ul", items: ["You own or have the necessary rights to submit the User Content", "Your User Content does not violate any law or third-party rights", "Your User Content does not contain malicious code or harmful materials", "Your User Content does not include confidential, personal, customer, project, claim, or business information that you are not authorized to share", "You have obtained any required permissions, notices, or consents before uploading data about customers, clients, employees, property owners, or other third parties"] },
        { type: "p", text: "We may remove or restrict User Content if we believe it violates these Terms, our policies, or applicable law." },
      ],
    },
    {
      heading: "Ownership and Intellectual Property",
      blocks: [
        { type: "p", text: "All content, software, designs, trademarks, logos, graphics, interfaces, text, features, technology, workflows, AI systems, models, prompts, templates, dashboards, reports, and other materials provided by Flacron Enterprises LLC are owned by or licensed to Flacron Enterprises LLC." },
        { type: "p", text: "You may not copy, reproduce, modify, distribute, sell, lease, sublicense, reverse engineer, or create derivative works based on our services unless we give you written permission." },
        { type: "p", text: "The legal business name “Flacron Enterprises LLC,” the trade name “Flacron Enterprises,” and all related product names, trademarks, service marks, logos, graphics, branding, designs, software, platforms, reports, workflows, and other proprietary materials are owned by or licensed to Flacron Enterprises LLC. This includes product names such as FlacronBuild, RapidClaimPro, FlacronConnect AI, and other current or future Flacron products." },
      ],
    },
    {
      heading: "Subscriptions, Payments, and Billing",
      blocks: [
        { type: "p", text: "Some services offered by Flacron Enterprises LLC may require payment through subscriptions, one-time purchases, usage-based billing, service packages, custom agreements, app stores, marketplaces, or other billing arrangements." },
        { type: "p", text: "Payments may be processed by third-party payment processors, app stores, marketplaces, Merchants of Record, resellers, or other authorized billing providers." },
        { type: "p", text: "By purchasing a paid service, you agree to pay all applicable prices, taxes, fees, and charges associated with your selected product, service, or plan." },
        { type: "p", text: "Unless otherwise stated at checkout or in a separate written agreement:" },
        { type: "ul", items: ["Subscription fees are billed in advance.", "Subscriptions may renew automatically at the selected billing interval.", "You authorize the applicable billing provider to charge your selected payment method.", "You are responsible for maintaining accurate and current billing information.", "Failure to complete payment may result in suspension or termination of paid access.", "Access to paid features depends on your active subscription or payment status.", "Prices, features, billing intervals, usage limits, and plan availability may change with reasonable notice."] },
        { type: "p", text: "The identity of the billing provider and the applicable transaction terms will normally be displayed during checkout or included in the transaction receipt." },
        { type: "p", text: "Purchases may also be subject to the buyer terms, billing procedures, cancellation processes, privacy policies, and refund policies of the provider that processed the transaction." },
        { type: "p", text: "Third-party payment processors, app stores, marketplaces, and Merchants of Record may maintain separate transaction procedures and policies. Flacron Enterprises LLC is not responsible for delays, outages, or processing failures caused solely by those third-party providers, except where applicable law provides otherwise." },
      ],
    },
    {
      heading: "Cancellations and Refunds",
      blocks: [
        { type: "p", text: "10.1 Subscription cancellations — You may cancel a subscription through:" },
        { type: "ul", items: ["Your account settings;", "The applicable billing or subscription-management portal;", "The transaction receipt or confirmation email;", "Your app-store or marketplace account; or", "Another cancellation method made available for the applicable service."] },
        { type: "p", text: "Unless otherwise stated or required by law, cancellation generally takes effect at the end of the current paid billing period. You may retain access to paid features until the end of that billing period. Cancellation prevents future renewal charges but does not automatically reverse or refund a transaction that has already been processed." },
        { type: "p", text: "10.2 Refund-request period — You may submit a refund request within 14 calendar days of the applicable transaction date. For recurring subscriptions, a refund request related to a renewal payment must be submitted within 14 calendar days of the applicable renewal transaction. Submitting a request within the 14-day period does not guarantee that a refund will be approved." },
        { type: "p", text: "10.3 Refund review — Refund requests are reviewed individually and may be evaluated based on:" },
        { type: "ul", items: ["The circumstances of the transaction;", "The product or service purchased;", "The reason for the request;", "Whether the product or service was accessed, used, downloaded, delivered, generated, or consumed;", "Whether credits or usage units were consumed;", "Whether custom or professional work has started;", "Whether a technical or billing error occurred;", "The policies of the billing provider that processed the transaction;", "Any applicable written agreement; and", "Applicable consumer-protection laws."] },
        { type: "p", text: "Depending on the circumstances, a refund request may result in a full refund; a partial refund; a credit or billing adjustment, where permitted; or a declined request. Flacron Enterprises LLC does not guarantee approval of every refund request." },
        { type: "p", text: "10.4 How to request a refund — Refund requests should generally be submitted through the billing provider, app store, marketplace, transaction receipt, or subscription-management portal associated with the transaction. Customers may also contact Flacron Enterprises LLC at: contact@flacronenterprises.com. The request should include your full name; the email address used for the purchase; the product or service purchased; the order, receipt, invoice, or transaction number; the transaction date; the billing provider used; the reason for the request; and supporting information or screenshots, where applicable. When a transaction was processed by a third party, the refund may need to be reviewed and issued through that same provider." },
        { type: "p", text: "10.5 Consumer rights — Nothing in these Terms limits any mandatory cancellation, withdrawal, repair, replacement, or refund rights available under applicable consumer-protection law. Where applicable law provides greater rights than these Terms, the legally required rights will apply." },
        { type: "p", text: "10.6 Access following a refund — When a full refund is issued, access to the associated subscription, software license, digital product, credits, reports, downloads, or paid features may be terminated. A partial refund may result in an adjustment to the customer’s plan, service access, credits, usage allowance, or account balance." },
        { type: "p", text: "For more details, please see our Cancellation and Refund Policy." },
      ],
    },
    {
      heading: "Free Trials, Beta Products, and Early Access",
      blocks: [
        { type: "p", text: "We may offer free trials, beta products, prototypes, early access features, test versions, or experimental services." },
        { type: "p", text: "These services may be incomplete, limited, changed, suspended, or discontinued at any time. Beta and early access services are provided “as is” and may contain errors, bugs, inaccuracies, or incomplete features." },
        { type: "p", text: "We are not responsible for losses or damages resulting from your use of beta, trial, prototype, or experimental services." },
      ],
    },
    {
      heading: "Third-Party Services and Integrations",
      blocks: [
        { type: "p", text: "Our website, applications, and services may connect to or rely on third-party tools, platforms, software, APIs, payment providers, hosting services, analytics services, AI providers, communication tools, CRM platforms, app stores, cloud services, or external websites." },
        { type: "p", text: "We are not responsible for the availability, accuracy, security, policies, pricing, performance, errors, outages, or practices of third-party services. Your use of third-party services may be subject to separate terms and privacy policies from those third parties." },
        { type: "p", text: "If you connect a third-party integration to our services, you authorize Flacron Enterprises LLC to exchange information with that third party as necessary to provide the integration." },
      ],
    },
    {
      heading: "Service Availability",
      blocks: [
        { type: "p", text: "We aim to provide reliable access to our services, but we do not guarantee that our website, applications, platforms, AI systems, or digital services will always be available, uninterrupted, secure, or error-free." },
        { type: "p", text: "We may modify, update, suspend, limit, or discontinue any part of our services at any time without liability." },
        { type: "p", text: "Service interruptions may occur due to maintenance, technical issues, security incidents, third-party provider failures, app store issues, cloud provider outages, internet disruptions, or circumstances beyond our control." },
      ],
    },
    {
      heading: "Acceptable Use",
      blocks: [
        { type: "p", text: "You agree not to misuse our services. Prohibited activities include, but are not limited to:" },
        { type: "ul", items: ["Attempting to hack, disrupt, overload, or damage our systems", "Accessing data, accounts, or systems without authorization", "Scraping, harvesting, or extracting data without permission", "Using bots, automated tools, or scripts in a harmful or unauthorized way", "Uploading malware, viruses, or harmful code", "Impersonating another person or organization", "Misrepresenting your identity, business, authority, qualifications, or relationship with Flacron Enterprises LLC", "Using our services to violate privacy, intellectual property, employment, housing, insurance, consumer protection, or anti-discrimination laws", "Using our services to generate deceptive, fraudulent, discriminatory, defamatory, abusive, or harmful content", "Reselling, sublicensing, or commercially exploiting our services without written permission", "Attempting to bypass subscription limits, usage restrictions, security systems, or payment requirements"] },
        { type: "p", text: "We may investigate and take action against violations, including suspending accounts, deleting content, blocking access, limiting usage, or reporting unlawful activity." },
      ],
    },
    {
      heading: "Professional Responsibility",
      blocks: [
        { type: "p", text: "Flacron provides tools to assist with business workflows, automation, reporting, estimates, communications, documentation, and operational tasks. Our services are designed to support users, not replace professional judgment." },
        { type: "p", text: "You are responsible for verifying the accuracy, completeness, legality, compliance, and suitability of any information, estimate, report, recommendation, communication, workflow, or output generated through our services." },
        { type: "p", text: "For construction, insurance, inspection, legal, tax, accounting, engineering, financial, medical, safety, or regulated business matters, you should consult a qualified professional before relying on outputs from our services." },
      ],
    },
    {
      heading: "No Guarantees of Results",
      blocks: [
        { type: "p", text: "Flacron may provide tools designed to help businesses generate leads, improve workflows, automate tasks, create reports, organize information, communicate with customers, or increase efficiency." },
        { type: "p", text: "However, we do not guarantee any specific business result, income, revenue, sales, customers, leads, approvals, insurance outcomes, construction estimate accuracy, claim outcome, ranking, engagement, conversion rate, or financial performance." },
        { type: "p", text: "Your results may vary depending on your business, market, actions, data quality, industry, pricing, customer demand, advertising budget, user input, competition, and other factors outside our control." },
      ],
    },
    {
      heading: "Privacy",
      blocks: [
        { type: "p", text: "Your use of our services is also governed by our Privacy Policy. Our Privacy Policy explains how we collect, use, store, disclose, and protect your personal information across Flacron Enterprises LLC websites, applications, platforms, and services." },
        { type: "p", text: "By using our services, you acknowledge and agree to our Privacy Policy." },
      ],
    },
    {
      heading: "Confidentiality",
      blocks: [
        { type: "p", text: "You may receive access to confidential information belonging to Flacron Enterprises LLC, including business plans, software features, pricing, technical information, product roadmaps, private documentation, AI workflows, product designs, business strategies, or other non-public information." },
        { type: "p", text: "You agree not to disclose, copy, misuse, sell, publish, or distribute confidential information without our written permission. This obligation continues even after your use of our services ends." },
      ],
    },
    {
      heading: "Feedback and Suggestions",
      blocks: [
        { type: "p", text: "If you provide feedback, suggestions, ideas, feature requests, recommendations, bug reports, or product improvements to Flacron Enterprises LLC, you grant us the right to use that feedback without restriction or compensation." },
        { type: "p", text: "We may use your feedback to improve existing products, develop new services, train internal processes, or enhance our business operations." },
      ],
    },
    {
      heading: "Termination",
      blocks: [
        { type: "p", text: "We may suspend or terminate your access to our website, applications, platforms, or services at any time if:" },
        { type: "ul", items: ["You violate these Terms", "You fail to pay applicable fees", "Your use creates legal, security, reputational, or operational risk", "We are required to do so by law", "We discontinue a service", "You misuse AI-generated outputs", "You submit unauthorized, illegal, harmful, or infringing content", "We believe termination is necessary to protect Flacron Enterprises LLC, users, customers, third parties, or the public"] },
        { type: "p", text: "Upon termination, your right to use the affected services will end immediately." },
        { type: "p", text: "Certain sections of these Terms will continue to apply after termination, including ownership, confidentiality, payment obligations, disclaimers, limitation of liability, indemnification, governing law, dispute resolution, and any provisions that by their nature should survive termination." },
      ],
    },
    {
      heading: "Disclaimers",
      blocks: [
        { type: "p", text: "Our services are provided on an “as is” and “as available” basis. To the fullest extent permitted by law, Flacron Enterprises LLC disclaims all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, reliability, availability, security, non-infringement, and uninterrupted operation." },
        { type: "p", text: "We do not guarantee that:" },
        { type: "ul", items: ["Our services will meet your specific requirements", "Our services will be error-free or uninterrupted", "AI-generated outputs will be accurate, complete, current, compliant, or reliable", "Defects will be corrected immediately", "Our services will be free from viruses or harmful components", "Any business, financial, legal, insurance, construction, claim, marketing, operational, or professional result will be achieved", "Any app store, third-party provider, cloud provider, payment processor, or integration will remain available or function properly"] },
      ],
    },
    {
      heading: "Limitation of Liability",
      blocks: [
        { type: "p", text: "To the fullest extent permitted by law, Flacron Enterprises LLC and its owners, officers, employees, contractors, service providers, partners, and affiliates will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages. This includes damages for:" },
        { type: "ul", items: ["Lost profits", "Lost revenue", "Lost data", "Business interruption", "Loss of goodwill", "Inaccurate reports", "Failed leads", "Claim denials", "Construction cost differences", "Service delays", "Third-party service failures", "App store issues", "Payment processor issues", "Reliance on AI-generated outputs", "User errors or incomplete user-provided data"] },
        { type: "p", text: "To the fullest extent permitted by law, our total liability for any claim related to our services will not exceed the amount you paid to Flacron Enterprises LLC for the service giving rise to the claim during the three months before the claim arose, or one hundred dollars, whichever is greater." },
        { type: "p", text: "Some jurisdictions do not allow certain limitations of liability, so some limitations may not apply to you." },
      ],
    },
    {
      heading: "Indemnification",
      blocks: [
        { type: "p", text: "You agree to defend, indemnify, and hold harmless Flacron Enterprises LLC, its owners, officers, employees, contractors, service providers, partners, and affiliates from and against any claims, damages, liabilities, losses, costs, and expenses, including reasonable attorney fees, arising from:" },
        { type: "ul", items: ["Your use of our services", "Your violation of these Terms", "Your violation of any law or regulation", "Your User Content", "Your misuse of AI-generated outputs", "Your infringement of third-party rights", "Your unauthorized use or disclosure of personal, confidential, customer, claim, project, business, or third-party information", "Your reliance on unverified AI-generated content", "Your use of Flacron Enterprises LLC services in a regulated industry without appropriate professional review"] },
      ],
    },
    {
      heading: "App Store Terms",
      blocks: [
        { type: "p", text: "If you access or download any Flacron Enterprises LLC mobile application through an app store, such as the Apple App Store or Google Play Store, your use may also be subject to that app store’s terms, policies, and payment rules." },
        { type: "p", text: "App stores may control certain billing, cancellation, refund, subscription, update, and distribution processes." },
        { type: "p", text: "Flacron Enterprises LLC is not responsible for app store decisions, delays, payment issues, platform restrictions, account issues, or policy enforcement by third-party app stores." },
      ],
    },
    {
      heading: "Governing Law",
      blocks: [
        { type: "p", text: "These Terms are governed by the laws of the State of New York, United States, without regard to conflict of law principles." },
        { type: "p", text: "By using our services, you agree that any dispute arising from or related to these Terms or our services will be handled in the courts located in New York, unless applicable law requires otherwise." },
      ],
    },
    {
      heading: "Dispute Resolution",
      blocks: [
        { type: "p", text: "Before filing a legal claim, you agree to contact us first at contact@flacronenterprises.com so we can attempt to resolve the dispute informally." },
        { type: "p", text: "Both parties agree to make a good-faith effort to resolve disputes before pursuing formal legal action." },
        { type: "p", text: "If a dispute cannot be resolved informally, it may be brought in a court of competent jurisdiction in New York, unless otherwise required by applicable law." },
      ],
    },
    {
      heading: "Changes to These Terms",
      blocks: [
        { type: "p", text: "We may update these Terms from time to time. When we make changes, we will update the “Last Updated” date at the top of this page. If changes are significant, we may provide additional notice by email, website notice, app notification, account dashboard notice, or other appropriate method." },
        { type: "p", text: "Your continued use of our website, applications, or services after updated Terms become effective means you accept the revised Terms." },
      ],
    },
    {
      heading: "Electronic Communications",
      blocks: [
        { type: "p", text: "By using our services or contacting us electronically, you agree to receive communications from us electronically. These communications may include emails, notices, account messages, service updates, billing information, policy updates, support responses, app notifications, or product announcements." },
        { type: "p", text: "You agree that electronic communications satisfy any legal requirement that communications be in writing." },
      ],
    },
    {
      heading: "Severability",
      blocks: [
        { type: "p", text: "If any part of these Terms is found to be invalid, unlawful, or unenforceable, the remaining sections will remain in full force and effect." },
        { type: "p", text: "The invalid section will be interpreted or replaced in a way that most closely reflects the original intent while remaining enforceable." },
      ],
    },
    {
      heading: "Entire Agreement",
      blocks: [
        { type: "p", text: "These Terms, together with our Privacy Policy, Cancellation and Refund Policy, Disclaimer, Cookies Policy, and any additional agreements or policies referenced by us, represent the entire agreement between you and Flacron Enterprises LLC regarding your use of our services." },
        { type: "p", text: "They replace any prior agreements, communications, or understandings related to the same subject matter." },
      ],
    },
    {
      heading: "Contact Us",
      blocks: [
        { type: "p", text: "If you have questions about these Terms and Conditions, contact:" },
        { type: "ul", items: ["Flacron Enterprises LLC", "Trade name: Flacron Enterprises", "Email: contact@flacronenterprises.com", "Website: https://flacronenterprises.com/", "Address: 410 E 95th St, Brooklyn, NY 11212, United States"] },
      ],
    },
  ],
  footerSummary: [
    { type: "p", text: "By using Flacron Enterprises LLC websites, applications, platforms, and AI-powered services, you agree to our Terms and Conditions." },
    { type: "p", text: "These Terms apply to Flacron Enterprises LLC and its current and future products, including FlacronBuild, RapidClaimPro, FlacronConnect AI, and future Flacron apps." },
    { type: "p", text: "Our tools are provided to support business workflows, automation, reporting, estimates, documentation, and decision-making, but users are responsible for reviewing and verifying all outputs before relying on them. For questions, contact us at contact@flacronenterprises.com." },
  ],
};
