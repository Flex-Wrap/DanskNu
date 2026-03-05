# DanskNu - Vite React TypeScript Project

## Project Overview
DanskNu is a React + TypeScript application built with Vite for fast development and optimized builds.

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
Dependencies have been installed. To reinstall:
```bash
npm install
```

### Development
Start the development server:
```bash
npm run dev
```
The app will be available at http://localhost:5173/

### Build
Create an optimized production build:
```bash
npm run build
```

### Preview
Preview the production build locally:
```bash
npm run preview
```

## Project Structure
```
src/
  ├── App.tsx       # Main React component
  ├── App.css       # App styles
  ├── main.tsx      # React DOM entry point
  └── vite-env.d.ts # Vite environment types
public/             # Static assets
index.html          # HTML entry point
vite.config.ts      # Vite configuration
tsconfig*.json      # TypeScript configurations
```

## Tech Stack
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **ESLint** - Code linting

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
