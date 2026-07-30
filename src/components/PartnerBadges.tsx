const badges = [
  {
    name: "Microsoft Partner",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <rect x="2" y="2" width="9" height="9" className="fill-slate-700" />
        <rect x="13" y="2" width="9" height="9" className="fill-slate-400" />
        <rect x="2" y="13" width="9" height="9" className="fill-slate-400" />
        <rect x="13" y="13" width="9" height="9" className="fill-[#FE4705]" />
      </svg>
    ),
  },
  {
    name: "IBM Certified",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        {[3, 7, 11, 15, 19].map((y) => (
          <rect key={y} x="2" y={y} width="20" height="2" className="fill-slate-700" />
        ))}
      </svg>
    ),
  },
  {
    name: "AWS Infrastructure",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path d="M3 16c4 4 14 4 18 0" stroke="#FE4705" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M16 14l3 2-1 3" stroke="#FE4705" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Azure AI",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path d="M9 3L3 19h6l2-5 4 5h6L13 3H9z" className="fill-slate-700" />
      </svg>
    ),
  },
  {
    name: "ISO 27001 Aligned",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#FE4705" strokeWidth="2" fill="none" />
        <path d="M8 12l3 3 5-6" stroke="#FE4705" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
];

export default function PartnerBadges() {
  return (
    <div className="flex items-center gap-8 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 sm:gap-x-10 sm:gap-y-4">
      {badges.map((b) => (
        <span key={b.name} className="flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-default">
          {b.icon}
          {b.name}
        </span>
      ))}
    </div>
  );
}
