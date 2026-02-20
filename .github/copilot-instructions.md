# AI Coding Instructions for FaithStep

## Overview

FaithStep is a faith-based wellness app built with **Next.js 16 (App Router)**, **Supabase**, and **TailwindCSS**. The architecture emphasizes mobile-first design with automatic mobile/desktop routing and strong type safety.

---

## 1. Architecture & Project Structure

### Design Principles

- **Mobile-first**: Separate routes for mobile (`app/mob/*`) and desktop (`app/(app-pages)/*`).
- **Client/server boundary**: Strict separation between client (`'use client'`) and server operations.
- **Feature-driven modular structure**: Each domain (auth, gratitudes, bible) is self-contained in `features/`.

### Directory Map

```
app/
├─ (app-pages)/          # Desktop routes (wrapped in AppLayout context)
│  ├─ gratitude/         # Gratitude wall & editor
│  ├─ bible/             # Bible chapter viewer
│  ├─ overview/          # Daily verse dashboard
│  └─ layout.tsx         # Provides UserProvider + MenuProvider
├─ mob/                  # Mobile routes (middleware rewrites here)
│  └─ layout.tsx         # MobileLayout with fixed bottom navbar
├─ auth/                 # Authentication routes (login, signup, confirm email)
└─ layout.tsx            # Root layout (Montserrat font, global CSS)

features/
├─ auth/                 # Auth service + components
│  ├─ api.ts             # Supabase auth methods
│  ├─ type.ts            # Zod schemas (LoginFormSchema, SignupFormSchema)
│  └─ components/        # LoginForm, SignupForm
├─ gratitudes/           # Gratitude posts + reactions
│  ├─ api.ts             # useGratitude hook, postGratitude, reactToGratitude
│  ├─ components/        # GratitudeCard, GratitudeWall, GratitudeEditor
│  └─ type.tsx           # Types
├─ bible/                # Bible data fetching
│  ├─ api.ts             # getChapter(), getVerse()
│  ├─ books.ts           # Book list constants
│  └─ *.json             # Cached verse data (encouraging-verses.json)
├─ dailystep/            # Daily verse feature
│  ├─ getDailyStep.tsx   # Deterministic daily verse selection
│  └─ component/         # DailyStepCard
├─ providers/            # Context providers
│  ├─ UserProvider.tsx   # User authentication state
│  └─ MenuProvider.tsx    # Mobile menu state
└─ navigation/           # Navigation components

lib/
├─ supabase/
│  ├─ client.ts          # Browser client factory
│  ├─ server.ts          # Server client factory
│  └─ proxy.ts           # Middleware: auth refresh + mobile routing
├─ getUser.ts            # ⚠️ BROWSER CONTEXT ONLY - exports getUser(), getCurrentUser()
└─ utils.ts              # cn(), formatThisDate(), today()
```

### Mobile/Desktop Routing

**Middleware** (`lib/supabase/proxy.ts`) automatically rewrites URLs:

- Desktop user accessing `/gratitude` → stays `/gratitude`
- Mobile user accessing `/gratitude` → rewrites to `/mob/gratitude`
- Auth routes bypassed (mobile can access `/auth/login` directly)

**Never hardcode mobile detection in components** — use the middleware routing.

---

## 2. Critical Workflows

### Development

```bash
npm run dev              # Start dev server on http://localhost:3000
npm run build            # Build for production
npm start                # Serve production build
npm run lint             # Run ESLint
npm run test             # Run Vitest
```

### Authentication Flow

1. User signup at `/auth/signup` → Supabase creates user + sends confirmation email
2. Email redirect points to `/account/setup` with token
3. User confirms setup → redirects to `/overview`
4. Middleware (`proxy.ts`) calls `supabase.auth.getClaims()` on every request to refresh session
5. `CurrentUser` available via `getCurrentUser()` hook or `UserProvider` context

### Data Fetching Pattern

