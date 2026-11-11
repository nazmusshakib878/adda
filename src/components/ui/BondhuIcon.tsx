"use client";

import React from "react";
import type { BondhuIconName } from "@/lib/tokens";

const ICON_FILE_MAP: Record<BondhuIconName, string> = {
  home: "/assets/icons/home.svg",
  chat: "/assets/icons/chat.svg",
  phone: "/assets/icons/phone.svg",
  user: "/assets/icons/user.svg",
  search: "/assets/icons/search.svg",
  bell: "/assets/icons/bell.svg",
  plus: "/assets/icons/plus.svg",
  back: "/assets/icons/back.svg",
  chevron: "/assets/icons/chevron.svg",
  video: "/assets/icons/video.svg",
  mic: "/assets/icons/mic.svg",
  heart: "/assets/icons/heart.svg",
  share: "/assets/icons/share.svg",
  image: "/assets/icons/image.svg",
  more: "/assets/icons/more.svg",
  check: "/assets/icons/check.svg",
  send: "/assets/icons/send.svg",
  lock: "/assets/icons/lock-primary.svg",
  settings: "/assets/icons/settings.svg",
  speaker: "/assets/icons/speaker.svg",
  file: "/assets/icons/file-primary.svg",
  moon: "/assets/icons/moon.svg",
  globe: "/assets/icons/globe.svg",
};

export type IconTone =
  | "text"
  | "secondary"
  | "primary"
  | "on-primary"
  | "alert"
  | "sidebar-muted"
  | "call-light"
  | "call-dark"
  | "white";

const TONE_COLOR_MAP: Record<IconTone, string> = {
  text: "var(--text)",
  secondary: "var(--secondary)",
  primary: "var(--primary)",
  "on-primary": "var(--on-primary)",
  alert: "var(--alert)",
  "sidebar-muted": "#A4C5B4",
  "call-light": "#E6F5ED",
  "call-dark": "#142D23",
  white: "#FFFFFF",
};

interface BondhuIconProps {
  name: BondhuIconName;
  tone?: IconTone;
  size?: number;
  className?: string;
}

/**
 * Renders downloaded Figma SVG icon assets with semantic theme color adaptation
 * using CSS mask-image so strokes automatically track light/dark tokens.
 */
export function BondhuIcon({
  name,
  tone = "text",
  size = 24,
  className = "",
}: BondhuIconProps) {
  const src = ICON_FILE_MAP[name];
  const color = TONE_COLOR_MAP[tone];

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

/**
 * Semantic toggle switch backed by Figma toggle proportions (44 x 26, radius 13).
 */
export function BondhuToggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className="relative inline-flex h-[26px] w-[44px] shrink-0 cursor-pointer items-center rounded-[13px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
      style={{
        backgroundColor: checked ? "var(--primary)" : "var(--border)",
      }}
    >
      <span
        className="inline-block h-[20px] w-[20px] rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{
          transform: checked ? "translateX(21px)" : "translateX(3px)",
        }}
      />
    </button>
  );
}

export function ProgressDots({ step }: { step: 0 | 1 | 2 }) {
  return (
    <div className="flex items-center gap-[8px]" aria-label={`Step ${step + 1} of 3`}>
      {[0, 1, 2].map((i) =>
        i === step ? (
          <img
            key={i}
            src="/assets/icons/progress-active.svg"
            alt=""
            width={22}
            height={6}
            className="h-[6px] w-[22px]"
          />
        ) : (
          <img
            key={i}
            src="/assets/icons/progress-dot.svg"
            alt=""
            width={6}
            height={6}
            className="h-[6px] w-[6px]"
          />
        )
      )}
    </div>
  );
}
