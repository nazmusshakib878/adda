"use client";

import React, { useState } from "react";
import { useBondhu } from "@/components/context/BondhuContext";
import { MOBILE_SCREENS, type MobileScreenId } from "@/data/bondhu-data";
import { AuthOnboardingViews } from "./AuthOnboardingViews";
import { FeedPostViews } from "./FeedPostViews";
import { ChatsMessagingViews } from "./ChatsMessagingViews";
import { CallsViews } from "./CallsViews";
import { ProfileSettingsViews } from "./ProfileSettingsViews";
import { SystemStateViews } from "./SystemStateViews";

function getScreenCategory(id: MobileScreenId) {
  if (
    id.startsWith("01-") ||
    id.startsWith("02-") ||
    id.startsWith("03-") ||
    id.startsWith("04-") ||
    id.startsWith("05-") ||
    id.startsWith("06-") ||
    id.startsWith("07-") ||
    id.startsWith("08-") ||
    id.startsWith("09-") ||
    id.startsWith("10-")
  ) {
    return "auth";
  }
  if (
    id.startsWith("11-") ||
    id.startsWith("12-") ||
    id.startsWith("13-") ||
    id.startsWith("14-") ||
    id.startsWith("15-") ||
    id.startsWith("16-") ||
    id.startsWith("17-") ||
    id === "42-home-dark" ||
    id === "50-share-post" ||
    id === "51-home-bn" ||
    id === "52-video-post"
  ) {
    return "feed";
  }
  if (
    id.startsWith("18-") ||
    id.startsWith("19-") ||
    id.startsWith("20-") ||
    id.startsWith("21-") ||
    id.startsWith("22-") ||
    id === "43-conversation-dark"
  ) {
    return "chats";
  }
  if (
    id.startsWith("23-") ||
    id.startsWith("24-") ||
    id.startsWith("25-") ||
    id.startsWith("26-") ||
    id.startsWith("27-") ||
    id.startsWith("28-") ||
    id.startsWith("29-") ||
    id.startsWith("30-") ||
    id.startsWith("31-") ||
    id.startsWith("32-")
  ) {
    return "calls";
  }
  if (
    id.startsWith("33-") ||
    id.startsWith("34-") ||
    id.startsWith("35-") ||
    id.startsWith("36-") ||
    id.startsWith("37-") ||
    id.startsWith("38-") ||
    id.startsWith("39-") ||
    id.startsWith("40-") ||
    id.startsWith("41-") ||
    id === "44-settings-dark"
  ) {
    return "profile";
  }
  return "system";
}

const GROUPS = [
  "Onboarding & Auth",
  "Home & Social",
  "Messaging",
  "Calls",
  "Profile & Settings",
  "Variants & States",
] as const;

export function MobileShell() {
  const { activeScreen, setActiveScreen, resolvedTheme } = useBondhu();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const category = getScreenCategory(activeScreen);
  const currentMeta = MOBILE_SCREENS.find((s) => s.id === activeScreen);

  const isForcedDarkFrame =
    activeScreen === "42-home-dark" ||
    activeScreen === "43-conversation-dark" ||
    activeScreen === "44-settings-dark";

  const frameTheme = isForcedDarkFrame ? "dark" : resolvedTheme;

  const renderScreen = () => {
    switch (category) {
      case "auth":
        return <AuthOnboardingViews />;
      case "feed":
        return <FeedPostViews />;
      case "chats":
        return <ChatsMessagingViews />;
      case "calls":
        return <CallsViews />;
      case "profile":
        return <ProfileSettingsViews />;
      default:
        return <SystemStateViews />;
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-2 py-2 sm:gap-6 sm:px-6 sm:py-5 md:flex-row md:items-start lg:py-6">
      {/* Tablet & Desktop Interactive Screen Index (All 52 Figma Frames) */}
      <aside className="hidden shrink-0 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 md:block md:w-[260px] lg:w-[320px] lg:p-5 xl:w-[340px]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3.5">
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-[var(--primary)]">
              01 · MOBILE EXPERIENCE
            </p>
            <h2 className="mt-0.5 text-[16px] font-semibold text-[var(--text)] lg:text-[17px]">
              52 Interactive Screens
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveScreen("11-home-feed")}
            className="cursor-pointer rounded-[10px] bg-[var(--accent-surface)] px-3 py-1.5 text-[11px] font-semibold text-[var(--primary)]"
          >
            Jump to Home
          </button>
        </div>

        <div className="bondhu-scroll mt-4 flex max-h-[calc(100dvh-210px)] flex-col gap-5 overflow-y-auto pr-1">
          {GROUPS.map((group) => (
            <div key={group}>
              <p className="mb-2 text-[11px] font-semibold tracking-wide text-[var(--secondary)]">
                {group.toUpperCase()}
              </p>
              <div className="flex flex-col gap-1">
                {MOBILE_SCREENS.filter((s) => s.group === group).map((s) => {
                  const isActive = s.id === activeScreen;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveScreen(s.id)}
                      className={`flex cursor-pointer items-center justify-between rounded-[10px] px-3 py-2 text-left text-[12px] transition-colors ${
                        isActive
                          ? "bg-[var(--accent-surface)] font-semibold text-[var(--primary)]"
                          : "text-[var(--text)] hover:bg-[var(--background)]"
                      }`}
                    >
                      <span>{s.label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Mobile Stage */}
      <main className="flex min-w-0 flex-1 flex-col items-center">
        {/* Compact mobile screen switcher bar (shown on < md) */}
        <div className="mb-2.5 flex w-full max-w-[390px] items-center justify-between rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 md:hidden">
          <div className="min-w-0 pr-2">
            <p className="text-[10px] font-semibold text-[var(--primary)]">
              ACTIVE SCREEN
            </p>
            <p className="truncate text-[12px] font-semibold text-[var(--text)]">
              {currentMeta?.label}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen((o) => !o)}
            className="shrink-0 cursor-pointer rounded-[10px] bg-[var(--accent-surface)] px-3 py-1.5 text-[11px] font-semibold text-[var(--primary)]"
          >
            {drawerOpen ? "Close" : "All 52 screens"}
          </button>
        </div>

        {drawerOpen && (
          <div className="bondhu-scroll mb-3 max-h-[280px] w-full max-w-[390px] overflow-y-auto rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-3 md:hidden">
            <div className="grid grid-cols-1 gap-1">
              {MOBILE_SCREENS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setActiveScreen(s.id);
                    setDrawerOpen(false);
                  }}
                  className={`rounded-[8px] px-3 py-2 text-left text-[12px] ${
                    s.id === activeScreen
                      ? "bg-[var(--accent-surface)] font-semibold text-[var(--primary)]"
                      : "text-[var(--text)]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Responsive Device Frame (fits both mobile viewports & 768px-900px laptops without clipping) */}
        <div
          data-theme={frameTheme}
          className="relative h-[calc(100dvh-164px)] min-h-[540px] max-h-[844px] w-full max-w-[390px] overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--background)] shadow-[0_24px_60px_rgba(20,45,35,0.14)] sm:h-[min(844px,calc(100dvh-124px))] sm:min-h-[600px] sm:rounded-[36px]"
        >
          {renderScreen()}
        </div>

        <p className="mt-2.5 hidden text-center text-[12px] text-[var(--secondary)] sm:block">
          Showing <span className="font-semibold text-[var(--text)]">{currentMeta?.label}</span>{" "}
          · Click any element inside the prototype to navigate live flows.
        </p>
      </main>
    </div>
  );
}
