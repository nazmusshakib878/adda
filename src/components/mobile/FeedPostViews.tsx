"use client";

import React, { useState } from "react";
import { useBondhu } from "@/components/context/BondhuContext";
import { Avatar } from "@/components/ui/Avatar";
import { BondhuIcon } from "@/components/ui/BondhuIcon";
import {
  BondhuButton,
  HomeIndicator,
  MobileStatusBar,
  MobileTopHeader,
} from "@/components/ui/Primitives";
import { COPY } from "@/lib/i18n";
import { PEOPLE } from "@/data/bondhu-data";
import { MobileBottomNav } from "./MobileBottomNav";

export function FeedPostViews() {
  const {
    activeScreen,
    setActiveScreen,
    goBackScreen,
    locale,
    currentUser,
    posts,
    selectedPostId,
    setSelectedPostId,
    togglePostLike,
    addComment,
    createPost,
    selectedPersonId,
    setSelectedPersonId,
    notifications,
    markAllNotificationsRead,
    startCall,
    showToast,
  } = useBondhu();

  const [feedTab, setFeedTab] = useState<"forYou" | "following" | "friends">(
    "forYou"
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [draftText, setDraftText] = useState(
    "Weekend views that stay with you for days."
  );
  const [audience, setAudience] = useState<"Friends only" | "Public">(
    "Friends only"
  );
  const [commentInput, setCommentInput] = useState("");
  const [connectedIds, setConnectedIds] = useState<string[]>(["arif", "maya", "rafi"]);

  const effectiveLocale = activeScreen === "51-home-bn" ? "bn" : locale;
  const t = COPY[effectiveLocale];

  const activePost = posts.find((p) => p.id === selectedPostId) ?? posts[0];
  const previewPerson =
    PEOPLE.find((p) => p.id === selectedPersonId) ?? PEOPLE[1];

  // Home Feed ("11-home-feed", "42-home-dark", "51-home-bn")
  if (
    activeScreen === "11-home-feed" ||
    activeScreen === "42-home-dark" ||
    activeScreen === "51-home-bn"
  ) {
    const visiblePosts = posts.filter((p) => {
      if (searchTerm.trim()) {
        const hay = `${p.authorName} ${p.lines.join(" ")} ${p.location}`.toLowerCase();
        if (!hay.includes(searchTerm.toLowerCase())) return false;
      }
      if (feedTab === "following") return p.category === "following" || p.authorId === "arif";
      if (feedTab === "friends") return p.authorId !== "nadia" || p.id;
      return true;
    });

    const unreadNotifs = notifications.filter((n) => n.unread).length;

    return (
      <div
        className={`flex h-full w-full flex-col bg-[var(--background)] ${
          effectiveLocale === "bn" ? "font-bengali" : ""
        }`}
      >
        <MobileStatusBar />

        {/* Header */}
        <div className="flex items-center justify-between px-[24px] pt-[6px]">
          <h1 className="text-[28px] font-semibold leading-[1.2] text-[var(--text)]">
            {t.brand}
          </h1>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search feed"
              className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px] hover:bg-[var(--surface)]"
            >
              <BondhuIcon name="search" tone="text" size={22} />
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen("17-notifications")}
              aria-label="Notifications"
              className="relative flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px] hover:bg-[var(--surface)]"
            >
              <BondhuIcon name="bell" tone="text" size={22} />
              {unreadNotifs > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--primary)]" />
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="px-[24px] pt-2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                effectiveLocale === "bn"
                  ? "পোস্ট বা বন্ধু খুঁজুন…"
                  : "Filter posts or friends…"
              }
              className="h-[40px] w-full rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-[13px] text-[var(--text)] placeholder:text-[var(--secondary)] focus:border-[var(--primary)] focus:outline-none"
            />
          </div>
        )}

        {/* Filter Segment */}
        <div className="mt-[12px] px-[24px]">
          <div className="grid h-[40px] grid-cols-3 rounded-[12px] bg-[var(--accent-surface)] p-[4px]">
            {(
              [
                { key: "forYou", label: t.homeTabs.forYou },
                { key: "following", label: t.homeTabs.following },
                { key: "friends", label: t.homeTabs.friends },
              ] as const
            ).map((tab) => {
              const active = feedTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFeedTab(tab.key)}
                  className={`cursor-pointer rounded-[9px] text-[12px] transition-colors ${
                    active
                      ? "bg-[var(--surface)] font-semibold text-[var(--primary)] shadow-xs"
                      : "text-[var(--secondary)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Feed */}
        <div className="bondhu-scroll flex flex-1 flex-col gap-[14px] overflow-y-auto px-[16px] py-[14px]">
          {/* Story Strip */}
          <div className="grid grid-cols-4 gap-2 px-[8px] pt-[2px] text-center">
            {PEOPLE.map((person, idx) => (
              <button
                key={person.id}
                type="button"
                onClick={() => {
                  if (idx === 0) {
                    setActiveScreen("12-create-post");
                  } else {
                    setSelectedPersonId(person.id);
                    setActiveScreen("16-profile-preview");
                  }
                }}
                className="flex cursor-pointer flex-col items-center gap-[6px]"
              >
                <Avatar
                  src={person.avatar}
                  alt={person.name}
                  size={58}
                  ring={idx > 0}
                />
                <span className="truncate text-[11px] text-[var(--secondary)]">
                  {idx === 0
                    ? t.yourStory
                    : effectiveLocale === "bn"
                    ? person.bnShortName
                    : person.shortName}
                </span>
              </button>
            ))}
          </div>

          {/* Composer Entry */}
          <div className="flex h-[66px] items-center justify-between rounded-[20px] bg-[var(--surface)] px-[14px]">
            <button
              type="button"
              onClick={() => setActiveScreen("12-create-post")}
              className="flex flex-1 cursor-pointer items-center gap-[12px] text-left"
            >
              <Avatar
                src={currentUser.avatar}
                alt={currentUser.name}
                size={44}
              />
              <span className="text-[13px] text-[var(--secondary)]">
                {t.sharePrompt}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen("13-media-post")}
              aria-label="Share photo or video"
              className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-[12px] hover:bg-[var(--background)]"
            >
              <BondhuIcon name="image" tone="primary" size={22} />
            </button>
          </div>

          {/* Posts */}
          {visiblePosts.map((post) => {
            const lines =
              effectiveLocale === "bn" ? post.bnLines : post.lines;
            const author =
              effectiveLocale === "bn" ? post.bnAuthorName : post.authorName;
            const meta =
              effectiveLocale === "bn"
                ? `${post.bnTimeAgo} · ${post.bnLocation}`
                : `${post.timeAgo} · ${post.location}`;

            return (
              <article
                key={post.id}
                className="overflow-hidden rounded-[20px] bg-[var(--surface)] p-[14px]"
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPersonId(post.authorId);
                      setActiveScreen("16-profile-preview");
                    }}
                    className="flex cursor-pointer items-center gap-[12px] text-left"
                  >
                    <Avatar src={post.authorAvatar} alt={author} size={44} />
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--text)]">
                        {author}
                      </p>
                      <p className="text-[11px] text-[var(--secondary)]">
                        {meta}
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPostId(post.id);
                      setActiveScreen("50-share-post");
                    }}
                    aria-label="Post options"
                    className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full hover:bg-[var(--background)]"
                  >
                    <BondhuIcon name="more" tone="secondary" size={20} />
                  </button>
                </div>

                <div
                  onClick={() => {
                    setSelectedPostId(post.id);
                    setActiveScreen("14-post-details");
                  }}
                  className="mt-[12px] cursor-pointer space-y-0.5 text-[14px] leading-[1.45] text-[var(--text)]"
                >
                  {lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                {post.image && (
                  <div
                    onClick={() => {
                      setSelectedPostId(post.id);
                      setActiveScreen(
                        post.videoDuration ? "52-video-post" : "14-post-details"
                      );
                    }}
                    className="relative mt-[12px] h-[160px] w-full cursor-pointer overflow-hidden rounded-[18px]"
                  >
                    <img
                      src={post.image}
                      alt={lines[0]}
                      className="h-full w-full object-cover"
                    />
                    {post.videoDuration && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                        <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white/90 text-[#138A5E] shadow">
                          ▶
                        </span>
                        <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                          {post.videoDuration}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <p className="mt-[10px] text-[12px] text-[var(--secondary)]">
                  {post.likes} {effectiveLocale === "bn" ? "পছন্দ" : "likes"} ·{" "}
                  {post.commentsCount}{" "}
                  {effectiveLocale === "bn" ? "মন্তব্য" : "comments"}
                </p>

                <div className="mt-[10px] grid grid-cols-3 gap-[6px]">
                  <button
                    type="button"
                    onClick={() => togglePostLike(post.id)}
                    className={`flex h-[36px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] text-[11px] font-semibold transition-colors ${
                      post.likedByMe
                        ? "bg-[var(--accent-surface)] text-[var(--primary)]"
                        : "bg-[var(--background)] text-[var(--secondary)]"
                    }`}
                  >
                    <BondhuIcon
                      name="heart"
                      tone={post.likedByMe ? "primary" : "secondary"}
                      size={18}
                    />
                    <span>{t.like}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPostId(post.id);
                      setActiveScreen("15-comments");
                    }}
                    className="flex h-[36px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-[var(--background)] text-[11px] font-semibold text-[var(--secondary)]"
                  >
                    <BondhuIcon name="chat" tone="secondary" size={18} />
                    <span>{t.comment}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPostId(post.id);
                      setActiveScreen("50-share-post");
                    }}
                    className="flex h-[36px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-[var(--background)] text-[11px] font-semibold text-[var(--secondary)]"
                  >
                    <BondhuIcon name="share" tone="secondary" size={18} />
                    <span>{t.share}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <MobileBottomNav
          activeTab="home"
          onSelect={setActiveScreen}
          locale={effectiveLocale}
        />
        <HomeIndicator />
      </div>
    );
  }

  // Create / Media / Video Post ("12-create-post", "13-media-post", "52-video-post")
  if (
    activeScreen === "12-create-post" ||
    activeScreen === "13-media-post" ||
    activeScreen === "52-video-post"
  ) {
    const isMedia = activeScreen === "13-media-post";
    const isVideo = activeScreen === "52-video-post";

    return (
      <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
        <div className="flex flex-1 flex-col overflow-hidden">
          <MobileStatusBar />
          <MobileTopHeader
            title={isVideo ? "Video post" : isMedia ? "Media post" : "Create post"}
            onBack={goBackScreen}
          />

          <div className="bondhu-scroll flex flex-1 flex-col gap-4 overflow-y-auto px-[20px] py-[8px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  size={44}
                />
                <div>
                  <p className="text-[14px] font-semibold text-[var(--text)]">
                    {currentUser.name}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setAudience((a) =>
                        a === "Friends only" ? "Public" : "Friends only"
                      )
                    }
                    className="mt-0.5 cursor-pointer rounded-full bg-[var(--accent-surface)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--primary)]"
                  >
                    {audience} ⌄
                  </button>
                </div>
              </div>
            </div>

            <textarea
              rows={4}
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              placeholder="What’s on your mind today?"
              className="w-full resize-none rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-[16px] text-[14px] leading-[1.5] text-[var(--text)] placeholder:text-[var(--secondary)] focus:border-[var(--primary)] focus:outline-none"
            />

            {(isMedia || isVideo) && (
              <div className="relative h-[196px] w-full overflow-hidden rounded-[20px]">
                <img
                  src="/assets/images/weekend-hills.png"
                  alt="Attachment preview"
                  className="h-full w-full object-cover"
                />
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white/95 text-[#138A5E] shadow">
                      ▶
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/75 px-3 py-1 text-[11px] font-semibold text-white">
                      01:24
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-[18px] bg-[var(--surface)] p-4">
              <p className="text-[12px] font-semibold text-[var(--secondary)]">
                Add to your post
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveScreen("13-media-post")}
                  className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-[12px] py-2.5 text-[12px] font-semibold ${
                    isMedia
                      ? "bg-[var(--accent-surface)] text-[var(--primary)]"
                      : "bg-[var(--background)] text-[var(--text)]"
                  }`}
                >
                  <BondhuIcon name="image" tone="primary" size={18} />
                  <span>Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScreen("52-video-post")}
                  className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-[12px] py-2.5 text-[12px] font-semibold ${
                    isVideo
                      ? "bg-[var(--accent-surface)] text-[var(--primary)]"
                      : "bg-[var(--background)] text-[var(--text)]"
                  }`}
                >
                  <BondhuIcon name="video" tone="primary" size={18} />
                  <span>Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Tagged @arif · Rangamati")}
                  className="flex cursor-pointer items-center justify-center gap-1.5 rounded-[12px] bg-[var(--background)] py-2.5 text-[12px] font-semibold text-[var(--text)]"
                >
                  <BondhuIcon name="user" tone="primary" size={18} />
                  <span>Tag</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-[24px] pb-[12px] pt-2">
          <BondhuButton
            onClick={() =>
              createPost(
                draftText,
                isMedia || isVideo,
                isVideo ? "01:24" : undefined
              )
            }
          >
            Share post
          </BondhuButton>
          <div className="mt-3">
            <HomeIndicator />
          </div>
        </div>
      </div>
    );
  }

  // Post Details ("14-post-details")
  if (activeScreen === "14-post-details") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
        <div className="flex flex-1 flex-col overflow-hidden">
          <MobileStatusBar />
          <MobileTopHeader
            title="Post details"
            onBack={goBackScreen}
            rightActions={
              <button
                type="button"
                onClick={() => setActiveScreen("17-notifications")}
                aria-label="Notifications"
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[12px]"
              >
                <BondhuIcon name="bell" tone="text" size={22} />
              </button>
            }
          />

          <div className="bondhu-scroll flex flex-1 flex-col gap-4 overflow-y-auto px-[16px] py-[6px]">
            <div className="rounded-[20px] bg-[var(--surface)] p-[14px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[12px]">
                  <Avatar
                    src={activePost.authorAvatar}
                    alt={activePost.authorName}
                    size={44}
                  />
                  <div>
                    <p className="text-[14px] font-semibold text-[var(--text)]">
                      {activePost.authorName}
                    </p>
                    <p className="text-[11px] text-[var(--secondary)]">
                      {activePost.timeAgo} · {activePost.location}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveScreen("50-share-post")}
                  aria-label="More"
                  className="cursor-pointer"
                >
                  <BondhuIcon name="more" tone="secondary" size={22} />
                </button>
              </div>

              <div className="mt-3 space-y-0.5 text-[14px] leading-[1.45] text-[var(--text)]">
                {activePost.lines.map((l, i) => (
                  <p key={i}>{l}</p>
                ))}
              </div>

              {activePost.image && (
                <div className="mt-3 h-[210px] w-full overflow-hidden rounded-[18px]">
                  <img
                    src={activePost.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <p className="mt-3 text-[12px] text-[var(--secondary)]">
                {activePost.likes} likes · {activePost.commentsCount} comments
              </p>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => togglePostLike(activePost.id)}
                  className={`flex h-[36px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] text-[11px] font-semibold ${
                    activePost.likedByMe
                      ? "bg-[var(--accent-surface)] text-[var(--primary)]"
                      : "bg-[var(--background)] text-[var(--secondary)]"
                  }`}
                >
                  <BondhuIcon
                    name="heart"
                    tone={activePost.likedByMe ? "primary" : "secondary"}
                    size={18}
                  />
                  <span>Like</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScreen("15-comments")}
                  className="flex h-[36px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-[var(--background)] text-[11px] font-semibold text-[var(--secondary)]"
                >
                  <BondhuIcon name="chat" tone="secondary" size={18} />
                  <span>Comment</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScreen("50-share-post")}
                  className="flex h-[36px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-[var(--background)] text-[11px] font-semibold text-[var(--secondary)]"
                >
                  <BondhuIcon name="share" tone="secondary" size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className="px-2">
              <p className="text-[16px] font-semibold text-[var(--text)]">
                Comments · {activePost.commentsCount}
              </p>
              {activePost.comments[0] && (
                <div className="mt-3 flex items-start gap-3">
                  <Avatar
                    src={activePost.comments[0].authorAvatar}
                    alt={activePost.comments[0].authorName}
                    size={38}
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--text)]">
                      {activePost.comments[0].authorName}
                    </p>
                    <p className="text-[13px] text-[var(--text)]">
                      {activePost.comments[0].text}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-[24px] pb-[12px] pt-2">
          <BondhuButton onClick={() => setActiveScreen("15-comments")}>
            See all comments
          </BondhuButton>
          <div className="mt-3">
            <HomeIndicator />
          </div>
        </div>
      </div>
    );
  }

  // Comments ("15-comments")
  if (activeScreen === "15-comments") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader
          title={`Comments · ${activePost.commentsCount}`}
          onBack={goBackScreen}
        />

        <div className="bondhu-scroll flex flex-1 flex-col gap-3 overflow-y-auto px-[16px] py-[8px]">
          {activePost.comments.map((c) => (
            <div
              key={c.id}
              className="flex items-start gap-3 rounded-[18px] bg-[var(--surface)] p-[14px]"
            >
              <Avatar src={c.authorAvatar} alt={c.authorName} size={40} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-[var(--text)]">
                    {c.authorName}
                  </p>
                  <span className="text-[11px] text-[var(--secondary)]">
                    {c.time}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-[1.45] text-[var(--text)]">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!commentInput.trim()) return;
            addComment(activePost.id, commentInput);
            setCommentInput("");
          }}
          className="border-t border-[var(--border)] bg-[var(--surface)] px-[16px] py-[12px]"
        >
          <div className="flex items-center gap-2">
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a kind comment…"
              className="h-[44px] min-w-0 flex-1 rounded-[14px] border border-[var(--border)] bg-[var(--background)] px-3.5 text-[13px] text-[var(--text)] placeholder:text-[var(--secondary)] focus:border-[var(--primary)] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send comment"
              className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[14px] bg-[var(--primary)]"
            >
              <BondhuIcon name="send" tone="on-primary" size={20} />
            </button>
          </div>
          <HomeIndicator />
        </form>
      </div>
    );
  }

  // Share Post ("50-share-post")
  if (activeScreen === "50-share-post") {
    const shareActions = [
      {
        title: "Send in a message",
        desc: "Share privately with a friend or group",
        icon: "send" as const,
        action: () => {
          showToast("Post sent to Arif Hasan");
          setActiveScreen("19-conversation");
        },
      },
      {
        title: "Share to your feed",
        desc: "Add your own note for friends to see",
        icon: "share" as const,
        action: () => {
          showToast("Shared to your feed");
          setActiveScreen("11-home-feed");
        },
      },
      {
        title: "Copy link",
        desc: "https://bondhu.app/p/84291",
        icon: "file" as const,
        action: () => {
          showToast("Link copied to clipboard");
          goBackScreen();
        },
      },
    ];

    return (
      <div className="flex h-full w-full flex-col justify-between bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader title="Share post" onBack={goBackScreen} />

        <div className="bondhu-scroll min-h-0 flex-1 overflow-y-auto px-[20px] pt-4 pb-3">
          <div className="mb-5 flex items-center gap-3 rounded-[18px] bg-[var(--surface)] p-4">
            <Avatar
              src={activePost.authorAvatar}
              alt={activePost.authorName}
              size={44}
            />
            <div>
              <p className="text-[14px] font-semibold text-[var(--text)]">
                {activePost.authorName}
              </p>
              <p className="line-clamp-1 text-[12px] text-[var(--secondary)]">
                {activePost.lines[0]}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {shareActions.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={item.action}
                className="flex cursor-pointer items-center justify-between rounded-[18px] bg-[var(--surface)] p-[16px] text-left transition-colors hover:border hover:border-[var(--primary)]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-[var(--accent-surface)]">
                    <BondhuIcon name={item.icon} tone="primary" size={20} />
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-[var(--text)]">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-[var(--secondary)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <BondhuIcon name="chevron" tone="secondary" size={18} />
              </button>
            ))}
          </div>
        </div>

        <HomeIndicator />
      </div>
    );
  }

  // Profile Preview ("16-profile-preview")
  if (activeScreen === "16-profile-preview") {
    const isConnected = connectedIds.includes(previewPerson.id);
    return (
      <div className="flex h-full w-full flex-col bg-[var(--background)]">
        <MobileStatusBar />
        <MobileTopHeader title={previewPerson.shortName} onBack={goBackScreen} />

        <div className="bondhu-scroll flex flex-1 flex-col gap-5 overflow-y-auto px-[24px] py-[12px]">
          <div className="flex flex-col items-center rounded-[24px] bg-[var(--surface)] p-6 text-center">
            <Avatar
              src={previewPerson.avatar}
              alt={previewPerson.name}
              size={88}
              online={previewPerson.online}
            />
            <h2 className="mt-4 text-[22px] font-semibold text-[var(--text)]">
              {previewPerson.name}
            </h2>
            <p className="text-[13px] text-[var(--secondary)]">
              {previewPerson.handle} · {previewPerson.location}
            </p>
            <p className="mt-3 text-[13px] leading-[1.5] text-[var(--text)]">
              {previewPerson.bio}
            </p>

            <div className="mt-5 grid w-full grid-cols-3 border-t border-[var(--border)] pt-4">
              <div>
                <p className="text-[16px] font-semibold text-[var(--text)]">
                  {previewPerson.postsCount}
                </p>
                <p className="text-[11px] text-[var(--secondary)]">Posts</p>
              </div>
              <div>
                <p className="text-[16px] font-semibold text-[var(--text)]">
                  {previewPerson.connectionsCount}
                </p>
                <p className="text-[11px] text-[var(--secondary)]">
                  Connections
                </p>
              </div>
              <div>
                <p className="text-[16px] font-semibold text-[var(--text)]">
                  {previewPerson.followingCount}
                </p>
                <p className="text-[11px] text-[var(--secondary)]">Following</p>
              </div>
            </div>

            <div className="mt-5 grid w-full grid-cols-2 gap-3">
              <BondhuButton
                compact
                onClick={() => setActiveScreen("19-conversation")}
              >
                Message
              </BondhuButton>
              <BondhuButton
                compact
                variant="secondary"
                onClick={() => {
                  setConnectedIds((prev) =>
                    prev.includes(previewPerson.id)
                      ? prev.filter((id) => id !== previewPerson.id)
                      : [...prev, previewPerson.id]
                  );
                }}
              >
                {isConnected ? "Connected ✓" : "Connect"}
              </BondhuButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => startCall(previewPerson.id, "voice")}
              className="flex h-[48px] cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[var(--surface)] text-[13px] font-semibold text-[var(--text)]"
            >
              <BondhuIcon name="phone" tone="primary" size={18} />
              <span>Voice call</span>
            </button>
            <button
              type="button"
              onClick={() => startCall(previewPerson.id, "video")}
              className="flex h-[48px] cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[var(--surface)] text-[13px] font-semibold text-[var(--text)]"
            >
              <BondhuIcon name="video" tone="primary" size={18} />
              <span>Video call</span>
            </button>
          </div>
        </div>

        <MobileBottomNav activeTab="home" onSelect={setActiveScreen} />
        <HomeIndicator />
      </div>
    );
  }

  // Notifications ("17-notifications")
  return (
    <div className="flex h-full w-full flex-col bg-[var(--background)]">
      <MobileStatusBar />
      <MobileTopHeader
        title="Notifications"
        onBack={goBackScreen}
        rightActions={
          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="cursor-pointer rounded-[10px] px-2.5 py-1.5 text-[12px] font-semibold text-[var(--primary)]"
          >
            Mark read
          </button>
        }
      />

      <div className="bondhu-scroll flex flex-1 flex-col gap-[12px] overflow-y-auto px-[16px] py-[8px]">
        <p className="px-[8px] text-[14px] font-semibold text-[var(--text)]">
          Today
        </p>

        {notifications.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setActiveScreen(n.targetScreen)}
            className={`flex h-[94px] w-full cursor-pointer items-center gap-[14px] rounded-[20px] px-[16px] text-left transition-colors ${
              n.unread ? "bg-[var(--accent-surface)]" : "bg-[var(--surface)]"
            }`}
          >
            <Avatar src={n.avatar} alt="" size={44} />
            <div className="flex-1">
              <p className="text-[13px] leading-[1.45] text-[var(--text)]">
                {n.text}
              </p>
              <p className="mt-2 text-[11px] text-[var(--secondary)]">
                {n.time}
              </p>
            </div>
          </button>
        ))}
      </div>

      <MobileBottomNav activeTab="home" onSelect={setActiveScreen} />
      <HomeIndicator />
    </div>
  );
}
