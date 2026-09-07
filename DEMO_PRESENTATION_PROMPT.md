# Flentra — Google Slides Demo Presentation Prompt

> **Use the full contents of this file as a prompt for Google Slides AI (or any slide-generation tool).
> Paste it in, let the AI generate slides, then refine the visuals using the styling guide at the end.**

---

## MASTER PROMPT (copy everything below this line)

---

Create a professional, enterprise-grade Google Slides presentation for a live product demo of **Flentra** — a real-time device visibility and control platform. The presentation should be suitable for showing to potential investors, enterprise clients, and technical stakeholders. It should be polished, visually compelling, and demo-first.

---

### BRAND & VISUAL IDENTITY

**Brand name:** Flentra
**Brand tagline:** *"Real-time visibility and control for parents and businesses. Simple, secure, and always on."*

**Color palette:**
- Primary brand navy: `#001B3B`
- Accent green (action, success): `#01DB5E`
- Surface light: `#F8FAFC`
- Text primary: `#0F172A`
- Text secondary: `#64748B`
- Border / divider: `#E2E8F0`
- Danger / alert red: `#EF4444`

**Typography:** Clean, modern sans-serif (use Google Slides "Inter" or "Plus Jakarta Sans" or "DM Sans"). Headings are bold and tight. Body text is 14–16pt.

**Slide design rules:**
- **No heavy gradients.** Use flat, clean surfaces with sharp hairline borders.
- **No drop shadows on cards.** Prefer `1px solid #E2E8F0` borders on light surfaces.
- **Dark slides** use `#001B3B` background with `#FFFFFF` headlines and `#94A3B8` body text.
- **Light slides** use `#F8FAFC` background with `#0F172A` text.
- Accent color (`#01DB5E`) is used for CTAs, highlights, and key stat callouts only — never as a background.
- Use icons from Lucide or Heroicons (outlined, monochrome).
- Every slide must have **a single focal point** — don't crowd the slide.

---

### SLIDE STRUCTURE (32 slides total)

---

#### SECTION 1: OPENING (Slides 1–4)

---

**Slide 1 — Title / Hero**
- Full-bleed dark background (`#001B3B`)
- Centered layout
- **Headline (white, 52pt bold):** "Flentra"
- **Sub-headline (green `#01DB5E`, 22pt medium):** "Real-time Visibility & Control — for Families and Businesses."
- **Body (white/50%, 16pt):** "A live product demo."
- Bottom-right: today's date, presenter name
- Top-left: Flentra wordmark logo (white on dark)
- *No images. Clean, commanding, minimal.*

---

**Slide 2 — The Problem (B2C angle)**
- Light background
- **Headline:** "Parents are flying blind."
- Three columns, each with a large stat + short description:
  - 📱 **7h 22m** — Average daily screen time for children aged 8–12
  - 🌐 **62%** — Teens who have encountered harmful content online
  - 🔒 **1 in 3** — Parents who don't know what apps their child uses
- **Subtext (italics):** "Existing tools are either too intrusive or too limited. There's no middle ground."
- Bottom accent bar in `#01DB5E`

---

**Slide 3 — The Problem (B2B angle)**
- Dark background (`#001B3B`)
- **Headline (white):** "Businesses lose control the moment a device leaves the office."
- Two columns:
  - Left: Pain points (bulleted, white text)
    - Devices go missing with no recovery path
    - No visibility into compliance or app usage
    - IT teams can't enforce policies remotely
    - Reassigning devices is a manual, error-prone process
  - Right: Big stat callout (green accent number + white label)
    - **$1.2B** lost to unrecovered enterprise devices annually
    - **3x** longer device life with active MDM enforcement
- Subtext: "There's no single platform that gives IT teams real-time control over their entire fleet."

---

**Slide 4 — Our Solution**
- Split layout: dark left panel, light right panel
- Left panel (dark):
  - **Flentra logo**
  - **Headline:** "One platform. Two powerful audiences."
  - Body: "Flentra is a device visibility and Mobile Device Management (MDM) platform serving two distinct audiences from a single, unified codebase."
