const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/flacronenterprisesllc/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/109062090",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.24H4.5V23H.5V8.24zM8.24 8.24h3.84v2.02h.05c.53-1 1.84-2.06 3.79-2.06 4.06 0 4.81 2.67 4.81 6.14V23h-4V15.1c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.17V23h-4V8.24z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/flacron14958",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-7-6.2 7H1.8l8.1-9.3L1 2h7.1l4.9 6.4L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61579538447653",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@FlacronEnterprises",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/rodrigue0435",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 0a12 12 0 0 0-4.37 23.17c-.06-.94-.11-2.38.02-3.4.12-.93.8-5.92.8-5.92s-.2-.41-.2-1.01c0-.94.55-1.65 1.23-1.65.58 0 .86.44.86.96 0 .59-.37 1.46-.57 2.28-.16.68.34 1.24 1.02 1.24 1.22 0 2.16-1.29 2.16-3.14 0-1.64-1.18-2.79-2.86-2.79-1.95 0-3.09 1.46-3.09 2.97 0 .59.22 1.22.51 1.56a.2.2 0 0 1 .05.2c-.05.23-.18.68-.2.78-.03.13-.11.16-.25.1-.93-.43-1.51-1.79-1.51-2.88 0-2.35 1.71-4.51 4.93-4.51 2.59 0 4.6 1.84 4.6 4.3 0 2.57-1.62 4.63-3.86 4.63-.75 0-1.46-.39-1.71-.86l-.46 1.77c-.17.64-.62 1.45-.92 1.94A12 12 0 1 0 12 0z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@flacronenterprises",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M16.6 5.82a4.28 4.28 0 0 1-3.09-1.31A4.28 4.28 0 0 1 12.2 1.5h-3.1v14.6a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.1V10.5a5.6 5.6 0 1 0 4.92 5.56V9.15a7.24 7.24 0 0 0 4.4 1.48V7.63a4.3 4.3 0 0 1-.6-1.81z" />
      </svg>
    ),
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/flacronenterprises.bsky.social",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 9.6C10.5 6.7 6.9 3.2 4.2 1.9 1.7.7.6 1.3.6 3.1c0 .36.2 3 .35 3.5.55 1.9 2.5 2.4 4.24 2.1-3.05.5-5.75 1.9-2.2 5.9 3.9 4.3 5.35-.9 6.06-3.3.7 2.4 1.66 8 6.05 3.3 3.3-3.6 1-5.4-2.05-5.9 1.74.3 3.7-.2 4.24-2.1.15-.5.35-3.14.35-3.5 0-1.8-1.1-2.4-3.6-1.2-2.72 1.3-6.33 4.8-7.9 7.7z" />
      </svg>
    ),
  },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {socialLinks.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-colors"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
