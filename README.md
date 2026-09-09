# NeonVibe — Social Nightlife & Event Platform

A responsive, mobile-first web application recreating the authentic onboarding and social experience of the **Extroverts** nightlife platform. Features dual view modes (Desktop Website & Mobile Simulator), interactive event feed, and a multi-step signup wizard.

---

## User Flow & Screenshots

| Step | Preview | Description |
| :---: | :--- | :--- |
| **1** | ![Intro Splash](./Screenshots/image1.png) | **Intro Splash Screen**<br>Ambient glow hero entrance highlighting curated nightlife, before-hours hangouts, and VIP passes. |
| **2** | ![Events Discovery Feed](./Screenshots/image2.png) | **Events Discovery Feed (Desktop Website View)**<br>Full-width party feed with category filters (*All Parties, Tonight, VIP Lounges, Rooftops*), host cards, and RSVP buttons. |
| **3** | ![Email Onboarding](./Screenshots/image3.png) | **Email Verification**<br>Accessible email field with RFC 5322 validation, error feedback, and newsletter opt-in toggle. |
| **4** | ![OTP Verification](./Screenshots/image4.png) | **6-Digit OTP Verification**<br>6-cell input with auto-advance, backspace jumping, paste support, 30s resend cooldown, and a one-click demo code helper. |
| **5** | ![Date of Birth & Age](./Screenshots/image5.png) | **Age & Birthday Verification**<br>Calendar date selector with dynamic age calculation and strict $\ge 18$ validation. |
| **6** | ![Pronoun Selection](./Screenshots/image6.png) | **Pronoun Selection**<br>Modal selector with 14 pronoun options and a real-time maximum-3 limit guard. |
| **7** | ![Success Screen](./Screenshots/image7.png) | **Celebratory Success Screen ("YOU'RE IN")**<br>Instant feedback card showing verified credentials and direct access to party features. |
| **8** | ![Mobile Simulator](./Screenshots/image8.png) | **Mobile Viewport Simulator**<br>Realistic mobile frame with responsive layout, status bar, and 4-tab bottom navigation (*Home, Chat, Create, Profile*). |

---

## Key Features

- **Dual View Modes**: Switch instantly between full **Desktop Website View** (with top navigation and responsive grids) and **Mobile App Simulator** (authentic 414px mobile frame).
- **Event Feed & RSVP**: Browse live events, filter by party type, and join with immediate state updates.
- **Robust Client Validation**:
  - Strict $\ge 18$ calendar age check (rejects underage dates and invalid calendar dates like Feb 30).
  - 6-cell keyboard-friendly OTP input with clipboard paste support.
  - Pronoun selection guard (max 3 allowed with real-time alerts).
  - Alphanumeric username rules (3–20 chars, no spaces).
- **State Preservation**: All entered data is persisted across backward/forward navigation and backed by `sessionStorage`.
- **Zero Backend Required**: Runs completely client-side with mock verification and instant response times.

---

## Tech Stack

- **Frontend**: React 18 (Functional Components, Context API)
- **Language**: TypeScript 5 (Strict Mode)
- **Build Tool**: Vite 5
- **Styling**: Vanilla CSS Design Tokens (Custom Properties, Glassmorphism, CSS Keyframe Animations)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (*Poppins*, *Sacramento*, *Monoton*, *Playfair Display*)

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## Demo Credentials for Testing

| Test Case | Value / Action | Expected Result |
| :--- | :--- | :--- |
| **Demo OTP** | Click **"Fill Demo OTP"** or enter `123456` | Successfully verifies and advances to Step 1 |
| **Invalid OTP** | Any other 6 digits (e.g. `000000`) | Inline error: *"Invalid code. Please use demo code 123456"* |
| **Age $\ge 18$ Check** | e.g. `18 / 01 / 2003` | Validates as 23 years old and permits continuation |
| **Age $< 18$ Check** | e.g. `01 / 01 / 2015` | Inline error: *"You must be 18 or older to continue."* |
| **Pronouns Limit** | Attempt to pick 4 options | Selection of 4th item is blocked with limit notice |