- Right panel (light): Two cards, side by side
  - Card 1 (navy border): **Families (B2C)** — Parental controls, screen time, app management, geofencing, location tracking.
  - Card 2 (green border): **Businesses (B2B)** — MDM enrollment, fleet management, compliance, device reassignment, staff control.

---

#### SECTION 2: PRODUCT OVERVIEW (Slides 5–8)

---

**Slide 5 — Platform Architecture (High Level)**
- Light background
- **Headline:** "Built for scale from day one."
- Center: simple architecture diagram (text-based blocks):

  ```
  [Mobile Devices (Android / iOS)]
           ↓
  [MDM / Enrollment Layer]
           ↓
  [Flentra API — Next.js Server Actions + httpOnly Cookies]
           ↓
  [React Dashboard | Real-time Location | App Controls]
  ```

- Four tech pillars below (icon + label):
  - Next.js App Router — Server-side performance
  - httpOnly Cookies — Zero token exposure to JS
  - Mapbox — Real-time geolocation
  - Paystack — Integrated billing

---

**Slide 6 — Two Dashboards, One Codebase**
- Split screen layout
- **Left (B2C — Parent Dashboard):**
  - Title: "Parent Dashboard"
  - Description: "Metric cards for screen time, web history, alerts. Child selector dropdown. Device map. Real-time app usage."
- **Right (B2B — Business Dashboard):**
  - Title: "Business Dashboard"
  - Description: "Fleet health metrics, device locations on map, staff list, compliance indicators."
- Center divider: thin vertical line with "Shared codebase — role-based rendering" label
- Headline above: "One login. Your dashboard adapts to who you are."

---

**Slide 7 — Dual Authentication**
- Light background
- **Headline:** "Separate, secure auth surfaces for each audience."
- Two columns:
  - Left: **Personal Login** `/login` — For parents managing family devices.
    - Fields: Email + Password
    - Features: Forgot password, confirm email, social proof copy
  - Right: **Business Login** `/business/login` — For IT admins and fleet managers.
    - Fields: Email + Password
    - Features: Business registration, invite flow, org email verification
- Callout box (green border): "Tokens live in httpOnly cookies — never exposed to JavaScript. Silent refresh with zero re-login friction."
- Theme toggle icon in corner: "Light & dark mode available."

---

**Slide 8 — Onboarding Flow**
- Dark background
- **Headline:** "Zero-friction setup, guided step by step."
- Two columns:
  - Left: **B2C Onboarding (5 steps)**
    1. Account setup
    2. Add child profile
    3. Pair device via QR code
    4. Configure screen-time rules
    5. Set up app permissions & alerts
  - Right: **B2B Onboarding (3 steps)**
    1. Business details
    2. Invite team members
    3. Device enrollment via QR
- Callout: "Invited staff skip business onboarding — they land directly in the app."
- Progress bar / step indicators shown for each flow

---

#### SECTION 3: LIVE DEMO — B2C (Slides 9–16)

---

**Slide 9 — Demo Section Divider: B2C**
- Full dark slide
- Large centered text: **"B2C Demo"**
- Subheading: "The Parent Experience"
- Tagline: "Keeping children safe in the digital world."
- Three feature labels in a row: Screen Time · Web Control · Location

---

**Slide 10 — B2C Dashboard Overview**
- Light background
- **Headline:** "Everything a parent needs, at a glance."
- Screenshot placeholder labeled [SCREENSHOT: Parent Dashboard]
- Bullet points on right:
  - Real-time metrics updated continuously
  - Switch between children with one click
  - Color-coded alerts and trends
  - Light/dark mode support
- Key metrics shown: Total Screen Time | Active Apps | Alerts Today | Compliance Score

---

**Slide 11 — Screen Time & App Control**
- Split layout
- Left: Description
  - **Headline:** "Set limits. Enforce them automatically."
  - Body: "Parents can view per-app usage, set daily time limits, block apps entirely, and see usage history across the week — all from the dashboard."
  - Feature list:
    - Per-app daily time limits (hours + minutes)
    - Block / unblock specific apps instantly
    - Weekly usage bar chart per app
    - Uninstall apps remotely
