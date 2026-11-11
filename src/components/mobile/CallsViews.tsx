"use client";

import React, { useEffect, useState } from "react";
import { useBondhu } from "@/components/context/BondhuContext";
import { Avatar } from "@/components/ui/Avatar";
import { BondhuIcon } from "@/components/ui/BondhuIcon";
import {
  HomeIndicator,
  MobileStatusBar,
  MobileTopHeader,
} from "@/components/ui/Primitives";
import { PEOPLE } from "@/data/bondhu-data";
import { MobileBottomNav } from "./MobileBottomNav";

export function CallsViews() {
  const {
    activeScreen,
    setActiveScreen,
    goBackScreen,
    calls,
    dialNumber,
    setDialNumber,
    startCall,
    selectedPersonId,
    setSelectedPersonId,
    showToast,
  } = useBondhu();

  const [callFilter, setCallFilter] = useState<"all" | "missed">("all");
  const [contactSearch, setContactSearch] = useState("");
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [elapsedSec, setElapsedSec] = useState(264);

  const caller = PEOPLE.find((p) => p.id === selectedPersonId) ?? PEOPLE[1];

  useEffect(() => {
    if (
      activeScreen !== "28-active-audio" &&
      activeScreen !== "30-active-video" &&
      activeScreen !== "31-group-audio" &&
      activeScreen !== "32-group-video"
    ) {
      return;
    }
    const id = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [activeScreen]);

  const formatTimer = (sec: number) => {
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  if (activeScreen === "23-recent-calls") {
    const filtered =
      callFilter === "missed"
        ? calls.filter((c) => c.direction === "missed")
        : calls;

    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <div className="flex items-center justify-between px-[24px] pt-[6px]">
          <h1 className="text-[28px] font-semibold text-[var(--text)]">Calls</h1>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveScreen("24-contacts")}
              aria-label="Contacts"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px] hover:bg-[var(--surface)]"
            >
              <BondhuIcon name="user" tone="text" size={22} />
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen("25-dial-pad")}
              aria-label="Dial pad"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px] bg-[var(--accent-surface)]"
            >
              <BondhuIcon name="phone" tone="primary" size={22} />
            </button>
          </div>
        </div>

        <div className="mt-3 px-[24px]">
          <div className="grid h-[40px] grid-cols-2 rounded-[12px] bg-[var(--surface)] p-1">
            {(
              [
                { id: "all", label: "All calls" },
                { id: "missed", label: "Missed" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCallFilter(tab.id)}
                className={`cursor-pointer rounded-[9px] text-[13px] transition-colors ${
                  callFilter === tab.id
                    ? "bg-[var(--accent-surface)] font-semibold text-[var(--primary)]"
                    : "text-[var(--secondary)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bondhu-scroll flex flex-1 flex-col gap-[12px] overflow-y-auto px-[16px] py-[16px]">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-[18px] bg-[var(--surface)] p-[14px]"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedPersonId(item.personId);
                  setActiveScreen(
                    item.kind === "video" ? "30-active-video" : "28-active-audio"
                  );
                }}
                className="flex cursor-pointer items-center gap-[14px] text-left"
              >
                <Avatar src={item.avatar} alt={item.name} size={48} />
                <div>
                  <p
                    className={`text-[14px] font-semibold ${
                      item.direction === "missed"
                        ? "text-[var(--alert-text)]"
                        : "text-[var(--text)]"
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[var(--secondary)]">
                    {item.direction === "missed"
                      ? `Missed · ${item.time}`
                      : `${item.direction === "incoming" ? "Incoming" : "Outgoing"} · ${item.time}`}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  startCall(
                    item.personId,
                    item.kind,
                    item.name.includes("Weekend")
                  )
                }
                aria-label={`Call ${item.name}`}
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[var(--accent-surface)]"
              >
                <BondhuIcon
                  name={item.kind === "video" ? "video" : "phone"}
                  tone="primary"
                  size={20}
                />
              </button>
            </div>
          ))}

          {/* Quick links to incoming / group call states */}
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveScreen("26-incoming-audio")}
              className="cursor-pointer rounded-full bg-[var(--surface)] px-3 py-1.5 text-[11px] font-medium text-[var(--secondary)]"
            >
              Simulate incoming audio
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen("29-incoming-video")}
              className="cursor-pointer rounded-full bg-[var(--surface)] px-3 py-1.5 text-[11px] font-medium text-[var(--secondary)]"
            >
              Simulate incoming video
            </button>
          </div>
        </div>

        <MobileBottomNav activeTab="calls" onSelect={setActiveScreen} />
        <HomeIndicator />
      </div>
    );
  }

  if (activeScreen === "24-contacts") {
    const filteredContacts = PEOPLE.filter(
      (p) =>
        p.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
        p.phone.includes(contactSearch)
    );

    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader title="Contacts" onBack={goBackScreen} />
        <div className="px-[24px] pb-3">
          <div className="flex h-[48px] items-center gap-2.5 rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-[16px]">
            <BondhuIcon name="search" tone="secondary" size={18} />
            <input
              value={contactSearch}
              onChange={(e) => setContactSearch(e.target.value)}
              placeholder="Search name or number"
              className="w-full bg-transparent text-[14px] text-[var(--text)] placeholder:text-[var(--secondary)] focus:outline-none"
            />
          </div>
          <p className="mt-4 text-[11px] font-semibold tracking-wide text-[var(--secondary)]">
            YOUR CONNECTIONS
          </p>
        </div>

        <div className="bondhu-scroll flex flex-1 flex-col gap-[12px] overflow-y-auto px-[16px] pb-[16px]">
          {filteredContacts.map((person) => (
            <div
              key={person.id}
              className="flex h-[83px] items-center justify-between rounded-[18px] bg-[var(--surface)] px-[14px]"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedPersonId(person.id);
                  setActiveScreen("16-profile-preview");
                }}
                className="flex cursor-pointer items-center gap-[14px] text-left"
              >
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
                  <p className="mt-0.5 text-[12px] text-[var(--secondary)]">
                    On Bondhu
                  </p>
                </div>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => startCall(person.id, "voice")}
                  aria-label={`Voice call ${person.name}`}
                  className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[var(--accent-surface)]"
                >
                  <BondhuIcon name="phone" tone="primary" size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => startCall(person.id, "video")}
                  aria-label={`Video call ${person.name}`}
                  className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[var(--accent-surface)]"
                >
                  <BondhuIcon name="video" tone="primary" size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <MobileBottomNav activeTab="calls" onSelect={setActiveScreen} />
        <HomeIndicator />
      </div>
    );
  }

  if (activeScreen === "25-dial-pad") {
    const keys = [
      { n: "1", l: "" },
      { n: "2", l: "ABC" },
      { n: "3", l: "DEF" },
      { n: "4", l: "GHI" },
      { n: "5", l: "JKL" },
      { n: "6", l: "MNO" },
      { n: "7", l: "PQRS" },
      { n: "8", l: "TUV" },
      { n: "9", l: "WXYZ" },
      { n: "*", l: "" },
      { n: "0", l: "+" },
      { n: "#", l: "" },
    ];

    return (
      <div className="flex h-full w-full flex-col justify-between overflow-hidden bg-[var(--background)]">
        <div>
          <MobileStatusBar />
          <MobileTopHeader title="Dial pad" onBack={goBackScreen} />
        </div>

        <div className="bondhu-scroll flex min-h-0 flex-1 flex-col justify-evenly overflow-y-auto px-[20px] py-2">
          <div className="text-center">
            <p className="min-h-[34px] text-[24px] font-semibold tracking-wide text-[var(--text)] sm:text-[26px]">
              {dialNumber || "+880"}
            </p>
            <p className="mt-1 text-[12px] text-[var(--primary)]">
              {dialNumber.includes("345678") ? "Arif Hasan · Mobile" : "Bondhu HD Voice"}
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-[290px] grid-cols-3 justify-items-center gap-x-3 gap-y-2.5 sm:gap-x-5 sm:gap-y-3.5">
            {keys.map((k) => (
              <button
                key={k.n}
                type="button"
                onClick={() =>
                  setDialNumber((prev) =>
                    prev.length < 18 ? prev + k.n : prev
                  )
                }
                className="flex h-[56px] w-[66px] cursor-pointer flex-col items-center justify-center rounded-full bg-[var(--surface)] transition-colors hover:bg-[var(--accent-surface)] active:scale-95 min-[375px]:h-[64px] min-[375px]:w-[74px]"
              >
                <span className="text-[20px] font-semibold leading-none text-[var(--text)] min-[375px]:text-[22px]">
                  {k.n}
                </span>
                {k.l && (
                  <span className="mt-1 text-[9px] font-semibold tracking-widest text-[var(--secondary)]">
                    {k.l}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 sm:gap-8">
            <button
              type="button"
              onClick={() => startCall("arif", "video")}
              aria-label="Video call"
              className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full bg-[var(--accent-surface)] sm:h-[56px] sm:w-[56px]"
            >
              <BondhuIcon name="video" tone="primary" size={24} />
            </button>
            <button
              type="button"
              onClick={() => startCall("arif", "voice")}
              aria-label="Place voice call"
              className="flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-full bg-[var(--primary)] shadow-md sm:h-[68px] sm:w-[68px]"
            >
              <BondhuIcon name="phone" tone="on-primary" size={26} />
            </button>
            <button
              type="button"
              onClick={() => setDialNumber((prev) => prev.slice(0, -1))}
              aria-label="Backspace"
              className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full bg-[var(--surface)] text-[14px] font-semibold text-[var(--secondary)] sm:h-[56px] sm:w-[56px]"
            >
              ⌫
            </button>
          </div>
        </div>

        <HomeIndicator />
      </div>
    );
  }

  // Group Video & Audio Call Screens ("31-group-audio", "32-group-video")
  if (activeScreen === "31-group-audio" || activeScreen === "32-group-video") {
    const isVideo = activeScreen === "32-group-video";
    const participants = [
      { id: "arif", name: "Arif", avatar: "/assets/images/portrait-arif.png" },
      { id: "maya", name: "Maya", avatar: "/assets/images/portrait-maya.png" },
      { id: "rafi", name: "Rafi", avatar: "/assets/images/portrait-rafi.png" },
      { id: "nadia", name: "Nadia", avatar: "/assets/images/portrait-nadia.png" },
    ];

    return (
      <div className="flex h-full w-full flex-col justify-between bg-[#10291F] text-[#E6F5ED]">
        <MobileStatusBar lightText />

        <div className="px-[22px] text-center">
          <p className="text-[13px] font-semibold text-[#AEC8BA]">
            bondhu call
          </p>
          <p className="mt-1 text-[11px] text-[#AEC8BA]">
            End-to-end encrypted
          </p>
          <h1 className="mt-[22px] text-[28px] font-semibold text-white">
            Weekend crew
          </h1>
          <p className="mt-1 text-[12px] text-[#AEC8BA]">
            4 people · {formatTimer(elapsedSec)}
          </p>
        </div>

        <div className="bondhu-scroll grid min-h-0 grid-cols-2 gap-[10px] overflow-y-auto px-[18px] py-2 sm:gap-[12px] sm:px-[22px]">
          {participants.map((p) => (
            <div
              key={p.id}
              className="relative flex h-[clamp(104px,16dvh,141px)] items-center justify-center overflow-hidden rounded-[20px] bg-[#1C3E2D]"
            >
              {isVideo ? (
                <>
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3.5 py-2.5 text-left">
                    <span className="text-[12px] font-semibold text-white">
                      {p.name}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Avatar src={p.avatar} alt={p.name} size={64} />
                  <span className="text-[13px] font-semibold text-white">
                    {p.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="px-[22px] pb-[10px]">
          <div className="flex items-start justify-between">
            <CallControlBtn
              icon="mic"
              label="Mute"
              active={muted}
              onClick={() => setMuted((m) => !m)}
            />
            <CallControlBtn
              icon={isVideo ? "video" : "speaker"}
              label={isVideo ? "Camera" : "Speaker"}
              active={isVideo ? !cameraOn : speaker}
              onClick={() =>
                isVideo ? setCameraOn((c) => !c) : setSpeaker((s) => !s)
              }
            />
            <CallControlBtn
              icon="plus"
              label="Add"
              onClick={() =>
                setActiveScreen(isVideo ? "31-group-audio" : "32-group-video")
              }
            />
            <CallControlBtn
              icon="phone"
              label="End"
              destructive
              onClick={() => setActiveScreen("23-recent-calls")}
            />
          </div>
          <div className="mt-4">
            <HomeIndicator light />
          </div>
        </div>
      </div>
    );
  }

  // Incoming & Outgoing & Active 1:1 Audio / Video Calls ("26".."30")
  const isIncoming =
    activeScreen === "26-incoming-audio" ||
    activeScreen === "29-incoming-video";
  const isVideoCall =
    activeScreen === "29-incoming-video" || activeScreen === "30-active-video";

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#10291F] text-[#E6F5ED]">
      {isVideoCall && activeScreen === "30-active-video" && (
        <img
          src={caller.avatar}
          alt={caller.name}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-85"
        />
      )}
      {isVideoCall && activeScreen === "30-active-video" && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#10291F]/80 via-transparent to-[#10291F]/90" />
      )}

      <div className="relative z-10">
        <MobileStatusBar lightText />
        <div className="pt-[14px] text-center">
          <p className="text-[13px] font-semibold text-[#AEC8BA]">
            bondhu call
          </p>
          <p className="mt-1 text-[11px] text-[#AEC8BA]">
            End-to-end encrypted
          </p>
        </div>
      </div>

      {/* Center Portrait or PiP */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-[24px] text-center">
        {!(isVideoCall && activeScreen === "30-active-video") && (
          <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute h-[148px] w-[148px] animate-pulse rounded-full bg-[#36CB94]/15" />
            <Avatar
              src={caller.avatar}
              alt={caller.name}
              size={116}
              className="ring-4 ring-[#36CB94]/40"
            />
          </div>
        )}

        <h1 className="text-[30px] font-semibold text-white">{caller.name}</h1>
        <p className="mt-2 text-[14px] text-[#AEC8BA]">
          {activeScreen === "26-incoming-audio"
            ? "Incoming voice call…"
            : activeScreen === "29-incoming-video"
            ? "Incoming video call…"
            : activeScreen === "27-outgoing-audio"
            ? "Ringing…"
            : `${isVideoCall ? "HD Video" : "Voice call"} · ${formatTimer(elapsedSec)}`}
        </p>

        {activeScreen === "30-active-video" && (
          <div className="mt-8 self-end overflow-hidden rounded-[18px] border-2 border-[#36CB94]/50 shadow-lg">
            <img
              src="/assets/images/portrait-nadia.png"
              alt="Nadia Rahman"
              width={92}
              height={120}
              className="h-[120px] w-[92px] object-cover"
            />
          </div>
        )}
      </div>

      <div className="relative z-10 px-[24px] pb-[10px]">
        {isIncoming ? (
          <div className="flex items-center justify-around">
            <CallControlBtn
              icon="phone"
              label="Decline"
              destructive
              onClick={() => setActiveScreen("23-recent-calls")}
            />
            <button
              type="button"
              onClick={() =>
                setActiveScreen(
                  activeScreen === "29-incoming-video"
                    ? "30-active-video"
                    : "28-active-audio"
                )
              }
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#36CB94] shadow-lg">
                <BondhuIcon
                  name={activeScreen === "29-incoming-video" ? "video" : "phone"}
                  tone="call-dark"
                  size={26}
                />
              </span>
              <span className="text-[11px] text-[#E6F5ED]">Accept</span>
            </button>
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <CallControlBtn
              icon="mic"
              label={muted ? "Unmute" : "Mute"}
              active={muted}
              onClick={() => setMuted((m) => !m)}
            />
            <CallControlBtn
              icon={isVideoCall ? "video" : "speaker"}
              label={isVideoCall ? "Camera" : "Speaker"}
              active={isVideoCall ? !cameraOn : speaker}
              onClick={() =>
                isVideoCall ? setCameraOn((c) => !c) : setSpeaker((s) => !s)
              }
            />
            <CallControlBtn
              icon={isVideoCall ? "speaker" : "video"}
              label={isVideoCall ? "Group" : "Video"}
              onClick={() => {
                if (isVideoCall) {
                  setActiveScreen("32-group-video");
                } else {
                  showToast("Switching to HD video");
                  setActiveScreen("30-active-video");
                }
              }}
            />
            <CallControlBtn
              icon="phone"
              label="End"
              destructive
              onClick={() => setActiveScreen("23-recent-calls")}
            />
          </div>
        )}
        <div className="mt-4">
          <HomeIndicator light />
        </div>
      </div>
    </div>
  );
}

function CallControlBtn({
  icon,
  label,
  active,
  destructive,
  onClick,
}: {
  icon: "mic" | "speaker" | "video" | "plus" | "phone";
  label: string;
  active?: boolean;
  destructive?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer flex-col items-center gap-[8px]"
    >
      <span
        className={`flex h-[58px] w-[58px] items-center justify-center rounded-full transition-colors min-[375px]:h-[72px] min-[375px]:w-[72px] ${
          destructive
            ? "bg-[#D84A51]"
            : active
            ? "bg-[#36CB94]"
            : "bg-[#DDEDE4]"
        }`}
      >
        <BondhuIcon
          name={icon}
          tone={destructive ? "white" : "call-dark"}
          size={24}
        />
      </span>
      <span className="text-[11px] font-normal text-[#E6F5ED]">{label}</span>
    </button>
  );
}
