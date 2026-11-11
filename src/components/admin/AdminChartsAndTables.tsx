"use client";

import React from "react";
import { useBondhu } from "@/components/context/BondhuContext";
import { Avatar } from "@/components/ui/Avatar";
import { BondhuButton, MetricCard } from "@/components/ui/Primitives";
import type { AdminSectionId } from "@/data/bondhu-data";

export function TrendChartCard({
  title,
  legend,
  yLabels,
  xLabels,
  svgSrc,
}: {
  title: string;
  legend: string;
  yLabels: string[];
  xLabels: string[];
  svgSrc: string;
}) {
  return (
    <div className="relative h-[260px] w-full overflow-hidden rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] sm:h-[280px]">
      <div className="px-[18px] pt-[16px] sm:px-[22px] sm:pt-[18px]">
        <h3 className="text-[16px] font-semibold leading-[1.45] text-[var(--text)] sm:text-[17px]">
          {title}
        </h3>
        <p className="mt-1 text-[11px] font-normal text-[var(--primary)]">
          ● {legend}
        </p>
      </div>

      {/* Responsive chart plot preserving exact 730x280 percentage alignment */}
      <div className="bondhu-scroll overflow-x-auto overflow-y-hidden">
        <div className="relative h-[184px] min-w-[460px] w-full overflow-hidden sm:h-[200px]">
          <div className="pointer-events-none absolute inset-x-0 top-[14px] flex h-[132px] flex-col justify-between sm:top-[18px] sm:h-[144px]">
            {yLabels.map((lbl) => (
              <div key={lbl} className="flex items-center">
                <span className="w-[6.8%] pr-1.5 text-right text-[9px] text-[var(--secondary)]">
                  {lbl}
                </span>
                <div className="mr-[3.5%] h-px flex-1 bg-[var(--border)]" />
              </div>
            ))}
          </div>

          <img
            src={svgSrc}
            alt={title}
            width={730}
            height={280}
            className="pointer-events-none absolute inset-x-0 -top-[64px] h-[256px] w-full object-fill sm:-top-[70px] sm:h-[280px]"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-[10px] flex justify-between pl-[7.4%] pr-[3.6%] text-[9px] text-[var(--secondary)]">
            {xLabels.map((lbl) => (
              <span key={lbl}>{lbl}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DataTableCard({
  title,
  viewAllLabel = "View all  →",
  onViewAll,
  columns,
  rows,
  footerSummary,
  currentPage = 1,
  onPageChange,
}: {
  title: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
  columns: string[];
  rows: {
    key: string;
    cells: React.ReactNode[];
    onClick?: () => void;
    active?: boolean;
  }[];
  footerSummary: string;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}) {
  return (
    <div className="rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] p-[16px] sm:p-[22px]">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[16px] font-semibold text-[var(--text)] sm:text-[17px]">{title}</h3>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="cursor-pointer text-[12px] font-semibold text-[var(--primary)] hover:underline"
          >
            {viewAllLabel}
          </button>
        )}
      </div>

      <div className="bondhu-scroll mt-5 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--border)] text-[11px] font-semibold text-[var(--secondary)]">
              {columns.map((col) => (
                <th key={col} className="pb-3 pr-4 font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.key}
                onClick={row.onClick}
                className={`border-b border-[var(--divider)] text-[12px] transition-colors last:border-b-0 ${
                  row.onClick ? "cursor-pointer hover:bg-[var(--background)]/70" : ""
                } ${row.active ? "bg-[var(--accent-surface)]/55" : ""}`}
              >
                {row.cells.map((cell, idx) => (
                  <td key={idx} className="py-3.5 pr-4 align-middle">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--secondary)]">
        <span>{footerSummary}</span>
        {onPageChange && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className="cursor-pointer hover:text-[var(--text)]"
            >
              ← Previous
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`h-6 w-6 cursor-pointer rounded-[6px] font-semibold ${
                  p === currentPage
                    ? "bg-[var(--accent-surface)] text-[var(--primary)]"
                    : "hover:text-[var(--text)]"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onPageChange(Math.min(3, currentPage + 1))}
              className="cursor-pointer hover:text-[var(--text)]"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminOverviewSection({
  onNavigate,
}: {
  onNavigate: (id: AdminSectionId) => void;
}) {
  const { resolvedTheme } = useBondhu();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          label="Total users"
          value="128,430"
          subtext="↑ 12.8% vs last month"
          onClick={() => onNavigate("users")}
        />
        <MetricCard
          label="Active users"
          value="48,612"
          subtext="↑ 8.2% monthly active"
          onClick={() => onNavigate("users")}
        />
        <MetricCard
          label="Online now"
          value="3,284"
          subtext="● Live · updated just now"
          onClick={() => onNavigate("servers")}
        />
        <MetricCard
          label="Total posts"
          value="864,920"
          subtext="↑ 14.3% vs last month"
          onClick={() => onNavigate("moderation")}
        />
        <MetricCard
          label="Total calls"
          value="24,816"
          subtext="↑ 9.6% this month"
          onClick={() => onNavigate("api")}
        />
        <MetricCard
          label="Monthly revenue"
          value="$24,860"
          subtext="↑ 18.4% vs last month"
          onClick={() => onNavigate("revenue")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <TrendChartCard
            title="Community growth"
            legend="Active users"
            yLabels={["60k", "45k", "30k", "15k"]}
            xLabels={["01 Nov", "06 Nov", "11 Nov", "16 Nov", "21 Nov", "30 Nov"]}
            svgSrc={
              resolvedTheme === "dark"
                ? "/assets/charts/community-growth-dark.svg"
                : "/assets/charts/community-growth-light.svg"
            }
          />
        </div>

        <div className="flex min-h-[260px] flex-col justify-between rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] p-[18px] sm:p-[22px] xl:col-span-4 xl:h-[280px]">
          <div>
            <h3 className="text-[17px] font-semibold text-[var(--text)]">
              A community that’s growing
            </h3>
            <p className="mt-3 text-[44px] font-semibold leading-none tracking-[-0.02em] text-[var(--primary)]">
              99.98%
            </p>
            <p className="mt-2 text-[12px] text-[var(--secondary)]">
              Platform uptime · Last 30 days
            </p>
          </div>

          <div className="space-y-2.5 border-t border-[var(--divider)] pt-4 text-[12px]">
            <div className="flex justify-between">
              <span className="text-[var(--secondary)]">API latency</span>
              <span className="font-semibold text-[var(--text)]">124 ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--secondary)]">Call quality</span>
              <span className="font-semibold text-[var(--text)]">98.6%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--secondary)]">Moderation queue</span>
              <span className="font-semibold text-[var(--text)]">
                18 pending
              </span>
            </div>
          </div>
        </div>
      </div>

      <DataTableCard
        title="Needs your attention"
        onViewAll={() => onNavigate("reports")}
        columns={["Case", "Category", "Priority", "Status"]}
        rows={[
          {
            key: "r-2048",
            onClick: () => onNavigate("moderation"),
            cells: [
              <span key="c" className="font-semibold text-[var(--text)]">
                #R-2048 · Reported post
              </span>,
              <span key="cat" className="text-[var(--text)]">
                Content safety
              </span>,
              <span key="p" className="font-medium text-[var(--alert-text)]">
                High
              </span>,
              <span key="s" className="text-[var(--text)]">
                Open
              </span>,
            ],
          },
          {
            key: "r-2047",
            onClick: () => onNavigate("reports"),
            cells: [
              <span key="c" className="font-semibold text-[var(--text)]">
                #R-2047 · Account appeal
              </span>,
              <span key="cat" className="text-[var(--text)]">
                User account
              </span>,
              <span key="p" className="text-[var(--text)]">
                Normal
              </span>,
              <span key="s" className="text-[var(--text)]">
                In review
              </span>,
            ],
          },
        ]}
        footerSummary="Showing 2 priority cases"
      />
    </div>
  );
}

export function AdminModerationSection({
  onNavigate,
}: {
  onNavigate: (id: AdminSectionId) => void;
}) {
  const { moderationQueue, selectedModId, setSelectedModId, resolveModeration } =
    useBondhu();

  const selected =
    moderationQueue.find((m) => m.id === selectedModId) ?? moderationQueue[0];

  const pendingCount = moderationQueue.filter(
    (m) => m.status === "Pending"
  ).length;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard
          label="Pending review"
          value={String(12 + pendingCount)}
          subtext="6 high-priority items"
        />
        <MetricCard
          label="Reviewed today"
          value="246"
          subtext="Median review time · 4m"
        />
        <MetricCard
          label="Action rate"
          value="12.4%"
          subtext="31 items removed today"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Preview Card */}
        <div className="flex flex-col justify-between rounded-[16px] border border-[var(--border)]/60 bg-[var(--surface)] p-[22px] xl:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <Avatar src={selected.avatar} alt={selected.author} size={44} />
                <div>
                  <p className="text-[14px] font-semibold text-[var(--text)]">
                    {selected.title}
                  </p>
                  <p className="text-[11px] font-medium text-[var(--alert-text)]">
                    {selected.reason} ·{" "}
                    {selected.risk === "High" ? "3 reports" : "1 report"}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  selected.status === "Approved"
                    ? "bg-[var(--accent-surface)] text-[var(--primary)]"
                    : selected.status === "Escalated"
                    ? "bg-[var(--alert)]/15 text-[var(--alert-text)]"
                    : "bg-[var(--background)] text-[var(--secondary)]"
                }`}
              >
                {selected.status}
              </span>
            </div>

            <div className="mt-5 h-[210px] w-full overflow-hidden rounded-[20px]">
              <img
                src="/assets/images/weekend-hills.png"
                alt={selected.excerpt}
                className="h-full w-full object-cover"
              />
            </div>

            <p className="mt-5 text-[15px] font-semibold text-[var(--text)]">
              {selected.excerpt}
            </p>
            <p className="mt-1.5 text-[13px] leading-[1.45] text-[var(--secondary)]">
              Context matters. Review the post and conversation before taking action.
            </p>

            <div className="mt-6">
              <p className="text-[11px] font-semibold tracking-wide text-[var(--secondary)]">
                REVIEW GUIDANCE
              </p>
              <p className="mt-1.5 text-[13px] leading-[1.45] text-[var(--text)]">
                {selected.guidance}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <BondhuButton
              compact
              onClick={() => resolveModeration(selected.id, "Approved")}
            >
              Approve
            </BondhuButton>
            <BondhuButton
              compact
              variant="secondary"
              onClick={() => {
                resolveModeration(selected.id, "Escalated");
                onNavigate("reports");
              }}
            >
              Escalate
            </BondhuButton>
          </div>
        </div>

        {/* Review Queue Table */}
        <div className="xl:col-span-7">
          <DataTableCard
            title="Review queue"
            onViewAll={() => onNavigate("reports")}
            columns={["Content", "Reason", "Risk", "Action"]}
            rows={moderationQueue.map((item) => ({
              key: item.id,
              active: item.id === selected.id,
              onClick: () => setSelectedModId(item.id),
              cells: [
                <span key="id" className="font-semibold text-[var(--text)]">
                  {item.id}
                </span>,
                <span key="r" className="text-[var(--text)]">
                  {item.reason}
                </span>,
                <span
                  key="risk"
                  className={
                    item.risk === "High"
                      ? "font-medium text-[var(--alert-text)]"
                      : "text-[var(--text)]"
                  }
                >
                  {item.risk}
                </span>,
                <span key="a" className="font-medium text-[var(--primary)]">
                  {item.status === "Pending" ? "Review →" : item.status}
                </span>,
              ],
            }))}
            footerSummary={`Showing ${moderationQueue.length} of 248 results`}
            currentPage={1}
            onPageChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
