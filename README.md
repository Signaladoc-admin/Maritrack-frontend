# Maritrack Frontend Documentation

## 1. Project Overview

**Maritrack** is a modern web application built for high performance and
scalability. This repository contains the source code for the frontend
application, engineered to support modularity through a **Feature-Sliced Design
(FSD)** architecture.

## 2. Technology Stack

### Core

- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode
  enabled)
- **Framework:** [Next.js](https://nextjs.org/) (App Router)

### Styling & UI

- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/)

### State & Data

- **Client State:** [Zustand](https://github.com/pmndrs/zustand) (Global UI
  state)
- **Server State:** [React Query](https://tanstack.com/query/latest) (Caching &
  synchronization)
- **Data Transport:** Next.js Server Actions

### Quality Assurance

- **Unit/Integration Tests:** [Vitest](https://vitest.dev/)
- **Component Tests:** [React Testing Library](https://testing-library.com/)

---

## 3. Getting Started

### Prerequisites

- Node.js (v18.17.0+)
- Package manager (npm, pnpm, or yarn)

### Installation

```bash
# Clone the repository
git clone [https://github.com/your-org/maritrack.git](https://github.com/your-org/maritrack.git)

# Navigate to project directory
cd maritrack-frontend

# Install dependencies
npm install
# or
pnpm install
```
