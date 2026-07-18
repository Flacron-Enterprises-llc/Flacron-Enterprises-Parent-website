import type { LegalDocumentData } from "@/components/LegalDocument";

export const refundPolicy: LegalDocumentData = {
  title: "Cancellation and Refund Policy",
  effectiveDate: "June 19, 2025",
  lastUpdated: "July 17, 2026",
  intro: [
    { type: "p", text: "This Cancellation and Refund Policy explains how subscription cancellations, refund requests, renewals, billing adjustments, free trials, digital purchases, usage-based services, and other paid services are handled by Flacron Enterprises LLC (“Flacron,” “we,” “our,” or “us”)." },
    { type: "p", text: "This policy applies to all current and future websites, applications, platforms, software, AI-powered tools, mobile applications, web applications, subscriptions, digital products, reports, credits, custom services, and other paid services owned or operated by Flacron Enterprises LLC." },
    { type: "p", text: "Covered products include FlacronBuild, RapidClaimPro, FlacronConnect AI, and other current or future Flacron products." },
    { type: "p", text: "Payments may be processed through third-party payment processors, app stores, marketplaces, Merchants of Record, resellers, or other authorized billing providers." },
    { type: "p", text: "Transactions may also be subject to the terms and procedures of the provider that processed the payment." },
  ],
  sections: [
    {
      heading: "Subscription Cancellations",
      blocks: [
        { type: "p", text: "Customers may cancel a subscription at any time through:" },
        { type: "ul", items: ["Their account settings;", "The applicable billing or subscription-management portal;", "The transaction receipt or confirmation email;", "The relevant app-store or marketplace account; or", "Another cancellation method provided for the applicable service."] },
        { type: "p", text: "Cancellation prevents future renewal charges. Unless otherwise stated at checkout, in a written agreement, or required by law, cancellation generally takes effect at the end of the current paid billing period." },
        { type: "p", text: "Customers may continue using applicable paid features until the billing period ends. Canceling a subscription does not automatically reverse or refund a payment that has already been processed." },
      ],
    },
    {
      heading: "Refund-Request Period",
      blocks: [
        { type: "p", text: "Customers may submit a refund request within 14 calendar days of the applicable transaction date." },
        { type: "p", text: "For recurring subscriptions, a request related to a renewal transaction must be submitted within 14 calendar days of the applicable renewal date." },
        { type: "p", text: "Submitting a request within this period does not guarantee that a full or partial refund will be approved." },
      ],
    },
    {
      heading: "Refund Review",
      blocks: [
        { type: "p", text: "Refund requests are reviewed individually and may be evaluated based on: the product or service purchased; the reason for the request; the date of the transaction; whether the product was accessed, delivered, downloaded, viewed, generated, or used; whether credits, reports, messages, scans, API requests, or other usage units were consumed; whether custom or professional work has started; whether a duplicate, incorrect, or unauthorized charge occurred; whether a verified technical issue materially prevented use of the service; the policies of the provider that processed the payment; any applicable written agreement; and applicable consumer-protection laws." },
        { type: "p", text: "Depending on the circumstances, a request may result in a full refund, a partial refund, a credit or billing adjustment (where permitted), or a declined request. Flacron Enterprises LLC does not guarantee approval of every refund request." },
      ],
    },
    {
      heading: "How to Request a Refund",
      blocks: [
        { type: "p", text: "Customers should generally submit refund requests through the billing provider, app store, marketplace, receipt, or subscription-management portal associated with the transaction. Customers may also contact Flacron Enterprises LLC at: contact@flacronenterprises.com." },
        { type: "p", text: "The request should include: full name; email address used for the purchase; product or service purchased; order, receipt, invoice, or transaction number; transaction date; billing provider used; reason for the request; and relevant screenshots or supporting information." },
        { type: "p", text: "When a transaction was processed by a third party, the refund may need to be reviewed and issued through that same provider." },
      ],
    },
    {
      heading: "Monthly and Annual Subscriptions",
      blocks: [
        { type: "p", text: "Monthly and annual subscriptions may automatically renew at the billing interval selected during checkout unless canceled before the next renewal transaction." },
        { type: "p", text: "Customers are responsible for reviewing their subscription details and canceling before renewal when they do not wish to continue." },
        { type: "p", text: "Cancellation normally prevents future charges but does not automatically reverse a payment that has already been processed." },
        { type: "p", text: "A refund request relating to a monthly or annual subscription may be submitted within the applicable 14-day refund-request period." },
      ],
    },
    {
      heading: "Free Trials",
      blocks: [
        { type: "p", text: "Some services may include a free trial. When payment information is required, the subscription may automatically convert to a paid subscription when the trial ends unless the customer cancels before the stated expiration date." },
        { type: "p", text: "The trial duration, subscription price, billing interval, and renewal conditions must be displayed before the customer begins the trial." },
        { type: "p", text: "When a paid transaction has already occurred, the customer may submit a refund request within 14 calendar days of that transaction. Submitting a refund request does not guarantee approval." },
      ],
    },
    {
      heading: "One-Time Purchases and Digital Products",
      blocks: [
        { type: "p", text: "One-time purchases may include digital reports, templates, downloads, AI-generated outputs, credits, documents, software licenses, data-processing services, or other digital products." },
        { type: "p", text: "Refund requests for one-time purchases will be reviewed individually. Whether the product was accessed, generated, downloaded, delivered, viewed, exported, or consumed may be considered during the review." },
        { type: "p", text: "Access to or delivery of a digital product does not prevent the customer from submitting a request, but it may affect the outcome where permitted by law." },
      ],
    },
    {
      heading: "Usage-Based Services and Credits",
      blocks: [
        { type: "p", text: "Some Flacron services may involve usage-based billing, credits, reports, document processing, AI generations, messages, scans, API usage, or other metered features." },
        { type: "p", text: "Refund requests involving these services may be evaluated based on the amount of service consumed; the number of credits used; whether the charged amount was accurate; whether the purchased service functioned as described; whether a duplicate or technical billing error occurred; and applicable provider policies and laws." },
        { type: "p", text: "Unused credits or unused service capacity do not automatically qualify for a refund." },
      ],
    },
    {
      heading: "Custom and Professional Services",
      blocks: [
        { type: "p", text: "Flacron Enterprises LLC may provide custom setup, onboarding, implementation, consulting, integration, configuration, development, technical support, strategy, or other professional services. These services may be governed by a separate proposal, invoice, statement of work, service agreement, or contract." },
        { type: "p", text: "Refund requests may take into consideration whether work has started; the amount of work completed; contractual milestones; materials already delivered; third-party expenses incurred; and applicable law." },
        { type: "p", text: "A separate agreement must not reduce mandatory rights available under applicable consumer-protection laws." },
      ],
    },
    {
      heading: "Technical Problems",
      blocks: [
        { type: "p", text: "Customers experiencing a persistent technical issue should contact Flacron Enterprises LLC so that we can investigate and attempt to resolve the problem." },
        { type: "p", text: "Customers should provide the affected product; a description of the problem; screenshots or error messages; relevant device and browser information; and troubleshooting steps already attempted." },
        { type: "p", text: "When a verified technical problem materially prevents use of a paid service and cannot be resolved, that information may be considered during the refund review." },
      ],
    },
    {
      heading: "Duplicate or Incorrect Charges",
      blocks: [
        { type: "p", text: "Customers who believe they were charged more than once, charged an incorrect amount, or billed after cancellation should contact Flacron Enterprises LLC or the provider that processed the transaction." },
        { type: "p", text: "Verified duplicate or incorrect charges will be handled according to applicable provider procedures and applicable law." },
      ],
    },
    {
      heading: "App Store, Marketplace, and Third-Party Purchases",
      blocks: [
        { type: "p", text: "Purchases made through an app store, marketplace, reseller, Merchant of Record, or other third-party billing provider may be subject to that provider’s cancellation and refund procedures." },
        { type: "p", text: "Customers may be required to submit the request directly to the provider that processed the transaction. Flacron Enterprises LLC may not have authority to directly process or approve refunds for transactions controlled by a third-party provider." },
      ],
    },
    {
      heading: "Approved Refunds",
      blocks: [
        { type: "p", text: "When a refund is approved, it will generally be returned to the original payment method where possible. Processing times may vary depending on the billing provider; the customer’s bank; the card issuer; the payment method; the customer’s location; and the applicable platform." },
        { type: "p", text: "A full refund may result in termination of access to the refunded subscription, software license, digital product, report, credits, downloads, paid account features, or related services." },
        { type: "p", text: "A partial refund may result in an adjustment to access, service level, credits, usage limits, or account balance." },
      ],
    },
    {
      heading: "Consumer Rights",
      blocks: [
        { type: "p", text: "Nothing in this policy limits mandatory cancellation, withdrawal, repair, replacement, or refund rights available under applicable consumer-protection laws. Where applicable law provides greater rights than this policy, those legally required rights will apply." },
        { type: "p", text: "Consumer rights may vary depending on the customer’s country or state; the type of product or service; whether the product is digital; whether access or delivery began immediately; and whether the customer consented to immediate performance." },
      ],
    },
    {
      heading: "Chargebacks and Payment Disputes",
      blocks: [
        { type: "p", text: "Customers are encouraged to contact Flacron Enterprises LLC or the applicable billing provider before filing a chargeback so that the billing or product issue can be investigated." },
        { type: "p", text: "Account access associated with a disputed transaction may be temporarily limited while the dispute is reviewed." },
        { type: "p", text: "Flacron Enterprises LLC may provide transaction, account, usage, and service records to the billing provider when responding to a payment dispute. Nothing in this section limits rights available under applicable card-network rules or consumer-protection laws." },
      ],
    },
    {
      heading: "Failed Payments",
      blocks: [
        { type: "p", text: "When a subscription or other payment fails, access to paid services may be limited, suspended, or terminated. The applicable billing provider may retry the payment according to its procedures." },
        { type: "p", text: "Customers are responsible for maintaining accurate and current billing information." },
      ],
    },
    {
      heading: "Subscription Changes",
      blocks: [
        { type: "p", text: "Customers may be able to upgrade, downgrade, or otherwise modify their subscription through the applicable billing portal or account settings." },
        { type: "p", text: "Billing changes may take effect immediately or at the next billing cycle, depending on the applicable product and provider." },
        { type: "p", text: "Refunds, credits, and billing adjustments relating to a plan change are not automatic and will be reviewed under this policy." },
      ],
    },
    {
      heading: "Account Suspension or Termination",
      blocks: [
        { type: "p", text: "Flacron Enterprises LLC may suspend or terminate access when a customer fails to pay applicable charges; violates the Terms and Conditions; uses the service unlawfully; attempts to compromise the service or another account; engages in fraudulent or abusive conduct; or creates a material legal, security, or operational risk." },
        { type: "p", text: "Refund eligibility following suspension or termination will be reviewed according to the circumstances, applicable provider policies, written agreements, and applicable law. Termination does not eliminate mandatory consumer rights." },
      ],
    },
    {
      heading: "Changes to This Policy",
      blocks: [
        { type: "p", text: "Flacron Enterprises LLC may update this Cancellation and Refund Policy from time to time. When changes are made, the “Last Updated” date will be revised." },
        { type: "p", text: "The version in effect at the time of a transaction may apply to that transaction, subject to applicable law and the policies of the provider that processed the payment." },
      ],
    },
    {
      heading: "Contact Us",
      blocks: [
        { type: "p", text: "For questions about cancellations, refunds, subscriptions, purchases, or billing, contact:" },
        { type: "ul", items: ["Flacron Enterprises LLC", "Trade name: Flacron Enterprises", "Email: contact@flacronenterprises.com", "Website: https://flacronenterprises.com/", "Address: 410 E 95th St, Brooklyn, NY 11212, United States"] },
      ],
    },
  ],
  footerSummary: [
    { type: "p", text: "Flacron Enterprises LLC subscriptions may be canceled at any time. Cancellation prevents future charges but does not automatically reverse a payment that has already been processed." },
    { type: "p", text: "Refund requests may be submitted within 14 calendar days of the applicable transaction date and are reviewed individually. Submitting a request does not guarantee that a refund will be approved." },
    { type: "p", text: "This policy applies across all Flacron products, including FlacronBuild, RapidClaimPro, and FlacronConnect AI. Nothing in this policy limits mandatory consumer-protection rights. For cancellation or refund questions, contact contact@flacronenterprises.com." },
  ],
};
