# CreatorSpace — Creative Services Marketplace

CreatorSpace is a modern, responsive frontend marketplace connecting teams, founders, and brands with independent creative professionals across branding, UI/UX design, web development, graphic design, video editing, photography, digital marketing, and content writing.

## Key Features

- **Landing Experience (`Home`)**: Split-screen hero with dual-mode search (services or creators), platform metrics, 8 category shortcuts, trending service packages, featured creators, how-it-works workflow, and attributable client testimonials.
- **Explore Creators (`/creators`)**: Search creators by name, title, location, or skill; filter by discipline and years of experience; and sort by rating, experience, or completed projects.
- **Creator Profile Details (`/creators/:id`)**: Full biography, skills, portfolio gallery with interactive lightbox preview, live services offered, verified client reviews, and direct inquiry routing.
- **Explore Services (`/services`)**: Keyword search, sidebar filters (category, price bracket, minimum rating), mobile filter drawer, and sorting by featured, price, or rating.
- **Service Details (`/services/:id`)**: Complete scope, itemized deliverables, turnaround and revision details, creator portfolio samples, wishlist saving, and pre-filled project inquiry CTA.
- **Wishlist (`/wishlist`)**: Save/remove services directly from cards or detail pages with full `localStorage` persistence and shortlist cost summary.
- **Client Inquiry Desk (`/inquiry`)**: Validated project brief form (name, email format verification, service selection, project title, budget range, deadline, description) persisted in `localStorage`.
- **Creator Dashboard (`/dashboard`)**: Full frontend CRUD management (`Add New Service`, `Edit Service`, `Delete Service` with inline confirmation, `Active`/`Paused` visibility toggle) and client inquiry status tracking.

## Tech Stack

- **React 19** + **TypeScript**
- **React Router DOM** for multi-page client-side routing
- **Tailwind CSS v4** for responsive layout and design tokens
- **Lucide React** for accessible interface icons
- **Browser LocalStorage** via custom hooks and React Context for persistent wishlist, service catalog, and inquiries

## Project Structure

```text
src/
├── assets/images/        # Local visual assets
├── components/           # Reusable UI & marketplace components
├── context/              # AppContext & WishlistContext state providers
├── data/                 # Realistic creators, services, categories, testimonials
├── hooks/                # useLocalStorage custom hook
├── pages/                # 9 routed application pages
├── types/                # TypeScript domain models
├── utils/                # Formatting & storage helpers
├── App.tsx               # Router & layout shell
└── main.tsx              # Application entry point
```

## Local Setup & Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server on port 3000:
   ```bash
   npm run dev
   ```
3. Run TypeScript typechecking:
   ```bash
   npm run lint
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Deployment (GitHub & Vercel)

- Push the repository to GitHub (excluding `node_modules` and `dist`, configured in `.gitignore`).
- Import the repository in **Vercel**:
  - Framework Preset: **Vite**
  - Build Command: `npm run build`
  - Output Directory: `dist`
- `vercel.json` is included with SPA rewrite rules so direct navigation to routes like `/services` or `/dashboard` resolves cleanly to `index.html`.
