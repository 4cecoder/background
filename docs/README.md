# Background Remover

This project is a web application called **Background Remover**, built with [Next.js](https://nextjs.org) and [TypeScript](https://www.typescriptlang.org/).

## What is this?

This application demonstrates how to integrate Artificial Intelligence (AI) features into a web app. Specifically, it includes functionality for removing the background from images directly in the browser using the `@imgly/background-removal` library.

It also uses reusable user interface (UI) components built with [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/).

## Why build this?

*   To provide a working example of integrating client-side AI for image processing (background removal) within a modern web development stack (Next.js, TypeScript, Tailwind).
*   To showcase the use of shadcn/ui components.

## Getting Started

First, run the development server:

```bash
# If using bun (recommended based on bun.lockb)
bun install
bun run dev

# If using npm
npm install
npm run dev

# If using yarn
yarn
yarn dev

# If using pnpm
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can see the main application logic in `src/app/page.tsx`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
