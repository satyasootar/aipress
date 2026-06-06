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

---

## How This Project Was Built (Development Journey)

This section details the step-by-step process of how this architecture was achieved from scratch.

### 1. Initialization and Foundation
The project began by initializing a Next.js 16 App Router application with Tailwind CSS and TypeScript. I immediately established a custom design language focusing on a dark, high-end editorial aesthetic (`bg-black`, `font-serif` for headers, tracked-out `font-sans` for metadata). I integrated `shadcn/ui` to quickly scaffold base components like Cards, Inputs, and Buttons, but heavily customized their Tailwind classes to match the deep-black vintage theme.

### 2. Database Design with Prisma & NeonDB
Instead of a standard local SQLite database, I opted for a serverless PostgreSQL instance on NeonDB for production readiness. I designed a highly relational schema in `schema.prisma`:
- `User`: Handles authentication credentials.
- `Post`: Stores article content, title, and links back to the author.
- `Comment` & `Like`: Enable social interaction, tracking user engagement with strict foreign key constraints.

After running `npx prisma db push`, the cloud database was instantly ready to accept queries.

### 3. Custom Authentication via Server Actions
To deeply understand Next.js security, I bypassed heavy libraries like `NextAuth` and built a custom JWT cookie-based auth system. 
- Using **Server Actions** (`actions/auth.ts`), I handle form submissions natively without writing client-side `fetch` logic. 
- I use `bcryptjs` for hashing passwords and the powerful `jose` library for signing/verifying JWT tokens. 
- The JWT is stored securely as an HTTP-only cookie, and a helper `getSession()` function makes it universally accessible in any Server Component.

### 4. Headless Rich Text Editing
For the authoring experience, standard `<textarea>` elements weren't enough. I integrated the **Tiptap Headless Editor**. By building a custom `Tiptap.tsx` client component, users can highlight text and apply formatting (Bold, Italic, Code, Blockquote) seamlessly. The editor outputs raw HTML, which is then securely stored in the PostgreSQL database and safely rendered inside the `EditorialCard` components using Next.js `dangerouslySetInnerHTML`.

### 5. Advanced UI Engineering & The "Thumbnail Hash"
To avoid the complexity and cost of an S3 bucket for this assignment, I engineered an algorithmic image mapping system (`lib/utils/thumbnail.ts`). It takes a Post's unique CUID, runs a mathematical hash on the string, and maps it perfectly to one of 14 high-quality vintage thumbnail images stored locally in `public/thumbnail/`. This ensures every blog post gets a beautiful, deterministic thumbnail without bloated database logic.

### 6. Perfecting Rendering Strategies
I carefully split the application to utilize Next.js's powerful caching mechanisms:
- The **Homepage** uses ISR (`revalidate = 60`) because blog feeds update slowly, so there is no need to query the database on every single page load.
- The **Blog Reader** and **Profile Page** use SSR (`force-dynamic`) because we need to see exactly who liked or commented on a post the millisecond it happens.
- I built a `FooterWrapper.tsx` client component using `usePathname()` to ensure the footer renders selectively (only on the homepage and blog reader) without destroying the server-side architecture of the parent Layout.
