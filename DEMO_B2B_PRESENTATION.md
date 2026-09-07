# Flentra B2B — Google Slides Demo Presentation Prompt
## Enterprise MDM & Fleet Management | 28 Slides

> Paste everything below the dashed line into Google Slides AI.
> This is a standalone B2B-focused presentation. 28 slides total.

---

Create a professional, enterprise-grade Google Slides presentation for a live product demo of **Flentra's Business (B2B) platform** — a Mobile Device Management and fleet control solution built for telecom operators, financial lenders, device leasing companies, and enterprise IT teams.

**Audience:** Enterprise decision-makers, IT managers, CTOs, investors.
**Tone:** Confident, data-driven, authoritative. No fluff.
**Style:** Clean, flat design. Premium SaaS aesthetic.

---

### BRAND & VISUAL IDENTITY

**Brand name:** Flentra
**B2B tagline:** "Protect, monitor, and recover every financed device."

**Color palette:**
- Primary navy: #001B3B (dominant dark)
- Accent green: #01DB5E (CTAs, highlights, key numbers)
- Surface light: #F8FAFC
- Text primary: #0F172A
- Text muted: #64748B
- Border hairline: #E2E8F0
- Alert red: #EF4444
- Warning amber: #EAB308

**Typography:** Plus Jakarta Sans or DM Sans.
- Section divider headlines: 64pt Bold
- Slide headlines: 36–44pt Bold
- Subheadings: 20–24pt Medium
- Body: 14–16pt Regular
- Captions/labels: 11–12pt Regular, slight letter-spacing

**Strict design rules:**
- NO gradients. Flat fills only.
- NO drop shadows. Use 1px solid #E2E8F0 hairline borders on all cards.
- Dark slides: #001B3B bg · #FFFFFF headline · #94A3B8 body text.
- Light slides: #F8FAFC bg · #0F172A text.
- #01DB5E used ONLY for: accent callouts, CTA buttons, key stat numbers, section divider accents.
- Icons: Lucide outlined style, monochrome.
- Single focal point per slide. No crowding.
- Slide number: bottom-right, 11pt, #64748B.

---

### DESIGN SYSTEM

**Cards (flat, no shadow):**
- Light: bg #FFFFFF · border 1px solid #E2E8F0 · radius 12px · padding 24px
- Dark: bg #0A1629 · border 1px solid #132847 · radius 12px · padding 24px

**Callout boxes (left-accent style):**
- Left border: 3px solid #01DB5E
- Light bg: #F0FDF4 · text #064E3B
- Dark bg: rgba(1,219,94,0.08) · text #6EE7B7

**Stat callouts:**
- Number: 48–64pt Extra Bold · #001B3B (light) or #FFFFFF (dark)
- Label: 12pt Regular · #64748B

**Status badges (pill style):**
- Active/Success: bg #DCFCE7 · text #166534
- Warning: bg #FEF9C3 · text #854D0E
- Danger/Flagged: bg #FEE2E2 · text #991B1B
- Info/Enrolled: bg #DBEAFE · text #1E40AF
- All: 6px radius · 4px 10px padding · 11pt font

**Flow diagrams:**
- Arrow connectors: 1px solid #E2E8F0 (light) or #132847 (dark)
- Step boxes: card style above
- Step labels: 12pt medium, #64748B

---

### SLIDES 1–28

---