- Right: Screenshot placeholder [SCREENSHOT: App Detail View]
  - App name + icon
  - Block toggle
  - "Set Time Limit" button
  - Weekly usage bar chart Mon–Sun

---

**Slide 12 — Web History & Domain Control**
- Light background
- **Headline:** "See what they're browsing. Control it too."
- Two-column layout:
  - Left: Visited websites table
    - Columns: Domain | Category | Time Spent | Last Visited
    - Example rows: YouTube, Instagram, Reddit, TikTok
  - Right: Domain restriction panel
    - Block entire domains
    - Whitelist trusted sites
    - Set daily limits per domain
- Callout: "Domain restrictions use replace-semantics — no stale or duplicate blocks."

---

**Slide 13 — Location Tracking**
- Dark background
- **Headline:** "Always know where they are."
- Left: Current Location Card — shows latitude/longitude, last seen timestamp, city/region
- Center-Right: [SCREENSHOT: Mapbox Map] — device pin shown
- Bottom: Location History — Lekki Phase 1 · 2h 33min · Jan 1 2026
- *Map takes dominant visual space. Immersive feel.*

---

**Slide 14 — Geofencing**
- Light background
- **Headline:** "Define safe zones. Get alerted when breached."
- Left: GeofencingCard
  - Named safe zones: "School", "Home", "Grandma's"
  - Radius in km
  - Enter/exit alerts
- Right: [SCREENSHOT: Geofencing Modal Map] — circle overlay
- Callout: "Replace-semantics geofencing — every update sends the full authoritative list. No drift."
- Feature bullets:
  - Named zones with custom radius
  - Real-time entry/exit notifications
  - Multi-zone support per child

---

**Slide 15 — Alerts & Notifications**
- Light background
- **Headline:** "Smart alerts when it matters most."
- Two variants shown side by side:
  - **All-clear state (green icon):** "All children are within limits — No alerts triggered today."
  - **Warning state (red icon):** Active alerts list — e.g., "Screen time exceeded · 45 min overrun"
- Callout: "Alerts are surfaced in the dashboard and sent as push notifications."

---

**Slide 16 — Subscription & Billing (B2C)**
- Light background
- **Headline:** "Simple, transparent pricing. Powered by Paystack."
- Two pricing cards:
  - Monthly Plan — B2C — device limit — price in NGN
  - Annual Plan — B2C — discounted — savings badge
- Flow steps (numbered):
  1. Select plan
  2. Redirected to Paystack
  3. Payment verified server-side
  4. Subscription activated immediately
- Callout: "Payments are always server-verified — client trust is never assumed."
- Billing History table preview: Invoice number · Date · Amount · Status

---

#### SECTION 4: LIVE DEMO — B2B (Slides 17–27)

---

**Slide 17 — Demo Section Divider: B2B**
- Full dark slide
- Large centered text: **"B2B Demo"**
- Subheading: "The Business Experience"
- Tagline: "Enterprise MDM for telecom operators, lenders, and fleet managers."
- Three feature labels: Fleet Management · Compliance · Analytics

---

**Slide 18 — B2B Dashboard Overview**
- Light background
- **Headline:** "Your entire device fleet, on one screen."
- [SCREENSHOT: Business Dashboard]
- Bullet points:
  - Trend indicators — positive/negative vs. yesterday
  - Color-coded compliance badges (green/red/yellow)
  - Live device count with enrollment status
- KPI row: Total Devices | Active | Flagged | Compliance Rate | MDM Enrolled

---

**Slide 19 — Fleet Metrics Deep Dive**
- Dark background
- **Headline:** "Data that drives decisions."
- Four metric cards (2x2 grid):
  - Active Devices — count + mini bar chart (green bars)
  - Flagged Devices — count + trend chart (red bars)
  - Non-Compliant — count + MDM status chart (yellow bars)
  - Enrolled in MDM — count + enrollment trend (blue bars)
