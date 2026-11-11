# Bondhu — Closer, wherever you are.

Complete Next.js (App Router) + TypeScript + Tailwind CSS implementation generated from the Bondhu Figma design system (`01 · Mobile experience`, `02 · Admin workspace`, `03 · Design system`), ready for deployment on Vercel.

## Routes

- `/` — **Mobile Experience (`390 × 844`)**: All 52 interactive mobile screens covering Splash, Onboarding, Auth & SMS OTP, Home Feed (EN, বাংলা, Dark), Create/Media/Video Posts, Comments, Share Sheet, Profile Preview, Notifications, Chats, 1:1 & Group Conversations, Create Group, Shared Media & Files, Recent Calls, Contacts, Dial Pad, Incoming/Outgoing/Active/Group Audio & Video Calls, My Profile, Edit Profile, Connections, Privacy, Security, App Settings, Appearance, Language (বাংলা), and System States (Loading, Empty Inbox, Connection Error, Success, Offline).
- `/admin` — **Admin Workspace (`1440 × 1024`)**: All 12 operational sections (Overview, User management, Content moderation, Reports & complaints, SMS & OTP, API usage, Billing & expenses, Subscriptions, Revenue analytics, Server monitoring, Security logs, Admin settings) with Light/Dark modes, `⌘ K` quick search, filters, moderation workflow, and workspace guardrails.
- `/design-system` — **Design Foundations**: Color roles (`Emerald`, `Ivory`, `Ink`, `Sage`, `Slate`, `Alert`), `Inter` + `Noto Sans Bengali` typography specimens, layout/radii tokens, all 23 vector icons, portraits, toggles, buttons, inputs, chat bubbles, notifications, and call controls.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build & Deploy on Vercel

```bash
npm run typecheck
npm run build
```

Deploy directly via the Vercel CLI:

```bash
npx vercel
```

Or push this directory to GitHub and import the repository in the Vercel dashboard (`framework: nextjs`).
