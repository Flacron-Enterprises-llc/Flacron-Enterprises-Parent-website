interface WaveDividerProps {
  flip?: boolean;
  /** Any CSS colour, including tokens such as "var(--surface-muted)". Defaults to the page background. */
  fill?: string;
  className?: string;
}

export default function WaveDivider({ flip = false, fill = "var(--bg)", className = "" }: WaveDividerProps) {
  return (
    <div aria-hidden className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block h-[40px] w-full sm:h-[60px]">
        <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" style={{ fill }} />
      </svg>
    </div>
  );
}
