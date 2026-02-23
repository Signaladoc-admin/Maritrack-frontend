# Frontend Authentication Documentation

This document describes the authentication and authorization mechanism implemented in the frontend of the project. The system uses a secure, cookie-based strategy with Role-Based Access Control (RBAC) and persistent session management.

## 1. Authentication Strategy

The project employs a secure authentication flow:

- **Token Storage**: Both Access and Refresh tokens are stored in `httpOnly` and `Secure` cookies by the backend. The frontend does **not** store tokens in `localStorage` or `sessionStorage` to prevent XSS attacks.
- **State Management**: User profile information (ID, name, role) is stored in the `AuthContext` state for UI reactivity.
- **Persistence**: Sessions are persisted across page refreshes by calling an `/auth/refresh` endpoint on mount within the `AuthProvider`.

## 2. Core Components

### AuthProvider (`frontend/auth/AuthProvider.tsx`)

The `AuthProvider` is the root of the authentication state. It:

- Restores the session on mount by calling `authService.refresh()`.
- Provides `user`, `isLoading`, `login`, and `logout` methods via the `useAuth` hook.
- Handles login by calling the backend and updating the local state.

### ProtectedRoutes (`frontend/components/ProtectedRoutes.tsx`)

A client-side component used to wrap protected pages.

- **Loading State**: Displays a `SpinnerFull` while `isLoading` is true.
- **Authentication Check**: Redirects to `/sign-in` if no user is found.
- **Role Verification**: Compares the user's role against required roles (if provided) and alerts on mismatch.

## 3. Middleware & RBAC (`frontend/middleware.ts`)

The Next.js Middleware handles server-side protection and routing based on roles.

### Role Access Map

The `roleAccessMap` defines which route prefixes each role can access:

- `SUPER_ADMIN`: Access to everything (`["*"]`).
- `ADMIN`: Access to `/admin`, `/dashboard`, `/settings`, `/applicants`, `/jobs/admin`.
- `EMPLOYEE`: Access to `/dashboard`, `/settings`.
- `APPLICANT`: Access to `/apply`, `/settings`.

### Routing Logic

1. **Public Routes**: Pages like `/`, `/login`, `/register` are accessible without a token.
2. **Auth Redirect**: Logged-in users are automatically redirected away from `/login` or `/register` to their respective dashboards.
3. **RBAC Check**: If a token exists, the middleware decodes the JWT (using `jose`) to extract the user's role and verifies if they have access to the requested path.

## 4. API Layer & Token Refresh (`frontend/lib/api/api.ts`)

The Axios instance is configured for automatic token handling:

- **`withCredentials: true`**: Ensures that `httpOnly` cookies are sent with every request.
- **Interceptors**:
  - **Request**: Relies on browser-managed cookies.
  - **Response (Auto-Refresh)**: If a request fails with a `401 Unauthorized` status (except for auth routes), the interceptor:
    1. Queues subsequent requests.
    2. Attempts to refresh the token via `/auth/refresh`.
    3. If successful, retries the original request.
    4. If refresh fails, it redirects to `/login`.

## 5. Summary of User Roles

| Role            | Primary Dashboard | Permitted Routes                       |
| :-------------- | :---------------- | :------------------------------------- |
| **SUPER_ADMIN** | `/dashboard`      | All Routes                             |
| **ADMIN**       | `/dashboard`      | Admin panels, Applicants, Jobs (Admin) |
| **EMPLOYEE**    | `/dashboard`      | Employee dashboard, Personal settings  |
| **APPLICANT**   | `/apply`          | Application portal, Personal settings  |
