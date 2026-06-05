export type DummyPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  views: number;
  upvotes: number;
  colorHex: string; // for the geometric shape color
};

export const dummyPosts: DummyPost[] = [
  {
    id: "1",
    title: "Build a Next.js Blog: A Step-by-Step Guide",
    excerpt: "Learn how to build a performant static blog with Next.js 14 and modern CSS features.",
    category: "Tech stack",
    author: { name: "Nefe Emadamerho-Atori", avatar: "https://i.pravatar.cc/150?u=1" },
    date: "Sep 20, 2024",
    views: 40,
    upvotes: 949,
    colorHex: "#9333ea" // purple-600
  },
  {
    id: "2",
    title: "GraphQL vs. REST: API Guide - Benefits, Pros & Cons",
    excerpt: "In this article, we look at GraphQL versus REST APIs to see how they stack up against each other. GraphQL and REST APIs are two of the most widely used types of APIs available.",
    category: "Developer Workflow",
    author: { name: "Jane Doe", avatar: "https://i.pravatar.cc/150?u=2" },
    date: "Oct 12, 2024",
    views: 120,
    upvotes: 850,
    colorHex: "#3b82f6" // blue-500
  },
  {
    id: "3",
    title: "Headless CMS: A Complete Introduction",
    excerpt: "Discover what a headless CMS is and why developers are moving away from traditional monolithic systems.",
    category: "Business of Web",
    author: { name: "Alice Smith", avatar: "https://i.pravatar.cc/150?u=3" },
    date: "Nov 01, 2024",
    views: 310,
    upvotes: 720,
    colorHex: "#10b981" // emerald-500
  },
  {
    id: "4",
    title: "Best 19 React UI Component Libraries of 2024",
    excerpt: "A curated list of the most popular and powerful UI libraries for your next React project.",
    category: "Tech stack",
    author: { name: "Bob Johnson", avatar: "https://i.pravatar.cc/150?u=4" },
    date: "Aug 15, 2024",
    views: 500,
    upvotes: 680,
    colorHex: "#f59e0b" // amber-500
  },
  {
    id: "5",
    title: "How to Add Fonts in Next.js 14 (Google Fonts, Local)",
    excerpt: "Optimize your web typography with Next.js font optimization features for zero layout shift.",
    category: "Performance & UX",
    author: { name: "Charlie Davis", avatar: "https://i.pravatar.cc/150?u=5" },
    date: "Dec 05, 2024",
    views: 205,
    upvotes: 610,
    colorHex: "#ec4899" // pink-500
  },
  {
    id: "6",
    title: "Understanding the Next.js App Directory",
    excerpt: "A deep dive into Server Components, nested layouts, and the new routing paradigm.",
    category: "Tech stack",
    author: { name: "Dana White", avatar: "https://i.pravatar.cc/150?u=6" },
    date: "Jan 10, 2025",
    views: 890,
    upvotes: 550,
    colorHex: "#8b5cf6" // violet-500
  },
  {
    id: "7",
    title: "Understanding React Suspense with Visuals and Code",
    excerpt: "Master asynchronous rendering in React with practical examples and mental models.",
    category: "Developer Workflow",
    author: { name: "Evan Wright", avatar: "https://i.pravatar.cc/150?u=7" },
    date: "Feb 22, 2025",
    views: 150,
    upvotes: 490,
    colorHex: "#14b8a6" // teal-500
  },
  {
    id: "8",
    title: "8 Ways to Minimize Main Thread Work",
    excerpt: "Improve Core Web Vitals by offloading heavy JavaScript computations.",
    category: "Performance & UX",
    author: { name: "Fiona Black", avatar: "https://i.pravatar.cc/150?u=8" },
    date: "Mar 05, 2025",
    views: 420,
    upvotes: 460,
    colorHex: "#ef4444" // red-500
  },
  {
    id: "9",
    title: "Top 10 Tips for SEO Optimization on Next.js Websites",
    excerpt: "Rank higher on Google with these essential technical SEO techniques.",
    category: "Business of Web",
    author: { name: "George King", avatar: "https://i.pravatar.cc/150?u=9" },
    date: "Apr 12, 2025",
    views: 670,
    upvotes: 410,
    colorHex: "#6366f1" // indigo-500
  },
  {
    id: "10",
    title: "How to Add Authentication: Next.js and Auth0",
    excerpt: "Secure your Next.js application with robust identity management.",
    category: "Tech stack",
    author: { name: "Hannah Lee", avatar: "https://i.pravatar.cc/150?u=10" },
    date: "May 18, 2025",
    views: 340,
    upvotes: 380,
    colorHex: "#0ea5e9" // sky-500
  },
  {
    id: "11",
    title: "Top 10 Vue Component Libraries in 2024",
    excerpt: "Explore the best ecosystems for building fast Vue 3 interfaces.",
    category: "Tech stack",
    author: { name: "Ian Stone", avatar: "https://i.pravatar.cc/150?u=11" },
    date: "Jun 20, 2025",
    views: 290,
    upvotes: 350,
    colorHex: "#84cc16" // lime-500
  },
  {
    id: "12",
    title: "Migrating from Webpack to Vite",
    excerpt: "Experience instant server start and lightning fast HMR.",
    category: "Developer Workflow",
    author: { name: "Julia Scott", avatar: "https://i.pravatar.cc/150?u=12" },
    date: "Jul 02, 2025",
    views: 510,
    upvotes: 330,
    colorHex: "#f97316" // orange-500
  },
  {
    id: "13",
    title: "A Guide to Modern CSS Subgrid",
    excerpt: "Align nested grids seamlessly with CSS Subgrid capabilities.",
    category: "Performance & UX",
    author: { name: "Kevin Brown", avatar: "https://i.pravatar.cc/150?u=13" },
    date: "Aug 14, 2025",
    views: 180,
    upvotes: 310,
    colorHex: "#d946ef" // fuchsia-500
  },
  {
    id: "14",
    title: "State Management in 2024: Zustand vs Redux",
    excerpt: "Compare modern lightweight state managers against enterprise standards.",
    category: "Tech stack",
    author: { name: "Laura Croft", avatar: "https://i.pravatar.cc/150?u=14" },
    date: "Sep 09, 2025",
    views: 730,
    upvotes: 290,
    colorHex: "#06b6d4" // cyan-500
  },
  {
    id: "15",
    title: "Building Accessible Forms in React",
    excerpt: "Ensure your applications are usable by everyone with ARIA and native HTML.",
    category: "Performance & UX",
    author: { name: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=15" },
    date: "Oct 21, 2025",
    views: 260,
    upvotes: 270,
    colorHex: "#10b981" // emerald-500
  },
  {
    id: "16",
    title: "Introduction to WebAssembly for JS Developers",
    excerpt: "Bring near-native performance to the browser with Rust and Wasm.",
    category: "Tech stack",
    author: { name: "Nina Patel", avatar: "https://i.pravatar.cc/150?u=16" },
    date: "Nov 11, 2025",
    views: 450,
    upvotes: 250,
    colorHex: "#eab308" // yellow-500
  },
  {
    id: "17",
    title: "Mastering TypeScript Generics",
    excerpt: "Write highly reusable and type-safe utilities with advanced generic patterns.",
    category: "Developer Workflow",
    author: { name: "Oliver Twist", avatar: "https://i.pravatar.cc/150?u=17" },
    date: "Dec 30, 2025",
    views: 620,
    upvotes: 230,
    colorHex: "#3b82f6" // blue-500
  },
  {
    id: "18",
    title: "Creating Fluid Typography with CSS Clamp",
    excerpt: "Responsive text scaling without complex media queries.",
    category: "Performance & UX",
    author: { name: "Paula Dean", avatar: "https://i.pravatar.cc/150?u=18" },
    date: "Jan 15, 2026",
    views: 310,
    upvotes: 210,
    colorHex: "#a855f7" // purple-500
  },
  {
    id: "19",
    title: "The Future of Web Components",
    excerpt: "Why custom elements are finally gaining widespread adoption.",
    category: "Tech stack",
    author: { name: "Quincy Jones", avatar: "https://i.pravatar.cc/150?u=19" },
    date: "Feb 08, 2026",
    views: 280,
    upvotes: 190,
    colorHex: "#f43f5e" // rose-500
  },
  {
    id: "20",
    title: "Optimizing Images for the Modern Web",
    excerpt: "Leveraging AVIF, WebP, and intrinsic dimensions for flawless loading.",
    category: "Performance & UX",
    author: { name: "Rachel Green", avatar: "https://i.pravatar.cc/150?u=20" },
    date: "Mar 22, 2026",
    views: 540,
    upvotes: 180,
    colorHex: "#22c55e" // green-500
  },
  {
    id: "21",
    title: "Serverless Databases for Edge Computing",
    excerpt: "Comparing Neon, PlanetScale, and Supabase for modern apps.",
    category: "Tech stack",
    author: { name: "Steve Carell", avatar: "https://i.pravatar.cc/150?u=21" },
    date: "Apr 04, 2026",
    views: 390,
    upvotes: 170,
    colorHex: "#64748b" // slate-500
  },
  {
    id: "22",
    title: "Building Micro-frontends with Module Federation",
    excerpt: "Scale your architecture across independent engineering teams.",
    category: "Developer Workflow",
    author: { name: "Tina Fey", avatar: "https://i.pravatar.cc/150?u=22" },
    date: "May 19, 2026",
    views: 470,
    upvotes: 160,
    colorHex: "#f59e0b" // amber-500
  },
  {
    id: "23",
    title: "Animations with Framer Motion",
    excerpt: "Create complex declarative animations with zero layout shift.",
    category: "Performance & UX",
    author: { name: "Ursula K.", avatar: "https://i.pravatar.cc/150?u=23" },
    date: "Jun 11, 2026",
    views: 220,
    upvotes: 150,
    colorHex: "#ec4899" // pink-500
  },
  {
    id: "24",
    title: "Advanced Git Workflows for Large Teams",
    excerpt: "Beyond standard feature branching: trunk-based development and rebasing.",
    category: "Developer Workflow",
    author: { name: "Victor Hugo", avatar: "https://i.pravatar.cc/150?u=24" },
    date: "Jul 25, 2026",
    views: 610,
    upvotes: 140,
    colorHex: "#8b5cf6" // violet-500
  },
  {
    id: "25",
    title: "Securing Your Node.js API",
    excerpt: "Prevent common vulnerabilities like XSS, CSRF, and SQL Injection.",
    category: "Tech stack",
    author: { name: "Wanda Maximoff", avatar: "https://i.pravatar.cc/150?u=25" },
    date: "Aug 08, 2026",
    views: 330,
    upvotes: 130,
    colorHex: "#14b8a6" // teal-500
  },
  {
    id: "26",
    title: "Designing for Dark Mode",
    excerpt: "Principles for creating legible and aesthetically pleasing dark themes.",
    category: "Performance & UX",
    author: { name: "Xavier Woods", avatar: "https://i.pravatar.cc/150?u=26" },
    date: "Sep 14, 2026",
    views: 480,
    upvotes: 120,
    colorHex: "#ef4444" // red-500
  },
  {
    id: "27",
    title: "Deploying to Vercel vs Netlify",
    excerpt: "A comprehensive comparison of the top static site hosting platforms.",
    category: "Business of Web",
    author: { name: "Yara Shahidi", avatar: "https://i.pravatar.cc/150?u=27" },
    date: "Oct 02, 2026",
    views: 590,
    upvotes: 110,
    colorHex: "#6366f1" // indigo-500
  },
  {
    id: "28",
    title: "Implementing WebSockets in Next.js",
    excerpt: "Real-time bidirectional communication for modern web applications.",
    category: "Tech stack",
    author: { name: "Zack Snyder", avatar: "https://i.pravatar.cc/150?u=28" },
    date: "Nov 20, 2026",
    views: 270,
    upvotes: 100,
    colorHex: "#0ea5e9" // sky-500
  },
  {
    id: "29",
    title: "Writing Resilient E2E Tests with Playwright",
    excerpt: "Stop dealing with flaky tests and learn to write reliable UI automation.",
    category: "Developer Workflow",
    author: { name: "Amy Adams", avatar: "https://i.pravatar.cc/150?u=29" },
    date: "Dec 12, 2026",
    views: 410,
    upvotes: 90,
    colorHex: "#84cc16" // lime-500
  },
  {
    id: "30",
    title: "Understanding CSS Container Queries",
    excerpt: "Build truly modular components that respond to their own container sizes.",
    category: "Performance & UX",
    author: { name: "Ben Affleck", avatar: "https://i.pravatar.cc/150?u=30" },
    date: "Jan 05, 2027",
    views: 360,
    upvotes: 80,
    colorHex: "#f97316" // orange-500
  }
];
