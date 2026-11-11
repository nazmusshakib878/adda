"use client";

import React from "react";
import { useBondhu } from "@/components/context/BondhuContext";
import { BondhuIcon } from "@/components/ui/BondhuIcon";
import {
  BondhuButton,
  HomeIndicator,
  MobileStatusBar,
  MobileTopHeader,
} from "@/components/ui/Primitives";
import { MobileBottomNav } from "./MobileBottomNav";

export function SystemStateViews() {
  const { activeScreen, setActiveScreen, goBackScreen, showToast } =
    useBondhu();

  if (activeScreen === "45-loading") {
    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <div className="px-[24px] pt-[8px]">
          <h1 className="text-[28px] font-semibold text-[var(--text)]">Home</h1>
          <p className="mt-[4px] text-[13px] text-[var(--secondary)]">
            Bringing your people closer…
          </p>
        </div>

        <div className="bondhu-scroll flex flex-1 flex-col gap-[16px] overflow-y-auto px-[16px] py-[16px]">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 rounded-[18px] bg-[var(--surface)] p-[16px]"
            >
              <div className="flex items-center gap-[16px]">
                <div className="h-[44px] w-[44px] animate-pulse rounded-full bg-[var(--border)]" />
                <div className="flex flex-col gap-2">
                  <div className="h-[12px] w-[156px] animate-pulse rounded-[6px] bg-[var(--border)]" />
                  <div className="h-[9px] w-[97px] animate-pulse rounded-[5px] bg-[var(--border)]" />
                </div>
              </div>
              <div className="h-[12px] w-full animate-pulse rounded-[6px] bg-[var(--border)]" />
              <div className="h-[12px] w-[72%] animate-pulse rounded-[6px] bg-[var(--border)]" />
            </div>
          ))}

          <div className="pt-1">
            <BondhuButton
              variant="secondary"
              onClick={() => setActiveScreen("11-home-feed")}
            >
              Refresh feed
            </BondhuButton>
          </div>
        </div>

        <MobileBottomNav activeTab="home" onSelect={setActiveScreen} />
        <HomeIndicator />
      </div>
    );
  }

  if (activeScreen === "46-empty-inbox") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
        <div>
          <MobileStatusBar />
          <MobileTopHeader title="Chats" onBack={goBackScreen} />
        </div>

        <div className="bondhu-scroll flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-[24px] py-4 text-center">
          <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-[var(--accent-surface)] sm:h-[104px] sm:w-[104px]">
            <BondhuIcon name="chat" tone="primary" size={32} />
          </div>
          <h2 className="mt-[28px] text-[24px] font-semibold leading-[1.3] text-[var(--text)] sm:mt-[36px] sm:text-[28px]">
            Say your first hello
          </h2>
          <p className="mt-[12px] text-[14px] leading-[1.5] text-[var(--secondary)]">
            Good conversations start with a simple hello. Find a friend and make their day.
          </p>
        </div>

        <div className="px-[24px] pb-[12px]">
          <BondhuButton onClick={() => setActiveScreen("24-contacts")}>
            Find your people
          </BondhuButton>
          <div className="mt-4">
            <HomeIndicator />
          </div>
        </div>
      </div>
    );
  }

  if (activeScreen === "47-connection-error") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
        <div>
          <MobileStatusBar />
          <MobileTopHeader title="Bondhu" onBack={goBackScreen} />
        </div>

        <div className="bondhu-scroll flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-[24px] py-4 text-center">
          <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-[var(--alert)]/15 sm:h-[104px] sm:w-[104px]">
            <BondhuIcon name="globe" tone="alert" size={32} />
          </div>
          <h2 className="mt-[28px] text-[24px] font-semibold leading-[1.3] text-[var(--text)] sm:mt-[36px] sm:text-[28px]">
            Connection lost
          </h2>
          <p className="mt-[12px] text-[14px] leading-[1.5] text-[var(--secondary)]">
            We couldn’t reach our servers right now. Check your connection and try again.
          </p>
        </div>

        <div className="px-[24px] pb-[12px]">
          <BondhuButton
            onClick={() => {
              showToast("Reconnected to Bondhu");
              setActiveScreen("11-home-feed");
            }}
          >
            Try again
          </BondhuButton>
          <div className="mt-4">
            <HomeIndicator />
          </div>
        </div>
      </div>
    );
  }

  if (activeScreen === "48-success") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
        <div>
          <MobileStatusBar />
          <MobileTopHeader title="All set" onBack={goBackScreen} />
        </div>

        <div className="bondhu-scroll flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-[24px] py-4 text-center">
          <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-[var(--accent-surface)] sm:h-[104px] sm:w-[104px]">
            <BondhuIcon name="check" tone="primary" size={34} />
          </div>
          <h2 className="mt-[28px] text-[24px] font-semibold leading-[1.3] text-[var(--text)] sm:mt-[36px] sm:text-[28px]">
            You’re good to go
          </h2>
          <p className="mt-[12px] text-[14px] leading-[1.5] text-[var(--secondary)]">
            Your account is verified and secured. Welcome back to your circle.
          </p>
        </div>

        <div className="px-[24px] pb-[12px]">
          <BondhuButton onClick={() => setActiveScreen("11-home-feed")}>
            Go to Home feed
          </BondhuButton>
          <div className="mt-4">
            <HomeIndicator />
          </div>
        </div>
      </div>
    );
  }

  // "49-offline"
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
      <div>
        <MobileStatusBar />
        <MobileTopHeader title="You’re offline" onBack={goBackScreen} />
      </div>

      <div className="bondhu-scroll flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-[24px] py-4 text-center">
        <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-[var(--accent-surface)] sm:h-[104px] sm:w-[104px]">
          <BondhuIcon name="chat" tone="primary" size={32} />
        </div>
        <h2 className="mt-[28px] text-[24px] font-semibold leading-[1.3] text-[var(--text)] sm:mt-[36px] sm:text-[28px]">
          Still here for you
        </h2>
        <p className="mt-[12px] text-[14px] leading-[1.5] text-[var(--secondary)]">
          Your recent chats are available. New messages will be sent when you’re connected again.
        </p>
      </div>

      <div className="px-[24px] pb-[12px]">
        <BondhuButton onClick={() => setActiveScreen("19-conversation")}>
          View recent chats
        </BondhuButton>
        <div className="mt-4">
          <HomeIndicator />
        </div>
      </div>
    </div>
  );
}