**Slide 1 — Title / Hero**
- Full-bleed dark (#001B3B)
- Centered layout
- Headline (white, 52pt bold): "Flentra for Business"
- Sub-headline (#01DB5E, 22pt): "Real-time MDM for the devices you finance, lease, and deploy."
- Body (white 50%, 16pt): "A live product demo."
- Bottom-right: date + presenter name
- Top-left: Flentra wordmark (white)
- No images. Minimal, commanding.

---

**Slide 2 — The Enterprise Problem**
- Dark background
- Headline (white): "Businesses lose control the moment a device leaves the office."
- Left column — pain points (white bullets, 16pt):
  - Devices go missing with no recovery path
  - No real-time visibility into compliance or app usage
  - IT teams can't enforce policies remotely after deployment
  - Reassigning devices between staff is manual and error-prone
  - Financing teams have no way to verify device status or location
- Right column — stat callouts (green number, white label):
  - $1.2B — Lost to unrecovered enterprise devices annually
  - 47% — Devices that go off-policy within 30 days of deployment
  - 3x — Longer device lifespan with active MDM enforcement
- Bottom callout: "The gap between deployment and visibility is where businesses bleed money."

---

**Slide 3 — Who Flentra Serves**
- Light background
- Headline: "Built for the industries that depend on devices."
- Four customer type cards in a 2x2 grid (icon + title + one-line description):
  - Telecom Operators — Monitor and control financed handsets across subscriber fleets
  - Lending & Finance Companies — Track device collateral in real time. Remotely lock on default.
  - Device Leasing Providers — Full visibility into every leased unit. Recover assets efficiently.
  - Enterprise IT Teams — Enforce security policies, manage apps, and reassign devices at scale.
- Callout: "One platform. Every industry that hands a device to someone else."

---

**Slide 4 — Platform Overview**
- Light background
- Headline: "The complete enterprise MDM stack."
- Six feature tiles in a 2x3 grid (icon + label):
  - Fleet Dashboard — Real-time metrics across your entire device portfolio
  - Staff Management — Roles, departments, and device ownership in one view
  - Device Enrollment — QR-based MDM enrollment in under 2 minutes
  - App Control — Block, allow, and time-limit apps remotely
  - Location & Geofencing — Live GPS tracking with configurable safe zones
  - Bulk Actions — Suspend apps, send messages fleet-wide with one action
- Caption: "All features are live. No configuration delays. Enrollments persist across the MDM zone."

---

**Slide 5 — Platform Architecture**
- Dark background
- Headline: "Enterprise-grade from the foundation up."
- Architecture waterfall (top to bottom):

  [Android & iOS Devices — field deployed]
              ↓
  [MDM Enrollment Zone — QR onboarding, policy sync]
              ↓
  [Flentra API — Next.js Server Actions + httpOnly Cookies]
              ↓
  [Business Dashboard — React · TypeScript · TanStack Query]

- Four tech callouts (icon + name + one-liner):
  - Next.js App Router — SSR performance at enterprise scale
  - httpOnly Cookies — Zero token exposure to client-side JS
  - Mapbox — Precise real-time geolocation and asset mapping
  - Paystack — Integrated billing with server-verified subscriptions
- Caption: "Every layer is designed so that security, performance, and reliability are never compromised."

---

**Slide 6 — Business Login & Onboarding**
- Light background
- Headline: "Separate, secure auth for your business account."
- Left panel — Business Login (/business/login):
  - Email + password fields
  - "Business Registration" and "Forgot Password" links shown
  - Label: "For IT admins and fleet managers."
- Right panel — Onboarding steps (vertical numbered list):
  1. Enter business details (name, address, industry)
  2. Invite team members via email
  3. Complete enrollment — device QR ready
- Callout: "Invited staff skip business onboarding — they land directly in the app, ready to go."
- Bottom note: "Tokens live in httpOnly cookies. Silent refresh. Zero re-login friction."

---

**Slide 7 — Demo Section Divider: Dashboard**
- Full dark slide
- Large centered text (white, 64pt bold): "Fleet Dashboard"
- Sub-label (#01DB5E, 20pt): "Real-time visibility into your entire device portfolio."
- Three stat previews in a row (white number, slate label):
  - 842 · Devices monitored
  - 94% · Fleet compliance rate
  - 24/7 · Live location tracking

---

**Slide 8 — B2B Dashboard Overview**
- Light background
- Headline: "Your entire device fleet, on one screen."
- Large placeholder rectangle: [SCREENSHOT: Business Dashboard]
- Bullet points on right:
  - KPI cards: Total Devices · Active · Flagged · Compliance Rate · MDM Enrolled
  - Trend arrows per metric — up/down vs. yesterday
  - Color-coded badges per compliance state
  - Mapbox device location map embedded in dashboard
- Caption: "Everything an IT manager needs to know without clicking into a single device."

---

**Slide 9 — Fleet Metrics Deep Dive**
- Dark background
- Headline: "Data that drives decisions."
- Four metric cards in a 2x2 grid — each card shows: title · large value · mini bar chart · trend text:
  - Active Devices (green bars) — e.g. 716 · ▲ 4% vs yesterday
  - Flagged Devices (red bars) — e.g. 23 · "Requires immediate review"
  - Non-Compliant (amber bars) — e.g. 31 · "MDM policy violations"
  - Enrolled in MDM (blue bars) — e.g. 798 · "Full MDM coverage"
- Caption: "All metrics are live — backed by MDM sync and real-time device telemetry."

---

**Slide 10 — Demo Section Divider: Staff Management**
- Full dark slide
- Large centered (white, 64pt bold): "Staff Management"
- Sub-label (#01DB5E, 20pt): "Your people and their devices, in one view."

---

**Slide 11 — Staff List & Roles**
- Light background
- Headline: "Manage your people and their devices together."
- Left: Staff list table
  - Columns: Name | Email | Role | Department | Location | Devices | Status
  - Role badges: ORGANIZATION_ADMIN (navy pill) · MEMBER (slate pill)
  - Row-level actions: View Details · Assign Device · Suspend Apps
  - Bulk checkbox column on left
- Right: Add/Edit Staff modal card
  - Fields: First name, Last name, Email
  - Dropdowns: Role · Department · Location
  - "Send Invite" button (#01DB5E)
- Feature bullets:
  - Invite via email — staff join with one click
  - Admin vs Member role-based permissions
  - Bulk-select for mass device actions

---

**Slide 12 — Demo Section Divider: Device Enrollment**
- Full dark slide
- Large centered (white, 64pt bold): "Device Enrollment"
- Sub-label (#01DB5E, 20pt): "From unboxing to MDM-enrolled in under 2 minutes."

---

**Slide 13 — Device Assignment & Onboarding Flow**
- Dark background
- Headline: "Enroll a device in under 2 minutes."
- Horizontal 5-step flow (connected boxes with arrows):
  - Step 1: Select Staff Member — searchable dropdown · name, email, admin badge shown
  - Step 2: Enter Device Details — Serial number, IMEI, manufacturer, model, OS type
  - Step 3: Finance Information — Purchase price, loan amount, repayment start date, country/state
  - Step 4: Scan QR Code — Staff scans on their device · MDM zone enrollment triggers
  - Step 5: Enrolled — Device appears in fleet dashboard immediately
- Callout: "QR enrollment uses Flentra's MDM zone system — no manual MDM server configuration required."

---

**Slide 14 — Device Details & Hardware Info**
- Light background
- Headline: "Complete visibility into every enrolled device."
- Left panel — Hardware Details card:
  - Model & manufacturer
  - IMEI number
  - MAC address (WiFi + Bluetooth)
  - OS type and version
  - Business zone / address
  - Assignment status badge: ACTIVE · ASSIGNED · RETURNED
- Right panel — Real-time telemetry card:
  - Battery level — circular SVG gauge with %
  - CPU utilization %
  - Memory used / free (GB)
  - Internal storage used %
  - WiFi SSID + connection status
  - App memory usage
- Caption: "MDM hardware sync — data refreshed from the device on every poll cycle."

---

**Slide 15 — Demo Section Divider: Location & Geofencing**
- Full dark slide
- Large centered (white, 64pt bold): "Location & Geofencing"
- Sub-label (#01DB5E, 20pt): "Track every asset. Enforce every boundary."

---

**Slide 16 — Real-Time Device Location**
- Dark background
- Headline: "Track every asset. In real time."
- Left panel — Current Location card:
  - Latitude / Longitude (shown as coordinates)
  - Last seen timestamp
  - Reverse-geocoded address (city/street)
- Center-right (dominant space): [SCREENSHOT: Mapbox Map — device pin visible, business context]
- Callout bottom: "Last known location persists even when the device goes offline."

---

**Slide 17 — Geofencing**
- Light background
- Headline: "Define safe zones. Get alerted when breached."
- Left: Geofencing card
  - Named zones: "Warehouse Lagos" · "Head Office VI" · "Distribution Hub"
  - Per-zone: radius in km, enter/exit alert toggle
  - "Set Geofence" button
- Right: [SCREENSHOT: Geofencing Modal — circle overlay drawn on Mapbox]
- Callout: "Replace-semantics geofencing — every update sends the full authoritative list. No drift. No ghost zones."
- Feature bullets:
  - Named zones per device
  - Configurable radius
  - Real-time breach alerts

---

**Slide 18 — Demo Section Divider: App Control**
- Full dark slide
- Large centered (white, 64pt bold): "App Control"
- Sub-label (#01DB5E, 20pt): "Control what employees can and can't use."

---

**Slide 19 — App List & Detail View**
- Light background
- Headline: "Manage every app on every device — remotely."
- Left: All Apps list
  - Each row: app icon placeholder · app name · package name · daily usage time · block toggle
  - Example rows: Instagram · TikTok · WhatsApp · YouTube · Twitter
  - Search bar at top for filtering
- Right: App Detail View card
  - App icon + app name (large heading)
  - Block / Unblock toggle (prominent, full-width)
  - "Set Time Limit" button — opens hour + minute selectors
  - Weekly usage bar chart (Mon–Sun, filled bars, accent color)
  - "Uninstall" button (danger red, outlined)
- Caption: "MDM actions dispatch in real time — no device restart, no user action required."

---

**Slide 20 — Demo Section Divider: Bulk Actions**
- Full dark slide
- Large centered (white, 64pt bold): "Bulk Actions"
- Sub-label (#01DB5E, 20pt): "One action. Fleet-wide impact."

---

**Slide 21 — Bulk Suspend / Unsuspend Apps**
- Dark background
- Headline: "Suspend or restore apps across multiple devices simultaneously."
- Two side-by-side panels:
  - Panel 1 — Bulk Suspend Apps:
    - Step flow: Select devices → search installed apps → tick apps → confirm → suspend
    - Android logo shown top of panel
    - Warning callout: "Apps become inaccessible on all selected devices immediately."
    - Red confirm button: "Suspend Selected Apps"
  - Panel 2 — Bulk Unsuspend Apps:
    - Reverse flow — select devices → select apps to restore → confirm → unsuspend
    - Navy confirm button: "Unsuspend Selected Apps"
- Bottom callout: "Confirmation modal required before any bulk action — no accidental fleet-wide changes."
- SPEAKER NOTE: "Select ten devices from the list. Now I can suspend a specific app on all ten simultaneously. This is built for real IT teams managing hundreds of devices — not for clicking one device at a time."

---

**Slide 22 — Bulk Messaging**
- Light background
- Headline: "Send a message to every device screen at once."
- Center: Bulk Message modal mockup (card, full-width):
  - Header: "Send Bulk Message" + device count badge (e.g. "14 devices selected")
  - Message type dropdown: WELCOME · ALERT · INFO · POLICY REMINDER
  - Message textarea: "Enter message text..."
  - Character count indicator
  - "Send to All Devices" button (#01DB5E, full-width)
- Left callout column:
  - Select any number of devices from the fleet list
  - Message appears on device screen immediately
  - Message types allow categorized fleet communications
  - Ideal for policy rollouts, compliance alerts, welcome messages
- Caption: "One compose action — dispatched to all selected device screens in parallel."

---

**Slide 23 — Demo Section Divider: Device Reassignment**
- Full dark slide
- Large centered (white, 64pt bold): "Device Reassignment"
- Sub-label (#01DB5E, 20pt): "Move a device between staff without losing a single record."

---

**Slide 24 — Reassignment Flow**
- Light background
- Headline: "Reassign a device without losing its history."
- Center: vertical flow diagram (5 steps, arrow connectors, card boxes):

  [ Staff A departs the organization ]
                 ↓
  [ Admin opens "Reassign Device" modal ]
                 ↓
  [ Search and select new staff member (infinite scroll) ]
                 ↓
  [ Reassignment committed — keyed on currentDeviceAssignmentId ]
                 ↓
  [ Staff B is the new owner — full history preserved ]

- Right callout (green border):
  "Keyed on currentDeviceAssignmentId — not the legacy deviceAssignmentId field. Historical assignment records are never overwritten."
- Feature bullets on left:
  - Infinite-scroll staff search (type to filter by name or email)
  - Full assignment audit trail preserved
  - Instant confirmation — device stays active, no downtime
- SPEAKER NOTE: "When a staff member leaves, reassigning their device is one modal. Search for the new assignee, confirm, done. The device history is fully preserved — you can still see every action that happened on that device under the previous user."

---

**Slide 25 — Demo Section Divider: Departments**
- Full dark slide
- Large centered (white, 64pt bold): "Department Management"
- Sub-label (#01DB5E, 20pt): "Logical grouping for complex org structures."

---

**Slide 26 — Departments & Fleet Filtering**
- Light background
- Headline: "Organize your fleet by department."
- Left: Department list
  - Each row: department name · member count badge · device count badge · Edit/Delete actions
  - "Create Department" button at top right
  - Example rows: Engineering · Sales · Field Ops · Management
- Right: Filtered device view (device table filtered by selected department)
  - Table columns: Device | Assigned To | Status | Last Seen | MDM Status
- Caption: "Departments filter dashboards, staff lists, and device tables — scope your view to exactly what you manage."

---

**Slide 27 — Security & Compliance**
- Dark background
- Headline: "Security is not an afterthought."
- Four security pillars in a 2x2 card grid (icon top · heading bold · 2-line description):
  - httpOnly Cookies — Access and refresh tokens never touch JavaScript. XSS-proof by design. Tokens are server-side only.
  - Silent Token Refresh — Centralized in apiClient. One in-flight refresh shared across concurrent 401s. On failure: session cleared, redirect to login.
  - Route Protection Middleware — Every request: public check → auth gate → email verification → onboarding → role-based access control. No bypasses.
  - Server-Side Payment Verification — All subscription state changes are server-verified via Paystack. Client claims are never trusted.
- Bottom callout: "Every security layer was intentional. Nothing relies on client-side trust."

---

**Slide 28 — Closing / Q&A**
- Full-bleed dark (#001B3B)
- Centered layout — sparse, no bullets
- Flentra wordmark (white, large, centered top-third)
- Headline (white, 40pt bold): "Real-time visibility and control."
- Sub-headline (#01DB5E, 20pt medium): "Simple, secure, and always on."
- Three contact blocks, horizontally centered:
  - flentra.io
  - hello@flentra.io
  - Lagos, Nigeria
- Footer: "© 2026 Flentra. All rights reserved."
- Tagline small (slate): "Protecting every device. Empowering every business."

---

### NOTES FOR THE AI

1. This is a standalone B2B-only presentation. 28 slides total. Do not add extra slides.
2. Start slide numbering at 1.
3. Use rectangular placeholder blocks labeled [SCREENSHOT: ...] where specified. No stock photos.
4. Animations: fade-in on section dividers. Bullets appear on click (one at a time). No spinning, flying, or bouncing.
5. Every slide: slide number bottom-right, 11pt, #64748B.
6. Add speaker notes exactly as written (SPEAKER NOTE lines) on slides 21 and 24.
7. Section divider slides (7, 10, 12, 15, 18, 20, 23, 25) should be full dark (#001B3B) with large centered text — no other elements.
8. Estimated total presentation time: 18–22 minutes.

---

*End of prompt. 28 slides — B2B focus only.*
