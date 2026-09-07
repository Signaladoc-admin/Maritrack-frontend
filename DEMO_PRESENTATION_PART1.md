# Flentra — Demo Presentation Prompt (Part 1 of 2)
## Slides 1–16 | Opening + Product Overview + B2C Demo

> Paste everything below the dashed line into Google Slides AI.
> After generating, continue with DEMO_PRESENTATION_PART2.md for slides 17–32.

---

Create a professional, enterprise-grade Google Slides presentation for a live product demo of **Flentra** — a real-time device visibility and control platform. This is Part 1 of 2 and covers slides 1 through 16. The full presentation is 32 slides.

The audience: potential investors, enterprise clients, and technical stakeholders. Style: polished, clean, demo-first.

---

### BRAND & VISUAL IDENTITY

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
- Slide number bottom-right, 11pt, #64748B.

---

### DESIGN SYSTEM

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

### SLIDES 1–16

---

**Slide 1 — Title / Hero**
- Full-bleed dark background (#001B3B)
- Centered layout
- Headline (white, 52pt bold): "Flentra"
- Sub-headline (green #01DB5E, 22pt): "Real-time Visibility & Control — for Families and Businesses."
- Body (white 50%, 16pt): "A live product demo."
- Bottom-right: date + presenter name
- Top-left: Flentra wordmark (white)
- No images. Clean, commanding, minimal.

---

**Slide 2 — The Problem (B2C)**
- Light background
- Headline: "Parents are flying blind."
- Three columns — large stat number + short description:
  - 7h 22m — Average daily screen time for children aged 8–12
  - 62% — Teens who have encountered harmful content online
  - 1 in 3 — Parents who don't know what apps their child uses
- Subtext (italic): "Existing tools are either too intrusive or too limited. There's no middle ground."
- Thin accent bar at bottom in #01DB5E

---

**Slide 3 — The Problem (B2B)**
- Dark background (#001B3B)
- Headline (white): "Businesses lose control the moment a device leaves the office."
- Left column — pain points (white bullets):
  - Devices go missing with no recovery path
  - No visibility into compliance or app usage
  - IT teams can't enforce policies remotely
  - Reassigning devices is manual and error-prone
- Right column — stat callouts (green number, white label):
  - $1.2B lost to unrecovered enterprise devices annually
  - 3x longer device life with active MDM enforcement
- Subtext: "There's no single platform that gives IT teams real-time control over their entire fleet."

---

**Slide 4 — Our Solution**
- Split layout: dark left panel, light right panel
- Left panel (dark):
  - Headline: "One platform. Two powerful audiences."
  - Body: "Flentra is a device visibility and MDM platform serving two distinct audiences from a single, unified codebase."
- Right panel (light): Two side-by-side cards
  - Card 1 (navy border): Families (B2C) — Parental controls, screen time, app management, geofencing, location tracking.
  - Card 2 (green border): Businesses (B2B) — MDM enrollment, fleet management, compliance, device reassignment, staff control.

---

**Slide 5 — Platform Architecture**
- Light background
- Headline: "Built for scale from day one."
- Center: text-based architecture diagram:

  [Mobile Devices — Android / iOS]
              ↓
  [MDM / Enrollment Layer]
              ↓
  [Flentra API — Next.js Server Actions + httpOnly Cookies]
              ↓
  [React Dashboard  |  Real-time Location  |  App Controls]

- Four tech pillars below (icon + label):
  - Next.js App Router — Server-side performance
  - httpOnly Cookies — Zero token exposure to JS
  - Mapbox — Real-time geolocation
  - Paystack — Integrated billing

---

**Slide 6 — Two Dashboards, One Codebase**
- Split screen: left and right panels separated by a thin divider
- Left panel: "Parent Dashboard" — Metric cards for screen time, web history, alerts. Child selector. Device map. App usage chart.
- Right panel: "Business Dashboard" — Fleet health metrics, device map, staff list, compliance indicators.
- Center divider label: "Shared codebase — role-based rendering"
- Headline above: "One login. Your dashboard adapts to who you are."

---

**Slide 7 — Dual Authentication**
- Light background
- Headline: "Separate, secure auth surfaces for each audience."
- Left column: Personal Login (/login) — For parents managing family devices.
  - Fields: Email + Password
  - Features: Forgot password, confirm email
- Right column: Business Login (/business/login) — For IT admins and fleet managers.
  - Fields: Email + Password
  - Features: Business registration, invite flow, org email verification
- Callout box (green left border): "Tokens live in httpOnly cookies — never exposed to JavaScript. Silent refresh with zero re-login friction."
- Top corner: theme toggle icon labeled "Light & dark mode available."

---

**Slide 8 — Onboarding Flow**
- Dark background
- Headline: "Zero-friction setup, guided step by step."
- Left column: B2C Onboarding — 5 steps
  1. Account setup
  2. Add child profile
  3. Pair device via QR code
  4. Configure screen-time rules
  5. Set up app permissions and alerts
- Right column: B2B Onboarding — 3 steps
  1. Business details
  2. Invite team members
  3. Device enrollment via QR
- Callout: "Invited staff skip business onboarding — they land directly in the app."
- Show step indicator progress bars for each flow.

---

**Slide 9 — Demo Section Divider: B2C**
- Full dark slide (#001B3B)
- Large centered text (white, 64pt bold): "B2C Demo"
- Subheading (#01DB5E, 22pt): "The Parent Experience"
- Tagline (white/60%, 16pt): "Keeping children safe in the digital world."
- Three labels in a row below: Screen Time · Web Control · Location

---

**Slide 10 — B2C Dashboard Overview**
- Light background
- Headline: "Everything a parent needs, at a glance."
- Large placeholder rectangle labeled: [SCREENSHOT: Parent Dashboard]
- Bullet points on right:
  - Real-time metrics updated continuously
  - Switch between children with one click
  - Color-coded alerts and trends
  - Light/dark mode support
- Key metrics row: Total Screen Time | Active Apps | Alerts Today | Compliance Score
- SPEAKER NOTE: "When a parent logs in, they immediately see the key metrics for their child's device — screen time, active apps, and any alerts. If they have multiple children, they can switch with a single dropdown. The dashboard updates in real time."

---

**Slide 11 — Screen Time & App Control**
- Split layout
- Left: text description
  - Headline: "Set limits. Enforce them automatically."
  - Body: "Parents can view per-app usage, set daily time limits, block apps entirely, and see usage history across the week — all from the dashboard."
  - Feature list:
    - Per-app daily time limits (hours + minutes)
    - Block / unblock specific apps instantly
    - Weekly usage bar chart per app
    - Uninstall apps remotely
- Right: placeholder [SCREENSHOT: App Detail View] — shows app name, block toggle, "Set Time Limit" button, weekly bar chart Mon–Sun
- SPEAKER NOTE: "Click on any app and you get the full detail view. You can block it right here, set a daily time limit — say, one hour — and you'll see a bar chart of usage across the week. If needed, you can uninstall it remotely. All of this without touching the device."

---

**Slide 12 — Web History & Domain Control**
- Light background
- Headline: "See what they're browsing. Control it too."
- Left: Visited websites table
  - Columns: Domain | Category | Time Spent | Last Visited
  - Example rows: youtube.com, instagram.com, reddit.com, tiktok.com
- Right: Domain restriction panel
  - Block entire domains
  - Whitelist trusted sites
  - Set daily limits per domain
- Callout: "Domain restrictions use replace-semantics — no stale or duplicate blocks."

---

**Slide 13 — Location Tracking**
- Dark background
- Headline: "Always know where they are."
- Left: Current Location Card — latitude/longitude, last seen timestamp, city/region label
- Center-right (dominant space): placeholder [SCREENSHOT: Mapbox Map with device pin]
- Bottom strip: Location History row — Lekki Phase 1 · 2h 33min · Jan 1 2026
- SPEAKER NOTE: "The location tab shows the device's last known GPS coordinates, reverse-geocoded to a human-readable address. The map is interactive — you can zoom, pan, and see movement history."

---

**Slide 14 — Geofencing**
- Light background
- Headline: "Define safe zones. Get alerted when breached."
- Left: Geofencing card
  - Named zones: School, Home, Grandma's
  - Radius slider in km
  - Enter/exit alert toggles
- Right: placeholder [SCREENSHOT: Geofencing Modal — circle overlay on map]
- Callout: "Replace-semantics — every update sends the full authoritative list. No drift. No stale zones."
- Feature bullets:
  - Named zones with custom radius
  - Real-time entry/exit notifications
  - Multi-zone support per child
- SPEAKER NOTE: "You can define safe zones — home, school, a relative's house. Draw the zone on the map, name it, set the radius. If the device leaves that zone, you get an alert. This is the kind of real-time safety feature that no basic screen-time app offers."

---

**Slide 15 — Alerts & Notifications**
- Light background
- Headline: "Smart alerts when it matters most."
- Two variants side by side (as cards):
  - Card 1 (green left border): All-clear — "All children are within limits. No alerts triggered today."
  - Card 2 (red left border): Warning — Active alerts list: "Screen time exceeded · 45 min overrun"
- Callout: "Alerts are surfaced in the dashboard and sent as push notifications."

---

**Slide 16 — Subscription & Billing (B2C)**
- Light background
- Headline: "Simple, transparent pricing. Powered by Paystack."
- Two pricing cards:
  - Monthly Plan — device limit — price in NGN per month
  - Annual Plan — discounted — savings badge (e.g. "Save 20%")
- Numbered flow steps:
  1. Select plan
  2. Redirected to Paystack checkout
  3. Payment verified server-side
  4. Subscription activated immediately
- Callout: "Payments are always server-verified — client trust is never assumed."
- Billing History table preview: Invoice No. · Date · Amount · Status badge

---

### NOTES FOR THE AI

- Slides 1–16 only. Do NOT create slide 17 or beyond — those are in Part 2.
- Use rectangular placeholder blocks labeled [SCREENSHOT: ...] where specified. Do not use stock images.
- Keep animations minimal: fade-in for section dividers, appear on-click for bullets.
- Every slide must have a slide number bottom-right in #64748B, 11pt.
- Speaker notes should be added exactly as written above (SPEAKER NOTE lines).
- Estimated presentation time for this section: 10–12 minutes.

---

*End of Part 1. Continue with DEMO_PRESENTATION_PART2.md for slides 17–32.*
