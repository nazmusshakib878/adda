"use client";

import React, { useState } from "react";
import { useBondhu } from "@/components/context/BondhuContext";
import { Avatar } from "@/components/ui/Avatar";
import { BondhuIcon } from "@/components/ui/BondhuIcon";
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

export function ChatsMessagingViews() {
  const {
    activeScreen,
    setActiveScreen,
    goBackScreen,
    locale,
    chats,
    selectedChatId,
    setSelectedChatId,
    sendMessage,
    createGroupChat,
    startCall,
    showToast,
  } = useBondhu();

  const t = COPY[locale];
  const [chatTab, setChatTab] = useState<"all" | "unread" | "groups">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [groupName, setGroupName] = useState("Weekend crew");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([
    "arif",
    "maya",
    "rafi",
  ]);
  const [sharedTab, setSharedTab] = useState<"media" | "files" | "links">(
    "media"
  );

  const currentChat =
    chats.find((c) => c.id === selectedChatId) ??
    (activeScreen === "20-group-conversation" ? chats[1] : chats[0]);

  if (activeScreen === "18-chats") {
    const visibleChats = chats.filter((c) => {
      if (searchQuery.trim()) {
        const hay = `${c.name} ${c.preview}`.toLowerCase();
        if (!hay.includes(searchQuery.toLowerCase())) return false;
      }
      if (chatTab === "unread") return c.unread > 0;
      if (chatTab === "groups") return c.type === "group";
      return true;
    });

    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <div className="flex items-center justify-between px-[24px] pt-[6px]">
          <h1 className="text-[28px] font-semibold text-[var(--text)]">
            {t.chatsTitle}
          </h1>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveScreen("21-create-group")}
              aria-label="New group chat"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px] bg-[var(--accent-surface)]"
            >
              <BondhuIcon name="plus" tone="primary" size={22} />
            </button>
          </div>
        </div>

        <div className="mt-3 px-[24px]">
          <div className="flex h-[46px] items-center gap-2.5 rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-[16px]">
            <BondhuIcon name="search" tone="secondary" size={18} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchChats}
              className="w-full bg-transparent text-[13px] text-[var(--text)] placeholder:text-[var(--secondary)] focus:outline-none"
            />
          </div>

          <div className="mt-3 grid h-[40px] grid-cols-3 rounded-[12px] bg-[var(--surface)] p-1">
            {(
              [
                { id: "all", label: t.allChats },
                { id: "unread", label: t.unread },
                { id: "groups", label: t.groups },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setChatTab(tab.id)}
                className={`cursor-pointer rounded-[9px] text-[12px] transition-colors ${
                  chatTab === tab.id
                    ? "bg-[var(--accent-surface)] font-semibold text-[var(--primary)]"
                    : "text-[var(--secondary)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bondhu-scroll flex flex-1 flex-col gap-[12px] overflow-y-auto px-[16px] py-[14px]">
          {visibleChats.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => {
                setSelectedChatId(thread.id);
                setActiveScreen(
                  thread.type === "group"
                    ? "20-group-conversation"
                    : "19-conversation"
                );
              }}
              className="flex h-[83px] w-full cursor-pointer items-center gap-[14px] rounded-[18px] bg-[var(--surface)] px-[14px] text-left transition-colors hover:border hover:border-[var(--primary)]/40"
            >
              <Avatar
                src={thread.avatar}
                alt={thread.name}
                size={48}
                online={thread.online}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-[14px] font-semibold text-[var(--text)]">
                    {thread.name}
                  </p>
                  <span className="text-[10px] text-[var(--secondary)]">
                    {thread.time}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="truncate text-[12px] text-[var(--secondary)]">
                    {thread.preview}
                  </p>
                  {thread.unread > 0 && (
                    <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[var(--primary)] px-1.5 text-[10px] font-semibold text-[var(--on-primary)]">
                      {thread.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}

          <div className="mt-2 flex items-center justify-center gap-2 py-2 text-[11px] text-[var(--secondary)]">
            <BondhuIcon name="lock" tone="primary" size={14} />
            <span>{t.e2eeNote}</span>
          </div>
        </div>

        <MobileBottomNav activeTab="chats" onSelect={setActiveScreen} locale={locale} />
        <HomeIndicator />
      </div>
    );
  }

  // 1:1 Conversation & Dark Variant & Group Conversation ("19", "43", "20")
  if (
    activeScreen === "19-conversation" ||
    activeScreen === "43-conversation-dark" ||
    activeScreen === "20-group-conversation"
  ) {
    const isGroup =
      activeScreen === "20-group-conversation" || currentChat.type === "group";

    return (
      <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
        <MobileStatusBar />

        {/* Conversation Header */}
        <div className="flex h-[62px] shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-[12px]">
          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              onClick={goBackScreen}
              aria-label="Back"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px]"
            >
              <BondhuIcon name="back" tone="text" size={22} />
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen("22-shared-media")}
              className="flex cursor-pointer items-center gap-2.5 text-left"
            >
              <Avatar
                src={currentChat.avatar}
                alt={currentChat.name}
                size={40}
                online={currentChat.online}
              />
              <div>
                <p className="text-[14px] font-semibold text-[var(--text)]">
                  {currentChat.name}
                </p>
                <p className="text-[11px] text-[var(--primary)]">
                  {currentChat.subtitle}
                </p>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => startCall("arif", "voice", isGroup)}
              aria-label="Voice call"
              className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[12px] hover:bg-[var(--background)]"
            >
              <BondhuIcon name="phone" tone="primary" size={20} />
            </button>
            <button
              type="button"
              onClick={() => startCall("arif", "video", isGroup)}
              aria-label="Video call"
              className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[12px] hover:bg-[var(--background)]"
            >
              <BondhuIcon name="video" tone="primary" size={20} />
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen("22-shared-media")}
              aria-label="Shared media & files"
              className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[12px] hover:bg-[var(--background)]"
            >
              <BondhuIcon name="more" tone="secondary" size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="bondhu-scroll flex flex-1 flex-col gap-[12px] overflow-y-auto px-[16px] py-[16px]">
          <div className="mx-auto flex items-center gap-1.5 rounded-full bg-[var(--accent-surface)] px-3 py-1 text-[10px] font-semibold text-[var(--primary)]">
            <BondhuIcon name="lock" tone="primary" size={12} />
            <span>End-to-end encrypted</span>
          </div>

          {currentChat.messages.map((msg) => {
            const isMe = msg.senderId === "nadia";
            return (
              <div
                key={msg.id}
                className={`flex max-w-[276px] flex-col ${
                  isMe ? "self-end items-end" : "self-start items-start"
                }`}
              >
                {isGroup && !isMe && msg.senderName && (
                  <span className="mb-1 ml-1 text-[10px] font-semibold text-[var(--primary)]">
                    {msg.senderName}
                  </span>
                )}

                {msg.image ? (
                  <div className="overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-1.5">
                    <img
                      src={msg.image}
                      alt="Shared photo"
                      className="h-[150px] w-[230px] rounded-[14px] object-cover"
                    />
                  </div>
                ) : msg.voiceDuration ? (
                  <div
                    className={`flex items-center gap-3 rounded-[18px] px-4 py-3 ${
                      isMe
                        ? "bg-[var(--primary)] text-[var(--on-primary)]"
                        : "bg-[var(--surface)] text-[var(--text)]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => showToast("Playing voice note")}
                      className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full bg-[var(--accent-surface)] text-[var(--primary)]"
                    >
                      ▶
                    </button>
                    <div className="flex items-center gap-1">
                      {[10, 18, 12, 22, 16, 20, 11, 15, 9].map((h, i) => (
                        <span
                          key={i}
                          className="w-[3px] rounded-full bg-[var(--primary)]/70"
                          style={{ height: h }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold">
                      {msg.voiceDuration}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`rounded-[18px] px-4 py-2.5 text-[13px] leading-[1.45] ${
                      isMe
                        ? "rounded-tr-[6px] bg-[var(--primary)] text-[var(--on-primary)]"
                        : "rounded-tl-[6px] bg-[var(--surface)] text-[var(--text)]"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}

                <span className="mt-1 px-1 text-[10px] text-[var(--secondary)]">
                  {msg.time} {isMe && "✓✓"}
                </span>
              </div>
            );
          })}

          {!isGroup && (
            <p className="self-start pl-1 text-[11px] italic text-[var(--secondary)]">
              Arif is typing…
            </p>
          )}
        </div>

        {/* Message Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!messageInput.trim()) return;
            sendMessage(currentChat.id, messageInput);
            setMessageInput("");
          }}
          className="border-t border-[var(--border)] bg-[var(--surface)] px-[12px] pt-[10px]"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveScreen("22-shared-media")}
              aria-label="Attach photo"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px]"
            >
              <BondhuIcon name="image" tone="secondary" size={20} />
            </button>
            <input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Write a message…"
              className="h-[44px] min-w-0 flex-1 rounded-[14px] border border-[var(--border)] bg-[var(--background)] px-3.5 text-[13px] text-[var(--text)] placeholder:text-[var(--secondary)] focus:border-[var(--primary)] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => showToast("Voice note ready")}
              aria-label="Voice note"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px]"
            >
              <BondhuIcon name="mic" tone="secondary" size={20} />
            </button>
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-[14px] bg-[var(--primary)]"
            >
              <BondhuIcon name="send" tone="on-primary" size={18} />
            </button>
          </div>
          <HomeIndicator />
        </form>
      </div>
    );
  }

  // Create Group ("21-create-group")
  if (activeScreen === "21-create-group") {
    const candidates = PEOPLE.filter((p) => p.id !== "nadia");

    return (
      <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
        <div className="flex flex-1 flex-col overflow-hidden">
          <MobileStatusBar />
          <MobileTopHeader title="Create group" onBack={goBackScreen} />

          <div className="px-[24px] pt-2">
            <BondhuInput
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group name · Weekend crew"
            />
            <p className="mt-5 text-[16px] font-semibold text-[var(--text)]">
              Add people
            </p>
          </div>

          <div className="bondhu-scroll flex flex-1 flex-col gap-[12px] overflow-y-auto px-[16px] py-[12px]">
            {candidates.map((person) => {
              const selected = selectedMembers.includes(person.id);
              return (
                <button
                  key={person.id}
                  type="button"
                  onClick={() =>
                    setSelectedMembers((prev) =>
                      prev.includes(person.id)
                        ? prev.filter((id) => id !== person.id)
                        : [...prev, person.id]
                    )
                  }
                  className="flex h-[83px] w-full cursor-pointer items-center justify-between rounded-[18px] bg-[var(--surface)] px-[14px] text-left"
                >
                  <div className="flex items-center gap-[14px]">
                    <Avatar src={person.avatar} alt={person.name} size={48} />
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--text)]">
                        {person.name}
                      </p>
                      <p className="text-[12px] text-[var(--secondary)]">
                        {person.statusText}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`flex h-[28px] w-[28px] items-center justify-center rounded-full ${
                      selected
                        ? "bg-[var(--primary)]"
                        : "border border-[var(--border)]"
                    }`}
                  >
                    {selected && (
                      <BondhuIcon name="check" tone="on-primary" size={16} />
                    )}
                  </span>
                </button>
              );
            })}
            <p className="px-2 pt-2 text-[12px] text-[var(--secondary)]">
              {selectedMembers.length} people selected
            </p>
          </div>
        </div>

        <div className="px-[24px] pb-[12px] pt-2">
          <BondhuButton
            onClick={() => createGroupChat(groupName, selectedMembers)}
          >
            Create group
          </BondhuButton>
          <div className="mt-3">
            <HomeIndicator />
          </div>
        </div>
      </div>
    );
  }

  // Shared Media & Files ("22-shared-media")
  return (
    <div className="flex h-full w-full flex-col bg-[var(--background)]">
      <MobileStatusBar />
      <MobileTopHeader title="Shared media" onBack={goBackScreen} />

      <div className="px-[24px] pt-1">
        <div className="grid h-[40px] grid-cols-3 rounded-[12px] bg-[var(--surface)] p-1">
          {(
            [
              { id: "media", label: "Media" },
              { id: "files", label: "Files" },
              { id: "links", label: "Links" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSharedTab(tab.id)}
              className={`cursor-pointer rounded-[9px] text-[12px] ${
                sharedTab === tab.id
                  ? "bg-[var(--accent-surface)] font-semibold text-[var(--primary)]"
                  : "text-[var(--secondary)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bondhu-scroll flex flex-1 flex-col gap-4 overflow-y-auto px-[20px] py-[16px]">
        {sharedTab === "media" && (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-[16px] bg-[var(--surface)] p-1.5"
              >
                <img
                  src="/assets/images/weekend-hills.png"
                  alt="Shared hill photo"
                  className="h-[118px] w-full rounded-[12px] object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {sharedTab === "files" && (
          <div className="flex flex-col gap-3">
            {[
              { name: "Weekend itinerary.pdf", size: "1.4 MB · Today" },
              { name: "Hill-trail-map.gpx", size: "420 KB · Yesterday" },
              { name: "Design-notes-v2.pdf", size: "2.8 MB · Nov 08" },
            ].map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between rounded-[16px] bg-[var(--surface)] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-[var(--accent-surface)]">
                    <BondhuIcon name="file" tone="primary" size={20} />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--text)]">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-[var(--secondary)]">
                      {file.size}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast(`Opening ${file.name}`)}
                  className="cursor-pointer text-[12px] font-semibold text-[var(--primary)]"
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        )}

        {sharedTab === "links" && (
          <div className="flex flex-col gap-3">
            {[
              { title: "Rangamati Lake View Stay", url: "https://bondhu.app/trips/rangamati" },
              { title: "Bondhu Security Whitepaper", url: "https://bondhu.app/security" },
            ].map((link) => (
              <div
                key={link.url}
                className="rounded-[16px] bg-[var(--surface)] p-4"
              >
                <p className="text-[13px] font-semibold text-[var(--text)]">
                  {link.title}
                </p>
                <p className="mt-1 text-[12px] text-[var(--primary)]">
                  {link.url}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <HomeIndicator />
    </div>
  );
}
