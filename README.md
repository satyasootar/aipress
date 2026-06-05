# Full-Stack Blog Platform

This is a comprehensive full-stack blog application built to demonstrate modern Next.js 16 capabilities. 

## Features

- **Authentication:** Custom JWT authentication with bcryptjs and httpOnly cookies.
- **Database:** Prisma ORM connected to NeonDB (PostgreSQL).
- **CRUD Operations:** Full create, read, update, and delete capabilities for blog posts.
- **Validation:** Zod schemas used for robust input validation.
- **UI:** Styled with Tailwind CSS and shadcn/ui components.

## Technical Details

### Rendering Strategies
The application demonstrates all Next.js App Router rendering strategies where appropriate:
- **SSG (Static Site Generation):** The landing page (`/`) is statically generated for maximum performance.
- **ISR (Incremental Static Regeneration):** The public blog list (`/blog`) uses ISR (revalidated every 60 seconds) to balance performance and freshness.
- **SSR (Server-Side Rendering):** Dynamic routes like the dashboard (`/dashboard`) and individual posts (`/blog/[id]`) are server-rendered to ensure the latest data is always displayed.

### API Routes & Server Actions
Both methodologies are implemented to fulfill evaluation requirements:
- **API Routes (`/api/posts`):** A standard REST API suitable for external consumers, featuring proper HTTP status codes, structured JSON responses, and JWT middleware protection.
- **Server Actions (`@/actions`):** Used internally for all form submissions and mutations (auth, post CRUD). They provide a seamless native Next.js developer experience, automatically integrating with `useActionState`, handling caching revalidation (`revalidatePath`), and performing server-side redirects.

## How to Run Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env.local` and fill in your NeonDB `DATABASE_URL` and `JWT_SECRET`.
   ```bash
   cp .env.example .env.local
   ```

3. **Database Setup**
   Push the Prisma schema to your database.
   ```bash
   npx prisma db push
   ```

4. **Start the Server**
   ```bash
   npm run dev
   ```

Navigate to `http://localhost:3000` to see the application running.
