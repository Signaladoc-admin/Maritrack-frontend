# Flentra Frontend — Handover Document

**Author:** Obafemi Olorede — Frontend Engineer
**Scope:** The portions of the Flentra web frontend that I owned. A second frontend engineer
worked alongside me; the only major area outside my ownership is the **Device Details page**
(implemented by my colleague), which I call out explicitly where relevant.

---

## 1. About the Project

**Flentra** is a device visibility and control platform — _"Real-time visibility and control for
parents and businesses. Simple, secure, and always on."_ It serves two distinct audiences from a
single codebase:

- **PARENT accounts** — parental controls: pairing a child's device, screen-time rules, app
  management, web/domain restrictions, geofencing, and location tracking.
- **BUSINESS accounts** — a Mobile Device Management (MDM) solution: enrolling company devices,
  enforcing security/compliance policies, tracking assets, managing staff, and reassigning devices.

Throughout the rest of this document I refer to these two audiences as **B2C** (the PARENT
experience) and **B2B** (the BUSINESS experience). The terms map exactly:

| Document term | Code value (`appRole`) | Audience              |
| ------------- | ---------------------- | --------------------- |
| **B2C**       | `PARENT`               | Families / parents    |
| **B2B**       | `BUSINESS`             | Companies / IT admins |

**Stack:** Next.js (App Router) · React · TypeScript · TanStack React Query · Next.js Server
Actions · Tailwind CSS · `nuqs` (URL query state) · Paystack (payments) · Mapbox (geocoding).

---

## 2. Areas I Owned

1. The **API layer** — React Query + Server Actions, plus the reusable utilities that standardize it
2. **User-role splitting** (B2B vs B2C) across routing, auth, and conditional rendering
3. **Authentication** — all logic, pages, components, and the route-protection middleware
4. **Onboarding** — both flows, plus the "skip onboarding" path for invited staff
5. **Payments** — Paystack integration end to end
6. **Device onboarding** integration
7. **Device reassignment** integration
8. **The entire B2B (BUSINESS) surface** — pages and components, except the Device Details page

Each is detailed below: _what_ it is, _where_ it lives, and _why_ it was built the way it was.

---

## 3. The API Layer (React Query + Server Actions)

This is the foundation everything else sits on, so understand it first.

### 3.1 The pattern

Every network call follows the same three-layer shape:

```
Server Action (features/<feature>/api/*.actions.ts)
        │  "use server" — runs on the server, attaches auth cookie, returns a typed ActionResult
        ▼
React Query hook (features/<feature>/model/use*.ts)
        │  wraps the action with useQuery / useMutation via the shared adapters
        ▼
Component (features/<feature>/ui/*.tsx, views/*.tsx)
        │  consumes the hook; never calls fetch or an action directly
```

**Why this shape:** Server Actions let us keep the access token in an **httpOnly cookie** (never
exposed to JS), centralize token refresh, and keep secrets server-side — while React Query gives us
caching, deduping, background refetch, and mutation state on the client. The two are bridged by a
tiny set of reusable utilities so that no feature has to re-implement the plumbing.

### 3.2 The reusable utilities (the important part)

These are the pieces a new developer should learn before adding any feature:

