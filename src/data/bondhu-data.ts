export interface Person {
  id: string;
  name: string;
  bnName: string;
  shortName: string;
  bnShortName: string;
  handle: string;
  avatar: string;
  role: string;
  location: string;
  bio: string;
  phone: string;
  statusText: string;
  online: boolean;
  postsCount: number;
  connectionsCount: string;
  followingCount: number;
}

export interface CommentItem {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  time: string;
  likes: number;
}

export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  bnAuthorName: string;
  authorAvatar: string;
  timeAgo: string;
  bnTimeAgo: string;
  location: string;
  bnLocation: string;
  lines: string[];
  bnLines: string[];
  image?: string;
  videoDuration?: string;
  likes: number;
  likedByMe?: boolean;
  commentsCount: number;
  comments: CommentItem[];
  category: "forYou" | "following" | "friends";
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName?: string;
  text?: string;
  image?: string;
  voiceDuration?: string;
  time: string;
  status?: "sent" | "delivered" | "read";
}

export interface ChatThread {
  id: string;
  type: "direct" | "group";
  name: string;
  bnName: string;
  participantIds: string[];
  avatar: string;
  preview: string;
  time: string;
  unread: number;
  online?: boolean;
  subtitle: string;
  messages: ChatMessage[];
}

export interface CallLog {
  id: string;
  personId: string;
  name: string;
  avatar: string;
  kind: "voice" | "video";
  direction: "incoming" | "outgoing" | "missed";
  time: string;
  duration?: string;
}

export interface NotificationItem {
  id: string;
  personId: string;
  avatar: string;
  text: string;
  time: string;
  unread: boolean;
  targetScreen: MobileScreenId;
}

export type MobileScreenId =
  | "01-splash"
  | "02-onboarding-1"
  | "03-onboarding-2"
  | "04-onboarding-3"
  | "05-login"
  | "06-signup"
  | "07-phone-verify"
  | "08-sms-verify"
  | "09-forgot-password"
  | "10-new-password"
  | "11-home-feed"
  | "12-create-post"
  | "13-media-post"
  | "14-post-details"
  | "15-comments"
  | "16-profile-preview"
  | "17-notifications"
  | "18-chats"
  | "19-conversation"
  | "20-group-conversation"
  | "21-create-group"
  | "22-shared-media"
  | "23-recent-calls"
  | "24-contacts"
  | "25-dial-pad"
  | "26-incoming-audio"
  | "27-outgoing-audio"
  | "28-active-audio"
  | "29-incoming-video"
  | "30-active-video"
  | "31-group-audio"
  | "32-group-video"
  | "33-my-profile"
  | "34-edit-profile"
  | "35-profile-posts"
  | "36-connections"
  | "37-privacy-settings"
  | "38-security-settings"
  | "39-app-settings"
  | "40-appearance"
  | "41-language"
  | "42-home-dark"
  | "43-conversation-dark"
  | "44-settings-dark"
  | "45-loading"
  | "46-empty-inbox"
  | "47-connection-error"
  | "48-success"
  | "49-offline"
  | "50-share-post"
  | "51-home-bn"
  | "52-video-post";

export interface ScreenCatalogItem {
  id: MobileScreenId;
  label: string;
  group:
    | "Onboarding & Auth"
    | "Home & Social"
    | "Messaging"
    | "Calls"
    | "Profile & Settings"
    | "Variants & States";
}

