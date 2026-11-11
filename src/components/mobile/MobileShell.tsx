"use client";

import React, { useEffect } from "react";
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

export function MobileShell() {
  const { activeScreen, setActiveScreen, resolvedTheme } = useBondhu();

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("screen");
    if (param && MOBILE_SCREENS.some((s) => s.id === param)) {
      setActiveScreen(param as MobileScreenId);
    }
  }, [setActiveScreen]);

  const category = getScreenCategory(activeScreen);

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
    <main className="flex min-h-[100dvh] w-full items-center justify-center bg-[var(--background)] sm:p-4">
      <div
        data-theme={frameTheme}
        className="relative h-[100dvh] w-full overflow-hidden bg-[var(--background)] sm:h-[min(844px,calc(100dvh-32px))] sm:min-h-[560px] sm:max-w-[390px] sm:rounded-[36px] sm:border sm:border-[var(--border)] sm:shadow-[0_24px_60px_rgba(20,45,35,0.14)]"
      >
        {renderScreen()}
      </div>
    </main>
  );
}
