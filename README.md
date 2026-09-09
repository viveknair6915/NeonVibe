# NeonVibe — Social Event Signup Experience

A mobile-first, responsive web application recreating the authentic onboarding and signup wizard of the **Extroverts** nightlife & social event platform. Built for the Frontend Engineering Assessment with pixel parity, robust client-side state management, and enhanced user experience.

---

## 🌟 Overview & Visual Identity

NeonVibe faithfully translates the nightlife and social energy of the reference application into a modern web experience:
- **Nightlife Visual Aesthetics**: Pure `#000000` deep blacks, glowing neon pink (`#FF2A85`) cursive script, vibrant neon amber/yellow (`#FFE600`) display typography, and purple (`#B537F2`) accents.
- **Reference Application Parity**:
  - **Landing Page (Before-Hours)**: Exact `E•` serif brandmark, top `BEFORE-HOURS` status badge, central glowing neon typography (*"take it as a NEON SIGN from the god"*), full-width `CREATE` button, dashed pink border `AFTER PARTY` card with star icon and circular chevron, and 4-tab bottom navigation (`Home`, `Chats`, `Create`, `Profile`).
  - **Terms & Conditions**: Bold uppercase typography with neon purple `PARTY` highlight and `ACCEPT` call-to-action.
  - **Email Screen**: Real-time validation, newsletter toggle with state persistence, and simulated dispatch.
  - **OTP Verification**: 6-digit underline/cell OTP inputs, automatic focus advancement, backspace navigation, clipboard paste support, resend countdown timer (30s), and deterministic demo code.
  - **The 4 Signup Wizard Steps** (with `GETTING READY` header and subtle progress bar):
    1. **Username**: Character restriction, length validation (3–20 chars), no spaces.
    2. **Name**: Real-name checks (2–50 chars), preservation across back/forward navigation.
    3. **Date of Birth / Age**: Bottom-sheet date selector with Day, Month, Year inputs, dynamic age calculation, and strict $\ge 18$ validation.
    4. **Pronouns**: Bottom-sheet selector with 14 pronoun options, real-time max-3 selection guard, and selection feedback.
  - **Success Screen ("YOU'RE IN")**: Celebratory completion state with user summary card and `LET'S PARTY` trigger.
  - **Profile Dashboard**: Profile view featuring a giant initial header, Bronze Club Member card, 50 HVTS counter, Superlatives cards, Memories, VIP Passes, and Restart/Logout functionality.

---

## 🚀 UX Improvements over the Original App

1. **Robust Under-18 DOB Validation**:
   - The original app lacked clear inline feedback for underage users. NeonVibe calculates real calendar age and rejects dates of birth under 18 years old with clear feedback: *"You must be 18 or older to continue."*
   - Also validates real calendar days (preventing Feb 30, invalid leap years, or future dates).
2. **Enhanced OTP Experience**:
   - Auto-focuses next digit on type.
   - Backspace automatically moves focus to the previous input.
   - Full 6-digit paste support (`Ctrl+V` / `Cmd+V`).
   - 30-second cooldown timer for "Resend OTP".
   - One-click "Fill Demo OTP" helper for instant evaluation.
3. **Pronouns Selection Limit Enforcement**:
   - Visually limits selection to a maximum of 3 pronouns.
   - Displays real-time counter `(X/3 selected)` and an inline alert if attempting to select a 4th.
4. **State Preservation Across Navigation**:
   - Navigating `BACK` at any step preserves all previously entered information.
   - `sessionStorage` backup ensures accidental browser refreshes do not erase entered data.
5. **Toast & Tactile Feedback**:
   - Non-blocking global toasts for success, error, and informational feedback.

---

## 🛠️ Tech Stack

- **Framework**: React 18 (Functional Components, Hooks)
- **Tooling**: Vite 5, TypeScript 5 (Strict Mode)
- **Styling**: Vanilla CSS Design Tokens (CSS Custom Properties), Keyframe animations
- **Icons**: Lucide React
- **Typography**: Google Fonts (*Poppins*, *Sacramento*, *Monoton*, *Playfair Display*)
- **State Architecture**: Centralized Context API (`SignupContext`), Zero External Backend

---

## 📂 Project Structure

```
NeonVibe/
├── public/
├── src/
│   ├── components/
│   │   ├── AccountPromptSheet.tsx    # "YOU NEED AN ACCOUNT" bottom sheet
│   │   ├── AfterPartyCard.tsx        # Dashed neon pink card with star
│   │   ├── BottomNavigation.tsx      # 4-tab mobile bottom bar
│   │   ├── BottomSheet.tsx           # Reusable modal sheet with backdrop & handle
│   │   ├── Button.tsx                # Primary/Secondary buttons with spinner
│   │   ├── DatePickerSheet.tsx       # 3-segment Day/Month/Year date picker
│   │   ├── Input.tsx                 # Accessible form input with error states
│   │   ├── Logo.tsx                  # Authentic E• logo mark
│   │   ├── OTPInput.tsx              # 6-cell keyboard-friendly OTP input
│   │   ├── PronounSelectorSheet.tsx  # 14-pronoun selector with max-3 rule
│   │   └── Toast.tsx                 # Floating notification toasts
│   ├── context/
│   │   └── SignupContext.tsx         # Central state, navigation & sessionStorage sync
│   ├── data/
│   │   └── pronouns.ts               # Pronoun dataset & constants
│   ├── pages/
│   │   ├── LandingPage.tsx           # BEFORE-HOURS screen
│   │   ├── TermsPage.tsx             # Terms & Conditions with PARTY highlight
│   │   ├── EmailPage.tsx             # Email input + newsletter checkbox
│   │   ├── OTPPage.tsx               # 6-digit OTP verification + cooldown
│   │   ├── UsernamePage.tsx          # Step 1: Username
│   │   ├── NamePage.tsx              # Step 2: Name
│   │   ├── DateOfBirthPage.tsx       # Step 3: DOB & Age calculation
│   │   ├── PronounsPage.tsx          # Step 4: Pronouns
│   │   ├── SuccessPage.tsx           # "YOU'RE IN" screen
│   │   └── ProfileDashboardPage.tsx  # Extrovert profile dashboard
│   ├── styles/
│   │   ├── animations.css            # Glows, spin, slide-up keyframes
│   │   ├── global.css                # App layout, resets, mobile-first container
│   │   └── variables.css             # Neon palette & design tokens
│   ├── types/
│   │   └── index.ts                  # TypeScript models and interfaces
│   ├── utils/
│   │   ├── age.ts                    # DOB validation & age calculation
│   │   └── validation.ts             # Email, username, and name validators
│   ├── App.tsx                       # Root router & desktop evaluator toolbar
│   └── main.tsx                      # Vite React entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The application will be running at `http://localhost:3000/`.

### 3. Build for Production
```bash
npm run build
```

---

## 🔑 Demo & Testing Credentials

| Feature | Input / Credentials |
| :--- | :--- |
| **Demo OTP** | `123456` (Click *"Fill Demo OTP"* or type `123456`) |
| **Invalid OTP Test** | Any other 6-digit combination (e.g. `000000`, `999999`) |
| **DOB $\ge 18$ Test** | e.g. `18` / `01` / `2003` (Calculates to 23 years old) |
| **DOB $< 18$ Test** | e.g. `01` / `01` / `2015` (Displays under-18 restriction) |
| **Pronouns Max 3** | Try selecting 4 options to test the real-time maximum limit guard |
| **Desktop Evaluator Bar** | On screens $> 900\text{px}$, a floating navigation dropdown appears at bottom-right for instant step switching |
