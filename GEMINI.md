# Project Context for Gemini

This document outlines the key aspects of the `personalsite` project to help Gemini understand its structure,
technologies, and conventions.

## 1. Core Technologies

* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS (with `@tailwindcss/typography` plugin)
* **Content:** MDX for blog posts and other static content
* **Backend/Database:** Convex (for structured data like about, education, work experience, and blog post metadata)
* **Language:** TypeScript
* **Code Highlighting:** `sugar-high` (used within MDX components)

## 2. Project Structure & Conventions

* **`app/`:** Next.js App Router for pages and layouts.
* **`components/`:** Reusable React components.
    * `components/blog/`: Specific components for blog functionality (e.g., `BlogList.tsx`, `ReactMDXBlogPost.tsx`,
      `RegularBlogPost.tsx`).
* **`content/blog/`:** Local MDX files for blog posts.
* **`convex/`:** Convex backend code (functions, schema, data models).
* **`lib/`:** Utility functions.
* **`public/`:** Static assets.
* **`mdx-components.tsx`:** Centralized mapping for custom React components used within MDX files. This file defines how
  Markdown elements (like `h1`, `p`, `code`) and custom components (like `Shimmer`) are rendered in MDX.
* **`app/globals.css`:** Global Tailwind CSS styles and custom component classes.
* **Naming Conventions:**
    * React components: PascalCase (e.g., `Header.tsx`, `BlogList.tsx`).
    * CSS classes (Tailwind): kebab-case (e.g., `blog-list-main`, `blog-post-article`).

## 3. Data Flow for Blog Posts

* **Canonical Source:** The Convex backend is the single source of truth for the list of all blog posts.
* **Content Retrieval:**
    * Posts with `source: 'mdx'` in Convex fetch their content from local `.mdx` files in `content/blog/`.
    * Posts without `source: 'mdx'` (or with a different source) fetch their content directly from the Convex backend.
* **Rendering:**
    * `app/blog/page.tsx` fetches all published posts from Convex and displays them using `BlogList.tsx`.
    * `app/blog/[slug]/page.tsx` fetches a single post from Convex, then conditionally renders it using either
      `ReactMDXBlogPost.tsx` (for local MDX content) or `RegularBlogPost.tsx` (for Convex-stored content).

## 4. Gemini's Workflow Guidelines

When interacting with this project, Gemini should adhere to the following:

* **Understanding:**
    * Always start by reading relevant files (`read_file`, `read_many_files`) and searching the codebase (
      `search_file_content`, `glob`) to understand the context, existing patterns, and conventions.
    * Prioritize understanding the data flow, especially for blog posts (Convex vs. local MDX).
* **Planning:**
    * Formulate a concise, clear plan before making any significant changes.
    * Consider the impact of changes on both local MDX and Convex-driven content.
* **Implementation:**
    * Strictly follow existing coding styles, naming conventions, and architectural patterns (e.g., component structure,
      Tailwind CSS usage).
    * Use `replace` for precise modifications, `write_file` for new files, and `run_shell_command` for shell operations.
* **Verification:**
    * After any code modification, run the project's linting and build commands to ensure code quality and catch errors.
        * **Linting:** `npm run lint` or `next lint`
        * **Type Checking/Build:** `npm run build` or `tsc`
    * If applicable, verify changes by running tests (though no specific test command is currently defined, if one is
      identified, use it).
* **Communication:**
    * Be concise and direct in responses.
    * Explain the purpose and potential impact of any `run_shell_command` that modifies the filesystem or system state.

## 5. Industry Standard Practices

* **Responsiveness:** All UI changes should consider responsiveness across different screen sizes (mobile, tablet,
  desktop).
* **Accessibility:** Prioritize and implement accessibility best practices (WCAG guidelines) for all UI elements and
  content to ensure a usable experience for all readers, including those using assistive technologies. This includes
  proper semantic HTML, ARIA attributes where necessary, keyboard navigation, and sufficient color contrast.
* **Performance:** Be mindful of performance implications, especially for data fetching and rendering.
* **Maintainability:** Write clean, modular, and well-organized code.
* **Security:** Never introduce code that exposes sensitive information.

By following these guidelines, Gemini can effectively assist in developing and maintaining the `personalsite` project.