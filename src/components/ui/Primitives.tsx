"use client";

import React from "react";
import { BondhuIcon } from "./BondhuIcon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "disabled" | "ghost";
  fullWidth?: boolean;
  compact?: boolean;
}

export function BondhuButton({
  variant = "primary",
  fullWidth = true,
  compact = false,
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const effective = disabled ? "disabled" : variant;
  const heightCls = compact ? "h-[44px]" : "h-[52px]";
  const widthCls = fullWidth ? "w-full" : "px-5";

  const styles: Record<string, string> = {
    primary:
      "bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-95 active:scale-[0.99]",
    secondary:
      "bg-[var(--accent-surface)] text-[var(--primary)] hover:opacity-90 active:scale-[0.99]",
    destructive:
      "bg-[var(--alert)] text-white hover:opacity-95 active:scale-[0.99]",
    disabled:
      "bg-[var(--border)] text-[var(--secondary)] cursor-not-allowed",
    ghost:
      "bg-transparent text-[var(--primary)] hover:bg-[var(--accent-surface)]/50",
  };

  return (
    <button
      disabled={disabled || variant === "disabled"}
      className={`inline-flex ${heightCls} ${widthCls} cursor-pointer items-center justify-center rounded-[14px] text-[15px] font-semibold transition-all duration-150 ${styles[effective]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  state?: "default" | "error" | "success" | "disabled";
  helperText?: string;
  rightSlot?: React.ReactNode;
}

export function BondhuInput({
  label,
  state = "default",
  helperText,
  rightSlot,
  className = "",
  disabled,
  ...rest
}: InputProps) {
  const effectiveState = disabled ? "disabled" : state;
  const borderClass =
    effectiveState === "error"
      ? "border-[var(--alert)]"
      : effectiveState === "success"
      ? "border-[var(--primary)]"
      : "border-[var(--border)]";

  const bgClass =
    effectiveState === "disabled"
      ? "bg-[var(--background)] opacity-75"
      : "bg-[var(--surface)]";

  return (
    <div className={`flex w-full flex-col gap-[8px] ${className}`}>
      {label && (
        <label className="text-[12px] font-semibold text-[var(--secondary)]">
          {label}
        </label>
      )}
      <div
        className={`flex h-[56px] w-full items-center justify-between rounded-[14px] border px-[16px] transition-colors focus-within:border-[var(--primary)] ${borderClass} ${bgClass}`}
      >
        <input
          disabled={disabled || state === "disabled"}
          className="w-full bg-transparent text-[14px] text-[var(--text)] placeholder:text-[var(--secondary)] focus:outline-none disabled:cursor-not-allowed"
          {...rest}
        />
        {rightSlot}
      </div>
      {helperText && (
        <span
          className={`text-[11px] ${
            effectiveState === "error"
              ? "text-[var(--alert-text)]"
              : effectiveState === "success"
              ? "text-[var(--primary)]"
              : "text-[var(--secondary)]"
          }`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  subtext,
  onClick,
}: {
  label: string;
  value: string;
  subtext: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex h-[124px] flex-col justify-center gap-[3px] rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] px-[20px] py-[14px] transition-colors ${
        onClick ? "cursor-pointer hover:border-[var(--primary)]" : ""
      }`}
    >
      <p className="text-[12px] font-normal leading-[1.45] text-[var(--secondary)]">
        {label}
      </p>
      <p className="text-[29px] font-semibold leading-[1.3] tracking-[-0.02em] text-[var(--text)]">
        {value}
      </p>
      <p className="text-[11px] font-normal leading-[1.45] text-[var(--primary)]">
        {subtext}
      </p>
    </div>
  );
}

export function MobileStatusBar({
  lightText = false,
}: {
  lightText?: boolean;
}) {
  const color = lightText ? "text-[#E6F5ED]" : "text-[var(--text)]";
  return (
    <div
      className={`flex h-[44px] w-full shrink-0 items-center justify-between px-[26px] pt-[6px] select-none ${color}`}
    >
      <span className="text-[14px] font-semibold leading-[1.45]">9:41</span>
      <span className="text-[11px] font-normal tracking-wider">{`▰  ▰  ▰`}</span>
    </div>
  );
}

export function HomeIndicator({ light = false }: { light?: boolean }) {
  return (
    <div className="flex w-full shrink-0 justify-center pb-[8px] pt-[6px]">
      <div
        className={`h-[5px] w-[132px] rounded-[3px] ${
          light ? "bg-[#AEC8BA]" : "bg-[var(--text)]"
        }`}
      />
    </div>
  );
}

export function MobileTopHeader({
  title,
  onBack,
  rightActions,
}: {
  title: string;
  onBack?: () => void;
  rightActions?: React.ReactNode;
}) {
  return (
    <div className="flex h-[56px] w-full shrink-0 items-center justify-between px-[16px]">
      <div className="flex items-center gap-[6px]">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[14px] hover:bg-[var(--accent-surface)]/60"
          >
            <BondhuIcon name="back" tone="text" size={24} />
          </button>
        )}
        <h1 className="pl-[6px] text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[var(--text)]">
          {title}
        </h1>
      </div>
      {rightActions && <div className="flex items-center gap-1">{rightActions}</div>}
    </div>
  );
}
