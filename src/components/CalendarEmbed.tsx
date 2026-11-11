"use client";

import { CalendarClock } from "lucide-react";

const CAL_LINK = process.env.NEXT_PUBLIC_BOOKING_LINK;

function buildEmbedUrl(link: string): string {
  if (link.includes("calendly.com")) {
    const sep = link.includes("?") ? "&" : "?";
    return `${link}${sep}embed_domain=flacron.com&embed_type=Inline&hide_event_type_details=1`;
  }
  if (link.includes("cal.com")) {
    const sep = link.includes("?") ? "&" : "?";
    return `${link}${sep}embed=true`;
  }
  return link;
}

export default function CalendarEmbed() {
  if (!CAL_LINK) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-[1.25rem] border border-dashed border-border-strong bg-surface-muted p-6 sm:flex-row sm:items-center sm:gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface">
          <CalendarClock aria-hidden className="h-5 w-5 text-accent-text" />
        </span>
        <div>
          <p className="text-[15px] font-semibold text-text">Instant calendar booking is almost here.</p>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            For now, fill out the form below and our team will personally reach out within 24 hours to find a time that works.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-border bg-surface shadow-sm">
      <iframe
        src={buildEmbedUrl(CAL_LINK)}
        className="h-[680px] w-full"
        title="Book a time with Flacron"
        loading="lazy"
      />
    </div>
  );
}