export const MOBILE_SCREENS: ScreenCatalogItem[] = [
  { id: "01-splash", label: "01 / Splash", group: "Onboarding & Auth" },
  { id: "02-onboarding-1", label: "02 / Onboarding · Connect", group: "Onboarding & Auth" },
  { id: "03-onboarding-2", label: "03 / Onboarding · Chat", group: "Onboarding & Auth" },
  { id: "04-onboarding-3", label: "04 / Onboarding · Privacy", group: "Onboarding & Auth" },
  { id: "05-login", label: "05 / Login", group: "Onboarding & Auth" },
  { id: "06-signup", label: "06 / Sign up", group: "Onboarding & Auth" },
  { id: "07-phone-verify", label: "07 / Phone verification", group: "Onboarding & Auth" },
  { id: "08-sms-verify", label: "08 / SMS verification", group: "Onboarding & Auth" },
  { id: "09-forgot-password", label: "09 / Forgot password", group: "Onboarding & Auth" },
  { id: "10-new-password", label: "10 / New password", group: "Onboarding & Auth" },

  { id: "11-home-feed", label: "11 / Home feed", group: "Home & Social" },
  { id: "12-create-post", label: "12 / Create post", group: "Home & Social" },
  { id: "13-media-post", label: "13 / Media post", group: "Home & Social" },
  { id: "52-video-post", label: "52 / Video post", group: "Home & Social" },
  { id: "14-post-details", label: "14 / Post details", group: "Home & Social" },
  { id: "15-comments", label: "15 / Comments", group: "Home & Social" },
  { id: "50-share-post", label: "50 / Share post", group: "Home & Social" },
  { id: "16-profile-preview", label: "16 / Profile preview", group: "Home & Social" },
  { id: "17-notifications", label: "17 / Notifications", group: "Home & Social" },

  { id: "18-chats", label: "18 / Chats", group: "Messaging" },
  { id: "19-conversation", label: "19 / Conversation", group: "Messaging" },
  { id: "20-group-conversation", label: "20 / Group conversation", group: "Messaging" },
  { id: "21-create-group", label: "21 / Create group", group: "Messaging" },
  { id: "22-shared-media", label: "22 / Shared media & files", group: "Messaging" },

  { id: "23-recent-calls", label: "23 / Recent calls", group: "Calls" },
  { id: "24-contacts", label: "24 / Contacts", group: "Calls" },
  { id: "25-dial-pad", label: "25 / Dial pad", group: "Calls" },
  { id: "26-incoming-audio", label: "26 / Incoming audio call", group: "Calls" },
  { id: "27-outgoing-audio", label: "27 / Outgoing audio call", group: "Calls" },
  { id: "28-active-audio", label: "28 / Active audio call", group: "Calls" },
  { id: "29-incoming-video", label: "29 / Incoming video call", group: "Calls" },
  { id: "30-active-video", label: "30 / Active video call", group: "Calls" },
  { id: "31-group-audio", label: "31 / Group audio call", group: "Calls" },
  { id: "32-group-video", label: "32 / Group video call", group: "Calls" },

  { id: "33-my-profile", label: "33 / My profile", group: "Profile & Settings" },
  { id: "34-edit-profile", label: "34 / Edit profile", group: "Profile & Settings" },
  { id: "35-profile-posts", label: "35 / Profile posts", group: "Profile & Settings" },
  { id: "36-connections", label: "36 / Connections", group: "Profile & Settings" },
  { id: "37-privacy-settings", label: "37 / Privacy settings", group: "Profile & Settings" },
  { id: "38-security-settings", label: "38 / Security settings", group: "Profile & Settings" },
  { id: "39-app-settings", label: "39 / App settings", group: "Profile & Settings" },
  { id: "40-appearance", label: "40 / Appearance", group: "Profile & Settings" },
  { id: "41-language", label: "41 / Language · বাংলা", group: "Profile & Settings" },

  { id: "42-home-dark", label: "42 / Home feed · Dark", group: "Variants & States" },
  { id: "43-conversation-dark", label: "43 / Conversation · Dark", group: "Variants & States" },
  { id: "44-settings-dark", label: "44 / Settings · Dark", group: "Variants & States" },
  { id: "51-home-bn", label: "51 / Home feed · বাংলা", group: "Variants & States" },
  { id: "45-loading", label: "45 / Loading", group: "Variants & States" },
  { id: "46-empty-inbox", label: "46 / Empty inbox", group: "Variants & States" },
  { id: "47-connection-error", label: "47 / Connection error", group: "Variants & States" },
  { id: "48-success", label: "48 / Success", group: "Variants & States" },
  { id: "49-offline", label: "49 / Offline", group: "Variants & States" },
];

