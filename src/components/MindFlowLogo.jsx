import React from "react";

const MindFlowLogo = ({ size = 40, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FF6B6B", stopOpacity: 1 }} />
          <stop offset="25%" style={{ stopColor: "#4ECDC4", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#45B7D1", stopOpacity: 1 }} />
          <stop offset="75%" style={{ stopColor: "#96CEB4", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#FFEAA7", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="nodeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FF6B6B", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#FF8E8E", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="nodeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#4ECDC4", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#6ED5CD", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="nodeGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#45B7D1", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#65C5DB", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="nodeGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#96CEB4", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#A8D8C4", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="nodeGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FFEAA7", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#FFF2C7", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      {/* Central brain node */}
      <circle
        cx="32"
        cy="32"
        r="12"
        fill="url(#brainGradient)"
        stroke="white"
        strokeWidth="2"
      />
      <circle cx="32" cy="32" r="8" fill="white" opacity="0.3" />

      {/* Connected nodes */}
      <circle cx="12" cy="20" r="6" fill="url(#nodeGradient1)" />
      <circle cx="52" cy="20" r="6" fill="url(#nodeGradient2)" />
      <circle cx="12" cy="44" r="6" fill="url(#nodeGradient3)" />
      <circle cx="52" cy="44" r="6" fill="url(#nodeGradient4)" />
      <circle cx="32" cy="8" r="5" fill="url(#nodeGradient5)" />

      {/* Connection lines */}
      <line
        x1="32"
        y1="32"
        x2="12"
        y2="20"
        stroke="url(#brainGradient)"
        strokeWidth="2"
        opacity="0.6"
      />
      <line
        x1="32"
        y1="32"
        x2="52"
        y2="20"
        stroke="url(#brainGradient)"
        strokeWidth="2"
        opacity="0.6"
      />
      <line
        x1="32"
        y1="32"
        x2="12"
        y2="44"
        stroke="url(#brainGradient)"
        strokeWidth="2"
        opacity="0.6"
      />
      <line
        x1="32"
        y1="32"
        x2="52"
        y2="44"
        stroke="url(#brainGradient)"
        strokeWidth="2"
        opacity="0.6"
      />
      <line
        x1="32"
        y1="32"
        x2="32"
        y2="8"
        stroke="url(#brainGradient)"
        strokeWidth="2"
        opacity="0.6"
      />

      {/* Small sparkle effects */}
      <circle cx="8" cy="12" r="2" fill="#FF6B6B" opacity="0.8" />
      <circle cx="56" cy="12" r="2" fill="#4ECDC4" opacity="0.8" />
      <circle cx="8" cy="52" r="2" fill="#45B7D1" opacity="0.8" />
      <circle cx="56" cy="52" r="2" fill="#96CEB4" opacity="0.8" />
    </svg>
  );
};

export default MindFlowLogo;
