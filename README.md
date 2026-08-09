# ABTalks — 60 Days of Code (Redesign & Enhancement)

A fully redesigned, mobile-first frontend experience for the ABTalks 60-day coding challenge for Indian college students.

## 🗺️ Route Map

For the evaluation process, here are the required routes in exact order:

/
/dashboard
/day/12

*(Note: The AI Onboarding flow `/onboarding` and Profile `/profile` are additional routes introduced as part of the student experience enhancement).*

## 📱 Mobile-First Design & The "Sunlight" Theme

The entire application was designed natively for a **390px mobile viewport** as students predominantly use this on their phones late at night. 

To make the late-night coding experience beautiful and premium:
- **App Shell Framework**: When viewed on desktop, the application is presented inside a rounded mobile-sized card floating on a dark backdrop, ensuring the mobile design is never stretched or broken.
- **Sunlight Tint**: A subtle, warm orange radial gradient acts as a global background tint across both dark and light modes, creating an ambient glow that feels dynamic and premium.

## 🚀 The Thoughtful Idea: The AI Career Mentor & Hint Agent

To dramatically improve the student experience beyond just a checklist, we introduced **AI-Driven Career Guidance**.

1. **AI Resume Upload & Onboarding**: Before jumping blindly into a track, students can upload their resume. The system analyzes their current skills and the target role they want (e.g. Software Engineer), cross-references this with past successful students, and *recommends* the perfect track to bridge their skill gap.
2. **AI Hint Agent (Build Pane)**: Getting stuck late at night is discouraging. During the challenge (Day 12), an AI Hint Agent is available. Students upload their `.zip` code file, and the AI analyzes *their specific code* to provide up to 3 context-aware hints, governed by a cooldown timer to prevent cheating.
3. **Hot Jobs & Interview Tracking**: On the Profile page, the AI maps the student's completed tasks to real-world "Hot Jobs" matching their new skills, and tracks mock/real interview calls (Stripe, Meta) to prove that the 60 days of code actually lead to career outcomes.

## 🧩 Element Breakdown (Fulfilling the Prompt)

### 1. Landing Page (`/`)
- **Use:** The first experience for a new student.
- **Elements:** 
  - A bold value proposition ("Ship real code. Build your streak. Get hired.")
  - Clear explanations of the 60-day commitment.
  - A frictionless "Start Day 1" button that leads into the AI Onboarding flow, building motivation and trust immediately.

### 2. Student Dashboard (`/dashboard`)
- **Use:** The home screen after logging in, outlining progress.
- **Elements:**
  - **Streak & Stats Header**: Instantly displays their current streak and completion percentage to leverage gamification and consistency.
  - **Dynamic Timeline**: Handles edge cases beautifully. It shows past days (missed or completed), today's active task, and future locked tasks.
  - **Bottom Navigation**: Persistent mobile-friendly tab bar to switch between the Dashboard, Leaderboard, and Profile.

### 3. Challenge Day (`/day/12`)
- **Use:** The complete experience of a single challenge day.
- **Elements:**
  - **Session Timer**: A prominent timer at the top to track exactly how long they are spending on the task, creating urgency.
  - **Remind Me What To Build**: A collapsible summary of the prompt so the student never loses context.
  - **Build Tab**: Contains the upload button for their `.zip` file, and the AI Hint Agent to assist them if they get stuck.
  - **Submit Tab**: After building, the user submits their GitHub commit URL and LinkedIn post URL as proof of work. 
  - **Confetti Celebration**: Submitting successfully triggers a celebratory confetti animation and provides direct links to view their public proof of work.

## 🛠️ Tech Stack & Edge Cases
- Built using **Next.js** and React.
- **Mocked Data**: All data (streaks, days, leaderboards, profile stats) is driven by `mockData.js`.
- **Edge Cases Handled**: Empty states (0-day streak), locked future days, and missed past days are all visually distinct and gracefully handled by the UI.