- Each card: current value, trend arrow, contextual footer text
- Caption: "All metrics are live — backed by MDM sync data and real-time device telemetry."

---

**Slide 20 — User / Staff Management**
- Light background
- **Headline:** "Manage your people and their devices together."
- Left: Staff list table
  - Columns: Name | Email | Role | Department | Location | Assigned Devices | Status
  - Role badges: ORGANIZATION_ADMIN · MEMBER
  - Row actions: View details, Assign device, Suspend apps
- Right: Add/Edit Staff modal
  - First name, Last name, Email
  - Role selector, Department selector, Location selector
- Feature callouts:
  - Invite team members via email
  - Role-based permissions (Admin vs Member)
  - Bulk select for mass actions

---

**Slide 21 — Device Assignment & Onboarding**
- Dark background
- **Headline:** "Enroll a device in under 2 minutes."
- Step-by-step flow (horizontal steps):
  1. Select staff member — searchable dropdown with name, email, admin badge
  2. Enter device details — Serial number, IMEI, manufacturer, model, OS
  3. Set finance info — Purchase price, loan amount, repayment start, country/state
  4. Scan QR code — Device enrolls into the MDM zone automatically
  5. Done — Device appears in fleet dashboard immediately
- Callout: "QR enrollment uses Flentra's MDM zone system — no manual MDM configuration required."

---

**Slide 22 — Device Details & Hardware Info**
- Light background
- **Headline:** "Complete visibility into every enrolled device."
- Two panels:
  - Left: Hardware Details card
    - Model & manufacturer
    - IMEI number
    - MAC address (WiFi + Bluetooth)
    - OS type and version
    - Zone / business address
    - Assignment status badge (ACTIVE / ASSIGNED / RETURNED)
  - Right: Real-time telemetry snapshot
    - Battery level — circular gauge
    - CPU utilization
    - Memory used / free
    - Internal storage used %
    - WiFi SSID + signal status
    - App memory usage
- Caption: "Powered by MDM hardware sync — data refreshed on every device poll."

---

**Slide 23 — Real-Time Device Location (B2B)**
- Dark background
- **Headline:** "Track every asset. In real time."
- Left: Current Location Card — lat/lon, last seen, reverse-geocoded address
- Center-Right: [SCREENSHOT: Device Map — business context]
- Geofencing Card: named zones — "Warehouse Lagos", "Head Office"
- Caption: "Geofences apply per-device. Breach alerts are sent instantly."

---

**Slide 24 — App Control (B2B)**
- Light background
- **Headline:** "Control what employees can and can't use."
- Two-column layout:
  - Left: All Apps list — app name, package name, usage time, block toggle
  - Right: App Detail View
    - App icon + name
    - Block/Unblock toggle
    - Set time limit (hour + minute selectors)
    - Weekly usage bar chart
    - Uninstall button
- Caption: "MDM actions are dispatched in real time — no device restart required."

---

**Slide 25 — Bulk Actions**
- Dark background
- **Headline:** "Manage tens of devices with a single click."
- Three bulk action panels (side by side):
  - **Bulk Suspend Apps**
    - Select multiple devices → search installed apps → select apps → suspend
    - Android icon + warning badge
    - Confirm modal before action
  - **Bulk Unsuspend Apps**
    - Reverse of suspend — restore productivity
    - Confirmation required
  - **Bulk Message**
    - Select devices → compose message → choose message type (WELCOME, ALERT, etc.)
    - Dispatched to all selected device screens simultaneously
- Callout: "Built for IT teams managing 100+ devices — one action, fleet-wide impact."

---

**Slide 26 — Device Reassignment**
- Light background
- **Headline:** "Reassign a device without losing its history."
- Flow diagram:

  ```
  Staff A (leaves org)
       ↓
  Admin opens Reassign Device modal
       ↓
  Selects new staff member from searchable list
       ↓
  Reassignment committed (keyed on currentDeviceAssignmentId)
       ↓
  Staff B (new owner) — device history fully preserved
  ```

