# Flentra — Demo Presentation Prompt (Part 2 of 2)
## Slides 17–32 | B2B Demo + Technical Deep Dive + Closing

> Paste everything below the dashed line into Google Slides AI.
> This continues from DEMO_PRESENTATION_PART1.md (slides 1–16).
> Start slide numbering at 17.

---

Create the second half of a professional, enterprise-grade Google Slides presentation for a live product demo of **Flentra**. This is Part 2 of 2 and covers slides 17 through 32. Start numbering from slide 17.

---

### BRAND & VISUAL IDENTITY (same as Part 1)

**Brand name:** Flentra
**Tagline:** "Real-time visibility and control for parents and businesses. Simple, secure, and always on."

**Color palette:**
- Primary navy: #001B3B
- Accent green: #01DB5E
- Surface light: #F8FAFC
- Text primary: #0F172A
- Text muted: #64748B
- Border: #E2E8F0
- Alert red: #EF4444

**Typography:** Plus Jakarta Sans or DM Sans. Bold tight headings. 14–16pt body.

**Design rules (strictly enforced):**
- No gradients. Flat surfaces only.
- No drop shadows. Use 1px solid #E2E8F0 hairline borders on cards.
- Dark slides: #001B3B background, #FFFFFF headline, #94A3B8 body.
- Light slides: #F8FAFC background, #0F172A text.
- #01DB5E accent only on CTAs, stat callouts, highlights — never as a background fill.
- Icons: Lucide outlined style, monochrome.
- One focal point per slide. Never crowd.
- Slide number bottom-right, 11pt, #64748B. Start at 17.

---

### DESIGN SYSTEM (same as Part 1)

**Cards:**
- Background: #FFFFFF (light) or #0A1629 (dark)
- Border: 1px solid #E2E8F0 (light) or 1px solid #132847 (dark)
- Border radius: 12px | Padding: 24px | No box-shadow

**Callout boxes:**
- Left border: 3px solid #01DB5E
- Background: #F0FDF4 (light) or rgba(1,219,94,0.08) (dark)
- Text: #064E3B (light) or #6EE7B7 (dark)

**Stat callouts:**
- Number: 48–64pt Extra Bold, #001B3B (light) or #FFFFFF (dark)
- Label: 12pt Regular, #64748B

**Status badges:**
- Success: bg #DCFCE7 · text #166534
- Warning: bg #FEF9C3 · text #854D0E
- Danger: bg #FEE2E2 · text #991B1B
- All: 6px radius, 4px 10px padding

---

### SLIDES 17–32

---

