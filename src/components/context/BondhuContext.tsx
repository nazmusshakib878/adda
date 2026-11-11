"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Locale } from "@/lib/i18n";
import {
  ADMIN_USERS,
  INITIAL_CALLS,
  INITIAL_CHATS,
  INITIAL_MODERATION_QUEUE,
  INITIAL_NOTIFICATIONS,
  INITIAL_POSTS,
  PEOPLE,
  type AdminUserRow,
  type CallLog,
  type ChatThread,
  type FeedPost,
  type MobileScreenId,
  type ModerationQueueItem,
  type NotificationItem,
  type Person,
} from "@/data/bondhu-data";

export type ThemePreference = "light" | "dark" | "device";

interface PrivacyPrefs {
  privateAccount: boolean;
  readReceipts: boolean;
  onlinePresence: boolean;
  twoFactor: boolean;
  loginAlerts: boolean;
  pushNotifications: boolean;
  soundEffects: boolean;
}

interface AdminConfig {
  appName: string;
  supportEmail: string;
  defaultLanguage: string;
  timezone: string;
  requireAdmin2FA: boolean;
  emailLoginAlerts: boolean;
  maintenanceMode: boolean;
  autoModeration: boolean;
}

interface BondhuContextValue {
  themePreference: ThemePreference;
  resolvedTheme: "light" | "dark";
  setThemePreference: (pref: ThemePreference) => void;
  toggleTheme: () => void;

  locale: Locale;
  setLocale: (l: Locale) => void;

  activeScreen: MobileScreenId;
  setActiveScreen: (screen: MobileScreenId) => void;
  goBackScreen: () => void;

  currentUser: Person;
  updateCurrentUser: (patch: Partial<Person>) => void;

  posts: FeedPost[];
  selectedPostId: string;
  setSelectedPostId: (id: string) => void;
  togglePostLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  createPost: (text: string, hasImage?: boolean, videoDuration?: string) => void;

  selectedPersonId: string;
  setSelectedPersonId: (id: string) => void;

  chats: ChatThread[];
  selectedChatId: string;
  setSelectedChatId: (id: string) => void;
  sendMessage: (chatId: string, text: string) => void;
  createGroupChat: (name: string, participantIds: string[]) => void;

  calls: CallLog[];
  dialNumber: string;
  setDialNumber: React.Dispatch<React.SetStateAction<string>>;
  startCall: (personId: string, kind: "voice" | "video", isGroup?: boolean) => void;

  notifications: NotificationItem[];
  markAllNotificationsRead: () => void;

  privacy: PrivacyPrefs;
  togglePrivacyPref: (key: keyof PrivacyPrefs) => void;

  // Admin state
  adminUsers: AdminUserRow[];
  addAdminUser: (name: string, email: string) => void;
  toggleAdminUserStatus: (id: string) => void;

  moderationQueue: ModerationQueueItem[];
  selectedModId: string;
  setSelectedModId: (id: string) => void;
  resolveModeration: (id: string, action: "Approved" | "Escalated") => void;

  adminConfig: AdminConfig;
  updateAdminConfig: (patch: Partial<AdminConfig>) => void;

  toast: string | null;
  showToast: (msg: string) => void;
}

const BondhuContext = createContext<BondhuContextValue | null>(null);

