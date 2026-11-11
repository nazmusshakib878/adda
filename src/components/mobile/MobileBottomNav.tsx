"use client";

import React from "react";
import { BondhuIcon } from "@/components/ui/BondhuIcon";
import type { Locale } from "@/lib/i18n";
import { COPY } from "@/lib/i18n";
import type { MobileScreenId } from "@/data/bondhu-data";

export type BottomTab = "home" | "chats" | "calls" | "profile";

export function MobileBottomNav({
  activeTab,
  onSelect,
  locale = "en",
}: {
  activeTab: BottomTab;
  onSelect: (screen: MobileScreenId) => void;
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const items: {
    key: BottomTab;
    label: string;
    icon: "home" | "chat" | "phone" | "user";
    screen: MobileScreenId;
  }[] = [
    { key: "home", label: copy.nav.home, icon: "home", screen: "11-home-feed" },
    { key: "chats", label: copy.nav.chats, icon: "chat", screen: "18-chats" },
    { key: "calls", label: copy.nav.calls, icon: "phone", screen: "23-recent-calls" },
    { key: "profile", label: copy.nav.profile, icon: "user", screen: "33-my-profile" },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="flex h-[74px] w-full shrink-0 items-center justify-around border-t border-[var(--border)]/70 bg-[var(--surface)] px-1"
    >
      {items.map((item) => {
        const isActive = item.key === activeTab;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.screen)}
            className="flex h-[54px] flex-1 max-w-[92px] cursor-pointer flex-col items-center justify-center gap-[4px] rounded-[14px] transition-colors hover:bg-[var(--background)]/70"
          >
            <BondhuIcon
              name={item.icon}
              tone={isActive ? "primary" : "secondary"}
              size={24}
            />
            <span
              className={`text-[10px] font-semibold leading-[1.45] ${
                isActive ? "text-[var(--primary)]" : "text-[var(--secondary)]"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
