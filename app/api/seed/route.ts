import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const generateContent = (topic: string) => `
  <h2>The Dawn of ${topic}</h2>
  <p>In recent years, the evolution of ${topic} has dramatically changed the landscape of technology. What began as a theoretical concept has now transitioned into a foundational pillar of modern infrastructure.</p>
  <p>Engineers and designers alike are discovering that leveraging <strong>${topic}</strong> can reduce latency, improve user retention, and create stunning visual experiences.</p>
  <ul>
    <li>Unprecedented speed and scale</li>
    <li>Robust ecosystem of tools</li>
    <li>A passionate open-source community</li>
  </ul>
  <h2>Looking Forward</h2>
  <p>As we continue to push the boundaries of what is possible, ${topic} will undoubtedly play a crucial role. The only question is: are you ready to adapt?</p>
`;

const titles = [
  "The Future of Generative AI in Code",
  "Why React Server Components Change Everything",
  "Building Resilient Systems with TypeScript",
  "The Rise of Local LLMs",
  "Designing for the Spatial Web",
  "Understanding the Turbopack Architecture",
  "The Next Generation of Web Frameworks",
  "How to Scale Postgres to a Billion Rows",
  "The Return of the Monolith",
  "Serverless vs Edge: A Deep Dive",
  "Mastering CSS Grid in 2026",
  "A Practical Guide to Vector Databases",
  "The Engineering Behind Next.js App Router",
  "Why WebAssembly is Finally Taking Off",
  "Building High-Performance Rust APIs",
  "The State of Web Accessibility",
  "From Figma to Code: The New Workflow",
  "How AI is Transforming UI/UX Design",
  "The Hidden Costs of Microservices",
  "Optimizing Web Fonts for Speed",
  "The Death of the Passwords",
  "An Introduction to Zero-Knowledge Proofs",
  "Exploring the WebGPU Standard",
  "The Psychology of Dark Mode",
  "Why SolidJS is Gaining Momentum",
  "The Impact of AI on Developer Productivity",
  "The Next Big Thing in Tech"
];

export async function GET() {
  try {
    // Get or create an author
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Admin User",
          email: "admin@aipress.dev",
          password: "hashedpassword123", // dummy
        }
      });
    }

    // Create 27 posts
    for (const title of titles) {
      await prisma.post.create({
        data: {
          title,
          content: generateContent(title),
          published: true,
          authorId: user.id,
        }
      });
    }

    return NextResponse.json({ success: true, message: "Successfully seeded 27 posts" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
