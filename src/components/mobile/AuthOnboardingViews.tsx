"use client";

import React, { useState } from "react";
import { useBondhu } from "@/components/context/BondhuContext";
import { Avatar } from "@/components/ui/Avatar";
import { BondhuIcon, ProgressDots } from "@/components/ui/BondhuIcon";
import {
  BondhuButton,
  BondhuInput,
  HomeIndicator,
  MobileStatusBar,
  MobileTopHeader,
} from "@/components/ui/Primitives";
import { COPY } from "@/lib/i18n";
import { PEOPLE } from "@/data/bondhu-data";

export function AuthOnboardingViews() {
  const { activeScreen, setActiveScreen, locale, setLocale, showToast } =
    useBondhu();
  const t = COPY[locale];

  const [loginId, setLoginId] = useState("+880 1712 345678");
  const [loginPass, setLoginPass] = useState("••••••••••");
  const [fullName, setFullName] = useState("Nadia Rahman");
  const [otpDigits, setOtpDigits] = useState(["2", "8", "4", "6", "1", "9"]);
  const [phoneInput, setPhoneInput] = useState("+880 1712 345678");
  const [forgotInput, setForgotInput] = useState("nadia@bondhu.app");
  const [newPass, setNewPass] = useState("••••••••••");
  const [confirmPass, setConfirmPass] = useState("••••••••••");

  if (activeScreen === "01-splash") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[#138A5E] text-white">
        <MobileStatusBar lightText />

        <div className="flex flex-1 flex-col items-center justify-center px-[24px] text-center">
          <div className="mb-[24px] flex h-[88px] w-[88px] items-center justify-center rounded-[20px] bg-white shadow-sm">
            <span className="text-[56px] font-bold leading-none text-[#138A5E]">
              b
            </span>
          </div>
          <h1 className="text-[44px] font-bold leading-[1.2] tracking-[-0.02em] text-white">
            {t.brand}
          </h1>
          <p className="mt-[8px] text-[16px] font-normal text-[#D8F3E6]">
            {t.tagline}
          </p>
        </div>

        <div className="px-[24px] pb-[14px]">
          <button
            type="button"
            onClick={() => setActiveScreen("02-onboarding-1")}
            className="flex h-[52px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#E7F5EE] text-[15px] font-semibold text-[#138A5E] transition-transform active:scale-[0.99]"
          >
            {t.getStarted}
          </button>
          <p className="mt-[22px] text-center text-[10px] font-semibold tracking-[0.18em] text-[#D8F3E6]">
            {t.categories}
          </p>
          <div className="mt-4">
            <HomeIndicator light />
          </div>
        </div>
      </div>
    );
  }

  if (
    activeScreen === "02-onboarding-1" ||
    activeScreen === "03-onboarding-2" ||
    activeScreen === "04-onboarding-3"
  ) {
    const stepIdx: 0 | 1 | 2 =
      activeScreen === "02-onboarding-1"
        ? 0
        : activeScreen === "03-onboarding-2"
        ? 1
        : 2;

    const slides = [
      {
        title: "Your people.\nA little closer.",
        desc: "Share moments that matter with friends and family, free from noisy algorithms.",
        next: "03-onboarding-2" as const,
      },
      {
        title: "Good conversations.\nGreat connections.",
        desc: "Switch seamlessly between quick notes, voice messages, and crystal-clear HD video calls.",
        next: "04-onboarding-3" as const,
      },
      {
        title: "Your world.\nYour rules.",
        desc: "End-to-end encryption comes built in, so private moments stay strictly between you.",
        next: "05-login" as const,
      },
    ];
    const current = slides[stepIdx];

    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <div className="flex justify-end px-[24px] pt-[6px]">
          <button
            type="button"
            onClick={() => setActiveScreen("05-login")}
            className="cursor-pointer rounded-[10px] px-3 py-1.5 text-[14px] font-medium text-[var(--secondary)] hover:text-[var(--primary)]"
          >
            {t.skip}
          </button>
        </div>

        <div className="bondhu-scroll flex min-h-0 flex-1 flex-col justify-between gap-4 overflow-y-auto px-[24px] pb-[14px] pt-[8px]">
          {/* Editorial Illustration Surface */}
          <div className="flex min-h-[170px] h-[clamp(180px,28dvh,270px)] w-full shrink-0 flex-col items-center justify-center rounded-[28px] bg-[var(--accent-surface)] p-5">
            {stepIdx === 0 && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex -space-x-3">
                  {PEOPLE.slice(1).map((p) => (
                    <Avatar
                      key={p.id}
                      src={p.avatar}
                      alt={p.name}
                      size={64}
                      className="ring-4 ring-[var(--surface)]"
                    />
                  ))}
                </div>
                <div className="rounded-[16px] bg-[var(--surface)] px-4 py-2.5 text-[12px] font-medium text-[var(--text)] shadow-sm">
                  Weekend crew · 4 online now
                </div>
              </div>
            )}
            {stepIdx === 1 && (
              <div className="flex w-full max-w-[260px] flex-col gap-3">
                <div className="self-start rounded-2xl rounded-tl-sm bg-[var(--surface)] px-4 py-2.5 text-[12px] text-[var(--text)] shadow-sm">
                  Coffee by the lake at 5 PM? ☕
                </div>
                <div className="self-end rounded-2xl rounded-tr-sm bg-[var(--primary)] px-4 py-2.5 text-[12px] text-[var(--on-primary)] shadow-sm">
                  See you there! Bringing everyone.
                </div>
                <div className="flex items-center justify-center gap-2 self-center rounded-full bg-[var(--surface)] px-3.5 py-1.5 text-[11px] font-semibold text-[var(--primary)]">
                  <BondhuIcon name="video" tone="primary" size={16} />
                  <span>HD Video Ready</span>
                </div>
              </div>
            )}
            {stepIdx === 2 && (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[var(--surface)] shadow-sm">
                  <BondhuIcon name="lock" tone="primary" size={32} />
                </div>
                <div className="rounded-full bg-[var(--surface)] px-4 py-1.5 text-[12px] font-semibold text-[var(--primary)]">
                  End-to-end encrypted
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <ProgressDots step={stepIdx} />
            <h1 className="whitespace-pre-line text-[30px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--text)]">
              {current.title}
            </h1>
            <p className="text-[14px] leading-[1.55] text-[var(--secondary)]">
              {current.desc}
            </p>
          </div>

          <div className="pt-2">
            <BondhuButton onClick={() => setActiveScreen(current.next)}>
              {stepIdx === 2 ? "Continue to sign in" : t.continueBtn}
            </BondhuButton>
            <div className="mt-3">
              <HomeIndicator />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeScreen === "05-login") {
    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <div className="flex items-center justify-between px-[24px] pt-[12px]">
          <span className="text-[28px] font-semibold text-[var(--text)]">
            {t.brand}
          </span>
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "bn" : "en")}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[12px] font-semibold text-[var(--primary)]"
          >
            <BondhuIcon name="globe" tone="primary" size={16} />
            <span>{locale === "en" ? "English · বাংলা" : "বাংলা · English"}</span>
          </button>
        </div>

        <div className="bondhu-scroll flex flex-1 flex-col justify-between overflow-y-auto px-[24px] pt-[24px] pb-[12px]">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-[28px] font-semibold leading-[1.25] text-[var(--text)]">
                {t.loginTitle}
              </h1>
              <p className="mt-1.5 text-[14px] text-[var(--secondary)]">
                {t.loginSubtitle}
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <BondhuInput
                label={t.phoneOrEmail}
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
              <BondhuInput
                label={t.passwordLabel}
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveScreen("09-forgot-password")}
                  className="cursor-pointer text-[13px] font-semibold text-[var(--primary)]"
                >
                  {t.forgotPassword}
                </button>
              </div>
            </div>

            <BondhuButton
              onClick={() => {
                showToast("Signed in as Nadia Rahman");
                setActiveScreen("11-home-feed");
              }}
            >
              {t.loginBtn}
            </BondhuButton>

            <button
              type="button"
              onClick={() => setActiveScreen("07-phone-verify")}
              className="flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[var(--accent-surface)] text-[14px] font-semibold text-[var(--primary)]"
            >
              Sign in with SMS OTP
            </button>
          </div>

          <div className="pt-6 text-center">
            <p className="text-[13px] text-[var(--secondary)]">
              {t.noAccount}{" "}
              <button
                type="button"
                onClick={() => setActiveScreen("06-signup")}
                className="cursor-pointer font-semibold text-[var(--primary)]"
              >
                {t.signUpLink}
              </button>
            </p>
            <div className="mt-3">
              <HomeIndicator />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeScreen === "06-signup") {
    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader
          title="Create account"
          onBack={() => setActiveScreen("05-login")}
        />
        <div className="bondhu-scroll flex flex-1 flex-col justify-between overflow-y-auto px-[24px] pb-[12px] pt-[8px]">
          <div className="flex flex-col gap-4">
            <p className="text-[14px] text-[var(--secondary)]">
              Join friends, chat privately, and call anywhere.
            </p>
            <BondhuInput
              label="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <BondhuInput
              label="Mobile number"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
            />
            <BondhuInput
              label="Create password"
              type="password"
              defaultValue="••••••••••"
            />
            <div className="pt-2">
              <BondhuButton
                onClick={() => setActiveScreen("07-phone-verify")}
              >
                Continue
              </BondhuButton>
            </div>
          </div>

          <div className="pt-4 text-center">
            <p className="text-[13px] text-[var(--secondary)]">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setActiveScreen("05-login")}
                className="cursor-pointer font-semibold text-[var(--primary)]"
              >
                Sign in
              </button>
            </p>
            <div className="mt-3">
              <HomeIndicator />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeScreen === "07-phone-verify") {
    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader
          title="Verify phone"
          onBack={() => setActiveScreen("06-signup")}
        />
        <div className="flex flex-1 flex-col justify-between px-[24px] pb-[12px] pt-[12px]">
          <div className="flex flex-col gap-5">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[18px] bg-[var(--accent-surface)]">
              <BondhuIcon name="phone" tone="primary" size={28} />
            </div>
            <div>
              <h2 className="text-[22px] font-semibold text-[var(--text)]">
                Enter your mobile number
              </h2>
              <p className="mt-1.5 text-[14px] text-[var(--secondary)]">
                We’ll send a 6-digit verification code via SMS.
              </p>
            </div>
            <BondhuInput
              label="Country & phone number"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
            />
          </div>

          <div>
            <BondhuButton
              onClick={() => {
                showToast("Verification code sent to " + phoneInput);
                setActiveScreen("08-sms-verify");
              }}
            >
              Send verification code
            </BondhuButton>
            <div className="mt-3">
              <HomeIndicator />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeScreen === "08-sms-verify") {
    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader
          title="SMS verification"
          onBack={() => setActiveScreen("07-phone-verify")}
        />
        <div className="flex flex-1 flex-col justify-between px-[24px] pb-[12px] pt-[12px]">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[22px] font-semibold text-[var(--text)]">
                Enter 6-digit code
              </h2>
              <p className="mt-1.5 text-[14px] text-[var(--secondary)]">
                Sent to {phoneInput}
              </p>
            </div>

            <div className="grid grid-cols-6 gap-[8px]">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  maxLength={1}
                  aria-label={`OTP digit ${idx + 1}`}
                  value={digit}
                  onChange={(e) => {
                    const next = [...otpDigits];
                    next[idx] = e.target.value.replace(/\D/g, "").slice(-1);
                    setOtpDigits(next);
                  }}
                  className={`h-[56px] w-full rounded-[14px] border bg-[var(--surface)] text-center text-[20px] font-semibold text-[var(--text)] focus:border-[var(--primary)] focus:outline-none ${
                    idx === 0 ? "border-[var(--primary)]" : "border-[var(--border)]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => showToast("New OTP code sent (284619)")}
              className="cursor-pointer self-start text-[13px] font-semibold text-[var(--primary)]"
            >
              Resend code in 0:24
            </button>
          </div>

          <div>
            <BondhuButton onClick={() => setActiveScreen("48-success")}>
              Verify & continue
            </BondhuButton>
            <div className="mt-3">
              <HomeIndicator />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeScreen === "09-forgot-password") {
    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader
          title="Forgot password"
          onBack={() => setActiveScreen("05-login")}
        />
        <div className="flex flex-1 flex-col justify-between px-[24px] pb-[12px] pt-[12px]">
          <div className="flex flex-col gap-5">
            <p className="text-[14px] leading-[1.5] text-[var(--secondary)]">
              Enter your registered email or phone number and we’ll send a reset code.
            </p>
            <BondhuInput
              label="Email or phone number"
              value={forgotInput}
              onChange={(e) => setForgotInput(e.target.value)}
            />
          </div>
          <div>
            <BondhuButton onClick={() => setActiveScreen("10-new-password")}>
              Send reset link
            </BondhuButton>
            <div className="mt-3">
              <HomeIndicator />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // "10-new-password"
  return (
    <div className="flex h-full w-full flex-col bg-[var(--background)]">
      <MobileStatusBar />
      <MobileTopHeader
        title="New password"
        onBack={() => setActiveScreen("09-forgot-password")}
      />
      <div className="flex flex-1 flex-col justify-between px-[24px] pb-[12px] pt-[12px]">
        <div className="flex flex-col gap-5">
          <p className="text-[14px] leading-[1.5] text-[var(--secondary)]">
            Choose a strong password for your Bondhu account.
          </p>
          <BondhuInput
            label="New password"
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <BondhuInput
            label="Confirm password"
            type="password"
            state="success"
            helperText="Passwords match"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        <div>
          <BondhuButton
            onClick={() => {
              showToast("Password updated successfully");
              setActiveScreen("48-success");
            }}
          >
            Update password
          </BondhuButton>
          <div className="mt-3">
            <HomeIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}