- Key callout: "Keyed on the current assignment ID — historical assignment records are never overwritten."
- Feature bullets:
  - Infinite-scroll staff search
  - Assignment history preserved
  - Instant reassignment confirmation

---

**Slide 27 — Department Management**
- Dark background
- **Headline:** "Organize your fleet by department."
- Department list view:
  - Department name, member count, device count
  - Create, edit, delete departments
- Device filtering by department
- Caption: "Departments provide logical grouping for large enterprises — filter dashboards, reports, and device lists by team."

---

#### SECTION 5: TECHNICAL DEEP DIVE (Slides 28–30)

---

**Slide 28 — Security Architecture**
- Light background
- **Headline:** "Security is not an afterthought."
- Four security pillars (icon + heading + 2-line description):
  - **httpOnly Cookies** — Access and refresh tokens never touch JavaScript. XSS-proof by design.
  - **Silent Token Refresh** — Centralized in apiClient. One in-flight refresh shared across concurrent 401s. Failure clears session and redirects cleanly.
  - **Route Protection Middleware** — Every request passes through: public → auth gate → email verification → onboarding → role-based access. No bypasses.
  - **Server-Side Verification** — All payment verification and sensitive state changes happen server-side. Client assertions are never trusted.

---

**Slide 29 — API Architecture**
- Dark background
- **Headline:** "A layered API architecture with zero leakage."
- Three-layer waterfall diagram:
  - **Layer 1 — Server Action** — "use server" · attaches auth cookie · returns typed ActionResult
  - **Layer 2 — React Query Hook** — wraps action · caching · deduplication · background refetch · mutation state
  - **Layer 3 — Component** — consumes hook · never calls fetch directly
- Bottom callout: "createResourceHooks() — CRUD hook factory with auto query-key and cache invalidation. Write one action, get 5 hooks."
- Caption: "Every endpoint in Flentra follows this pattern. No exceptions."

---

**Slide 30 — Developer Experience**
- Light background
- **Headline:** "Built to scale with your team."
- Four DX highlights:
  - **TypeScript end-to-end** — Typed API responses, typed ActionResult, typed React Query data. No `any` in production paths.
  - **URL-first state** — Shareable, refresh-safe URL state via nuqs. No lost context on page reload.
  - **Feature-first folder structure** — features/<name>/api · model · ui. Clear ownership. Easy onboarding.
  - **Declarative middleware** — Adding a route = one line in roleAccessMap. Audit-friendly. Never buried in component logic.

---

#### SECTION 6: CLOSING (Slides 31–32)

---

**Slide 31 — What's Next / Roadmap**
- Dark background
- **Headline:** "The roadmap ahead."
- Three columns:
  - **Q4 2026:**
    - Push notification center
    - Advanced analytics exports
    - Bulk device import via CSV
  - **Q1 2027:**
    - iOS MDM support (Apple DEP)
    - White-label B2B portal
    - Multi-zone billing
  - **2027+:**
    - AI-powered usage anomaly detection
    - Cross-device family plans
    - Enterprise SSO (SAML/OIDC)
- Caption: "Built on a solid foundation — every feature above slots cleanly into the existing layered architecture."

---

