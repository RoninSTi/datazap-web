# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Lint/Test Commands
- Development: `npm run dev` - Start Next.js dev server
- Build: `npm run build` - Build for production
- Start: `npm run start` - Start production server
- Lint: `npm run lint` - Run ESLint
- Format: `npm run format` - Fix linting and format with Prettier
- Database:
  - Connect: `npm run db:connect`
  - Push schema: `npm run db:push`
  - Generate Prisma client: `npm run db:generate`

## Code Style Guidelines
- TypeScript for all files (.ts, .tsx)
- Use React functional components
- Follow Airbnb + TypeScript styleguide
- Imports: Use `simple-import-sort` ordering
- Formatting: 2 spaces, single quotes, no semicolons
- Use named exports over default exports
- Use explicit type imports with `import type`
- Unused variables prefixed with underscore
- Components use PascalCase; files use PascalCase.tsx
- Hooks use camelCase with 'use' prefix
- Use React Hook Form for form handling
- State management with Zustand
- Use Tailwind CSS for styling