- **Client-side lists**: Use `useGratitude()` hook (SWR-based, auto-revalidates on mutations)
- **Server-side single items**: Use `createClientServer()` in Server Components
- **Browser client**: Use `getSupabaseClient()` (defined in `features/*/api.ts`)

---

## 3. Critical Implementation Patterns

### Form Handling (React Hook Form + Zod)

```tsx
// Always define schema in features/*/type.ts
import { LoginFormSchema } from "@/features/auth/type";

// Use Controller + Field for validation UI
import { Controller, useForm } from "react-hook-form";

const LoginForm = () => {
  const form = useForm({ defaultValues: { email: "", password: "" } });

  return (
    <Controller
      name="email"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
          <Input {...field} type="email" />
        </Field>
      )}
    />
  );
};
```

### State Management

- **Global user state**: `UserProvider` (context, persisted via Supabase session)
- **Page-level state**: `useState()` in page components
- **Server state**: SWR with `useGratitude()` hook (auto-caching, deduplication)
- **Never use Redux/Zustand** — complexity not needed

### Component Styling

- **TailwindCSS only** — no CSS Modules required
- **Mobile-first responsive**: `hidden xsm:grid` for mobile-hidden, `xsm:hidden` for desktop-hidden
- **UI library**: Radix-UI primitives wrapped in `components/ui/*` with className utilities
- **Use `cn()` helper** from `@/lib/utils` to merge Tailwind classes safely

```tsx
// Good
import { cn } from '@/lib/utils';
<div className={cn('p-4 bg-white', isActive && 'bg-blue-100')} />

// Avoid
<div className={`p-4 ${isActive ? 'bg-blue-100' : 'bg-white'}`} />
```

### Data Fetching

```tsx
// SWR pattern (auto cache + revalidation)
const { data, mutate } = useSWR(
  'key',
  fetcher,
  { keepPreviousData: true, revalidateOnFocus: false }
);

// Mutate after action
await postGratitude({...});
await mutate(); // Refresh local cache
```

---

## 4. Supabase Integration Specifics

### Browser vs Server Context

```tsx
// ✅ CORRECT - browser component
"use client";
import { getSupabaseClient } from "@/lib/supabase/client-singleton";
const client = getSupabaseClient();
const { data } = await client.from("gratitude_posts").select();

// ✅ CORRECT - server component
import { createClientServer } from "@/lib/supabase/server";
const supabase = await createClientServer();
const { data: user } = await supabase.auth.getUser();

// ❌ WRONG - mixing contexts
import { createClientBrowser } from "@/lib/supabase/client";
export const getUser = async () => {
  // Exports for use anywhere
  const supabase = await createClientBrowser(); // Breaks in server contexts!
};
```

### RLS (Row Level Security) Patterns

All queries respect Supabase RLS policies:

- `auth.uid()` is the current user ID
- Tables typically filter by `userid = auth.uid()`
- Test RLS by checking `user_id IN (SELECT id FROM auth.users WHERE...)`

### Query Optimization

❌ **Avoid N+1 queries:**

```tsx
// Don't do this in components
const reactions = item?.reactions?.find((r) => r.user_id === userId); // O(n) per card
```

✅ **Use database-side filtering:**

```tsx
// In API file
const { data } = await supabase
  .from("gratitude_with_reactions")
  .select("*, current_user_reaction:reactions(...)")
  .limit(50); // Critical: always paginate
```

---

## 5. Common Patterns & Conventions

### Naming

- **Components**: PascalCase, descriptive (`GratitudeCard`, not `Card`)
- **Files**: match component name or lowercase for utilities
- **Hooks**: `use*` prefix; `useGratitude()`, `useBatchedReactions()`
- **Types**: `*Props` for component props, `*Schema` for Zod schemas

### Error Handling

- **Forms**: Validation errors rendered via `fieldState.invalid`
- **Api calls**: Wrap in try-catch, show toast via `sonner` library
- **Middleware**: Silently pass-through on auth errors (let frontend handle)

### Imports

