# Background Remover - Development Plan

This document outlines the development steps taken and potential future steps for the Background Remover project.

**Phase 1: Project Foundation & Core UI (Partially Complete / Reset for Regeneration)**

1.  **Project Setup:**
    *   Initialize Next.js project (✓ Done - Configs remain).
    *   Set up `src` directory structure (✓ Done - Structure base remains).
    *   Configure `tsconfig.json` (✓ Done).
    *   Verify/Configure Tailwind CSS (`tailwind.config.ts`, `postcss.config.mjs`, `globals.css`) (✓ Done).
    *   Verify ESLint configuration (`eslint.config.mjs`) (✓ Done).
    *   **Action:** Recreate placeholder AI flow files (`src/ai/flows/`).

2.  **UI Component Strategy:**
    *   Decided to use `shadcn/ui` (✓ Done).
    *   Initialized `shadcn/ui` (created `components.json`, `src/lib/utils.ts`) (✓ Done).

3.  **Core UI Component Implementation:**
    *   **Action:** Re-install core `shadcn/ui` components: `Button`, `Card`, `Input`, `Label`, `Dialog`, `Sonner`.
    *   **Action:** Recreate `src/components/ui/` directory for `shadcn/ui` and custom UI primitives.
        *   (Target: `background-beams.tsx`, `button.tsx`, `card.tsx`, `dialog.tsx`, `input.tsx`, `label.tsx`, `sonner.tsx`, `text-reveal.tsx`).
    *   **Action:** Recreate `src/components/page/` directory for page-specific composite components.
        *   (Target: `ActionButton.tsx`, `ImagePreviewGrid.tsx`, `OriginalImageCard.tsx`, `ProcessedImageCard.tsx`, `TitleSection.tsx`, `UploadCard.tsx`).

4.  **Basic Application Layout:**
    *   **Action:** Recreate `src/app/layout.tsx` (basic structure, `Toaster`).
    *   **Action:** Recreate `src/app/page.tsx` with initial component structure/logic.

**Phase 2: AI Integration & Feature Development (Reset for Regeneration)**

5.  **AI Module Structure:**
    *   **Action:** Recreate `src/ai/ai-instance.ts` defining `AIInput`/`AIOutput` interfaces and `AIStudio` class skeleton.

6.  **Implement AI Flows:**
    *   **Action:** Implement `remove-background-flow.ts` using `@imgly/background-removal`.
    *   **Action:** Implement logic for `refine-background-removal.ts` (e.g., using masking).

7.  **Develop UI Components & Features:**
    *   **Action:** Recreate specific page components in `src/components/page/` for core functionality (Upload, Previews, Actions) (see Step 3).
    *   **Action:** Add UI components needed for future features (e.g., `Slider` or `Progress` for refinement/feedback).

8.  **Integrate AI into UI:**
    *   **Action:** Update `src/app/page.tsx` to integrate background removal (file input, trigger, previews, state).
    *   **Action:** Integrate refinement controls and display into UI.

**Phase 3: Utilities, Testing & Refinement (Future Steps)**

9.  **Develop Utilities & Hooks:**
    *   **Action:** Create helper functions in `src/lib/` as needed.
    *   **Action:** Create custom hooks in `src/hooks/` to encapsulate UI logic from `page.tsx`.

10. **Testing:**
    *   **Action:** Set up testing framework (e.g., Vitest).
    *   **Action:** Write unit/integration tests.

11. **Review & Refactor:**
    *   **Action:** Conduct code reviews.
    *   **Action:** Refactor for clarity and performance. 