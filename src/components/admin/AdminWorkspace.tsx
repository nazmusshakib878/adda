"use client";

import React, { useEffect, useState } from "react";
import { useBondhu } from "@/components/context/BondhuContext";
import { Avatar } from "@/components/ui/Avatar";
import { BondhuIcon } from "@/components/ui/BondhuIcon";
import { BondhuButton, BondhuInput } from "@/components/ui/Primitives";
import {
  ADMIN_NAV_ITEMS,
  type AdminSectionId,
} from "@/data/bondhu-data";
import {
  AdminModerationSection,
  AdminOverviewSection,
} from "./AdminChartsAndTables";
import { AdminOperationsSections } from "./AdminOperationsSections";

const SECTION_META: Record<
  AdminSectionId,
  { title: string; subtitle: string }
> = {
  overview: {
    title: "Overview",
    subtitle: "A clear picture of your community, in one place.",
  },
  users: {
    title: "User management",
    subtitle: "Help your community stay safe, connected, and heard.",
  },
  moderation: {
    title: "Content moderation",
    subtitle: "Protect expression. Keep your community safe.",
  },
  reports: {
    title: "Reports & complaints",
    subtitle: "Track every concern from first report to resolution.",
  },
  sms: {
    title: "SMS & OTP",
    subtitle: "Reliable verification, with every message accounted for.",
  },
  api: {
    title: "API usage",
    subtitle: "Understand service consumption before it becomes a surprise.",
  },
  billing: {
    title: "Billing & expenses",
    subtitle: "Clear costs. Predictable growth. No surprises.",
  },
  subscriptions: {
    title: "Subscriptions",
    subtitle: "Sustainable growth backed by your community.",
  },
  revenue: {
    title: "Revenue analytics",
    subtitle: "Clear unit economics and healthy monthly growth.",
  },
  servers: {
    title: "Server monitoring",
    subtitle: "Live infrastructure health and low-latency performance.",
  },
  security: {
    title: "Security logs",
    subtitle: "Every admin event and edge protection rule audited.",
  },
  settings: {
    title: "Admin settings",
    subtitle: "The right controls for a well-run community.",
  },
};

