# AIPRESS: The Editorial Blog Platform

## Project Overview
AIPRESS is a meticulously designed, dark-themed editorial blog platform built to demonstrate advanced Next.js capabilities. It operates as a fully functional content application where authenticated users can write, publish, read, and interact with articles using a beautiful vintage UI.

## Tech Stack Used
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + `shadcn/ui` + Lucide Icons
- **Database**: NeonDB (PostgreSQL)
- **ORM**: Prisma Client
- **Authentication**: Custom cookie-based JWT session handling
- **Editor**: Tiptap Headless Rich Text Editor
- **Validation**: Zod (Client and Server-side)

## Features Implemented
- **Premium Editorial Design**: Complex grid layouts imitating high-end print magazines.
- **Dynamic Content**: Seed scripts for instantly generating 27+ posts.
- **Rich Text Authoring**: Write articles using a heavily customized Tiptap editor.
- **Social Interactions**: Real-time liking and commenting on articles.
- **Robust Validation**: Zod catches errors instantly before hitting the server.
- **Dynamic Thumbnails**: Post IDs are mathematically hashed to automatically assign beautiful round-robin thumbnails without bloat in the database.

---

## How to Run Locally

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up your `.env` file (see below).

3. Push the Prisma schema to your database:
```bash
npx prisma db push
npx prisma generate
```

4. Start the development server:
```bash
npm run dev
```

5. **Crucial Seeding Step:** Open `http://localhost:3000/api/seed` in your browser. This will instantly seed the database with 27 rich-text posts required to populate the massive homepage grid layout.

---

## Environment Variables Required
Create a `.env` file in the root directory:
```env
# NeonDB PostgreSQL connection string
DATABASE_URL="postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require"

# Secret key for signing JWT session cookies
JWT_SECRET="your-super-secret-random-string"
```

*Note: An `.env.example` file is provided in the repository.*

## Database Setup Instructions
1. Create a free account on [Neon.tech](https://neon.tech).
2. Create a new PostgreSQL project and copy the Connection String.
3. Paste it into your `.env` file as `DATABASE_URL`.
4. Run `npx prisma db push` to automatically create all the required tables (User, Post, Comment, Like).

---

## Architecture & Class Concepts Covered

### Routes & Pages Included (File-Based Routing)
- `/` - Homepage featuring a massive 27-slot editorial grid.
- `/blog/[id]` - Individual dynamic blog post page.
- `/dashboard` - Overview of a user's authored posts.
- `/dashboard/new` - The rich text editor page for writing a new post.
- `/profile` - User's social feed showing recent comments and likes.
- `/(auth)/login` & `/(auth)/register` - Authentication pages.

### Rendering Strategies Used
- **SSR (Server-Side Rendering)**:
  - `app/(main)/blog/[id]/page.tsx` uses `export const dynamic = "force-dynamic"`. It executes live database queries to fetch up-to-the-second comment and like counts for every visitor.
- **SSG (Static Site Generation)**:
  - The Authentication pages (`/login` and `/register`) are entirely static as they don't depend on dynamic external data. They are generated once at build time for maximum speed.
- **ISR (Incremental Static Regeneration)**:
  - `app/(main)/page.tsx` uses `export const revalidate = 60`. The massive homepage grid only needs to update occasionally, so we cache the result and automatically revalidate it in the background every 60 seconds.

### Server Actions
*Used for all UI mutations. Next.js natively handles the form submissions and loading states.*
- **Auth**: `login`, `register`, `logout` (`actions/auth.ts`)
- **Posts**: `createPost` (`actions/post.ts`)
- **Social**: `toggleLike`, `addComment` (`actions/interactions.ts`)
- **Use Case**: Server Actions make perfect sense here because they allow our forms to work natively without manually writing `fetch()` calls. We can run Zod validation directly on the server right where the Prisma call happens, ensuring absolute security.

### API Routes
*Included to demonstrate standard RESTful CRUD architecture for external clients.*
- `GET /api/posts` - Fetch all posts.
- `POST /api/posts` - Create a new post.
- `GET /api/posts/[id]` - Retrieve a specific post.
- `PATCH /api/posts/[id]` - Update a post.
- `DELETE /api/posts/[id]` - Delete a post.
- `GET /api/seed` - Specialized utility route to quickly seed the database.

## Assumptions & Limitations
- **Images**: To avoid setting up S3 or Cloudinary for this assignment, post thumbnails are not uploaded by the user. Instead, the post ID is hashed to algorithmically map to a beautiful set of 14 pre-defined images in the `public/thumbnail` folder.
- **Auth**: Authentication is handled via HTTP-only cookies and JWTs rather than NextAuth.js to explicitly demonstrate fundamental Next.js API routing and cookie management skills taught in class.
