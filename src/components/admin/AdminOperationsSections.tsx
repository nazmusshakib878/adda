"use client";

import React, { useState } from "react";
import { useBondhu } from "@/components/context/BondhuContext";
import { BondhuToggle } from "@/components/ui/BondhuIcon";
import {
  BondhuButton,
  BondhuInput,
  MetricCard,
} from "@/components/ui/Primitives";
import {
  ADMIN_API_SERVICES,
  ADMIN_EXPENSES,
  ADMIN_INVOICES,
  ADMIN_REPORTS,
  ADMIN_REVENUE_BARS,
  ADMIN_REVENUE_MONTHS,
  ADMIN_SECURITY_LOGS,
  ADMIN_SERVER_RESOURCES,
  ADMIN_SERVICES_HEALTH,
  ADMIN_SMS_MESSAGES,
  ADMIN_SUBSCRIPTIONS,
  type AdminSectionId,
} from "@/data/bondhu-data";
import { DataTableCard, TrendChartCard } from "./AdminChartsAndTables";

export function AdminOperationsSections({
  section,
  onNavigate,
  onOpenAddUser,
}: {
  section: Exclude<AdminSectionId, "overview" | "moderation">;
  onNavigate: (id: AdminSectionId) => void;
  onOpenAddUser: () => void;
}) {
  const {
    resolvedTheme,
    adminUsers,
    toggleAdminUserStatus,
    adminConfig,
    updateAdminConfig,
    showToast,
  } = useBondhu();

  const [userTab, setUserTab] = useState<"all" | "active" | "suspended">("all");
  const [userPage, setUserPage] = useState(1);
  const [settingsTab, setSettingsTab] = useState<
    "general" | "roles" | "integrations" | "notifications"
  >("general");

  if (section === "users") {
    const filteredUsers = adminUsers.filter((u) => {
      if (userTab === "active") return u.status === "Active";
      if (userTab === "suspended") return u.status === "Suspended";
      return true;
    });

    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="Total users"
            value="128,430"
            subtext="↑ 12.8% vs last month"
          />
          <MetricCard
            label="Active users"
            value="48,612"
            subtext="37.9% of all accounts"
          />
          <MetricCard
            label="Online now"
            value="3,284"
            subtext="● Live presence"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] px-[22px] py-[16px]">
          <div className="flex items-center gap-6 text-[13px]">
            {(
              [
                { id: "all", label: "All users  128,430" },
                { id: "active", label: "Active" },
                { id: "suspended", label: "Suspended" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setUserTab(t.id)}
                className={`cursor-pointer whitespace-nowrap transition-colors ${
                  userTab === t.id
                    ? "font-semibold text-[var(--primary)]"
                    : "text-[var(--secondary)] hover:text-[var(--text)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <BondhuButton
            compact
            fullWidth={false}
            onClick={onOpenAddUser}
            className="px-6"
          >
            Add user
          </BondhuButton>
        </div>

        <DataTableCard
          title="All users"
          onViewAll={() => setUserTab("all")}
          columns={["Name / email", "Joined", "Connections", "Status", "Action"]}
          rows={filteredUsers.map((u) => ({
            key: u.id,
            cells: [
              <div key="n">
                <p className="font-semibold text-[var(--text)]">{u.name}</p>
                <p className="text-[11px] text-[var(--secondary)]">{u.email}</p>
              </div>,
              <span key="j" className="text-[var(--text)]">
                {u.joined}
              </span>,
              <span key="c" className="text-[var(--text)]">
                {u.connections}
              </span>,
              <span
                key="s"
                className={
                  u.status === "Active"
                    ? "font-medium text-[var(--primary)]"
                    : "font-medium text-[var(--alert-text)]"
                }
              >
                {u.status}
              </span>,
              <button
                key="a"
                type="button"
                onClick={() => toggleAdminUserStatus(u.id)}
                className="cursor-pointer font-medium text-[var(--text)] hover:text-[var(--primary)]"
              >
                {u.status === "Active" ? "View profile →" : "Review →"}
              </button>,
            ],
          }))}
          footerSummary={`Showing ${filteredUsers.length} of 128,430 results`}
          currentPage={userPage}
          onPageChange={setUserPage}
        />
      </div>
    );
  }

  if (section === "reports") {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="Open reports"
            value="42"
            subtext="18 awaiting moderation"
            onClick={() => onNavigate("moderation")}
          />
          <MetricCard
            label="Resolved today"
            value="31"
            subtext="↑ 8 from yesterday"
          />
          <MetricCard
            label="Avg. resolution"
            value="2.4 hours"
            subtext="Within 4-hour target"
          />
        </div>

        <DataTableCard
          title="Reports inbox"
          onViewAll={() => showToast("Showing all 248 cases")}
          columns={["Case / reporter", "Type", "Priority", "Assigned to", "Status"]}
          rows={ADMIN_REPORTS.map((r) => ({
            key: r.id,
            onClick: () => showToast(`Opened ${r.id}`),
            cells: [
              <span key="id" className="font-semibold text-[var(--text)]">
                {r.id}
              </span>,
              <span key="t" className="text-[var(--text)]">
                {r.type}
              </span>,
              <span
                key="p"
                className={
                  r.priority === "High"
                    ? "font-medium text-[var(--alert-text)]"
                    : "text-[var(--text)]"
                }
              >
                {r.priority}
              </span>,
              <span key="a" className="text-[var(--text)]">
                {r.assigned}
              </span>,
              <span
                key="s"
                className={
                  r.status === "Resolved"
                    ? "font-medium text-[var(--primary)]"
                    : "text-[var(--text)]"
                }
              >
                {r.status}
              </span>,
            ],
          }))}
          footerSummary="Showing 7 of 248 results"
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    );
  }

  if (section === "sms") {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="Messages sent"
            value="84,260"
            subtext="This month · +8.6%"
          />
          <MetricCard
            label="Delivery rate"
            value="98.4%"
            subtext="82,912 delivered"
          />
          <MetricCard
            label="SMS spend"
            value="$1,685.20"
            subtext="$0.020 average / message"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <TrendChartCard
              title="Verification volume"
              legend="Verification requests"
              yLabels={["4k", "3k", "2k", "1k"]}
              xLabels={["01 Nov", "06 Nov", "11 Nov", "16 Nov", "21 Nov", "30 Nov"]}
              svgSrc={
                resolvedTheme === "dark"
                  ? "/assets/charts/community-growth-dark.svg"
                  : "/assets/charts/line-trend-sms.svg"
              }
            />
          </div>
          <div className="flex min-h-[260px] flex-col justify-between rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] p-[18px] sm:p-[22px] xl:col-span-4 xl:h-[280px]">
            <h3 className="text-[17px] font-semibold text-[var(--text)]">
              Verification health
            </h3>
            <div className="space-y-4 text-[13px]">
              {[
                { k: "Verified successfully", v: "79,088" },
                { k: "Expired codes", v: "3,824" },
                { k: "Failed delivery", v: "1,348" },
                { k: "Average delivery", v: "3.2 seconds" },
              ].map((row) => (
                <div key={row.k} className="flex justify-between">
                  <span className="text-[12px] text-[var(--secondary)]">
                    {row.k}
                  </span>
                  <span className="font-semibold text-[var(--text)]">
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
            <div />
          </div>
        </div>

        <DataTableCard
          title="Recent messages"
          onViewAll={() => showToast("Viewing full SMS log")}
          columns={["Message ID", "Recipient", "Provider", "Delivery", "Cost"]}
          rows={ADMIN_SMS_MESSAGES.map((m) => ({
            key: m.id,
            cells: [
              <span key="id" className="font-semibold text-[var(--text)]">
                {m.id}
              </span>,
              <span key="r" className="text-[var(--text)]">
                {m.recipient}
              </span>,
              <span key="p" className="text-[var(--text)]">
                {m.provider}
              </span>,
              <span
                key="d"
                className={
                  m.delivery === "Delivered"
                    ? "font-medium text-[var(--primary)]"
                    : "font-medium text-[var(--alert-text)]"
                }
              >
                {m.delivery}
              </span>,
              <span key="c" className="text-[var(--text)]">
                {m.cost}
              </span>,
            ],
          }))}
          footerSummary="Showing 4 of 248 results"
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    );
  }

  if (section === "api") {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="Total requests"
            value="2.84M"
            subtext="↑ 11.2% vs last month"
          />
          <MetricCard
            label="Success rate"
            value="99.94%"
            subtext="Target · 99.90%"
          />
          <MetricCard
            label="Third-party spend"
            value="$2,934.80"
            subtext="63.5% of total expenses"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <TrendChartCard
              title="Requests over time"
              legend="API requests"
              yLabels={["120k", "90k", "60k", "30k"]}
              xLabels={["01 Nov", "06 Nov", "11 Nov", "16 Nov", "21 Nov", "30 Nov"]}
              svgSrc={
                resolvedTheme === "dark"
                  ? "/assets/charts/community-growth-dark.svg"
                  : "/assets/charts/line-trend-api.svg"
              }
            />
          </div>

          <div className="flex min-h-[260px] flex-col justify-between rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] p-[18px] sm:p-[22px] xl:col-span-4 xl:h-[280px]">
            <div>
              <h3 className="text-[17px] font-semibold text-[var(--text)]">
                Comfortably within limits
              </h3>
              <p className="mt-4 text-[30px] font-semibold text-[var(--primary)]">
                2.84M / 5M
              </p>
              <div className="mt-4 h-[12px] w-full overflow-hidden rounded-[6px] bg-[var(--accent-surface)]">
                <div
                  className="h-full rounded-[6px] bg-[var(--primary)]"
                  style={{ width: "56.8%" }}
                />
              </div>
              <p className="mt-4 text-[12px] text-[var(--secondary)]">
                56.8% used · Resets on 1 December
              </p>
            </div>

            <BondhuButton
              compact
              variant="secondary"
              onClick={() => onNavigate("settings")}
            >
              Manage limits
            </BondhuButton>
          </div>
        </div>

        <DataTableCard
          title="Connected services"
          onViewAll={() => showToast("All 4 integrations healthy")}
          columns={["Service", "Usage", "Avg. latency", "Errors", "Monthly cost"]}
          rows={ADMIN_API_SERVICES.map((s) => ({
            key: s.service,
            cells: [
              <span key="n" className="font-semibold text-[var(--text)]">
                {s.service}
              </span>,
              <span key="u" className="text-[var(--text)]">
                {s.usage}
              </span>,
              <span key="l" className="text-[var(--text)]">
                {s.latency}
              </span>,
              <span key="e" className="text-[var(--text)]">
                {s.errors}
              </span>,
              <span key="c" className="text-[var(--text)]">
                {s.cost}
              </span>,
            ],
          }))}
          footerSummary="Showing 4 of 248 results"
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    );
  }

  if (section === "billing") {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="Total expenses"
            value="$4,620.00"
            subtext="18.6% of monthly revenue"
          />
          <MetricCard
            label="Budget remaining"
            value="$1,380.00"
            subtext="77.0% of $6,000 budget used"
          />
          <MetricCard
            label="Next billing date"
            value="01 Dec"
            subtext="Mastercard ending in 4281"
          />
        </div>

        <div className="rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] p-[22px]">
          <h3 className="text-[17px] font-semibold text-[var(--text)]">
            Where your budget goes
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {ADMIN_EXPENSES.map((exp) => (
              <div key={exp.label}>
                <p className="text-[12px] text-[var(--secondary)]">{exp.label}</p>
                <p className="mt-1 text-[23px] font-semibold text-[var(--text)]">
                  {exp.amount}
                </p>
                <div className="mt-3 h-[8px] w-full overflow-hidden rounded-[4px] bg-[var(--accent-surface)]">
                  <div
                    className="h-full rounded-[4px] bg-[var(--primary)]"
                    style={{ width: `${Math.round(exp.ratio * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <DataTableCard
          title="Invoices"
          onViewAll={() => showToast("Showing all November invoices")}
          columns={["Invoice", "Provider", "Period", "Amount", "Status"]}
          rows={ADMIN_INVOICES.map((inv) => ({
            key: inv.id,
            cells: [
              <span key="id" className="font-semibold text-[var(--text)]">
                {inv.id}
              </span>,
              <span key="p" className="text-[var(--text)]">
                {inv.provider}
              </span>,
              <span key="pd" className="text-[var(--text)]">
                {inv.period}
              </span>,
              <span key="a" className="text-[var(--text)]">
                {inv.amount}
              </span>,
              <span key="s" className="font-medium text-[var(--primary)]">
                {inv.status}
              </span>,
            ],
          }))}
          footerSummary="Showing 4 results"
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    );
  }

  if (section === "subscriptions") {
    const plans = [
      {
        name: "Free",
        price: "$0",
        desc: "Connect, share, and stay close.",
        highlight: false,
      },
      {
        name: "Plus",
        price: "$5 / month",
        desc: "More ways to make it yours.",
        highlight: true,
      },
      {
        name: "Community",
        price: "Custom",
        desc: "Built for growing communities.",
        highlight: false,
      },
    ];

    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="Paid subscribers"
            value="4,972"
            subtext="↑ 18.4% this month"
          />
          <MetricCard
            label="Recurring revenue"
            value="$24,860"
            subtext="Monthly subscription revenue"
          />
          <MetricCard
            label="Churn rate"
            value="2.1%"
            subtext="↓ 0.6 pts vs last month"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex h-[205px] flex-col justify-between rounded-[16px] border border-[var(--border)]/60 p-[22px] ${
                p.highlight ? "bg-[var(--accent-surface)]" : "bg-[var(--surface)]"
              }`}
            >
              <div>
                <p className="text-[17px] font-semibold text-[var(--text)]">
                  {p.name}
                </p>
                <p className="mt-3 text-[28px] font-semibold text-[var(--primary)]">
                  {p.price}
                </p>
                <p className="mt-2 text-[12px] text-[var(--secondary)]">
                  {p.desc}
                </p>
              </div>
              <BondhuButton
                compact
                variant={p.highlight ? "primary" : "secondary"}
                onClick={() => onNavigate("settings")}
              >
                Manage plan
              </BondhuButton>
            </div>
          ))}
        </div>

        <DataTableCard
          title="Recent subscriptions"
          onViewAll={() => showToast("Showing all active Plus plans")}
          columns={["Member", "Plan", "Started", "Renewal", "Status"]}
          rows={ADMIN_SUBSCRIPTIONS.map((sub) => ({
            key: sub.member,
            cells: [
              <span key="m" className="font-semibold text-[var(--text)]">
                {sub.member}
              </span>,
              <span key="p" className="text-[var(--text)]">
                {sub.plan}
              </span>,
              <span key="st" className="text-[var(--text)]">
                {sub.started}
              </span>,
              <span key="rn" className="text-[var(--text)]">
                {sub.renewal}
              </span>,
              <span key="ss" className="font-medium text-[var(--primary)]">
                {sub.status}
              </span>,
            ],
          }))}
          footerSummary="Showing 4 results"
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    );
  }

  if (section === "revenue") {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="Gross revenue"
            value="$24,860"
            subtext="4,972 paid subscribers × $5"
          />
          <MetricCard
            label="Operating expenses"
            value="$4,620"
            subtext="SMS, calling, storage & delivery"
          />
          <MetricCard
            label="Contribution margin"
            value="$20,240"
            subtext="81.4% contribution margin"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          <div className="flex min-h-[280px] flex-col justify-between rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] p-[18px] sm:p-[22px] xl:col-span-8 xl:h-[300px]">
            <div>
              <h3 className="text-[17px] font-semibold text-[var(--text)]">
                Revenue growth
              </h3>
              <p className="mt-1 text-[11px] text-[var(--secondary)]">
                Monthly performance · 2026
              </p>
            </div>

            <div className="relative flex h-[170px] items-end justify-around gap-2 border-b border-[var(--border)] px-2 pb-2 sm:gap-3 sm:px-6">
              {ADMIN_REVENUE_BARS.map((bar) => (
                <div
                  key={bar.month}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-[26px] rounded-[7px] transition-all min-[420px]:w-[34px] sm:w-[42px] ${
                      bar.active
                        ? "bg-[var(--primary)]"
                        : "bg-[var(--bar-muted)]"
                    }`}
                    style={{ height: `${Math.round(bar.heightRatio * 126)}px` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-around px-2 text-[10px] text-[var(--secondary)] sm:px-6">
              {ADMIN_REVENUE_BARS.map((bar) => (
                <span key={bar.month}>{bar.month}</span>
              ))}
            </div>
          </div>

          <div className="flex min-h-[260px] flex-col justify-between rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] p-[18px] sm:p-[22px] xl:col-span-4 xl:h-[300px]">
            <h3 className="text-[17px] font-semibold text-[var(--text)]">
              Simple, healthy economics
            </h3>
            <div className="space-y-4">
              {[
                { k: "ARPU", v: "$5.00" },
                { k: "Paid conversion", v: "3.87%" },
                { k: "Subscriber retention", v: "97.9%" },
                { k: "Cost / subscriber", v: "$0.93" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="flex items-center justify-between text-[12px]"
                >
                  <span className="text-[var(--secondary)]">{item.k}</span>
                  <span className="text-[16px] font-semibold text-[var(--text)]">
                    {item.v}
                  </span>
                </div>
              ))}
            </div>
            <div />
          </div>
        </div>

        <DataTableCard
          title="Revenue by month"
          onViewAll={() => showToast("Showing FY 2026 ledger")}
          columns={["Period", "Subscribers", "Gross revenue", "Expenses", "Contribution"]}
          rows={ADMIN_REVENUE_MONTHS.map((r) => ({
            key: r.period,
            cells: [
              <span key="p" className="font-semibold text-[var(--text)]">
                {r.period}
              </span>,
              <span key="s" className="text-[var(--text)]">
                {r.subscribers}
              </span>,
              <span key="g" className="text-[var(--text)]">
                {r.gross}
              </span>,
              <span key="e" className="text-[var(--text)]">
                {r.expenses}
              </span>,
              <span key="n" className="font-semibold text-[var(--primary)]">
                {r.net}
              </span>,
            ],
          }))}
          footerSummary="Showing 3 results"
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    );
  }

  if (section === "servers") {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="Platform uptime"
            value="99.98%"
            subtext="All regions healthy"
          />
          <MetricCard
            label="API response time"
            value="124 ms"
            subtext="p95 · Target under 200 ms"
          />
          <MetricCard
            label="CPU utilization"
            value="42%"
            subtext="16 vCPU · 6.7 vCPU in use"
          />
        </div>

        <div className="rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] p-[22px]">
          <h3 className="text-[20px] font-semibold text-[var(--primary)]">
            Everything is running smoothly
          </h3>
          <p className="mt-1 text-[12px] text-[var(--secondary)]">
            Live status · Last checked just now
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ADMIN_SERVER_RESOURCES.map((res) => (
              <div key={res.label}>
                <p className="text-[13px] text-[var(--secondary)]">
                  {res.label}
                </p>
                <p className="mt-1.5 text-[22px] font-semibold text-[var(--text)]">
                  {res.value}
                </p>
                <div className="mt-3 h-[10px] w-full overflow-hidden rounded-[5px] bg-[var(--accent-surface)]">
                  <div
                    className="h-full rounded-[5px] bg-[var(--primary)]"
                    style={{ width: `${Math.round(res.ratio * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <DataTableCard
          title="Service health"
          onViewAll={() => showToast("All nodes healthy in ap-south-1")}
          columns={["Service", "Region", "Availability", "Latency", "Status"]}
          rows={ADMIN_SERVICES_HEALTH.map((svc) => ({
            key: svc.service,
            cells: [
              <span key="s" className="font-semibold text-[var(--text)]">
                {svc.service}
              </span>,
              <span key="r" className="text-[var(--text)]">
                {svc.region}
              </span>,
              <span key="a" className="text-[var(--text)]">
                {svc.availability}
              </span>,
              <span key="l" className="text-[var(--text)]">
                {svc.latency}
              </span>,
              <span key="st" className="font-medium text-[var(--primary)]">
                {svc.status}
              </span>,
            ],
          }))}
          footerSummary="Showing 4 results"
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    );
  }

  if (section === "security") {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="Security events"
            value="1,284"
            subtext="Last 30 days"
          />
          <MetricCard
            label="Blocked attempts"
            value="42"
            subtext="All blocked at the edge"
          />
          <MetricCard
            label="Open incidents"
            value="0"
            subtext="No active threats"
          />
        </div>

        <DataTableCard
          title="Audit trail"
          onViewAll={() => showToast("Exported security audit log")}
          columns={["Timestamp", "Actor", "Event", "IP address", "Result"]}
          rows={ADMIN_SECURITY_LOGS.map((log, i) => ({
            key: `${log.timestamp}-${i}`,
            cells: [
              <span key="t" className="font-semibold text-[var(--text)]">
                {log.timestamp}
              </span>,
              <span key="a" className="text-[var(--text)]">
                {log.actor}
              </span>,
              <span key="e" className="text-[var(--text)]">
                {log.event}
              </span>,
              <span key="ip" className="text-[var(--text)]">
                {log.ip}
              </span>,
              <span
                key="r"
                className={
                  log.result === "Success"
                    ? "font-medium text-[var(--primary)]"
                    : "font-medium text-[var(--alert-text)]"
                }
              >
                {log.result}
              </span>,
            ],
          }))}
          footerSummary="Showing 7 results"
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    );
  }

  // Admin Settings ("settings")
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-8 rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] px-[22px] py-[18px] text-[13px]">
        {(
          [
            { id: "general", label: "General" },
            { id: "roles", label: "Roles & permissions" },
            { id: "integrations", label: "Integrations" },
            { id: "notifications", label: "Notifications" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSettingsTab(tab.id)}
            className={`cursor-pointer ${
              settingsTab === tab.id
                ? "font-semibold text-[var(--primary)]"
                : "text-[var(--secondary)] hover:text-[var(--text)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="flex flex-col justify-between rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] p-[24px] xl:col-span-8">
          <div>
            <h3 className="text-[20px] font-semibold text-[var(--text)]">
              {settingsTab === "general"
                ? "Workspace details"
                : settingsTab === "roles"
                ? "Roles & permissions"
                : settingsTab === "integrations"
                ? "Connected providers"
                : "Alert delivery"}
            </h3>
            <p className="mt-1 text-[13px] text-[var(--secondary)]">
              Public information and platform defaults.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <BondhuInput
                label="Application name"
                value={adminConfig.appName}
                onChange={(e) => updateAdminConfig({ appName: e.target.value })}
              />
              <BondhuInput
                label="Support email"
                value={adminConfig.supportEmail}
                onChange={(e) =>
                  updateAdminConfig({ supportEmail: e.target.value })
                }
              />
              <BondhuInput
                label="Default language"
                value={adminConfig.defaultLanguage}
                onChange={(e) =>
                  updateAdminConfig({ defaultLanguage: e.target.value })
                }
              />
              <BondhuInput
                label="Timezone"
                value={adminConfig.timezone}
                onChange={(e) =>
                  updateAdminConfig({ timezone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mt-7">
            <BondhuButton
              compact
              fullWidth={false}
              onClick={() => showToast("Workspace settings saved")}
              className="px-8"
            >
              Save changes
            </BondhuButton>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] p-[22px] xl:col-span-4">
          <div>
            <h3 className="text-[20px] font-semibold text-[var(--text)]">
              Safe by default
            </h3>
            <p className="mt-1 text-[13px] text-[var(--secondary)]">
              Guardrails for your team.
            </p>

            <div className="mt-6 flex flex-col gap-7">
              {[
                {
                  key: "requireAdmin2FA" as const,
                  title: "Require admin 2FA",
                  sub: "For every admin account",
                },
                {
                  key: "emailLoginAlerts" as const,
                  title: "Email login alerts",
                  sub: "Notify on new device access",
                },
                {
                  key: "maintenanceMode" as const,
                  title: "Maintenance mode",
                  sub: "Temporarily pause public access",
                },
                {
                  key: "autoModeration" as const,
                  title: "Auto-moderation",
                  sub: "Flag potentially harmful content",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-[14px] font-semibold text-[var(--text)]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[var(--secondary)]">
                      {item.sub}
                    </p>
                  </div>
                  <BondhuToggle
                    checked={adminConfig[item.key]}
                    label={item.title}
                    onChange={() =>
                      updateAdminConfig({
                        [item.key]: !adminConfig[item.key],
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-[var(--divider)] pt-4 text-[11px] leading-[1.45] text-[var(--secondary)]">
            <p className="font-medium text-[var(--text)]">Role: Super admin</p>
            <p>Permissions managed by workspace owner.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
