# Project Title: Full-Stack Blog Platform

## Overview
This is a comprehensive full-stack blog application built to demonstrate modern Next.js capabilities, including Server Actions, API Routes, multiple rendering strategies (SSG, ISR, SSR), authentication, database interaction, and form validation.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database:** NeonDB (PostgreSQL)
- **ORM:** Prisma
- **Authentication:** Custom JWT authentication with bcryptjs
- **Validation:** Zod
- **UI Components:** shadcn/ui (Tailwind CSS, Radix UI)
- **Notifications:** Sonner

## Environment Variables
The application requires the following environment variables (see `.env.example`):
- `DATABASE_URL`: Connection string for NeonDB.
- `JWT_SECRET`: Secret key used for signing JWT tokens.

## Database Setup
The schema uses two models: `User` and `Post`. 
- A `User` can have multiple `Post`s.
- To sync the database schema: `npx prisma db push`

## Authentication Flow
1. **Registration/Login:** The client form calls Server Actions (`register` / `login`).
2. **Validation:** Input is validated using Zod schemas.
3. **Password Hashing:** Passwords are hashed with `bcryptjs`.
4. **Token Generation:** A JWT is generated containing the user's ID.
5. **Cookie:** The JWT is stored in an `httpOnly`, `secure`, `sameSite="lax"` cookie named `token`.
6. **Authorization:** Protected routes and API endpoints read the cookie using `cookies()` from `next/headers` and verify the token.

## Rendering Strategies Used
- **SSG (Static Site Generation):** The landing page (`/`) uses `export const dynamic = "force-static"` to render completely at build time.
- **ISR (Incremental Static Regeneration):** The blog list (`/blog`) uses `export const revalidate = 60` to cache the page and revalidate it every 60 seconds.
- **SSR (Server-Side Rendering):** The single post view (`/blog/[id]`) and user dashboard (`/dashboard`) use `export const dynamic = "force-dynamic"` to fetch fresh data on every request.

## API Routes
Available under `/api/posts/`:
- `GET /api/posts` (Public): Fetch all published posts.
- `GET /api/posts/[id]` (Public): Fetch a specific published post.
- `POST /api/posts` (Protected): Create a new post.
- `PATCH /api/posts/[id]` (Protected, Author Only): Update an existing post.
- `DELETE /api/posts/[id]` (Protected, Author Only): Delete an existing post.

## Server Actions
Available in `actions/auth.ts` and `actions/post.ts`:
- `register`, `login`, `logout`: Manage authentication and cookies.
- `createPost`, `updatePost`, `deletePost`: Manage post mutations directly from React forms.
**Why Server Actions vs API Routes:** Server actions are used for internal UI mutations (forms) because they seamlessly integrate with React's `useActionState`, automatically handle form state, avoid the need for manual `fetch` calls, and can directly trigger Next.js cache revalidation (`revalidatePath`) and redirects. API Routes are maintained as a clean REST API for potential external consumers.

## Project Structure
```
app/                 # Next.js App Router pages and layouts
  api/               # REST API Routes
  blog/              # Public blog pages
  dashboard/         # Protected user dashboard
  login/             # Login page
  register/          # Registration page
actions/             # Server Actions
components/          # React components (shadcn/ui + custom)
lib/                 # Utilities (Prisma client, Auth helpers, API utils)
schemas/             # Zod validation schemas
prisma/              # Prisma schema definition
```

## How to Run Locally
1. Clone the repository and run `npm install`.
2. Copy `.env.example` to `.env.local` and add your database credentials.
3. Run `npx prisma db push` to push the schema.
4. Run `npm run dev` to start the development server.

## Known Limitations / Assumptions
- The JWT secret is statically retrieved from `process.env.JWT_SECRET`. In a real-world scenario, proper secret rotation and potentially specialized auth providers (like Auth.js/NextAuth) would be more robust.
- Error handling in Server Actions currently returns generic error messages for database constraints.
