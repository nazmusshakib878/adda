"use client";

import React, { useState } from "react";
import { useBondhu } from "@/components/context/BondhuContext";
import { Avatar } from "@/components/ui/Avatar";
import { BondhuIcon, BondhuToggle } from "@/components/ui/BondhuIcon";
import {
  BondhuButton,
  BondhuInput,
  HomeIndicator,
  MobileStatusBar,
  MobileTopHeader,
} from "@/components/ui/Primitives";
import { COPY } from "@/lib/i18n";
import { PEOPLE } from "@/data/bondhu-data";
import { MobileBottomNav } from "./MobileBottomNav";

export function ProfileSettingsViews() {
  const {
    activeScreen,
    setActiveScreen,
    goBackScreen,
    locale,
    setLocale,
    themePreference,
    setThemePreference,
    currentUser,
    updateCurrentUser,
    posts,
    privacy,
    togglePrivacyPref,
    showToast,
  } = useBondhu();

  const t = COPY[locale];
  const [editName, setEditName] = useState(currentUser.name);
  const [editHandle, setEditHandle] = useState(currentUser.handle);
  const [editLocation, setEditLocation] = useState(currentUser.location);
  const [editBio, setEditBio] = useState(currentUser.bio);

  // My Profile & Profile Posts ("33-my-profile", "35-profile-posts")
  if (
    activeScreen === "33-my-profile" ||
    activeScreen === "35-profile-posts"
  ) {
    const isPostsFocus = activeScreen === "35-profile-posts";
    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <div className="flex items-center justify-between px-[24px] pt-[6px]">
          <h1 className="text-[28px] font-semibold text-[var(--text)]">
            {isPostsFocus ? "Profile posts" : t.myProfileTitle}
          </h1>
          <button
            type="button"
            onClick={() => setActiveScreen("39-app-settings")}
            aria-label="Settings"
            className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px] hover:bg-[var(--surface)]"
          >
            <BondhuIcon name="settings" tone="text" size={22} />
          </button>
        </div>

        <div className="bondhu-scroll flex flex-1 flex-col gap-4 overflow-y-auto px-[16px] py-[12px]">
          {/* Figma Cover Banner + Overlapping Portrait */}
          <div>
            <div className="h-[152px] w-full overflow-hidden rounded-[20px]">
              <img
                src="/assets/images/weekend-hills.png"
                alt="Cover photo"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="-mt-[44px] px-[16px]">
              <Avatar
                src={currentUser.avatar}
                alt={currentUser.name}
                size={88}
                online
                className="ring-4 ring-[var(--background)]"
              />
            </div>

            <div className="px-[8px] pt-[12px]">
              <h2 className="text-[26px] font-semibold leading-[1.25] text-[var(--text)]">
                {currentUser.name}
              </h2>
              <p className="mt-1 text-[14px] leading-[1.45] text-[var(--secondary)]">
                {currentUser.bio}
              </p>
              <p className="text-[14px] leading-[1.45] text-[var(--secondary)]">
                Designer · {currentUser.location}
              </p>

              <div className="mt-4">
                <BondhuButton
                  variant="secondary"
                  onClick={() => setActiveScreen("34-edit-profile")}
                >
                  Edit profile
                </BondhuButton>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 px-[8px]">
                <button
                  type="button"
                  onClick={() => setActiveScreen("35-profile-posts")}
                  className="cursor-pointer text-left"
                >
                  <p className="text-[20px] font-semibold leading-[1.25] text-[var(--text)] sm:text-[24px]">
                    {currentUser.postsCount}
                  </p>
                  <p className="text-[11px] text-[var(--secondary)]">
                    {t.postsLabel}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScreen("36-connections")}
                  className="cursor-pointer text-left"
                >
                  <p className="text-[20px] font-semibold leading-[1.25] text-[var(--text)] sm:text-[24px]">
                    {currentUser.connectionsCount}
                  </p>
                  <p className="text-[11px] text-[var(--secondary)]">
                    {t.connectionsLabel}
                  </p>
                </button>
                <div className="text-left">
                  <p className="text-[20px] font-semibold leading-[1.25] text-[var(--text)] sm:text-[24px]">
                    {currentUser.followingCount}
                  </p>
                  <p className="text-[11px] text-[var(--secondary)]">
                    {t.followingLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveScreen("35-profile-posts")}
            className="flex h-[84px] cursor-pointer items-center gap-[16px] rounded-[18px] bg-[var(--surface)] px-[16px] text-left transition-colors hover:border hover:border-[var(--primary)]"
          >
            <BondhuIcon name="image" tone="primary" size={24} />
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-[var(--text)]">
                My posts
              </p>
              <p className="text-[11px] text-[var(--secondary)]">
                Your stories, all in one place
              </p>
            </div>
            <BondhuIcon name="chevron" tone="secondary" size={20} />
          </button>

          {isPostsFocus &&
            posts.slice(0, 2).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveScreen("14-post-details")}
                className="flex cursor-pointer items-center gap-3 rounded-[18px] bg-[var(--surface)] p-3 text-left"
              >
                <img
                  src={p.image || "/assets/images/weekend-hills.png"}
                  alt=""
                  className="h-[68px] w-[86px] rounded-[12px] object-cover"
                />
                <div>
                  <p className="line-clamp-2 text-[13px] font-medium text-[var(--text)]">
                    {p.lines[0]}
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--secondary)]">
                    {p.likes} likes · {p.commentsCount} comments
                  </p>
                </div>
              </button>
            ))}
        </div>

        <MobileBottomNav activeTab="profile" onSelect={setActiveScreen} locale={locale} />
        <HomeIndicator />
      </div>
    );
  }

  // Edit Profile ("34-edit-profile")
  if (activeScreen === "34-edit-profile") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
        <div className="flex flex-1 flex-col overflow-hidden">
          <MobileStatusBar />
          <MobileTopHeader title="Edit profile" onBack={goBackScreen} />

          <div className="bondhu-scroll flex flex-1 flex-col gap-4 overflow-y-auto px-[24px] py-[10px]">
            <div className="flex flex-col items-center gap-2 py-2">
              <Avatar src={currentUser.avatar} alt={currentUser.name} size={80} />
              <button
                type="button"
                onClick={() => showToast("Profile portrait updated")}
                className="cursor-pointer text-[12px] font-semibold text-[var(--primary)]"
              >
                Change photo
              </button>
            </div>

            <BondhuInput
              label="Full name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <BondhuInput
              label="Username"
              value={editHandle}
              onChange={(e) => setEditHandle(e.target.value)}
            />
            <BondhuInput
              label="Location"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-semibold text-[var(--secondary)]">
                Bio
              </label>
              <textarea
                rows={3}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full resize-none rounded-[14px] border border-[var(--border)] bg-[var(--surface)] p-3.5 text-[14px] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="px-[24px] pb-[12px] pt-2">
          <BondhuButton
            onClick={() => {
              updateCurrentUser({
                name: editName,
                handle: editHandle,
                location: editLocation,
                bio: editBio,
              });
              showToast("Profile changes saved");
              setActiveScreen("33-my-profile");
            }}
          >
            Save changes
          </BondhuButton>
          <div className="mt-3">
            <HomeIndicator />
          </div>
        </div>
      </div>
    );
  }

  // Connections ("36-connections")
  if (activeScreen === "36-connections") {
    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader title="Connections" onBack={goBackScreen} />

        <div className="bondhu-scroll flex flex-1 flex-col gap-[12px] overflow-y-auto px-[16px] py-[10px]">
          {PEOPLE.filter((p) => p.id !== "nadia").map((person) => (
            <div
              key={person.id}
              className="flex h-[83px] items-center justify-between rounded-[18px] bg-[var(--surface)] px-[14px]"
            >
              <div className="flex items-center gap-[14px]">
                <Avatar
                  src={person.avatar}
                  alt={person.name}
                  size={48}
                  online={person.online}
                />
                <div>
                  <p className="text-[14px] font-semibold text-[var(--text)]">
                    {person.name}
                  </p>
                  <p className="text-[12px] text-[var(--secondary)]">
                    {person.connectionsCount} connections
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveScreen("19-conversation")}
                className="cursor-pointer rounded-[10px] bg-[var(--accent-surface)] px-3.5 py-2 text-[12px] font-semibold text-[var(--primary)]"
              >
                Message
              </button>
            </div>
          ))}
        </div>

        <MobileBottomNav activeTab="profile" onSelect={setActiveScreen} locale={locale} />
        <HomeIndicator />
      </div>
    );
  }

  // Privacy Settings ("37-privacy-settings")
  if (activeScreen === "37-privacy-settings") {
    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader title="Privacy settings" onBack={goBackScreen} />

        <div className="bondhu-scroll flex flex-1 flex-col gap-3 overflow-y-auto px-[20px] py-[12px]">
          <SettingToggleRow
            title="Private account"
            subtitle="Only approved friends see your full posts"
            checked={privacy.privateAccount}
            onToggle={() => togglePrivacyPref("privateAccount")}
          />
          <SettingToggleRow
            title="Read receipts"
            subtitle="Show ✓✓ when you have read a message"
            checked={privacy.readReceipts}
            onToggle={() => togglePrivacyPref("readReceipts")}
          />
          <SettingToggleRow
            title="Online status"
            subtitle="Let close friends see when you are active"
            checked={privacy.onlinePresence}
            onToggle={() => togglePrivacyPref("onlinePresence")}
          />
        </div>
        <HomeIndicator />
      </div>
    );
  }

  // Security Settings ("38-security-settings")
  if (activeScreen === "38-security-settings") {
    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader title="Security settings" onBack={goBackScreen} />

        <div className="bondhu-scroll flex flex-1 flex-col gap-3 overflow-y-auto px-[20px] py-[12px]">
          <div className="flex items-center gap-3 rounded-[18px] bg-[var(--accent-surface)] p-4">
            <BondhuIcon name="lock" tone="primary" size={24} />
            <p className="text-[12px] leading-[1.45] text-[var(--primary)]">
              End-to-end encryption protects every message and call automatically.
            </p>
          </div>

          <SettingToggleRow
            title="Two-factor authentication"
            subtitle="SMS OTP required on unfamiliar devices"
            checked={privacy.twoFactor}
            onToggle={() => togglePrivacyPref("twoFactor")}
          />
          <SettingToggleRow
            title="Login notifications"
            subtitle="Alert whenever a new session signs in"
            checked={privacy.loginAlerts}
            onToggle={() => togglePrivacyPref("loginAlerts")}
          />

          <button
            type="button"
            onClick={() => setActiveScreen("10-new-password")}
            className="mt-2 flex h-[54px] cursor-pointer items-center justify-between rounded-[18px] bg-[var(--surface)] px-4 text-[14px] font-semibold text-[var(--text)]"
          >
            <span>Change password</span>
            <BondhuIcon name="chevron" tone="secondary" size={20} />
          </button>
        </div>
        <HomeIndicator />
      </div>
    );
  }

  // Appearance ("40-appearance")
  if (activeScreen === "40-appearance") {
    const options = [
      { id: "light" as const, title: "Light mode", desc: "Crisp ivory & deep emerald clarity" },
      { id: "dark" as const, title: "Dark mode", desc: "Calm low-light midnight forest palette" },
      { id: "device" as const, title: "Use device theme", desc: "Follow your system preference automatically" },
    ];

    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader title="Appearance" onBack={goBackScreen} />

        <div className="flex flex-1 flex-col gap-3 px-[20px] pt-3">
          {options.map((opt) => {
            const selected = themePreference === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setThemePreference(opt.id)}
                className={`flex cursor-pointer items-center justify-between rounded-[18px] border p-4 text-left transition-colors ${
                  selected
                    ? "border-[var(--primary)] bg-[var(--accent-surface)]"
                    : "border-[var(--border)] bg-[var(--surface)]"
                }`}
              >
                <div>
                  <p className="text-[14px] font-semibold text-[var(--text)]">
                    {opt.title}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[var(--secondary)]">
                    {opt.desc}
                  </p>
                </div>
                <span
                  className={`flex h-[24px] w-[24px] items-center justify-center rounded-full ${
                    selected
                      ? "bg-[var(--primary)]"
                      : "border border-[var(--border)]"
                  }`}
                >
                  {selected && (
                    <BondhuIcon name="check" tone="on-primary" size={14} />
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <HomeIndicator />
      </div>
    );
  }

  // Language · বাংলা ("41-language")
  if (activeScreen === "41-language") {
    return (
      <div className="font-bengali flex h-full w-full flex-col justify-between bg-[var(--background)]">
        <div>
          <MobileStatusBar />
          <MobileTopHeader title="ভাষা · Language" onBack={goBackScreen} />

          <div className="flex flex-col gap-3 px-[20px] pt-3">
            {[
              { id: "bn" as const, title: "বাংলা", sub: "আপনার নিজের ভাষায় বন্ধু ব্যবহার করুন" },
              { id: "en" as const, title: "English", sub: "Use Bondhu in English" },
            ].map((lang) => {
              const selected = locale === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => {
                    setLocale(lang.id);
                    showToast(
                      lang.id === "bn" ? "ভাষা বাংলায় নির্ধারিত হয়েছে" : "Language set to English"
                    );
                  }}
                  className={`flex cursor-pointer items-center justify-between rounded-[18px] border p-4 text-left ${
                    selected
                      ? "border-[var(--primary)] bg-[var(--accent-surface)]"
                      : "border-[var(--border)] bg-[var(--surface)]"
                  }`}
                >
                  <div>
                    <p className="text-[15px] font-semibold text-[var(--text)]">
                      {lang.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[var(--secondary)]">
                      {lang.sub}
                    </p>
                  </div>
                  <span
                    className={`flex h-[24px] w-[24px] items-center justify-center rounded-full ${
                      selected
                        ? "bg-[var(--primary)]"
                        : "border border-[var(--border)]"
                    }`}
                  >
                    {selected && (
                      <BondhuIcon name="check" tone="on-primary" size={14} />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-[24px] pb-[12px]">
          <BondhuButton
            onClick={() =>
              setActiveScreen(locale === "bn" ? "51-home-bn" : "11-home-feed")
            }
          >
            {locale === "bn" ? "হোম ফিডে ফিরুন" : "Apply language"}
          </BondhuButton>
          <div className="mt-3">
            <HomeIndicator />
          </div>
        </div>
      </div>
    );
  }

  // App Settings & Settings Dark ("39-app-settings", "44-settings-dark")
  const navRows = [
    {
      label: "Edit profile",
      desc: currentUser.name,
      icon: "user" as const,
      screen: "34-edit-profile" as const,
    },
    {
      label: "Privacy",
      desc: "Audience, receipts & visibility",
      icon: "lock" as const,
      screen: "37-privacy-settings" as const,
    },
    {
      label: "Security",
      desc: "2FA & session alerts",
      icon: "settings" as const,
      screen: "38-security-settings" as const,
    },
    {
      label: "Appearance",
      desc: themePreference === "dark" ? "Dark mode" : "Light mode",
      icon: "moon" as const,
      screen: "40-appearance" as const,
    },
    {
      label: "Language",
      desc: locale === "bn" ? "বাংলা" : "English",
      icon: "globe" as const,
      screen: "41-language" as const,
    },
  ];

  return (
    <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileStatusBar />
        <MobileTopHeader title={t.settingsTitle} onBack={goBackScreen} />

        <div className="bondhu-scroll flex flex-1 flex-col gap-3 overflow-y-auto px-[20px] py-[8px]">
          {navRows.map((row) => (
            <button
              key={row.label}
              type="button"
              onClick={() => setActiveScreen(row.screen)}
              className="flex cursor-pointer items-center justify-between rounded-[18px] bg-[var(--surface)] px-[16px] py-[14px] text-left transition-colors hover:border hover:border-[var(--primary)]"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-[var(--accent-surface)]">
                  <BondhuIcon name={row.icon} tone="primary" size={20} />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-[var(--text)]">
                    {row.label}
                  </p>
                  <p className="text-[12px] text-[var(--secondary)]">
                    {row.desc}
                  </p>
                </div>
              </div>
              <BondhuIcon name="chevron" tone="secondary" size={20} />
            </button>
          ))}

          <SettingToggleRow
            title="Push notifications"
            subtitle="Messages, calls & friend activity"
            checked={privacy.pushNotifications}
            onToggle={() => togglePrivacyPref("pushNotifications")}
          />
        </div>
      </div>

      <div className="px-[24px] pb-[12px] pt-2">
        <BondhuButton
          variant="destructive"
          onClick={() => {
            showToast("Signed out");
            setActiveScreen("05-login");
          }}
        >
          Sign out
        </BondhuButton>
        <div className="mt-3">
          <HomeIndicator />
        </div>
      </div>
    </div>
  );
}

function SettingToggleRow({
  title,
  subtitle,
  checked,
  onToggle,
}: {
  title: string;
  subtitle: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-[18px] bg-[var(--surface)] px-[16px] py-[14px]">
      <div className="pr-3">
        <p className="text-[14px] font-semibold text-[var(--text)]">{title}</p>
        <p className="mt-0.5 text-[12px] text-[var(--secondary)]">{subtitle}</p>
      </div>
      <BondhuToggle checked={checked} onChange={onToggle} label={title} />
    </div>
  );
}
