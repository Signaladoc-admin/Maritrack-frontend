# Project Blueprint: OrderFlow (Enterprise-Lite)

## 1. Vision & Core Value Proposition

OrderFlow is a high-performance, internal fulfillment engine designed to eliminate "delivery amnesia" in small-to-medium businesses. It bridges the gap between payment and delivery by enforcing a rigorous, audit-logged production pipeline and real-time financial transparency.

## 2. Design System & UI Specifications (High-Contrast Flat)

The interface follows a strictly flat, modern aesthetic to ensure maximum focus on data and workflow.

- **Aesthetics:** 100% Flat Design. No shadows (`shadow-none`), no gradients.
- **Color Palette:** - Primary Background: Pure White (`#FFFFFF`).
  - Secondary/Surface: Light Slate (`#F8FAFC`).
  - Borders: Solid 1px Slate-200 (`#E2E8F0`).
  - Text: Slate-900 for high readability.
- **Typography (Inter/Geist):**
  - **H1 (Title):** 22pt / Bold / Slate-900.
  - **H2 (Section):** 15pt / Semi-bold.
  - **Body (Standard):** 11pt / Regular.
  - **Captions/Status:** 9pt / Medium.
- **Styling Rules:** Use Shadcn UI but override all default shadows and rounding (use `rounded-none` or `rounded-sm`).

## 3. Architecture: Feature-Sliced Design (FSD)

The codebase must be organized into these layers:

- **App:** Providers, global styles, and NextAuth configuration.
- **Pages:** Full-screen compositions (Dashboard, Order Management, Financial Reports).
- **Features:** Actions like `CreateOrder`, `ProcessPayment`, `UpdateFulfillmentStatus`.
- **Entities:** Domain models and UI components like `OrderCard`, `UserTable`, `RevenueStat`.
- **Shared:** Generic UI (Shadcn), API clients (React Query), and Zod validation schemas.

## 4. Database Schema (Prisma / PostgreSQL)

```prisma
enum Role { ADMIN; SUPERVISOR; SALES; STAFF }
enum OrderStatus { INTAKE; PROCESSING; READY; IN_TRANSIT; FULFILLED }

model User {
  id        String    @id @default(uuid())
  email     String    @unique
  name      String
  role      Role      @default(STAFF)
  logs      OrderLog[]
  payments  Payment[]
  createdAt DateTime  @default(now())
}

model Order {
  id              String      @id @default(uuid())
  orderNumber     Int         @unique @default(autoincrement())
  clientName      String
  clientContact   String
  totalAmount     Decimal     @db.Decimal(12, 2)
  status          OrderStatus @default(INTAKE)
  expectedDate    DateTime
  items           OrderItem[]
  payments        Payment[]
  logs            OrderLog[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model OrderLog {
  id         String      @id @default(uuid())
  orderId    String
  userId     String
  action     String
  fromStatus OrderStatus?
  toStatus   OrderStatus?
  createdAt  DateTime    @default(now())
  order      Order       @relation(fields: [orderId], references: [id])
  user       User        @relation(fields: [userId], references: [id])
}

model Payment {
  id         String   @id @default(uuid())
  orderId    String
  amount     Decimal  @db.Decimal(12, 2)
  method     String
  recordedBy String
  user       User     @relation(fields: [recordedBy], references: [id])
  order      Order    @relation(fields: [orderId], references: [id])
}
```
