"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBondhu } from "@/components/context/BondhuContext";
import { BondhuIcon } from "./BondhuIcon";

export function StudioTopNav() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme, locale, setLocale } = useBondhu();

  const links = [
    { href: "/", label: "Mobile App", badge: "52 screens" },
    { href: "/admin", label: "Admin Workspace", badge: "12 views" },
    { href: "/design-system", label: "Design System", badge: "Foundations" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[54px] max-w-[1440px] items-center justify-between gap-2 px-3 sm:h-[56px] sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-[var(--primary)] text-[16px] font-bold text-[var(--on-primary)] sm:h-[32px] sm:w-[32px] sm:rounded-[10px] sm:text-[17px]">
              b
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-[16px] font-semibold tracking-tight text-[var(--text)] sm:text-[18px]">
                bondhu
              </span>
              <span className="hidden text-[11px] font-medium text-[var(--secondary)] lg:inline">
                Closer, wherever you are.
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1.5 pl-2 md:flex lg:pl-4" aria-label="Workspace pages">
            {links.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-[10px] px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                    active
                      ? "bg-[var(--accent-surface)] text-[var(--primary)]"
                      : "text-[var(--secondary)] hover:bg-[var(--background)] hover:text-[var(--text)]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="hidden rounded-full bg-[var(--background)] px-2 py-0.5 text-[10px] font-medium text-[var(--secondary)] lg:inline">
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Quick compact nav links on small viewports */}
          <div className="flex items-center gap-0.5 md:hidden">
            {links.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-[8px] px-2 py-1 text-[11px] font-semibold ${
                    active
                      ? "bg-[var(--accent-surface)] text-[var(--primary)]"
                      : "text-[var(--secondary)]"
                  }`}
                >
                  {item.label.split(" ")[0]}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "bn" : "en")}
            className="inline-flex h-[32px] cursor-pointer items-center gap-1 rounded-[9px] border border-[var(--border)] bg-[var(--background)] px-2 text-[10px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--primary)] sm:h-[34px] sm:gap-1.5 sm:rounded-[10px] sm:px-2.5 sm:text-[11px]"
            title="Switch language"
          >
            <BondhuIcon name="globe" tone="primary" size={14} />
            <span className="hidden sm:inline">{locale === "en" ? "EN · বাংলা" : "বাংলা · EN"}</span>
            <span className="sm:hidden">{locale === "en" ? "বাংলা" : "EN"}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-[32px] cursor-pointer items-center gap-1.5 rounded-[9px] border border-[var(--border)] bg-[var(--background)] px-2 text-[11px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--primary)] sm:h-[34px] sm:rounded-[10px] sm:px-2.5"
            title="Toggle Light / Dark theme"
          >
            <BondhuIcon name="moon" tone="primary" size={15} />
            <span className="hidden sm:inline">
              {resolvedTheme === "dark" ? "Dark" : "Light"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