- **`shared/lib/api-client.ts` → `apiClient<T>()`**
  The single fetch wrapper. It resolves the base URL, attaches the `Bearer` token from the
  httpOnly `accessToken` cookie, sets JSON headers (skipped automatically for `FormData`), and
  **transparently handles 401s**: it calls the refresh-token flow once (guarded by a shared
  `refreshPromise` so concurrent calls don't stampede), retries the request, and on failure clears
  the auth cookies and redirects to `/login`. It also normalizes backend error messages (including
  array-style validation errors) into a single thrown `Error`. Options worth knowing: `noRedirect`
  (don't auto-redirect on 401), `skipAuth` (don't attach the token), and `params` (query-string
  builder).

- **`shared/lib/safe-action.ts` → `withSafeAction(fn, defaultError)`**
  Wraps a server action body in try/catch and returns a discriminated union:
  `{ success: true, data } | { success: false, error }`. This means **server actions never throw to
  the client** — they always return a predictable `ActionResult`. Wrap every action in this.

- **`shared/api/server-action-hooks.ts` → `useServerActionQuery` / `useServerActionMutation`**
  The adapters that turn an `ActionResult`-returning action into a normal React Query hook. They
  unwrap `success`/`error`: on `success: false` they `throw new Error(result.error)` so React
  Query's `isError`/`error` works exactly as expected, and on success they hand back `result.data`.

- **`shared/api/createResourceHooks.ts` → `createResourceHooks(name, actions)`**
  A factory for standard CRUD entities. Give it the five actions (`getAll`, `getById`, `create`,
  `update`, `delete`) and it returns a consistent set of hooks (`useGetAll`, `useGetById`,
  `useCreate`, `useUpdate`, `useDelete`) **with query keys and cache invalidation wired in**
  automatically. This is why the `entities/*` folders (business, children, device, etc.) are so
  thin — most CRUD is generated, not hand-written. Reach for this before writing bespoke hooks.

**Rule of thumb for the next developer:** a new endpoint = one action wrapped in `withSafeAction`
calling `apiClient`, plus either a `createResourceHooks` entry (CRUD) or a hand-written hook using
the `useServerAction*` adapters (non-CRUD). Don't bypass these.

> Reference docs already in the repo: `api-architecture.md`, `authentication.md`, `MIDDLEWARE.md`,
> `ORDER_FLOW.md`. They predate parts of the current code in places — treat this handover as the
> current source of truth and those as background.

---

## 4. User-Role Splitting (B2B vs B2C)

A single value drives the entire split: **`appRole`**, which is `"BUSINESS"` (B2B) or `"PARENT"`
(B2C). It is **derived, not stored** — a user is B2B if their JWT carries a `businessId` /
`businessRole`, otherwise B2C. This derivation appears in two places that must stay in agreement:

- **Server / middleware:** `middleware.ts` decodes the token and sets
  `appRole = businessRole ? "BUSINESS" : "PARENT"`.
- **Client:** `shared/auth/AuthProvider.tsx` exposes the resolved user (including `appRole`) via the
  `useAuth()` hook; `AuthUserProfile` (`entities/user/model/types.ts`) carries `appRole`,
  `businessId`, `parentId`, etc.

**Why derived rather than a stored role:** the backend issues one token type and embeds the
business linkage in it. Deriving `appRole` keeps a single source of truth (the token) and avoids a
second field that could drift out of sync.

### How the split is applied

- **Routing/access** — `middleware.ts` holds a `roleAccessMap` listing the routes each role may
  visit, and redirects mismatches to `/unauthorized` (see §6).
- **Conditional rendering** — shared shells (dashboard, profile, device, plans, general settings)
  branch on `user.appRole` to render the B2B or B2C variant. Search the codebase for `appRole`
  (~26 usages) to find every branch point. Key examples: `views/Dashboard.tsx`,
  `views/Profile.tsx`, `views/Device.tsx`, `views/General.tsx`,
  `app/(in-app)/dashboard/page.tsx`, `app/(in-app)/plans/page.tsx`,
  `features/payments/ui/PricingStep.tsx`, `features/auth/ui/HaveAnAccount.tsx`.

**For the next developer:** when a page must look different per audience, follow the existing
pattern — render a shared shell and branch on `user.appRole` — rather than forking routes. The B2B
branches are mine; the **Device Details page is my colleague's**, so coordinate there.

---

## 5. Authentication

**Where:** `features/auth`, `features/auth-login`, `features/auth-register` (logic, pages,
components), `shared/auth/AuthProvider.tsx` (client session/context), and `shared/lib/api-client.ts`

- `shared/lib/api/refresh-token.ts` (token lifecycle).

### How it works

- **Separate auth surfaces per audience.** B2C uses `/login`, `/register`, `/confirm-email`,
  `/forgot-password`; B2B uses the `/business/*` equivalents. Both funnel into the same token
  handling.
- **Tokens live in httpOnly cookies.** On a successful login/refresh, `apiClient` persists
  `accessToken` and `refreshToken` to httpOnly cookies (server-side) so server actions can
  authenticate without ever exposing tokens to JS. The access token is also returned to the client
  to seed in-memory state, kept in sync from the same source value.
- **`AuthProvider` / `useAuth()`** is the client entry point: it restores/validates the session on
  mount (gating the initial render so the wrong-role view never flashes), resolves the user profile,
  and exposes `user`, `login`, `logout`, and submission/error state.
- **Silent refresh** is centralized in `apiClient` (see §3.2): one in-flight refresh shared across
  concurrent 401s; failure clears cookies and redirects to `/login`.

**Why:** httpOnly cookies + server-side refresh is the safest place to keep tokens in a Next.js
app, and centralizing it in `apiClient` means **no feature has to think about auth or refresh** —
they just call actions.

---

## 6. Route Protection Middleware

**Where:** `middleware.ts` (cited in full context above).

It runs on every non-asset request and enforces, in order:

1. **Public routes** (landing, auth pages, etc.) pass straight through.
2. **Guests-only auth routes** — a logged-in, verified user hitting `/login` etc. is redirected
   away (back to their referrer when safe, else `/dashboard`). Unverified users are treated as
   guests so they can reach `/confirm-email`.
3. **Auth gate** — no token on a protected route → redirect to `/login?callbackUrl=…`.
4. **Email-verification gate** — unverified users are pinned to the correct `confirm-email` page
   for their role.
5. **Onboarding routing** — un-onboarded users are routed to `/onboarding/business` or
   `/onboarding/personal` for their role; onboarded users are kept out of `/onboarding/*`. **Invited
   business staff are deliberately exempted** (see §7).
6. **Business-only guard** — `businessOnlyRoutes` (e.g. `/onboarding/business`) require a
   `businessRole`.
7. **Role-based access** — `canAccess(appRole, pathname)` checks the `roleAccessMap`; a route
   belonging to the _other_ role → `/unauthorized`; unknown routes fall through to Next's 404.

**Why this design:** all redirect/guard logic is in one file driven by simple declarative maps
(`roleAccessMap`, `publicRoutes`, `authRoutes`, `businessOnlyRoutes`), so adding a route is a
one-line edit and the rules stay auditable. The ordering matters — verification before onboarding
before role checks — don't reorder casually.

---

## 7. Onboarding (and the Invited-Staff Skip)

**Where:** `features/onboarding/business/*` (B2B) and `features/onboarding/personal/*` (B2C);
actions in `features/onboarding/api/onboarding.actions.ts`.

- **B2B onboarding** (`OnboardingPage.tsx`) collects business details and invites team members
  (`BusinessDetailsForm`, `InviteTeamMembersForm`, `AddTeamMemberForm`).
- **B2C onboarding** is the multi-step parental setup: basic info, child profiles, device pairing
  via QR (`PairingQRStep`), and the device-control setup screens under
  `personal/ui/devices-control-setup/` (screen-time rules, app management, monitoring permissions,
  child transparency, alerts, confirmations).

### The invited-staff skip (important nuance)

The org admin completes business onboarding, but **invited staff members must not** — they belong to
an already-onboarded org. The token carries an `isInvited` flag, and `middleware.ts` short-circuits
the onboarding redirect for `appRole === "BUSINESS" && isInvited`, dropping them straight into the
app. **Why:** forcing an invited employee through business setup would be wrong (and would let them
re-onboard an existing org). If you touch onboarding routing, preserve this branch.

---

## 8. Payments (Paystack)

**Where:** `features/payments/` — actions in `api/payment.actions.ts`, hooks in
`model/usePayments.ts`, UI in `ui/` (`PlanCard`, `PricingStep`, `VerifyPayment`,
`BillingHistoryTable`), plus `views/Plans.tsx` / `views/PlanSubscription.tsx`.

### Flow

1. **List plans** — `getPaymentPlansAction` → `usePaymentPlans`.
2. **Initialize** — `initializePaymentAction` (`/payments/paystack/initialize`) returns the Paystack
   authorization URL; the user is taken to Paystack to pay.
3. **Verify** — on return, `verifyPaymentAction` (`/payments/paystack/verify`) confirms the
   transaction by reference (`VerifyPayment.tsx`).
4. **Subscriptions & history** — `getActiveSubscriptionAction`, `getAllSubscriptionsAction`,
   `getPaymentHistoryAction` (all keyed by **`zoneId`**), surfaced via `useActiveSubscription`,
   `useAllSubscriptions`, `usePaymentHistory`, and rendered in `BillingHistoryTable`.
5. **Export** — `exportSubscriptionsAction` / `useExportSubscriptions`.

**Why initialize/verify split:** Paystack is redirect-based — you initialize server-side to get the
authorization URL, the customer pays on Paystack, then you verify by reference on return. Never
trust the client's word that a payment succeeded; the **verify** step is the source of truth.
Subscriptions/history are scoped by `zoneId` because billing is per zone, not per user.

---

## 9. Device Onboarding Integration

**Where:** `features/mdm-sync/` — `api/mdm-sync.actions.ts`, `model/useMdmSync.ts`,
`model/useQrCode.ts`.

This integrates the MDM/enrollment backend ("mdm-sync"). Core pieces:

- **Zones** — create/fetch parent and business zones (`createZoneAction`, `getParentZone(s)Action`,
  `createBusinessZoneAction`, `getBusinessZone(s)Action`, `getZoneAction`). A **zone** is the
  enrollment container a device joins.
- **Enrollment QR** — `getQrCodeAction(zoneId, onboardingCode)` / `useQrCode`. The device scans the
  QR to enroll into the zone (used by both B2C device pairing and B2B device enrollment).
- **Per-device controls** that ride on top of enrollment: app limits (`getAppLimitsAction` /
  `setAppLimitAction`), block/unblock app (`blockAppAction` / `unblockAppAction`), block/unblock
  domain, and **restrictions** (domains + geofences) via `getRestrictionsAction` /
  `setRestrictionsAction`.

**Why a dedicated `mdm-sync` feature:** device enrollment and policy enforcement talk to a distinct
backend surface with its own concepts (zones, onboarding codes, MDM actions). Keeping it in one
feature isolates that integration from the rest of the app.

### Restrictions — an invariant worth knowing

`setRestrictionsAction` (PUT `/mdm-sync/{deviceId}/restrictions`) uses **replace semantics, patched
per field**: the caller sends the **full final list** for whichever field it's updating (`domains`
_or_ `geofences`), `organizationName` is **always** included, and **only the provided field is
sent** so the other is left untouched. Deletes work by sending a shorter list — so **never re-merge
the new list with the server's current values**, as that silently undoes deletions.
`organizationName` resolves to the **business name** for B2B (from `useGetBusiness` via the auth
user's `businessId`) or the **child's name** for B2C (from `useChild` via the `childId` URL query
param) — see `features/location/ui/LocationView.tsx`.

---

## 10. Device Reassignment Integration

**Where:** `features/business-users/users/ui/ReassignDeviceModal.tsx`,
`features/business-users/users/model/useReassignDevice.ts`,
`features/business-users/users/ui/AssociatedDevicesTable.tsx`,
`entities/device/model/useDeviceAssignments.ts`, plus `views/DevicesList.tsx` / `views/Device.tsx`.

This is a **B2B** capability: moving a device from one staff member to another. The flow surfaces a
device's assignment, lets an admin pick a new assignee, and commits the reassignment.

**Key implementation note:** reassignment keys off **`currentDeviceAssignmentId`** (the active
assignment), not the older `deviceAssignmentId` field — **build on that field, not the legacy
one.**

**Why:** a device accumulates a history of assignments; operating on the _current_ assignment id
avoids acting on a stale/closed assignment record.

---

## 11. The B2B (BUSINESS) Surface

Apart from the **Device Details page (my colleague's)**, the BUSINESS-facing pages and components
are mine. Principal areas:

- **Business dashboard** — `features/business-dashboard/`, `views/Dashboard.tsx` (B2B branch),
  `app/(in-app)/dashboard/page.tsx`.
- **Users / staff management** — `features/business-users/`, `views/Users.tsx` (directory, invites,
  roles, associated devices, **reassignment** from §10).
- **Business devices** — `views/BusinessDevices.tsx`, `views/DevicesList.tsx`,
  `features/device/` (list, columns, asset views).
- **Departments** — `features/department-management/`, `entities/department/`.
- **Business onboarding** — §7.
- **Plans/billing (B2B branch)** — §8.
- **Business entity/data** — `entities/business/` (`useBusiness.ts` etc.).

**How to tell what's a B2B branch:** search for `user.appRole === "BUSINESS"` (or the `appRole`
branch points listed in §4). Those conditionals gate the components I built. Again — the **Device
Details page is the exception** and is owned by my colleague.

---

## 12. Conventions & Gotchas for the Next Developer

- **Always go through the layers** (§3): `apiClient` → `withSafeAction` → `useServerAction*` /
  `createResourceHooks` → component. Don't call `fetch` or actions directly from components.
- **`appRole` is derived from the token** (§4) — keep the middleware and `AuthProvider`
  derivations consistent if you change it.
- **Middleware ordering is intentional** (§6): verify → onboard → role. Preserve the
  invited-staff onboarding skip (§7).
- **Restrictions use replace semantics** (§9) — send the full per-field list + `organizationName`;
  never re-merge with server values.
- **Reassignment uses `currentDeviceAssignmentId`** (§10), not `deviceAssignmentId`.
- **Payments must be server-verified** (§8) — the verify step is authoritative.
- **URL state via `nuqs`** — e.g. `childId` is read from the query string with `useQueryState`
  (`features/location/ui/LocationView.tsx`); follow that pattern for shareable/refresh-safe state.
- **`apiClient` logs every request/response** to the server console (URL, method, headers, body).
  Useful for debugging; consider gating these logs before/for production.
- **Repo has historical scratch files** (`ts_errors*.log`, `tsc_output*.txt`, `build*.log`,
  `*-response.json`, `test-*.ts/js`) — these are debugging leftovers, not part of the app.

---

## 13. Quick File Map

| Concern                        | Start here                                                                                               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Fetch wrapper / auth / refresh | `shared/lib/api-client.ts`, `shared/lib/api/refresh-token.ts`                                            |
| Action error wrapper           | `shared/lib/safe-action.ts`                                                                              |
| React Query ↔ action adapters  | `shared/api/server-action-hooks.ts`                                                                      |
| CRUD hook factory              | `shared/api/createResourceHooks.ts`                                                                      |
| Client session / `useAuth()`   | `shared/auth/AuthProvider.tsx`                                                                           |
| Route protection               | `middleware.ts`                                                                                          |
| Auth pages/logic               | `features/auth`, `features/auth-login`, `features/auth-register`                                         |
| Onboarding                     | `features/onboarding/*`                                                                                  |
| Payments                       | `features/payments/*`, `views/Plans.tsx`, `views/PlanSubscription.tsx`                                   |
| Device enrollment / MDM        | `features/mdm-sync/*`                                                                                    |
| Device reassignment            | `features/business-users/users/*`, `entities/device/model/useDeviceAssignments.ts`                       |
| Business pages                 | `features/business-dashboard`, `features/business-users`, `views/Users.tsx`, `views/BusinessDevices.tsx` |
| Role-conditional rendering     | search `appRole`                                                                                         |

---

_Handover prepared by Obafemi Olorede. For anything ambiguous, the code paths cited above are the
authoritative reference. The only major area outside my ownership are the **B2C layer** together with the **Device Details page**._