```tsx
// Organize in this order:
import React from "react"; // React + NEXT
import { cookies } from "next/headers";
import useSWR from "swr"; // Third-party
import { Button } from "@/components/ui/button"; // Local imports
import { useUser } from "@/features/providers/UserProvider";

// Use path aliases (@/) everywhere — never relative imports beyond 2 levels
```

---

## 6. CRITICAL PRODUCTION ISSUES (from audit)

### 🔴 Security/Correctness

1. **NO async code at module level** in client files:

   ```tsx
   // ❌ BREAKS: runs in server context too
   const supabase = await createClientBrowser();

   // ✅ CORRECT: lazy initialization
   let instance: SupabaseClient | null = null;
   function getClient() {
     if (!instance) instance = createClientBrowser();
     return instance;
   }
   ```

2. **Always add `'use client'` at top of browser-only files** — especially those using hooks or browser APIs

3. **Remove ALL console.log() from shipped code** — use ESLint rule:
   ```javascript
   // eslint.config.mjs
   'no-console': ['error', { allow: ['warn', 'error'] }]
   ```

### ⚠️ Performance

1. **Always paginate queries** — add `.limit(25)` minimum, implement cursor-based infinite scroll
2. **Cache Bible data** — verses don't change, use `next: { revalidate: 31536000 }`
3. **No N+1 queries** — validate with database query profiler before deploying
4. **Memoize expensive components**: wrap `GratitudeWall` with `React.memo()`

### 🧹 Code Quality

1. **Remove empty useEffect cleanup** — delete `return () => {}` if no cleanup needed
2. **useEffect dependency arrays must be explicit** — enable `react-hooks/exhaustive-deps` ESLint rule
3. **Remove unused `any` types** — generate proper types from Supabase tables using CLI

---

## 7. Testing & Debugging

### Quick Checks

- **Type errors**: `npm run build` catches TypeScript errors
- **Lint errors**: `npm run lint` checks ESLint rules
- **Test runner**: `npm run test` (Vitest with jsdom environment)

### Common Debugging

- **Auth issues**: Check `lib/supabase/proxy.ts` — middleware must call `getClaims()` every request
- **Mobile routing broken**: Verify `User-Agent` header in middleware (check DevTools Network tab)
- **SWR not updating**: Ensure `.mutate()` is called after POST/PUT/DELETE
- **Performance**: Use Chrome DevTools Performance tab; look for long-running JavaScript threads

---

## 8. Before Writing Code: Checklist

- [ ] Is this a browser component? Add `'use client'` if using hooks/browser APIs
- [ ] Does it touch auth? Use `createClientServer()` on server, `getSupabaseClient()` on client
- [ ] Fetching data? Add `.limit(N)` — no unbounded queries
- [ ] New form? Define Zod schema in `features/*/type.ts` first
- [ ] Using array `.find()`? Cache transformation instead of O(n) per render
- [ ] Adding `useEffect`? Include cleanup function + dependency array
- [ ] New component file? Export as named export or save in `components/*` subdirectory
- [ ] Using toast? Use `sonner` library (`import { toast } from 'sonner'`)

---

## 9. When You Get Stuck

1. **"Where do I put this logic?"** → Check `features/*/api.ts` for similar patterns
2. **"How do I fetch data?"** → Copy pattern from `features/gratitudes/api.ts` (SWR hook)
3. **"Form not validating?"** → Check Zod schema in `type.ts` matches Controller fields
4. **"Mobile routing not working?"** → Verify route exists in both `app/(app-pages)/*` AND `app/mob/*`
5. **"Auth not persisting?"** → Check middleware is running (routes must match matcher in `proxy.ts`)

---

## References

- **Next.js App Router**: https://nextjs.org/docs/app
- **Supabase Auth**: https://supabase.com/docs/guides/auth
- **React Hook Form**: https://react-hook-form.com
- **SWR**: https://swr.vercel.app
- **TailwindCSS**: https://tailwindcss.com
- **Radix UI**: https://www.radix-ui.com
