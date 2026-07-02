interface LogoMarkProps {
  className?: string;
}

/**
 * Circular gold "CM" monogram — icon only. Used compact in the header/footer.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="-110 -110 220 220"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Casa Moya"
    >
      <defs>
        <linearGradient id="cmGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d68a" />
          <stop offset="45%" stopColor="#c9a13b" />
          <stop offset="100%" stopColor="#8a6a1f" />
        </linearGradient>
      </defs>
      <circle cx="0" cy="0" r="100" fill="none" stroke="url(#cmGold)" strokeWidth="6" />
      <path
        d="M 22.3,-27.5 A 48,48 0 1,0 22.3,27.5"
        fill="none"
        stroke="url(#cmGold)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M -3,44 L -3,-44 L 31,0 L 65,-44 L 65,44"
        fill="none"
        stroke="url(#cmGold)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 31,0 L 31,85" fill="none" stroke="url(#cmGold)" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}

interface LogoFullProps {
  className?: string;
}

/**
 * Full stacked lockup — monogram + "CASA MOYA" + "VACATION HOMES".
 * Use for hero sections, footer, or print-style placements.
 */
export function LogoFull({ className }: LogoFullProps) {
  return (
    <svg
      viewBox="0 0 860 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Casa Moya — Vacation Homes"
    >
      <defs>
        <linearGradient id="cmGoldFull" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d68a" />
          <stop offset="45%" stopColor="#c9a13b" />
          <stop offset="100%" stopColor="#8a6a1f" />
        </linearGradient>
      </defs>
      <g transform="translate(430,140)">
        <circle cx="0" cy="0" r="100" fill="none" stroke="url(#cmGoldFull)" strokeWidth="6" />
        <path
          d="M 22.3,-27.5 A 48,48 0 1,0 22.3,27.5"
          fill="none"
          stroke="url(#cmGoldFull)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M -3,44 L -3,-44 L 31,0 L 65,-44 L 65,44"
          fill="none"
          stroke="url(#cmGoldFull)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M 31,0 L 31,85" fill="none" stroke="url(#cmGoldFull)" strokeWidth="9" strokeLinecap="round" />
      </g>
      <text
        x="430"
        y="378"
        textAnchor="middle"
        fontFamily="'Jost', sans-serif"
        fontWeight="300"
        fontSize="62"
        letterSpacing="14"
        fill="url(#cmGoldFull)"
      >
        CASA MOYA
      </text>
      <line x1="145" y1="425" x2="325" y2="425" stroke="url(#cmGoldFull)" strokeWidth="1.5" />
      <text
        x="430"
        y="433"
        textAnchor="middle"
        fontFamily="'Jost', sans-serif"
        fontWeight="400"
        fontSize="19"
        letterSpacing="7"
        fill="url(#cmGoldFull)"
      >
        VACATION HOMES
      </text>
      <line x1="535" y1="425" x2="715" y2="425" stroke="url(#cmGoldFull)" strokeWidth="1.5" />
    </svg>
  );
}