export function AdminWorkspace() {
  const {
    resolvedTheme,
    toggleTheme,
    addAdminUser,
    showToast,
  } = useBondhu();

  const [section, setSection] = useState<AdminSectionId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const meta = SECTION_META[section];

  const handleExport = () => {
    showToast(`Exported ${meta.title} CSV (${dateRange})`);
  };

  const sidebarContent = (
    <div className="flex h-full w-[240px] flex-col justify-between bg-[#102D21] px-[16px] py-[28px] text-white">
      <div>
        <div className="px-[12px]">
          <p className="text-[30px] font-semibold leading-none tracking-[-0.02em] text-white">
            bondhu
          </p>
          <p className="mt-2 text-[10px] font-semibold tracking-[0.08em] text-[#A4C5B4]">
            ADMIN WORKSPACE
          </p>
        </div>

        <nav className="mt-8 flex flex-col gap-[6px]" aria-label="Admin navigation">
          {ADMIN_NAV_ITEMS.map((item) => {
            const active = item.id === section;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex h-[45px] w-full cursor-pointer items-center gap-[11px] rounded-[10px] px-[12px] text-left text-[12px] transition-colors ${
                  active
                    ? "bg-[#DDF2E7] font-semibold text-[#138A5E]"
                    : "text-[#D2E7DA] hover:bg-white/5"
                }`}
              >
                <BondhuIcon
                  name={item.icon}
                  tone={active ? "primary" : "sidebar-muted"}
                  size={20}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-1.5 px-[12px] pt-6">
        <p className="text-[12px] text-[#A4C5B4]">Demo workspace</p>
        <p className="text-[11px] text-[#A4C5B4]">All systems operational</p>
        <p className="text-[10px] font-medium text-[#65D5A2]">
          ● Production · ap-south-1
        </p>
      </div>
    </div>
  );

  const matchingNavItems = ADMIN_NAV_ITEMS.filter((n) =>
    n.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full bg-[var(--background)]">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden shrink-0 lg:block">{sidebarContent}</aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="relative z-10 h-full">{sidebarContent}</div>
          <div
            onClick={() => setSidebarOpen(false)}
            className="flex-1 bg-black/50"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Workspace Toolbar */}
        <div className="flex h-[80px] items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open admin menu"
              className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--border)] text-[var(--text)] lg:hidden"
            >
              ☰
            </button>
            <p className="text-[13px] text-[var(--secondary)]">
              Workspace /{" "}
              <span className="font-medium text-[var(--text)]">{meta.title}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search workspace"
              className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] md:hidden"
            >
              <BondhuIcon name="search" tone="secondary" size={18} />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle workspace dark mode"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px] hover:bg-[var(--background)]"
            >
              <BondhuIcon
                name="moon"
                tone={resolvedTheme === "dark" ? "primary" : "secondary"}
                size={20}
              />
            </button>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden h-[44px] w-[240px] cursor-pointer items-center justify-between rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-4 text-[13px] text-[var(--secondary)] hover:border-[var(--primary)] md:flex lg:w-[260px]"
            >
              <span>Search workspace…</span>
              <kbd className="rounded bg-[var(--background)] px-1.5 py-0.5 text-[11px] font-semibold">
                ⌘ K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setSection("reports")}
              aria-label="View alerts"
              className="relative flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px] hover:bg-[var(--background)]"
            >
              <BondhuIcon name="bell" tone="text" size={20} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[var(--primary)]" />
            </button>

            <div className="flex items-center gap-3 pl-1">
              <Avatar
                src="/assets/images/portrait-nadia.png"
                alt="Nadia Rahman"
                size={42}
              />
              <div className="hidden sm:block">
                <p className="text-[12px] font-semibold text-[var(--text)]">
                  Nadia Rahman
                </p>
                <p className="text-[10px] text-[var(--secondary)]">
                  Super admin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Canvas */}
        <div className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-5 sm:px-8 sm:py-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-7">
            <div>
              <h1 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--text)] sm:text-[30px]">
                {meta.title}
              </h1>
              <p className="mt-1.5 text-[13px] text-[var(--secondary)]">
                {meta.subtitle}
              </p>
            </div>

            <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto sm:gap-3">
              <button
                type="button"
                onClick={() =>
                  setDateRange((r) =>
                    r === "Last 30 days" ? "Last 7 days" : "Last 30 days"
                  )
                }
                className="flex h-[42px] flex-1 cursor-pointer items-center justify-center rounded-[14px] bg-[var(--accent-surface)] px-4 text-[13px] font-semibold text-[var(--primary)] sm:h-[44px] sm:flex-none sm:px-5 sm:text-[14px]"
              >
                {dateRange} ⌄
              </button>
              <BondhuButton
                compact
                fullWidth={false}
                onClick={handleExport}
                className="flex-1 px-5 sm:flex-none sm:px-7"
              >
                Export
              </BondhuButton>
            </div>
          </div>

          {section === "overview" ? (
            <AdminOverviewSection onNavigate={setSection} />
          ) : section === "moderation" ? (
            <AdminModerationSection onNavigate={setSection} />
          ) : (
            <AdminOperationsSections
              section={section}
              onNavigate={setSection}
              onOpenAddUser={() => setAddUserOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Command Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/45 pt-24 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[460px] rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl"
          >
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Jump to any admin section…"
              className="h-[46px] w-full rounded-[12px] border border-[var(--border)] bg-[var(--background)] px-3.5 text-[14px] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none"
            />
            <div className="mt-3 max-h-[280px] overflow-y-auto">
              {matchingNavItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSection(item.id);
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="flex w-full cursor-pointer items-center justify-between rounded-[10px] px-3 py-2.5 text-left text-[13px] font-medium text-[var(--text)] hover:bg-[var(--accent-surface)] hover:text-[var(--primary)]"
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] text-[var(--secondary)]">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {addUserOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
          onClick={() => setAddUserOpen(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              addAdminUser(newUserName || "Sadia Karim", newUserEmail || "sadia@bondhu.app");
              setNewUserName("");
              setNewUserEmail("");
              setAddUserOpen(false);
            }}
            className="w-full max-w-[420px] rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl"
          >
            <h3 className="text-[18px] font-semibold text-[var(--text)]">
              Add community member
            </h3>
            <p className="mt-1 text-[13px] text-[var(--secondary)]">
              Invite a verified user or moderator to the workspace.
            </p>
            <div className="mt-5 flex flex-col gap-4">
              <BondhuInput
                label="Full name"
                placeholder="Sadia Karim"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <BondhuInput
                label="Email address"
                placeholder="sadia@bondhu.app"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <BondhuButton
                type="button"
                compact
                variant="secondary"
                onClick={() => setAddUserOpen(false)}
              >
                Cancel
              </BondhuButton>
              <BondhuButton type="submit" compact>
                Send invite
              </BondhuButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
