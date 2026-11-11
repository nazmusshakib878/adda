"use client";

import React, { useState } from "react";
import { useBondhu } from "@/components/context/BondhuContext";
import { Avatar } from "@/components/ui/Avatar";
import {
  BondhuIcon,
  BondhuToggle,
  ProgressDots,
} from "@/components/ui/BondhuIcon";
import {
  BondhuButton,
  BondhuInput,
  MetricCard,
} from "@/components/ui/Primitives";
import {
  COLOR_ROLES,
  DESIGN_SYSTEM_ICONS,
  LAYOUT_METRICS,
} from "@/lib/tokens";
import { PEOPLE } from "@/data/bondhu-data";

export default function DesignSystemPage() {
  const { resolvedTheme, toggleTheme, showToast } = useBondhu();
  const [sampleToggleOn, setSampleToggleOn] = useState(true);
  const [sampleToggleOff, setSampleToggleOff] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[1440px] px-3 py-5 sm:px-10 sm:py-8">
      {/* Reference Foundations Header (2:3880) */}
      <section className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--text)] sm:text-[42px]">
              Bondhu / A little closer
            </h1>
            <p className="mt-3 text-[16px] text-[var(--secondary)]">
              One connected design language for social, chat, calls, and community operations.
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-[44px] cursor-pointer items-center gap-2 rounded-[14px] bg-[var(--accent-surface)] px-4 text-[13px] font-semibold text-[var(--primary)]"
          >
            <BondhuIcon name="moon" tone="primary" size={18} />
            <span>
              Preview: {resolvedTheme === "dark" ? "Dark mode" : "Light mode"}
            </span>
          </button>
        </div>

        {/* 01 Semantic Palette */}
        <div className="mt-10">
          <p className="text-[13px] font-semibold tracking-wider text-[var(--secondary)]">
            01 &nbsp; SEMANTIC PALETTE
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {COLOR_ROLES.map((c) => (
              <div
                key={c.name}
                className={`flex h-[118px] flex-col justify-between rounded-[16px] p-4 ${c.bgClass} ${c.textClass}`}
              >
                <div>
                  <p className="text-[15px] font-semibold">{c.name}</p>
                  <p className="text-[12px] opacity-85">
                    {resolvedTheme === "dark" ? c.darkHex : c.hex}
                  </p>
                </div>
                <p className="text-[11px] opacity-80">{c.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 02 Typography */}
        <div className="mt-10">
          <p className="text-[13px] font-semibold tracking-wider text-[var(--secondary)]">
            02 &nbsp; TYPOGRAPHY
          </p>
          <div className="mt-4 space-y-4">
            <p className="text-[32px] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--text)] sm:text-[38px]">
              Your people. A little closer.
            </p>
            <p className="text-[18px] text-[var(--secondary)]">
              Inter · clear, friendly and familiar at every size
            </p>
            <p className="font-bengali text-[24px] font-semibold text-[var(--text)] sm:text-[28px]">
              আপনার ভাষায়, আপনার মানুষ।
            </p>
          </div>
        </div>

        {/* 03 Layout & Interaction */}
        <div className="mt-10">
          <p className="text-[13px] font-semibold tracking-wider text-[var(--secondary)]">
            03 &nbsp; LAYOUT &amp; INTERACTION
          </p>
          <div className="mt-4 space-y-2 text-[16px] text-[var(--text)]">
            <p>
              {LAYOUT_METRICS.spacingScale.join(" / ")} spacing &nbsp;·&nbsp;{" "}
              {LAYOUT_METRICS.radii[0]} / {LAYOUT_METRICS.radii[3]} corner radius &nbsp;·&nbsp;{" "}
              {LAYOUT_METRICS.minTouchTarget}+ touch targets
            </p>
            <p className="text-[var(--secondary)]">
              {LAYOUT_METRICS.mobileViewport.width} × {LAYOUT_METRICS.mobileViewport.height} mobile &nbsp;·&nbsp;{" "}
              {LAYOUT_METRICS.desktopViewport.width} × {LAYOUT_METRICS.desktopViewport.height} desktop &nbsp;·&nbsp; Light / Dark semantic modes
            </p>
          </div>

          <div className="mt-6 grid max-w-[1074px] grid-cols-1 gap-5 md:grid-cols-3">
            <BondhuButton onClick={() => showToast("Primary action triggered")}>
              Primary action
            </BondhuButton>
            <BondhuButton
              variant="secondary"
              onClick={() => showToast("Secondary action triggered")}
            >
              Secondary action
            </BondhuButton>
            <BondhuInput placeholder="Input / Default field" />
          </div>
        </div>

        {/* 04 Component Families */}
        <div className="mt-10">
          <p className="text-[13px] font-semibold tracking-wider text-[var(--secondary)]">
            04 &nbsp; COMPONENT FAMILIES
          </p>
          <p className="mt-3 text-[15px] text-[var(--secondary)]">
            Buttons · inputs · navigation · cards · avatars · chat bubbles · notifications · dialogs · toggles · call controls
          </p>
        </div>
      </section>

      {/* Live Component Specimens */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Buttons & Inputs States */}
        <section className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-[18px] font-semibold text-[var(--text)]">
            Buttons &amp; Input States
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <BondhuButton compact>Primary</BondhuButton>
            <BondhuButton compact variant="secondary">
              Secondary
            </BondhuButton>
            <BondhuButton compact variant="destructive">
              Destructive
            </BondhuButton>
            <BondhuButton compact variant="disabled">
              Disabled
            </BondhuButton>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <BondhuInput label="Default" placeholder="Phone number or email" />
            <BondhuInput
              label="Error"
              state="error"
              defaultValue="invalid@email"
              helperText="Please enter a valid phone number or email"
            />
            <BondhuInput
              label="Success"
              state="success"
              defaultValue="nadia@bondhu.app"
              helperText="Verified and available"
            />
            <BondhuInput
              label="Disabled"
              state="disabled"
              defaultValue="Locked workspace identifier"
            />
          </div>
        </section>

        {/* Vector Iconography & Portraits */}
        <section className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-[18px] font-semibold text-[var(--text)]">
            Iconography (23 Vector Icons) &amp; Portraits
          </h2>

          <div className="mt-5 grid grid-cols-3 gap-2.5 min-[420px]:grid-cols-4 sm:grid-cols-6 sm:gap-3">
            {DESIGN_SYSTEM_ICONS.map((iconName) => (
              <div
                key={iconName}
                className="flex flex-col items-center gap-2 rounded-[14px] border border-[var(--divider)] bg-[var(--background)] py-3"
              >
                <BondhuIcon name={iconName} tone="primary" size={24} />
                <span className="text-[11px] font-medium text-[var(--secondary)]">
                  {iconName}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
            <div className="flex items-center gap-3">
              {PEOPLE.map((p) => (
                <Avatar
                  key={p.id}
                  src={p.avatar}
                  alt={p.name}
                  size={52}
                  online={p.online}
                />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <BondhuToggle
                checked={sampleToggleOn}
                onChange={() => setSampleToggleOn((v) => !v)}
                label="Toggle On"
              />
              <BondhuToggle
                checked={sampleToggleOff}
                onChange={() => setSampleToggleOff((v) => !v)}
                label="Toggle Off"
              />
              <ProgressDots step={0} />
            </div>
          </div>
        </section>

        {/* Chat Bubbles, Notification & Metric Card */}
        <section className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-[18px] font-semibold text-[var(--text)]">
            Chat Bubbles, Notifications &amp; Metrics
          </h2>
          <div className="mt-5 flex flex-col gap-3 rounded-[16px] bg-[var(--background)] p-4">
            <div className="max-w-[276px] self-start rounded-[18px] rounded-tl-[6px] bg-[var(--surface)] px-4 py-3 text-[13px] text-[var(--text)]">
              Hey! Just checking in — are we still meeting at 5 PM?
            </div>
            <div className="max-w-[266px] self-end rounded-[18px] rounded-tr-[6px] bg-[var(--primary)] px-4 py-3 text-[13px] text-[var(--on-primary)]">
              Yes! Already on my way there ✓✓
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 rounded-[20px] bg-[var(--accent-surface)] p-4">
            <Avatar src="/assets/images/portrait-arif.png" alt="Arif" size={44} />
            <div>
              <p className="text-[13px] font-medium text-[var(--text)]">
                Arif liked your photo.
              </p>
              <p className="text-[11px] text-[var(--secondary)]">2 min ago</p>
            </div>
          </div>

          <div className="mt-4">
            <MetricCard
              label="Total users"
              value="128,430"
              subtext="↑ 12.8% vs last month"
            />
          </div>
        </section>

        {/* Modal, Dropdown & Call Controls */}
        <section className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-[18px] font-semibold text-[var(--text)]">
            Call Controls, Dropdown &amp; Dialog
          </h2>

          <div className="mt-5 flex items-center justify-around gap-2 rounded-[20px] bg-[#10291F] p-4 sm:p-5">
            {(["mic", "speaker", "video"] as const).map((ic) => (
              <div key={ic} className="flex flex-col items-center gap-2">
                <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#DDEDE4] sm:h-[56px] sm:w-[56px]">
                  <BondhuIcon name={ic} tone="call-dark" size={22} />
                </span>
                <span className="text-[11px] capitalize text-[#E6F5ED]">
                  {ic}
                </span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#D84A51] sm:h-[56px] sm:w-[56px]">
                <BondhuIcon name="phone" tone="white" size={22} />
              </span>
              <span className="text-[11px] text-[#E6F5ED]">End</span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex h-[48px] w-full cursor-pointer items-center justify-between rounded-[14px] border border-[var(--border)] bg-[var(--background)] px-4 text-[13px] font-medium text-[var(--text)]"
              >
                <span>Audience: Friends only</span>
                <span>⌄</span>
              </button>
              {dropdownOpen && (
                <div className="mt-2 rounded-[14px] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg">
                  {["Public", "Friends only", "Weekend crew"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        showToast(`Selected ${opt}`);
                      }}
                      className="block w-full cursor-pointer rounded-[10px] px-3 py-2 text-left text-[13px] text-[var(--text)] hover:bg-[var(--accent-surface)] hover:text-[var(--primary)]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 rounded-[18px] border border-[var(--border)] bg-[var(--background)] p-4">
              <p className="text-[15px] font-semibold text-[var(--text)]">
                Archive conversation?
              </p>
              <p className="mt-1 text-[12px] text-[var(--secondary)]">
                You can restore this chat anytime from Archived threads.
              </p>
              <div className="mt-3 flex gap-2">
                <BondhuButton
                  compact
                  variant="secondary"
                  onClick={() => showToast("Cancelled")}
                >
                  Cancel
                </BondhuButton>
                <BondhuButton compact onClick={() => showToast("Archived")}>
                  Archive
                </BondhuButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