**Slide 17 — Demo Section Divider: B2B**
- Full dark slide (#001B3B)
- Large centered text (white, 64pt bold): "B2B Demo"
- Subheading (#01DB5E, 22pt): "The Business Experience"
- Tagline (white/60%, 16pt): "Enterprise MDM for telecom operators, lenders, and fleet managers."
- Three labels in a row: Fleet Management · Compliance · Analytics

---

**Slide 18 — B2B Dashboard Overview**
- Light background
- Headline: "Your entire device fleet, on one screen."
- Large placeholder rectangle: [SCREENSHOT: Business Dashboard]
- Bullet points on right:
  - Trend indicators — positive/negative vs. yesterday
  - Color-coded compliance badges (green/red/yellow)
  - Live device count with enrollment status
- KPI row: Total Devices | Active | Flagged | Compliance Rate | MDM Enrolled

---

**Slide 19 — Fleet Metrics Deep Dive**
- Dark background
- Headline: "Data that drives decisions."
- Four metric cards in a 2x2 grid — each card shows: metric name, large value, mini bar chart, trend arrow + footer text:
  - Card 1 (green bars): Active Devices — count — trend up — "X% up from last week"
  - Card 2 (red bars): Flagged Devices — count — trend indicator — "Requires immediate review"
  - Card 3 (yellow bars): Non-Compliant — count — MDM status — "MDM policy violations detected"
  - Card 4 (blue bars): Enrolled in MDM — count — enrollment trend — "Full MDM coverage"
- Caption: "All metrics are live — backed by MDM sync data and real-time device telemetry."

---

**Slide 20 — User / Staff Management**
- Light background
- Headline: "Manage your people and their devices together."
- Left: Staff list table
  - Columns: Name | Email | Role | Department | Location | Devices | Status
  - Role badges: ORGANIZATION_ADMIN (navy) · MEMBER (slate)
  - Row actions: View Details · Assign Device · Suspend Apps
- Right: Add/Edit Staff modal card
  - Fields: First name, Last name, Email
  - Selectors: Role, Department, Location
- Feature callouts below:
  - Invite team members via email
  - Role-based permissions (Admin vs Member)
  - Bulk-select for mass actions

---

**Slide 21 — Device Assignment & Onboarding**
- Dark background
- Headline: "Enroll a device in under 2 minutes."
- Horizontal step-by-step flow (5 connected steps):
  - Step 1: Select staff member — searchable dropdown with name, email, admin badge
  - Step 2: Enter device details — Serial number, IMEI, manufacturer, model, OS type
  - Step 3: Set finance info — Purchase price, loan amount, repayment start date, country/state
  - Step 4: Scan QR code — Device enrolls into MDM zone automatically
  - Step 5: Done — Device appears in fleet dashboard immediately
- Callout: "QR enrollment uses Flentra's MDM zone system — no manual MDM configuration required."
- SPEAKER NOTE: "Enrolling a new device takes four steps. You select the staff member, enter the device's hardware details, optionally add financing info — like purchase date and loan amount — and then the staff member scans the QR code on their device. That's it. The device appears in the fleet dashboard immediately."

---

**Slide 22 — Device Details & Hardware Info**
- Light background
- Headline: "Complete visibility into every enrolled device."
- Left panel — Hardware Details card:
  - Model & manufacturer
  - IMEI number
  - MAC address (WiFi + Bluetooth)
  - OS type and version
  - Zone / business address
  - Assignment status badge: ACTIVE · ASSIGNED · RETURNED
- Right panel — Real-time telemetry card:
  - Battery level — circular SVG gauge with percentage
  - CPU utilization
  - Memory used / free
  - Internal storage used %
  - WiFi SSID + connection status
  - App memory usage
- Caption: "Powered by MDM hardware sync — data refreshed from the device on every poll."

---

**Slide 23 — Real-Time Device Location (B2B)**
- Dark background
- Headline: "Track every asset. In real time."
- Left: Current Location card — lat/lon coordinates, last seen timestamp, reverse-geocoded address
- Center-right (dominant): [SCREENSHOT: Mapbox Map — business context, device pin visible]
- Geofencing card below map: named business zones — "Warehouse Lagos", "Head Office VI"
- Caption: "Geofences apply per-device. Breach alerts are sent instantly."

---

**Slide 24 — App Control (B2B)**
- Light background
- Headline: "Control what employees can and can't use."
- Left: All Apps list
  - App icon placeholder | App name | Package name | Daily usage time | Block toggle
  - 4–5 example rows (e.g., Instagram, TikTok, WhatsApp, YouTube, Twitter)
- Right: App Detail View card
  - App icon + app name (large)
  - Block / Unblock toggle (prominent)
  - "Set Time Limit" button
  - Weekly usage bar chart (Mon–Sun, filled bars)
  - "Uninstall" button (danger/red)
- Caption: "MDM actions are dispatched in real time — no device restart required."

---

**Slide 25 — Bulk Actions**
- Dark background
- Headline: "Manage tens of devices with a single click."
- Three side-by-side action panels (cards):
  - Panel 1: Bulk Suspend Apps
    - Flow: Select devices → search installed apps → select apps → suspend
    - Android icon shown
    - Warning badge: "Irreversible until unsuspended"
    - Confirmation modal required before action
  - Panel 2: Bulk Unsuspend Apps
    - Reverse of suspend — restore device productivity
    - Confirmation modal required
  - Panel 3: Bulk Message
    - Compose a message → choose type (WELCOME / ALERT / INFO)
    - Sent to all selected device screens simultaneously
- Callout: "Built for IT teams managing 100+ devices — one action, fleet-wide impact."
- SPEAKER NOTE: "Select ten devices from the list. Now I can suspend a specific app on all ten simultaneously, or send a message to all their screens at once. This is built for real IT teams managing hundreds of devices — not for clicking one device at a time."

---

**Slide 26 — Device Reassignment**
- Light background
- Headline: "Reassign a device without losing its history."
- Center: vertical flow diagram with arrow connectors:

  Staff A leaves the organization
           ↓
  Admin opens "Reassign Device" modal
           ↓
  Searches and selects new staff member
           ↓
  Reassignment committed (keyed on currentDeviceAssignmentId)
           ↓
  Staff B is now the owner — full device history preserved

- Callout: "Keyed on the current assignment ID — historical records are never overwritten."
- Feature bullets on right:
  - Infinite-scroll staff search (type to filter)
  - Full assignment history preserved
  - Instant confirmation — no downtime
- SPEAKER NOTE: "When a staff member leaves, reassigning their device is one modal. Search for the new assignee, confirm, done. The device history is fully preserved — you can still see every action that happened on that device under the previous user."

---

**Slide 27 — Department Management**
- Dark background
- Headline: "Organize your fleet by department."
- Left: Department list
  - Each row: department name, member count badge, device count badge
  - Row actions: Edit, Delete
  - "Create Department" button at top
- Right: Filtered device view by selected department
- Caption: "Departments provide logical grouping for large enterprises — filter dashboards, reports, and device lists by team."

---

**Slide 28 — Security Architecture**
- Light background
- Headline: "Security is not an afterthought."
- Four security pillars in a 2x2 card grid — each card: icon (top) + bold heading + 2-line description:
  - httpOnly Cookies — Access and refresh tokens never touch JavaScript. XSS-proof by design.
  - Silent Token Refresh — Centralized in apiClient. One in-flight refresh shared across concurrent 401s. Failure clears session and redirects cleanly.
  - Route Protection Middleware — Every request passes through: public → auth gate → email verification → onboarding → role-based access. No bypasses possible.
  - Server-Side Payment Verification — All payment state changes happen server-side. Client assertions are never trusted.

---

**Slide 29 — API Architecture**
- Dark background
- Headline: "A layered API architecture with zero leakage."
- Three-layer waterfall diagram (top to bottom, connected by arrows):
  - Layer 1 — Server Action
    - "use server" label
    - Attaches auth cookie from httpOnly storage
    - Returns typed ActionResult: success + data OR error string
  - Layer 2 — React Query Hook
    - Wraps the action
    - Handles: caching · deduplication · background refetch · mutation state
    - useServerActionQuery / useServerActionMutation adapters
  - Layer 3 — Component
    - Consumes the hook
    - Never calls fetch or actions directly
- Callout at bottom: "createResourceHooks() — CRUD hook factory. Write one action, get 5 typed hooks with auto query-key and cache invalidation."
- Caption: "Every endpoint in Flentra follows this pattern. No exceptions."

---

**Slide 30 — Developer Experience**
- Light background
- Headline: "Built to scale with your team."
- Four DX highlight cards in a 2x2 grid:
  - TypeScript End-to-End — Typed API responses, typed ActionResult, typed React Query data. No `any` in production paths.
  - URL-First State — Shareable, refresh-safe URL state via nuqs. No lost context on page reload.
  - Feature-First Folder Structure — features/<name>/api · model · ui. Clear ownership per feature. Fast onboarding.
  - Declarative Middleware — Adding a route = one line in roleAccessMap. Audit-friendly. Rules are never buried in component logic.

---

**Slide 31 — Roadmap**
- Dark background
- Headline: "The roadmap ahead."
- Three columns:
  - Q4 2026 (near term):
    - Push notification center
    - Advanced analytics exports
    - Bulk device import via CSV
  - Q1 2027 (mid term):
    - iOS MDM support (Apple DEP)
    - White-label B2B portal
    - Multi-zone billing
  - 2027+ (long term):
    - AI-powered usage anomaly detection
    - Cross-device family plans
    - Enterprise SSO (SAML/OIDC)
- Caption: "Built on a solid foundation — every feature above slots cleanly into the existing layered architecture."

---

**Slide 32 — Closing / Q&A**
- Full-bleed dark background (#001B3B)
- Centered layout — nothing else on the slide except the elements below
- Flentra wordmark (white, large, centered top-third of slide)
- Headline (white, 40pt bold): "Real-time visibility and control."
- Sub-headline (#01DB5E, 20pt): "Simple, secure, and always on."
- Three contact blocks, spaced horizontally, centered:
  - flentra.io
  - hello@flentra.io
  - Lagos, Nigeria
- Small footer: "© 2026 Flentra. All rights reserved."
- No bullets. No icons. Clean final slide.

---

### NOTES FOR THE AI

- These are slides 17–32. Start numbering from 17.
- Use rectangular placeholder blocks labeled [SCREENSHOT: ...] where specified. Do not use stock images.
- Keep animations minimal: fade-in for section dividers, appear on-click for bullets.
- Every slide must have a slide number bottom-right in #64748B, 11pt.
- Speaker notes should be added exactly as written above (SPEAKER NOTE lines).
- Estimated presentation time for this section: 12–14 minutes.
- After slide 32, the presentation ends. Do not add additional slides.

---

*End of Part 2. Full presentation: 32 slides.*
