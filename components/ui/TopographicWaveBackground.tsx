"use client";

import React from "react";

interface TopographicWaveBackgroundProps {
  className?: string;
  strokeColor?: string;
  opacity?: number;
  mode?: "light" | "dark";
}

export function TopographicWaveBackground({
  className = "",
  strokeColor,
  opacity = 0.15,
  mode = "light",
}: TopographicWaveBackgroundProps) {
  const stroke = strokeColor || (mode === "dark" ? "#00a896" : "#0f172a");

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden -z-10 ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <g stroke={stroke} strokeWidth="1.2" strokeLinecap="round">
          {/* Topographic Contour Wave Lines */}
          <path d="M-100 150 Q 200 80, 500 220 T 1100 180 T 1600 250" />
          <path d="M-100 180 Q 220 110, 520 250 T 1120 210 T 1600 280" />
          <path d="M-100 210 Q 240 140, 540 280 T 1140 240 T 1600 310" />
          <path d="M-100 240 Q 260 170, 560 310 T 1160 270 T 1600 340" />
          <path d="M-100 270 Q 280 200, 580 340 T 1180 300 T 1600 370" />

          {/* Middle Wave Cluster */}
          <path d="M-100 400 Q 300 320, 650 460 T 1200 400 T 1600 480" />
          <path d="M-100 430 Q 320 350, 670 490 T 1220 430 T 1600 510" />
          <path d="M-100 460 Q 340 380, 690 520 T 1240 460 T 1600 540" />
          <path d="M-100 490 Q 360 410, 710 550 T 1260 490 T 1600 570" />
          <path d="M-100 520 Q 380 440, 730 580 T 1280 520 T 1600 600" />
          <path d="M-100 550 Q 400 470, 750 610 T 1300 550 T 1600 630" />

          {/* Lower Dynamic Wavy Lines */}
          <path d="M-100 680 Q 250 600, 600 740 T 1150 670 T 1600 760" />
          <path d="M-100 710 Q 270 630, 620 770 T 1170 700 T 1600 790" />
          <path d="M-100 740 Q 290 660, 640 800 T 1190 730 T 1600 820" />
          <path d="M-100 770 Q 310 690, 660 830 T 1210 760 T 1600 850" />
          <path d="M-100 800 Q 330 720, 680 860 T 1230 790 T 1600 880" />
          <path d="M-100 830 Q 350 750, 700 890 T 1250 820 T 1600 910" />
        </g>
      </svg>
    </div>
  );
}