export const PEOPLE: Person[] = [
  {
    id: "nadia",
    name: "Nadia Rahman",
    bnName: "নাদিয়া",
    shortName: "Nadia",
    bnShortName: "নাদিয়া",
    handle: "@nadia",
    avatar: "/assets/images/portrait-nadia.png",
    role: "Super admin",
    location: "Dhaka, Bangladesh",
    bio: "Product designer, tea enthusiast & weekend traveler.",
    phone: "+880 1711 004210",
    statusText: "Active now",
    online: true,
    postsCount: 186,
    connectionsCount: "1.2k",
    followingCount: 847,
  },
  {
    id: "arif",
    name: "Arif Hasan",
    bnName: "আরিফ হাসান",
    shortName: "Arif",
    bnShortName: "আরিফ",
    handle: "@arif",
    avatar: "/assets/images/portrait-arif.png",
    role: "Community creator",
    location: "Rangamati, Chittagong",
    bio: "Chasing quiet mornings, hill trails & clear skies.",
    phone: "+880 1712 345678",
    statusText: "Online now",
    online: true,
    postsCount: 142,
    connectionsCount: "986",
    followingCount: 412,
  },
  {
    id: "maya",
    name: "Maya Ahmed",
    bnName: "মায়া আহমেদ",
    shortName: "Maya",
    bnShortName: "মায়া",
    handle: "@maya",
    avatar: "/assets/images/portrait-maya.png",
    role: "Photographer",
    location: "Sylhet, Bangladesh",
    bio: "Capturing everyday light and quiet stories.",
    phone: "+880 1814 221903",
    statusText: "Available",
    online: true,
    postsCount: 218,
    connectionsCount: "642",
    followingCount: 390,
  },
  {
    id: "rafi",
    name: "Rafi Chowdhury",
    bnName: "রাফি চৌধুরী",
    shortName: "Rafi",
    bnShortName: "রাফি",
    handle: "@rafi",
    avatar: "/assets/images/portrait-rafi.png",
    role: "Acoustic guitarist",
    location: "Dhaka, Bangladesh",
    bio: "Coffee, chords, and late-night conversations.",
    phone: "+880 1916 883204",
    statusText: "Available",
    online: false,
    postsCount: 94,
    connectionsCount: "378",
    followingCount: 265,
  },
];

export const INITIAL_POSTS: FeedPost[] = [
  {
    id: "post-1",
    authorId: "arif",
    authorName: "Arif Hasan",
    bnAuthorName: "আরিফ হাসান",
    authorAvatar: "/assets/images/portrait-arif.png",
    timeAgo: "2 hours ago",
    bnTimeAgo: "২ ঘন্টা আগে",
    location: "Rangamati",
    bnLocation: "রাঙ্গামাটি",
    lines: [
      "A slower morning, a greener view. 🌿",
      "Some places feel like a deep breath.",
    ],
    bnLines: [
      "পাহাড়ের মাঝে শান্ত একটি সকাল। 🌿",
      "কিছু জায়গা সত্যিই মন ভালো করে দেয়।",
    ],
    image: "/assets/images/weekend-hills.png",
    likes: 128,
    likedByMe: false,
    commentsCount: 24,
    category: "forYou",
    comments: [
      {
        id: "c1",
        authorId: "maya",
        authorName: "Maya Ahmed",
        authorAvatar: "/assets/images/portrait-maya.png",
        text: "This view is everything 💚",
        time: "18m ago",
        likes: 12,
      },
      {
        id: "c2",
        authorId: "nadia",
        authorName: "Nadia Rahman",
        authorAvatar: "/assets/images/portrait-nadia.png",
        text: "Looks so peaceful! Save some tea for us.",
        time: "12m ago",
        likes: 6,
      },
      {
        id: "c3",
        authorId: "rafi",
        authorName: "Rafi Chowdhury",
        authorAvatar: "/assets/images/portrait-rafi.png",
        text: "Next weekend we are all going together.",
        time: "5m ago",
        likes: 4,
      },
    ],
  },
  {
    id: "post-2",
    authorId: "maya",
    authorName: "Maya Ahmed",
    bnAuthorName: "মায়া আহমেদ",
    authorAvatar: "/assets/images/portrait-maya.png",
    timeAgo: "5 hours ago",
    bnTimeAgo: "৫ ঘন্টা আগে",
    location: "Sylhet",
    bnLocation: "সিলেট",
    lines: [
      "Golden light right after the afternoon rain ✨",
      "Recorded a quick 1-minute clip from the hillside walk.",
    ],
    bnLines: [
      "বিকেলের বৃষ্টির পর মিষ্টি রোদ ✨",
      "হাঁটতে হাঁটতে ছোট্ট একটি ভিডিও ধারণ করলাম।",
    ],
    image: "/assets/images/weekend-hills.png",
    videoDuration: "01:24",
    likes: 86,
    likedByMe: true,
    commentsCount: 11,
    category: "following",
    comments: [
      {
        id: "c4",
        authorId: "arif",
        authorName: "Arif Hasan",
        authorAvatar: "/assets/images/portrait-arif.png",
        text: "Love the colors in this clip!",
        time: "1h ago",
        likes: 5,
      },
    ],
  },
];