export function BondhuProvider({ children }: { children: React.ReactNode }) {
  const [themePreference, setThemePreferenceState] =
    useState<ThemePreference>("light");
  const [systemDark, setSystemDark] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  const [screenHistory, setScreenHistory] = useState<MobileScreenId[]>([
    "01-splash",
  ]);
  const activeScreen = screenHistory[screenHistory.length - 1];

  const [currentUser, setCurrentUser] = useState<Person>(PEOPLE[0]);
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_POSTS);
  const [selectedPostId, setSelectedPostId] = useState<string>(INITIAL_POSTS[0].id);
  const [selectedPersonId, setSelectedPersonId] = useState<string>("arif");

  const [chats, setChats] = useState<ChatThread[]>(INITIAL_CHATS);
  const [selectedChatId, setSelectedChatId] = useState<string>(INITIAL_CHATS[0].id);

  const [calls, setCalls] = useState<CallLog[]>(INITIAL_CALLS);
  const [dialNumber, setDialNumber] = useState<string>("+880 1712 345678");
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const [privacy, setPrivacy] = useState<PrivacyPrefs>({
    privateAccount: false,
    readReceipts: true,
    onlinePresence: true,
    twoFactor: true,
    loginAlerts: true,
    pushNotifications: true,
    soundEffects: true,
  });

  const [adminUsers, setAdminUsers] = useState<AdminUserRow[]>(ADMIN_USERS);
  const [moderationQueue, setModerationQueue] = useState<ModerationQueueItem[]>(
    INITIAL_MODERATION_QUEUE
  );
  const [selectedModId, setSelectedModId] = useState<string>(
    INITIAL_MODERATION_QUEUE[0].id
  );
  const [adminConfig, setAdminConfig] = useState<AdminConfig>({
    appName: "Bondhu",
    supportEmail: "support@bondhu.app",
    defaultLanguage: "English   /   বাংলা",
    timezone: "Asia / Dhaka  (GMT +06:00)",
    requireAdmin2FA: true,
    emailLoginAlerts: true,
    maintenanceMode: false,
    autoModeration: true,
  });

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const resolvedTheme: "light" | "dark" =
    themePreference === "device"
      ? systemDark
        ? "dark"
        : "light"
      : themePreference;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, [resolvedTheme]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const setThemePreference = useCallback((pref: ThemePreference) => {
    setThemePreferenceState(pref);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemePreferenceState((prev) =>
      prev === "dark" || (prev === "device" && systemDark) ? "light" : "dark"
    );
  }, [systemDark]);

  const setActiveScreen = useCallback((screen: MobileScreenId) => {
    setScreenHistory((prev) => {
      if (prev[prev.length - 1] === screen) return prev;
      return [...prev.slice(-14), screen];
    });
  }, []);

  const goBackScreen = useCallback(() => {
    setScreenHistory((prev) => {
      if (prev.length <= 1) return ["11-home-feed"];
      return prev.slice(0, -1);
    });
  }, []);

  const updateCurrentUser = useCallback((patch: Partial<Person>) => {
    setCurrentUser((prev) => ({ ...prev, ...patch }));
  }, []);

  const togglePostLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likedByMe: !p.likedByMe,
              likes: p.likedByMe ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  }, []);

  const addComment = useCallback(
    (postId: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                commentsCount: p.commentsCount + 1,
                comments: [
                  ...p.comments,
                  {
                    id: `c-${Date.now()}`,
                    authorId: currentUser.id,
                    authorName: currentUser.name,
                    authorAvatar: currentUser.avatar,
                    text: trimmed,
                    time: "Just now",
                    likes: 0,
                  },
                ],
              }
            : p
        )
      );
    },
    [currentUser]
  );

  const createPost = useCallback(
    (text: string, hasImage?: boolean, videoDuration?: string) => {
      const trimmed = text.trim();
      if (!trimmed && !hasImage && !videoDuration) return;
      const lines = (trimmed || "Sharing a quiet moment with friends.")
        .split("\n")
        .filter(Boolean);
      const newPost: FeedPost = {
        id: `post-${Date.now()}`,
        authorId: currentUser.id,
        authorName: currentUser.name,
        bnAuthorName: currentUser.bnName,
        authorAvatar: currentUser.avatar,
        timeAgo: "Just now",
        bnTimeAgo: "এইমাত্র",
        location: "Dhaka",
        bnLocation: "ঢাকা",
        lines,
        bnLines: lines,
        image:
          hasImage || videoDuration
            ? "/assets/images/weekend-hills.png"
            : undefined,
        videoDuration,
        likes: 0,
        likedByMe: false,
        commentsCount: 0,
        comments: [],
        category: "forYou",
      };
      setPosts((prev) => [newPost, ...prev]);
      setSelectedPostId(newPost.id);
      setActiveScreen("11-home-feed");
      showToast("Post shared with friends");
    },
    [currentUser, setActiveScreen, showToast]
  );

  const sendMessage = useCallback((chatId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = "Now";
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              preview: trimmed,
              time: now,
              unread: 0,
              messages: [
                ...chat.messages,
                {
                  id: `msg-${Date.now()}`,
                  senderId: "nadia",
                  senderName: "Nadia",
                  text: trimmed,
                  time: now,
                  status: "read",
                },
              ],
            }
          : chat
      )
    );
  }, []);

  const createGroupChat = useCallback(
    (name: string, participantIds: string[]) => {
      const groupName = name.trim() || "Weekend crew";
      const newId = `chat-group-${Date.now()}`;
      const newThread: ChatThread = {
        id: newId,
        type: "group",
        name: groupName,
        bnName: groupName,
        participantIds,
        avatar: "/assets/images/portrait-maya.png",
        preview: "Group created · Say hello!",
        time: "Just now",
        unread: 0,
        online: true,
        subtitle: `${participantIds.length + 1} members · End-to-end encrypted`,
        messages: [
          {
            id: `gm-init-${Date.now()}`,
            senderId: "nadia",
            senderName: "Nadia",
            text: `Welcome to ${groupName}!`,
            time: "Just now",
            status: "read",
          },
        ],
      };
      setChats((prev) => [newThread, ...prev]);
      setSelectedChatId(newId);
      setActiveScreen("20-group-conversation");
      showToast(`${groupName} created`);
    },
    [setActiveScreen, showToast]
  );

  const startCall = useCallback(
    (personId: string, kind: "voice" | "video", isGroup?: boolean) => {
      const target = PEOPLE.find((p) => p.id === personId) ?? PEOPLE[1];
      setSelectedPersonId(target.id);
      const newLog: CallLog = {
        id: `call-${Date.now()}`,
        personId: target.id,
        name: isGroup ? "Weekend crew (4)" : target.name,
        avatar: target.avatar,
        kind,
        direction: "outgoing",
        time: "Just now",
        duration: "00:12",
      };
      setCalls((prev) => [newLog, ...prev]);
      if (isGroup) {
        setActiveScreen(kind === "video" ? "32-group-video" : "31-group-audio");
      } else {
        setActiveScreen(kind === "video" ? "30-active-video" : "27-outgoing-audio");
      }
    },
    [setActiveScreen]
  );

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast("All notifications marked as read");
  }, [showToast]);

  const togglePrivacyPref = useCallback((key: keyof PrivacyPrefs) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const addAdminUser = useCallback(
    (name: string, email: string) => {
      if (!name.trim() || !email.trim()) return;
      const newUser: AdminUserRow = {
        id: `u-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        joined: "11 Nov 2026",
        connections: "1",
        status: "Active",
      };
      setAdminUsers((prev) => [newUser, ...prev]);
      showToast(`Invited ${newUser.name}`);
    },
    [showToast]
  );

  const toggleAdminUserStatus = useCallback(
    (id: string) => {
      setAdminUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
            : u
        )
      );
      showToast("Updated user account status");
    },
    [showToast]
  );

  const resolveModeration = useCallback(
    (id: string, action: "Approved" | "Escalated") => {
      setModerationQueue((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: action } : m))
      );
      showToast(`${id} marked as ${action}`);
    },
    [showToast]
  );

  const updateAdminConfig = useCallback((patch: Partial<AdminConfig>) => {
    setAdminConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  return (
    <BondhuContext.Provider
      value={{
        themePreference,
        resolvedTheme,
        setThemePreference,
        toggleTheme,
        locale,
        setLocale,
        activeScreen,
        setActiveScreen,
        goBackScreen,
        currentUser,
        updateCurrentUser,
        posts,
        selectedPostId,
        setSelectedPostId,
        togglePostLike,
        addComment,
        createPost,
        selectedPersonId,
        setSelectedPersonId,
        chats,
        selectedChatId,
        setSelectedChatId,
        sendMessage,
        createGroupChat,
        calls,
        dialNumber,
        setDialNumber,
        startCall,
        notifications,
        markAllNotificationsRead,
        privacy,
        togglePrivacyPref,
        adminUsers,
        addAdminUser,
        toggleAdminUserStatus,
        moderationQueue,
        selectedModId,
        setSelectedModId,
        resolveModeration,
        adminConfig,
        updateAdminConfig,
        toast,
        showToast,
      }}
    >
      {children}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-[100] flex items-center gap-2.5 rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[13px] font-medium text-[var(--text)] transition-all"
          style={{ boxShadow: "var(--toast-shadow)" }}
        >
          <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
          <span>{toast}</span>
        </div>
      )}
    </BondhuContext.Provider>
  );
}

export function useBondhu() {
  const ctx = useContext(BondhuContext);
  if (!ctx) {
    throw new Error("useBondhu must be used inside BondhuProvider");
  }
  return ctx;
}
