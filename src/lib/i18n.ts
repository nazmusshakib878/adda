export type Locale = "en" | "bn";

export interface CopyBundle {
  brand: string;
  tagline: string;
  categories: string;
  getStarted: string;
  skip: string;
  continueBtn: string;
  loginTitle: string;
  loginSubtitle: string;
  phoneOrEmail: string;
  passwordLabel: string;
  loginBtn: string;
  forgotPassword: string;
  noAccount: string;
  signUpLink: string;
  homeTabs: {
    forYou: string;
    following: string;
    friends: string;
  };
  yourStory: string;
  sharePrompt: string;
  like: string;
  comment: string;
  share: string;
  nav: {
    home: string;
    chats: string;
    calls: string;
    profile: string;
  };
  chatsTitle: string;
  searchChats: string;
  allChats: string;
  unread: string;
  groups: string;
  e2eeNote: string;
  callsTitle: string;
  recentCalls: string;
  contactsTitle: string;
  dialPadTitle: string;
  myProfileTitle: string;
  settingsTitle: string;
  appearanceTitle: string;
  languageTitle: string;
  languageCurrentDesc: string;
  postsLabel: string;
  connectionsLabel: string;
  followingLabel: string;
}

export const COPY: Record<Locale, CopyBundle> = {
  en: {
    brand: "bondhu",
    tagline: "Closer, wherever you are.",
    categories: "SOCIAL  ·  CHAT  ·  CALL",
    getStarted: "Get started",
    skip: "Skip",
    continueBtn: "Continue",
    loginTitle: "Welcome back",
    loginSubtitle: "Good to see you again. Pick up right where you left off.",
    phoneOrEmail: "Phone number or email",
    passwordLabel: "Password",
    loginBtn: "Sign in",
    forgotPassword: "Forgot password?",
    noAccount: "New to Bondhu?",
    signUpLink: "Create account",
    homeTabs: {
      forYou: "For you",
      following: "Following",
      friends: "Friends",
    },
    yourStory: "Your story",
    sharePrompt: "Share a little of your day…",
    like: "Like",
    comment: "Comment",
    share: "Share",
    nav: {
      home: "Home",
      chats: "Chats",
      calls: "Calls",
      profile: "Profile",
    },
    chatsTitle: "Chats",
    searchChats: "Search people or messages",
    allChats: "All chats",
    unread: "Unread 3",
    groups: "Groups",
    e2eeNote: "Your conversations stay between you.",
    callsTitle: "Calls",
    recentCalls: "Recent calls",
    contactsTitle: "Contacts",
    dialPadTitle: "Dial pad",
    myProfileTitle: "My profile",
    settingsTitle: "App settings",
    appearanceTitle: "Appearance",
    languageTitle: "Language",
    languageCurrentDesc: "Interface, messages, and settings",
    postsLabel: "Posts",
    connectionsLabel: "Connections",
    followingLabel: "Following",
  },
  bn: {
    brand: "বন্ধু",
    tagline: "একটু কাছে, যেখানেই থাকুন।",
    categories: "সামাজিক  ·  বার্তা  ·  কল",
    getStarted: "শুরু করুন",
    skip: "এড়িয়ে যান",
    continueBtn: "এগিয়ে যান",
    loginTitle: "আবারও স্বাগতম",
    loginSubtitle: "আপনার মানুষের সাথে যুক্ত থাকুন সহজেই।",
    phoneOrEmail: "ফোন নম্বর বা ইমেইল",
    passwordLabel: "পাসওয়ার্ড",
    loginBtn: "প্রবেশ করুন",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    noAccount: "বন্ধু-তে নতুন?",
    signUpLink: "নতুন অ্যাকাউন্ট",
    homeTabs: {
      forYou: "আপনার জন্য",
      following: "অনুসরণ",
      friends: "বন্ধুরা",
    },
    yourStory: "আপনার স্টোরি",
    sharePrompt: "আজকের একটু গল্প লিখুন…",
    like: "পছন্দ",
    comment: "মন্তব্য",
    share: "শেয়ার",
    nav: {
      home: "হোম",
      chats: "বার্তা",
      calls: "কল",
      profile: "প্রোফাইল",
    },
    chatsTitle: "বার্তা",
    searchChats: "মানুষ বা বার্তা খুঁজুন",
    allChats: "সব বার্তা",
    unread: "অপঠিত ৩",
    groups: "গ্রুপ",
    e2eeNote: "আপনার কথোপকথন সম্পূর্ণ সুরক্ষিত।",
    callsTitle: "কল",
    recentCalls: "সাম্প্রতিক কল",
    contactsTitle: "যোগাযোগ",
    dialPadTitle: "ডায়াল প্যাড",
    myProfileTitle: "আমার প্রোফাইল",
    settingsTitle: "অ্যাপ সেটিংস",
    appearanceTitle: "চেহারা ও থিম",
    languageTitle: "ভাষা",
    languageCurrentDesc: "অ্যাপের ভাষা ও কথোপকথন",
    postsLabel: "পোস্ট",
    connectionsLabel: "সংযোগ",
    followingLabel: "অনুসরণ",
  },
};
