interface AppLogoProps {
  name: string;
  size?: number;
}

const gradients: Array<[string, string]> = [
  ["#FE4705", "#D83C04"],
  ["#FB923C", "#FE4705"],
  ["#FE4705", "#FBBF24"],
  ["#D83C04", "#DC2626"],
  ["#FE4705", "#C2410C"],
  ["#FFFFFF", "#94A3B8"],
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function AppLogo({ name, size = 48 }: AppLogoProps) {
  const gradientIndex = name.charCodeAt(0) % 6;
  const [colorA, colorB] = gradients[gradientIndex];
  const initials = getInitials(name);
  const gradientId = `logo-grad-${name.replace(/\s+/g, "-").toLowerCase()}`;
  const fontSize = Math.round(size * 0.35);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={name}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colorA} />
          <stop offset="100%" stopColor={colorB} />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="24" fill={`url(#${gradientId})`} />
      <text
        x="24"
        y="24"
        dominantBaseline="central"
        textAnchor="middle"
        fill="white"
        fontSize={fontSize}
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
}
