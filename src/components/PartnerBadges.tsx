const badges = [
  {
    name: "Microsoft Partner",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <rect x="2" y="2" width="9" height="9" className="fill-text-secondary" />
        <rect x="13" y="2" width="9" height="9" className="fill-text-muted" />
        <rect x="2" y="13" width="9" height="9" className="fill-text-muted" />
        <rect x="13" y="13" width="9" height="9" className="fill-accent" />
      </svg>
    ),
  },
  {
    name: "IBM Certified",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        {[3, 7, 11, 15, 19].map((y) => (
          <rect key={y} x="2" y={y} width="20" height="2" className="fill-text-secondary" />
        ))}
      </svg>
    ),
  },
  {
    name: "AWS Partner",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none" aria-hidden>
        <path d="M3 16c4 4 14 4 18 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M16 14l3 2-1 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Azure AI",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path d="M9 3L3 19h6l2-5 4 5h6L13 3H9z" className="fill-text-secondary" />
      </svg>
    ),
  },
  {
    name: "ISO 27001 Aligned",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
];

export default function PartnerBadges() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
      {badges.map((b) => (
        <li key={b.name} className="flex shrink-0 items-center gap-2 text-sm font-semibold text-text-secondary">
          {b.icon}
          {b.name}
        </li>
      ))}
    </ul>
  );
}