**Slide 32 — Closing / Q&A**
- Full-bleed dark background (`#001B3B`)
- Centered layout
- **Flentra logo** (white wordmark, large)
- **Headline (white, 40pt):** "Real-time visibility and control."
- **Sub-headline (green #01DB5E, 20pt):** "Simple, secure, and always on."
- Three contact/CTA blocks (spaced horizontally):
  - flentra.io
  - hello@flentra.io
  - Lagos, Nigeria
- Small footer: "© 2026 Flentra. All rights reserved."
- *Clean. Final. No bullets.*

---

### SLIDE DESIGN SYSTEM (apply to all slides)

```
LAYOUT GRID:
- 16:9 widescreen format
- Left/right margin: 64px
- Top/bottom margin: 48px
- Column gutter: 32px

TYPOGRAPHY:
- Section divider headline: 64pt Bold
- Slide headline: 36–44pt Bold
- Subheading: 20–24pt Medium
- Body text: 14–16pt Regular
- Caption / label: 11–12pt Regular, uppercase tracking

CARDS:
- Background: #FFFFFF (light slides) or #0A1629 (dark slides)
- Border: 1px solid #E2E8F0 (light) or 1px solid #132847 (dark)
- Border radius: 12px
- Padding: 24px
- NO box-shadow

CALLOUT BOXES:
- Left border accent: 3px solid #01DB5E
- Background: #F0FDF4 (light) or rgba(1,219,94,0.08) (dark)
- Text: #064E3B (light) or #6EE7B7 (dark)

STAT CALLOUTS:
- Number: 48–64pt Extra Bold, #001B3B (light) or #FFFFFF (dark)
- Label: 12pt Regular, #64748B

STATUS BADGES:
- Active/success: bg #DCFCE7, text #166534
- Warning: bg #FEF9C3, text #854D0E
- Danger: bg #FEE2E2, text #991B1B
- Info: bg #DBEAFE, text #1E40AF
- All badges: 6px border-radius, 4px 10px padding

ICONS:
- Style: Lucide outlined
- Size: 20–24px on cards, 48px on section dividers
- Color: matches context (green for accent, slate for neutral)
```

---

### DEMO SCRIPT NOTES (for the presenter)

**Slide 10 (B2C Dashboard):**
> "When a parent logs in, they immediately see the key metrics for their child's device — screen time, active apps, and any alerts. If they have multiple children, they can switch with a single dropdown. The dashboard updates in real time."

**Slide 11 (App Control):**
> "Click on any app and you get the full detail view. You can block it right here, set a daily time limit — say, one hour — and you'll see a bar chart of usage across the week. If needed, you can uninstall it remotely. All of this without touching the device."

**Slide 13 (Location):**
> "The location tab shows the device's last known GPS coordinates, reverse-geocoded to a human-readable address. The map is interactive — you can zoom, pan, and see movement history."

**Slide 14 (Geofencing):**
> "You can define safe zones — home, school, a relative's house. Draw the zone on the map, name it, set the radius. If the device leaves that zone, you get an alert. This is the kind of real-time safety feature that no basic screen-time app offers."

**Slide 21 (Device Assignment):**
> "Enrolling a new device takes four steps. You select the staff member, enter the device's hardware details, optionally add financing info — like purchase date and loan amount — and then the staff member scans the QR code on their device. That's it. The device appears in the fleet dashboard immediately."

**Slide 25 (Bulk Actions):**
> "Select ten devices from the list. Now I can suspend a specific app on all ten simultaneously, or send a message to all their screens at once. This is built for real IT teams managing hundreds of devices — not for clicking one device at a time."

**Slide 26 (Reassignment):**
> "When a staff member leaves, reassigning their device is one modal. Search for the new assignee, confirm, done. The device history is fully preserved — you can still see every action that happened on that device under the previous user."

---

### ADDITIONAL INSTRUCTIONS FOR SLIDE AI

1. **Use placeholder rectangles with labels** where screenshots would go — labeled [SCREENSHOT: Dashboard], [SCREENSHOT: Location Map], [SCREENSHOT: App Detail]. These will be replaced with real application screenshots before the presentation.
2. **Do not use stock photos.** Use icons and geometric shapes only.
3. **Keep animation minimal.** Fade-in for section dividers. Appear for bullet points (one at a time). No spinning or sliding effects during demo.
4. **Each slide must have a slide number** (bottom-right, small, #64748B).
5. **Speaker notes** should be added for slides 10, 11, 13, 14, 21, 25, and 26 using the demo script above.
6. **Total running time estimate:** 20–25 minutes including live demo transitions. Pace at approximately 45 seconds per non-demo slide and 2–3 minutes per demo section slide.

---

*End of prompt.*
