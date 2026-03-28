# API Layer Architecture

A modular, layered API architecture for React/Next.js applications using **Axios** as the HTTP client, with built-in support for **request cancellation**, **error logging**, and **status tracking hooks** — designed to integrate seamlessly with **React Query**.

---

## Table of Contents

1. [Folder Structure](#folder-structure)
2. [Layer Overview](#layer-overview)
3. [Core: `api.ts`](#core-apits)
4. [Constants: `api-status.ts`](#constants-api-statusts)
5. [Helper: `with-async.ts`](#helper-with-asyncts)
6. [Hook: `useApiStatus`](#hook-useapistatus)
7. [Hook: `useApi`](#hook-useapi)
8. [Creating Resource API Files](#creating-resource-api-files)
9. [Abort Controller Usage](#abort-controller-usage)
10. [Error Logging](#error-logging)
11. [React Query Integration](#react-query-integration)
12. [Practical Usage Guide](#practical-usage-guide)

---

## Folder Structure

```
lib/
├── api/
│   ├── api.ts              # Axios instance, withAbort, withLogger
│   └── index.ts            # Barrel exports
├── constants/
│   └── api-status.ts       # IDLE | PENDING | SUCCESS | ERROR
├── helpers/
│   └── with-async.ts       # Try/catch wrapper
└── hooks/
    ├── useApiStatus.ts     # Status booleans (isIdle, isPending, …)
    └── useApi.ts           # Data + status + exec()
```

Feature-specific API files live alongside their features:

```
app/
└── (user)/
    └── employees/
        └── api/
            └── employeesApi.ts    # Resource-specific endpoints
```

---

## Layer Overview

```
┌──────────────────────────────────────────┐
│            React Component               │
│  (uses React Query or standalone hooks)  │
└────────────────┬─────────────────────────┘
                 │
     ┌───────────▼───────────┐
     │   useApi / useQuery   │  ← Status tracking, caching
     └───────────┬───────────┘
                 │
     ┌───────────▼───────────┐
     │   Resource API file   │  ← e.g. employeesApi.ts
     │   (fetchEmployees)    │
     └───────────┬───────────┘
                 │
     ┌───────────▼───────────┐
     │       api.ts          │  ← Axios + withAbort + withLogger
     │  api.get / api.post   │
     └───────────┬───────────┘
                 │
         ┌───────▼───────┐
         │    Axios       │  ← HTTP client
         └───────────────┘
```

---

## Core: `api.ts`

**File**: `lib/api/api.ts`

Central Axios wrapper. Every HTTP method passes through two middleware layers:

| Middleware   | Purpose                                                             |
| ------------ | ------------------------------------------------------------------- |
| `withAbort`  | Injects a `CancelToken` so callers can abort in-flight requests     |
| `withLogger` | In development, logs error details (response body, status, headers) |

### API Surface

```ts
import api from "@/lib/api/api";

// All methods return Promise<AxiosResponse<T>>
api.get<T>(url, config?)
api.post<T>(url, body?, config?)
api.put<T>(url, body?, config?)
api.patch<T>(url, body?, config?)
api.delete<T>(url, config?)
```

### Exported Helpers

```ts
import { didAbort, isApiError } from "@/lib/api";

didAbort(error); // → { aborted: true } | false
isApiError(error); // → boolean
```

---

## Constants: `api-status.ts`

**File**: `lib/constants/api-status.ts`

```ts
import {
  apiStatus,
  IDLE,
  PENDING,
  SUCCESS,
  ERROR,
} from "@/lib/constants/api-status";
import type { ApiStatus } from "@/lib/constants/api-status";

// Individual constants
IDLE; // "IDLE"
PENDING; // "PENDING"
SUCCESS; // "SUCCESS"
ERROR; // "ERROR"

// Object form
apiStatus.IDLE; // same values, grouped

// Array (useful for iteration)
defaultApiStatuses; // ["IDLE", "PENDING", "SUCCESS", "ERROR"]

// TypeScript type
type ApiStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";
```

---

## Helper: `with-async.ts`

**File**: `lib/helpers/with-async.ts`

Wraps any async function that returns `{ data }` (like Axios responses) so you never need an explicit try/catch:

```ts
import { withAsync } from "@/lib/helpers/with-async";

const { response, error } = await withAsync(() => api.get("/users"));

if (error) {
  // handle error
} else {
  // response is the parsed `data` from the Axios response
  console.log(response);
}
```

---

## Hook: `useApiStatus`

**File**: `lib/hooks/useApiStatus.ts`

Manages a single `ApiStatus` value and provides memoised boolean flags.

```ts
const {
  status,       // "IDLE" | "PENDING" | …
  setStatus,    // setState for status
  isIdle,       // boolean
  isPending,    // boolean
  isSuccess,    // boolean
  isError,      // boolean
} = useApiStatus();           // default: IDLE
// or
} = useApiStatus(apiStatus.PENDING);  // start as PENDING
```

### How it works

`prepareStatuses(currentStatus)` iterates over `defaultApiStatuses` and builds an object like:

```ts
{ isIdle: false, isPending: true, isSuccess: false, isError: false }
```

This is wrapped in `useMemo` so the flags only recompute when `status` changes.

---

## Hook: `useApi`

**File**: `lib/hooks/useApi.ts`

Higher-level hook that adds **data** and **error** state on top of `useApiStatus`.

```ts
const {
  data, // T | undefined
  setData, // setState for data
  error, // unknown | undefined
  status, // ApiStatus
  setStatus,
  exec, // (...args) => Promise<{ data, error }>
  isIdle,
  isPending,
  isSuccess,
  isError,
} = useApi(fetchUsers, { initialData: [] });
```

Call `exec()` to trigger the API function:

```ts
useEffect(() => {
  exec();
}, []);
```

---

## Creating Resource API Files

Each feature defines its own API functions that call the core `api`:

```ts
// app/(user)/employees/api/employeesApi.ts
import api from "@/lib/api/api";

const URLS = {
  fetchEmployees: "/employees",
  fetchEmployee: (id: string) => `/employees/${id}`,
  createEmployee: "/employees",
  updateEmployee: (id: string) => `/employees/${id}`,
  deleteEmployee: (id: string) => `/employees/${id}`,
};

export const fetchEmployees = () => api.get(URLS.fetchEmployees);

export const fetchEmployee = (id: string) => api.get(URLS.fetchEmployee(id));

export const createEmployee = (data: CreateEmployeeDto) =>
  api.post(URLS.createEmployee, data);

export const updateEmployee = (id: string, data: UpdateEmployeeDto) =>
  api.patch(URLS.updateEmployee(id), data);

export const deleteEmployee = (id: string) =>
  api.delete(URLS.deleteEmployee(id));
```

---

## Abort Controller Usage

Any API call can be made cancellable by passing an `abort` callback in the config:

### In a Resource API File

```ts
// The config parameter is spread into the axios config.
// The `abort` key is intercepted by withAbort().
export const searchEmployees = (query: string, config = {}) =>
  api
    .get("/employees/search", {
      params: { q: query },
      ...config,
    })
    .then((res) => res.data);
```

### In a Component / Hook

```ts
import { useRef } from "react";
import { didAbort } from "@/lib/api";
import { searchEmployees } from "../api/employeesApi";

const useSearchEmployees = () => {
  const [results, setResults] = useState([]);
  const abortRef = useRef<{ abort?: () => void }>({});

  const search = async (query: string) => {
    try {
      // Cancel previous in-flight request
      abortRef.current.abort?.();

      const data = await searchEmployees(query, {
        abort: (cancel) => {
          abortRef.current.abort = cancel;
        },
      });

      setResults(data);
    } catch (error) {
      if (didAbort(error)) {
        console.log("Request was cancelled");
      }
    }
  };

  return { results, search };
};
```

### How `withAbort` works

1. Your config includes `abort: (cancelFn) => { … }`
2. `withAbort` creates a new `CancelToken.source()`
3. It attaches the `token` to the request config
4. It calls your `abort` callback with the `cancel` function
5. You store `cancel` in a ref and call it before the next request

---

## Error Logging

### Setup

Set the environment variable in `.env.local`:

```env
NEXT_PUBLIC_DEBUG_API=true
```

### What gets logged

| Scenario                   | Logged data                                            |
| -------------------------- | ------------------------------------------------------ |
| Server responded (4xx/5xx) | `response.data`, `response.status`, `response.headers` |
| No response received       | `error.request`                                        |
| Request setup failed       | `error.message`                                        |
| Always                     | `error.config`                                         |

Logging is **transparent** — errors are re-thrown after logging so your catch blocks still work normally.

---

## React Query Integration

Since you're using React Query on top of this layer, you'll typically **skip `useApi`/`useApiStatus`** and use the raw API functions directly with `useQuery` / `useMutation`.

### Queries

```ts
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../api/employeesApi";

export const useEmployees = () =>
  useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees().then((res) => res.data),
  });
```

### Mutations

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../api/employeesApi";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeDto) =>
      createEmployee(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
```

### With Abort Controller + React Query

```ts
export const useEmployees = () =>
  useQuery({
    queryKey: ["employees"],
    queryFn: ({ signal }) => fetchEmployees().then((res) => res.data),
    // Note: React Query v5 passes an AbortSignal automatically.
    // For the custom withAbort approach, you can wire it up like so:
    // queryFn: () => {
    //   let cancel: () => void;
    //   const promise = searchEmployees(query, {
    //     abort: (c) => { cancel = c; },
    //   });
    //   // @ts-ignore – attach cancel for React Query
    //   promise.cancel = () => cancel?.();
    //   return promise;
    // },
  });
```

### Recommended Pattern Summary

| What                                           | Use                                      |
| ---------------------------------------------- | ---------------------------------------- |
| **Server state** (lists, details, search)      | React Query `useQuery` + resource API    |
| **Mutations** (create, update, delete)         | React Query `useMutation` + resource API |
| **Simple one-off calls** (no caching needed)   | `useApi` hook + resource API             |
| **Manual status tracking** without React Query | `useApiStatus` hook                      |
| **Fire-and-forget** (e.g. analytics)           | Call `api.post()` directly               |

---

## Practical Usage Guide

This section shows how to actually use the API layer in your components, covering both **standalone** (no React Query) and **React Query** approaches.

---

### Approach A — Standalone (No React Query)

Use these patterns when you don't need caching, background refetching, or React Query's features.

#### 1. Calling a service directly

Every service method returns a raw Axios promise. You can `await` it anywhere:

```ts
import { jobsService } from "@/lib/services";

// Inside an event handler, server action, or utility function
const res = await jobsService.getAll();
const jobs = res.data.data; // Job[]
```

#### 2. Using the `useApi` hook

`useApi` wraps any async function with `data`, `error`, and status flags — no React Query needed:

```tsx
"use client";

import { useEffect } from "react";
import { useApi } from "@/lib/hooks/useApi";
import { jobsService } from "@/lib/services";

export default function JobsPage() {
  const {
    data: jobs,
    exec: loadJobs,
    isPending,
    isError,
    error,
  } = useApi(() => jobsService.getAll().then((res) => res.data.data));

  // Fire on mount
  useEffect(() => {
    loadJobs();
  }, []);

  if (isPending) return <p>Loading…</p>;
  if (isError) return <p>Error: {String(error)}</p>;

  return (
    <ul>
      {jobs?.map((job) => (
        <li key={job._id}>{job.title}</li>
      ))}
    </ul>
  );
}
```

#### 3. Using the `withAsync` helper

For one-off calls where you want a simple `{ response, error }` tuple instead of try/catch:

```ts
import { withAsync } from "@/lib/helpers/with-async";
import { departmentsService } from "@/lib/services";

const { response, error } = await withAsync(() =>
  departmentsService.getAll().then((res) => res.data.data),
);

if (error) {
  console.error("Failed to load departments", error);
} else {
  console.log(response); // Department[]
}
```

---

### Approach B — React Query (Recommended)

The preferred path for most UI components. React Query gives you caching, background refetching, loading/error states, and automatic cache invalidation on mutations.

#### 1. The `createResourceHooks` factory

The factory in `lib/hooks/api/createResourceHooks.ts` takes a **resource name** (used as the query key) and a **service object**, then returns a full set of typed hooks:

```ts
import { createResourceHooks } from "@/lib/hooks/api";
import { jobsService } from "@/lib/services";
import type { Job, CreateJobDto, UpdateJobDto } from "@/lib/types/job.types";

const jobHooks = createResourceHooks<Job, CreateJobDto, UpdateJobDto>(
  "jobs",
  jobsService,
);

// What you get back:
jobHooks.keys; // { all: ["jobs"], detail: (id) => ["jobs", id] }
jobHooks.useGetAll; // (queryParams?, options?) => useQuery result for GET /jobs
jobHooks.useGetById; // (id, options?) => useQuery result for GET /jobs/:id
jobHooks.useCreate; // (options?) => useMutation for POST /jobs
jobHooks.useUpdate; // (options?) => useMutation for PUT /jobs/:id
jobHooks.useDelete; // (options?) => useMutation for DELETE /jobs/:id
```

> **Note:** Mutations automatically invalidate the list query (`keys.all`) on success. `useUpdate` also invalidates the detail query for the updated item. Your custom `onSuccess` runs **after** the built-in invalidation.

#### 2. Pre-wired resource hooks

All resources are already wired up in `lib/hooks/api/resources.ts`, so you can import them directly:

```ts
import {
  departmentHooks,
  jobHooks,
  applicantHooks,
  userHooks,
} from "@/lib/hooks/api";
```

#### 3. Fetching a list with query params

Pass a flat object of query params as the first argument. These are forwarded to the API call and included in the cache key:

```tsx
"use client";

import { jobHooks } from "@/lib/hooks/api";

export default function ActiveJobsPage() {
  // GET /jobs?status=ACTIVE&page=1&limit=10
  const { data: jobs, isLoading } = jobHooks.useGetAll({
    status: "ACTIVE",
    page: 1,
    limit: 10,
  });

  if (isLoading) return <p>Loading…</p>;

  return (
    <ul>
      {/* API returns a paginated response object, data is in .data */}
      {jobs?.data.map((job) => (
        <li key={job._id}>{job.title}</li>
      ))}
    </ul>
  );
}
```

#### 4. Fetching a single item (with optional query)

```tsx
"use client";

import { departmentHooks } from "@/lib/hooks/api";

export default function DepartmentDetail({ id }: { id: string }) {
  const { data: dept, isLoading } = departmentHooks.useGetById(id, {
    query: { include: "employees" }, // optional extra query params
  });

  if (isLoading) return <p>Loading…</p>;

  return <h1>{dept?.name}</h1>;
}
```

#### 5. Lazy / deferred fetching

Pass `enabled: false` to prevent the query from firing automatically. Call `refetch()` when you're ready:

```tsx
const { data, refetch } = jobHooks.useGetAll({ enabled: false });

// Later, in an event handler:
<button onClick={() => refetch()}>Load Jobs</button>;
```

This also works with `useGetById`:

```tsx
const [selectedId, setSelectedId] = useState<string | null>(null);

// Only fetches when selectedId is truthy (enabled defaults to !!id)
const { data: dept } = departmentHooks.useGetById(selectedId ?? "", {
  enabled: !!selectedId,
});
```

#### 6. Creating a record (mutation)

```tsx
"use client";

import { departmentHooks } from "@/lib/hooks/api";
import toast from "react-hot-toast";
import type { CreateDepartmentDto } from "@/lib/types/department.types";

export default function CreateDepartmentForm() {
  const { mutate, isPending } = departmentHooks.useCreate();

  const handleSubmit = (formData: CreateDepartmentDto) => {
    mutate(formData, {
      onSuccess: (newDept) => {
        toast.success(`Created "${newDept.name}"`);
        // The departments list query is automatically invalidated.
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <button onClick={() => handleSubmit({ name: "HR" })} disabled={isPending}>
      {isPending ? "Creating…" : "Create Department"}
    </button>
  );
}
```

#### 7. Updating & deleting records

```tsx
const { mutate: updateDept } = departmentHooks.useUpdate();
const { mutate: deleteDept } = departmentHooks.useDelete();

// Update — pass an object with id + data
updateDept(
  { id: "abc123", data: { name: "Renamed Dept" } },
  {
    onSuccess: () => toast.success("Updated!"),
  },
);

// Delete — pass the id string
deleteDept("abc123", {
  onSuccess: () => toast.success("Deleted!"),
});
```

#### 8. Mutation options at the hook level

All mutation hooks (`useCreate`, `useUpdate`, `useDelete`) accept an optional options object with any `UseMutationOptions` fields (except `mutationFn`). Your callbacks **merge** with the built-in cache invalidation:

```tsx
// Global onError handler for all calls through this hook instance
const { mutate } = departmentHooks.useCreate({
  onError: (err) => toast.error(err.message),
  retry: 2,
});

// Per-call callbacks still work and run alongside hook-level ones
mutate(formData, {
  onSuccess: () => router.push("/departments"),
});
```

#### 9. Custom (non-CRUD) hooks

For operations that don't fit the CRUD pattern (e.g. auth), write purpose-built hooks in their own file:

```ts
// lib/hooks/api/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/lib/services";
import type { LoginDto } from "@/lib/types/auth.types";

export const useLogin = () =>
  useMutation({
    mutationFn: (data: LoginDto) =>
      authService.login(data).then((res) => res.data.data),
  });

export const useRegister = () =>
  useMutation({
    mutationFn: (data: RegisterDto) =>
      authService.register(data).then((res) => res.data.data),
  });

export const useRegisterAdmin = () =>
  useMutation({
    mutationFn: (data: RegisterDto) =>
      authService.registerAdmin(data).then((res) => res.data.data),
  });
```

Use in a component:

```tsx
import { useLogin } from "@/lib/hooks/api";
import { useAuth } from "@/auth/AuthProvider";

export default function LoginForm() {
  const { login } = useAuth(); // sets session state
  const loginMutation = useLogin(); // or use the RQ mutation directly

  const handleSubmit = async (email: string, password: string) => {
    await login(email, password);
    // — or via React Query mutation: —
    // loginMutation.mutate({ email, password });
  };
}
```

#### 10. Passing extra `useQuery` options

`useGetAll` and `useGetById` accept all standard `useQuery` options (except `queryKey` and `queryFn`), plus the custom `query` field:

```tsx
// Poll every 30 seconds
const { data } = departmentHooks.useGetAll({ refetchInterval: 30_000 });

// Placeholder data while loading
const { data } = jobHooks.useGetById(id, { placeholderData: cachedJob });

// Combine query params + useQuery options
const { data } = jobHooks.useGetAll(
  { page: 2, limit: 10 }, // Query params (1st arg)
  {
    staleTime: 60_000, // Options (2nd arg)
    refetchOnWindowFocus: false,
  },
);
```

---

### When to use which approach

| Scenario                                                   | Recommendation                                                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Fetching a list / detail with caching, filters, pagination | `resourceHooks.useGetAll({ status: 'ACTIVE' })` / `useGetById(id, { query: { embed: 'user' } })` |
| Lazy fetching (user-triggered)                             | `useGetAll(undefined, { enabled: false })` + `refetch()`                                         |
| Creating / updating / deleting a record                    | `resourceHooks.useCreate()` / `useUpdate()` / `useDelete()`                                      |
| Global mutation callbacks (e.g. toast on error)            | Pass options at hook level: `useCreate({ onError })`                                             |
| Non-CRUD operations (login, logout, refresh)               | Custom `useMutation` hook + service                                                              |
| One-off call with manual status tracking                   | `useApi(serviceFn)`                                                                              |
| Quick script / utility — no component                      | `await service.getAll()` directly                                                                |
| Need `{ response, error }` without try/catch               | `withAsync(() => service.getAll())`                                                              |

---

## Quick Reference

```ts
// Import the API client
import api from "@/lib/api/api";

// Import helpers
import { didAbort, isApiError } from "@/lib/api";

// Import constants
import { apiStatus, IDLE, PENDING } from "@/lib/constants/api-status";

// Import hooks
import { useApiStatus } from "@/lib/hooks/useApiStatus";
import { useApi } from "@/lib/hooks/useApi";

// Import async wrapper
import { withAsync } from "@/lib/helpers/with-async";
```