export const INITIAL_CHATS: ChatThread[] = [
  {
    id: "chat-arif",
    type: "direct",
    name: "Arif Hasan",
    bnName: "আরিফ হাসান",
    participantIds: ["arif"],
    avatar: "/assets/images/portrait-arif.png",
    preview: "Are we still on for coffee later?",
    time: "12:42",
    unread: 2,
    online: true,
    subtitle: "Active now · Encrypted",
    messages: [
      {
        id: "m1",
        senderId: "arif",
        text: "Just wrapped up the design review. Are we still on for coffee?",
        time: "12:40",
      },
      {
        id: "m2",
        senderId: "nadia",
        text: "Yes! Let’s meet at 5 PM near the lake. Sending the hill view photo.",
        time: "12:42",
        status: "read",
      },
      {
        id: "m3",
        senderId: "nadia",
        image: "/assets/images/weekend-hills.png",
        time: "12:42",
        status: "read",
      },
      {
        id: "m4",
        senderId: "arif",
        voiceDuration: "0:18",
        time: "12:43",
      },
    ],
  },
  {
    id: "chat-weekend",
    type: "group",
    name: "Weekend crew",
    bnName: "উইকেন্ড ক্রু",
    participantIds: ["arif", "maya", "rafi"],
    avatar: "/assets/images/portrait-maya.png",
    preview: "Maya: Uploaded the Saturday itinerary!",
    time: "11:18",
    unread: 1,
    online: true,
    subtitle: "4 members · End-to-end encrypted",
    messages: [
      {
        id: "gm1",
        senderId: "maya",
        senderName: "Maya",
        text: "Good morning everyone! Uploaded the Saturday hill itinerary.",
        time: "11:15",
      },
      {
        id: "gm2",
        senderId: "rafi",
        senderName: "Rafi",
        text: "Count me in! Bringing the acoustic guitar 🎸",
        time: "11:16",
      },
      {
        id: "gm3",
        senderId: "nadia",
        senderName: "Nadia",
        text: "We leave at 6:30 AM sharp. Everyone ready?",
        time: "11:18",
        status: "read",
      },
    ],
  },
  {
    id: "chat-maya",
    type: "direct",
    name: "Maya Ahmed",
    bnName: "মায়া আহমেদ",
    participantIds: ["maya"],
    avatar: "/assets/images/portrait-maya.png",
    preview: "Loved your weekend photos! 💚",
    time: "Yesterday",
    unread: 0,
    online: true,
    subtitle: "Available · Encrypted",
    messages: [
      {
        id: "mm1",
        senderId: "maya",
        text: "Loved your weekend photos! 💚 Let’s plan a photowalk next Friday.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "chat-rafi",
    type: "direct",
    name: "Rafi Chowdhury",
    bnName: "রাফি চৌধুরী",
    participantIds: ["rafi"],
    avatar: "/assets/images/portrait-rafi.png",
    preview: "Sent you the track demo",
    time: "Tue",
    unread: 0,
    online: false,
    subtitle: "Last seen 2h ago · Encrypted",
    messages: [
      {
        id: "rm1",
        senderId: "rafi",
        voiceDuration: "0:42",
        time: "Tue",
      },
    ],
  },
];

export const INITIAL_CALLS: CallLog[] = [
  {
    id: "call-1",
    personId: "arif",
    name: "Arif Hasan",
    avatar: "/assets/images/portrait-arif.png",
    kind: "video",
    direction: "incoming",
    time: "Today · 10:24 AM",
    duration: "04:12",
  },
  {
    id: "call-2",
    personId: "maya",
    name: "Maya Ahmed",
    avatar: "/assets/images/portrait-maya.png",
    kind: "voice",
    direction: "missed",
    time: "Today · 09:10 AM",
  },
  {
    id: "call-3",
    personId: "rafi",
    name: "Rafi Chowdhury",
    avatar: "/assets/images/portrait-rafi.png",
    kind: "voice",
    direction: "outgoing",
    time: "Yesterday · 08:42 PM",
    duration: "14:08",
  },
  {
    id: "call-4",
    personId: "arif",
    name: "Weekend crew (4)",
    avatar: "/assets/images/portrait-maya.png",
    kind: "video",
    direction: "outgoing",
    time: "Mon · 07:15 PM",
    duration: "08:42",
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    personId: "arif",
    avatar: "/assets/images/portrait-arif.png",
    text: "Arif liked your photo.",
    time: "2 min ago",
    unread: true,
    targetScreen: "14-post-details",
  },
  {
    id: "n2",
    personId: "maya",
    avatar: "/assets/images/portrait-maya.png",
    text: "Maya commented: “Love this!”",
    time: "18 min ago",
    unread: true,
    targetScreen: "15-comments",
  },
  {
    id: "n3",
    personId: "rafi",
    avatar: "/assets/images/portrait-rafi.png",
    text: "Rafi sent you a connection request.",
    time: "1 hour ago",
    unread: false,
    targetScreen: "36-connections",
  },
  {
    id: "n4",
    personId: "nadia",
    avatar: "/assets/images/portrait-nadia.png",
    text: "Nadia: Your weekend group is ready.",
    time: "2 hours ago",
    unread: false,
    targetScreen: "20-group-conversation",
  },
  {
    id: "n5",
    personId: "maya",
    avatar: "/assets/images/portrait-maya.png",
    text: "Maya mentioned you in a post.",
    time: "Yesterday",
    unread: false,
    targetScreen: "14-post-details",
  },
];

// ================= ADMIN WORKSPACE DATA (EXACT FIGMA DATA) =================

export type AdminSectionId =
  | "overview"
  | "users"
  | "moderation"
  | "reports"
  | "sms"
  | "api"
  | "billing"
  | "subscriptions"
  | "revenue"
  | "servers"
  | "security"
  | "settings";

export interface AdminNavItem {
  id: AdminSectionId;
  label: string;
  icon: "home" | "user" | "image" | "bell" | "chat" | "globe" | "file" | "lock" | "more" | "plus" | "settings";
  inactiveAsset: string;
  activeAsset: string;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { id: "overview", label: "Overview", icon: "home", inactiveAsset: "/assets/icons/sidebar-home.svg", activeAsset: "/assets/icons/home-active.svg" },
  { id: "users", label: "User management", icon: "user", inactiveAsset: "/assets/icons/sidebar-user.svg", activeAsset: "/assets/icons/user-active.svg" },
  { id: "moderation", label: "Content moderation", icon: "image", inactiveAsset: "/assets/icons/sidebar-image.svg", activeAsset: "/assets/icons/image-active.svg" },
  { id: "reports", label: "Reports & complaints", icon: "bell", inactiveAsset: "/assets/icons/sidebar-bell.svg", activeAsset: "/assets/icons/bell-active.svg" },
  { id: "sms", label: "SMS & OTP", icon: "chat", inactiveAsset: "/assets/icons/sidebar-chat.svg", activeAsset: "/assets/icons/chat-active.svg" },
  { id: "api", label: "API usage", icon: "globe", inactiveAsset: "/assets/icons/sidebar-globe.svg", activeAsset: "/assets/icons/globe-active.svg" },
  { id: "billing", label: "Billing & expenses", icon: "file", inactiveAsset: "/assets/icons/sidebar-file.svg", activeAsset: "/assets/icons/file-active.svg" },
  { id: "subscriptions", label: "Subscriptions", icon: "lock", inactiveAsset: "/assets/icons/sidebar-lock.svg", activeAsset: "/assets/icons/lock-active.svg" },
  { id: "revenue", label: "Revenue analytics", icon: "more", inactiveAsset: "/assets/icons/sidebar-more.svg", activeAsset: "/assets/icons/more-active.svg" },
  { id: "servers", label: "Server monitoring", icon: "plus", inactiveAsset: "/assets/icons/sidebar-plus.svg", activeAsset: "/assets/icons/plus-active.svg" },
  { id: "security", label: "Security logs", icon: "lock", inactiveAsset: "/assets/icons/sidebar-lock.svg", activeAsset: "/assets/icons/lock-active.svg" },
  { id: "settings", label: "Admin settings", icon: "settings", inactiveAsset: "/assets/icons/sidebar-settings.svg", activeAsset: "/assets/icons/settings-active.svg" },
];

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  joined: string;
  connections: string;
  status: "Active" | "Suspended";
}

export const ADMIN_USERS: AdminUserRow[] = [
  { id: "u1", name: "Nadia Rahman", email: "nadia@bondhu.app", joined: "02 Nov 2026", connections: "1,204", status: "Active" },
  { id: "u2", name: "Arif Hasan", email: "arif@bondhu.app", joined: "28 Oct 2026", connections: "986", status: "Active" },
  { id: "u3", name: "Maya Ahmed", email: "maya@bondhu.app", joined: "24 Oct 2026", connections: "642", status: "Active" },
  { id: "u4", name: "Rafi Chowdhury", email: "rafi@bondhu.app", joined: "19 Oct 2026", connections: "378", status: "Active" },
  { id: "u5", name: "Sami Khan", email: "sami@bondhu.app", joined: "12 Oct 2026", connections: "48", status: "Suspended" },
  { id: "u6", name: "Tania Akter", email: "tania@bondhu.app", joined: "08 Oct 2026", connections: "754", status: "Active" },
  { id: "u7", name: "Imran Ali", email: "imran@bondhu.app", joined: "05 Oct 2026", connections: "120", status: "Active" },
];

export interface ModerationQueueItem {
  id: string;
  title: string;
  reason: string;
  risk: "High" | "Normal";
  author: string;
  avatar: string;
  excerpt: string;
  guidance: string;
  status: "Pending" | "Approved" | "Escalated";
}

export const INITIAL_MODERATION_QUEUE: ModerationQueueItem[] = [
  {
    id: "#P-84291",
    title: "Reported post #P-84291",
    reason: "Harassment",
    risk: "High",
    author: "Arif Hasan",
    avatar: "/assets/images/portrait-arif.png",
    excerpt: "A slower morning, a greener view.",
    guidance: "No apparent policy violation. Escalate if more context is needed.",
    status: "Pending",
  },
  {
    id: "#P-84283",
    title: "Reported post #P-84283",
    reason: "Spam",
    risk: "Normal",
    author: "Rafi Chowdhury",
    avatar: "/assets/images/portrait-rafi.png",
    excerpt: "Promotional link shared repeatedly across public threads.",
    guidance: "Check automated rate limit logs before taking action.",
    status: "Pending",
  },
  {
    id: "#P-84278",
    title: "Reported post #P-84278",
    reason: "Misinformation",
    risk: "High",
    author: "Maya Ahmed",
    avatar: "/assets/images/portrait-maya.png",
    excerpt: "Community health claim flagged by 4 members.",
    guidance: "Verify source context or escalate to senior review.",
    status: "Pending",
  },
  {
    id: "#P-84266",
    title: "Reported post #P-84266",
    reason: "Copyright",
    risk: "Normal",
    author: "Nadia Rahman",
    avatar: "/assets/images/portrait-nadia.png",
    excerpt: "Photography credit requested on shared landscape.",
    guidance: "Confirm attribution or notify poster.",
    status: "Pending",
  },
  {
    id: "#P-84250",
    title: "Reported post #P-84250",
    reason: "Spam",
    risk: "Normal",
    author: "Arif Hasan",
    avatar: "/assets/images/portrait-arif.png",
    excerpt: "Duplicate group invitation snippet.",
    guidance: "Standard low-severity spam review.",
    status: "Pending",
  },
  {
    id: "#P-84244",
    title: "Reported post #P-84244",
    reason: "Harassment",
    risk: "High",
    author: "Maya Ahmed",
    avatar: "/assets/images/portrait-maya.png",
    excerpt: "Heated comment thread flagged for tone.",
    guidance: "Review parent replies before removing content.",
    status: "Pending",
  },
];

export const ADMIN_REPORTS = [
  { id: "#R-2048 · Maya Ahmed", type: "Reported post", priority: "High" as const, assigned: "Nadia Rahman", status: "Open" as const },
  { id: "#R-2047 · Arif Hasan", type: "Account appeal", priority: "Normal" as const, assigned: "Sadia Karim", status: "In review" as const },
  { id: "#R-2046 · Rafi Chowdhury", type: "Spam message", priority: "High" as const, assigned: "Nadia Rahman", status: "Open" as const },
  { id: "#R-2045 · Tania Akter", type: "Billing issue", priority: "Normal" as const, assigned: "Sadia Karim", status: "Resolved" as const },
  { id: "#R-2044 · Sami Khan", type: "Account appeal", priority: "Normal" as const, assigned: "Unassigned", status: "Open" as const },
  { id: "#R-2043 · Imran Ali", type: "Impersonation", priority: "High" as const, assigned: "Nadia Rahman", status: "In review" as const },
  { id: "#R-2042 · Nila Das", type: "Technical issue", priority: "Low" as const, assigned: "Sadia Karim", status: "Resolved" as const },
];

export const ADMIN_SMS_MESSAGES = [
  { id: "SMS-042891", recipient: "+880 17•• ••5678", provider: "Twilio", delivery: "Delivered" as const, cost: "$0.020" },
  { id: "SMS-042890", recipient: "+880 18•• ••2144", provider: "Twilio", delivery: "Delivered" as const, cost: "$0.020" },
  { id: "SMS-042889", recipient: "+880 19•• ••0198", provider: "Twilio", delivery: "Failed" as const, cost: "$0.020" },
  { id: "SMS-042888", recipient: "+880 16•• ••4120", provider: "Twilio", delivery: "Delivered" as const, cost: "$0.020" },
];

export const ADMIN_API_SERVICES = [
  { service: "Twilio Verify", usage: "84,260 SMS", latency: "3.2 sec", errors: "1.6%", cost: "$1,685.20" },
  { service: "Agora RTC", usage: "248,160 min", latency: "124 ms", errors: "0.04%", cost: "$1,488.96" },
  { service: "Cloudflare R2", usage: "1.42 TB", latency: "42 ms", errors: "0.01%", cost: "$824.60" },
  { service: "Firebase FCM", usage: "2.84M push", latency: "86 ms", errors: "0.02%", cost: "$621.24" },
];

export const ADMIN_EXPENSES = [
  { label: "SMS / OTP", amount: "$1,685.20", ratio: 0.73 },
  { label: "Voice / video", amount: "$1,488.96", ratio: 0.644 },
  { label: "Storage / CDN", amount: "$824.60", ratio: 0.356 },
  { label: "Push & delivery", amount: "$621.24", ratio: 0.27 },
];

export const ADMIN_INVOICES = [
  { id: "INV-2026-1101", provider: "Twilio Verify", period: "Nov 2026", amount: "$1,685.20", status: "Paid" },
  { id: "INV-2026-1102", provider: "Agora RTC", period: "Nov 2026", amount: "$1,488.96", status: "Paid" },
  { id: "INV-2026-1103", provider: "Cloudflare R2", period: "Nov 2026", amount: "$824.60", status: "Paid" },
  { id: "INV-2026-1104", provider: "Firebase FCM", period: "Nov 2026", amount: "$621.24", status: "Paid" },
];

export const ADMIN_SUBSCRIPTIONS = [
  { member: "Nadia Rahman", plan: "Plus · $5/mo", started: "02 Nov 2026", renewal: "02 Dec 2026", status: "Active" },
  { member: "Arif Hasan", plan: "Plus · $5/mo", started: "28 Oct 2026", renewal: "28 Nov 2026", status: "Active" },
  { member: "Maya Ahmed", plan: "Plus · $5/mo", started: "24 Oct 2026", renewal: "24 Nov 2026", status: "Active" },
  { member: "Rafi Chowdhury", plan: "Plus · $5/mo", started: "19 Oct 2026", renewal: "19 Nov 2026", status: "Active" },
];

export const ADMIN_REVENUE_BARS = [
  { month: "Jun", heightRatio: 59 / 124.3, active: false },
  { month: "Jul", heightRatio: 71 / 124.3, active: false },
  { month: "Aug", heightRatio: 68 / 124.3, active: false },
  { month: "Sep", heightRatio: 89.5 / 124.3, active: false },
  { month: "Oct", heightRatio: 105 / 124.3, active: false },
  { month: "Nov", heightRatio: 1, active: true },
];

export const ADMIN_REVENUE_MONTHS = [
  { period: "November 2026", subscribers: "4,972", gross: "$24,860", expenses: "$4,620", net: "$20,240" },
  { period: "October 2026", subscribers: "4,200", gross: "$21,000", expenses: "$4,380", net: "$16,620" },
  { period: "September 2026", subscribers: "3,580", gross: "$17,900", expenses: "$3,960", net: "$13,940" },
];

export const ADMIN_SERVER_RESOURCES = [
  { label: "Memory", value: "8.4 / 16 GB", ratio: 8.4 / 16 },
  { label: "Storage", value: "1.42 / 4 TB", ratio: 1.42 / 4 },
  { label: "Network", value: "248 Mbps", ratio: 0.248 },
];

export const ADMIN_SERVICES_HEALTH = [
  { service: "API gateway", region: "ap-south-1", availability: "99.99%", latency: "124 ms", status: "Healthy" },
  { service: "Messaging cluster", region: "ap-south-1", availability: "99.98%", latency: "86 ms", status: "Healthy" },
  { service: "Call signaling", region: "ap-south-1", availability: "99.98%", latency: "92 ms", status: "Healthy" },
  { service: "Media storage", region: "Global edge", availability: "99.99%", latency: "42 ms", status: "Healthy" },
];

export const ADMIN_SECURITY_LOGS = [
  { timestamp: "11 Nov · 09:42", actor: "Nadia Rahman", event: "Admin sign-in", ip: "103.12.45.82", result: "Success" as const },
  { timestamp: "11 Nov · 09:38", actor: "System", event: "Rate limit applied", ip: "185.22.41.10", result: "Blocked" as const },
  { timestamp: "11 Nov · 09:24", actor: "Sadia Karim", event: "Content approved", ip: "103.12.45.91", result: "Success" as const },
  { timestamp: "11 Nov · 09:18", actor: "Nadia Rahman", event: "Permissions updated", ip: "103.12.45.82", result: "Success" as const },
  { timestamp: "11 Nov · 09:12", actor: "System", event: "Suspicious login", ip: "91.44.12.73", result: "Blocked" as const },
  { timestamp: "11 Nov · 09:06", actor: "Nadia Rahman", event: "Billing export", ip: "103.12.45.82", result: "Success" as const },
  { timestamp: "11 Nov · 08:54", actor: "System", event: "Backup completed", ip: "Internal network", result: "Success" as const },
];
