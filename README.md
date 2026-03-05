# DanskNu

An accessible and user-friendly app for preparing for the Danish citizenship exam, designed for sustainable learning and ethical design principles. This project was developed with AI assistance, building upon a previous iteration from the **Danico** repository.

## About the App

DanskNu helps users prepare for the Danish citizenship exam through interactive quizzes covering Danish history, culture, government, and society. The app features:

- **Interactive Quizzes** - Engaging question-and-answer formats with immediate feedback
- **Progress Tracking** - Monitor your learning progress with visual indicators
- **Personalized Learning** - Revisit weak areas based on your quiz performance
- **Newsletter Integration** - Stay updated with language tips and resources
- **Accessible Design** - Built with inclusion and accessibility at its core

## Key Features

### Performance & Sustainability
- **WebP Image Format** - All images are optimized as WebP for faster loading and reduced bandwidth, supporting sustainable digital practices
- **Streamlined Bundle** - Minimalist design approach reduces unnecessary overhead

### User Experience
- **Dual Coding Approach** - Simple, clean interface combined with robust backend technology for an intuitive user experience
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Accessible Components** - Designed with semantic HTML and accessibility best practices

### Technical Stack
- **React 18** with **TypeScript** for type-safe, maintainable code
- **Vite** for fast development and optimized production builds
- **TanStack Router** for client-side routing
- **Supabase** as the backend - managing citizenship exam questions, answers, user responses, and email subscriptions
- **ESLint** for code quality standards

## Development

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_key
```

### Running Locally

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

### Code Quality

Run ESLint to check code standards:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/       # Reusable React components (Quiz, Forms, Cards, etc.)
├── routes/          # Page routes (TanStack Router)
├── context/         # React Context for global state
├── utils/           # Utility functions, Supabase client setup
└── App.tsx          # Main application component
```

## Accessibility & Sustainability

This app demonstrates ethical design principles by prioritizing:
- **Accessibility first** - WCAG compliance, keyboard navigation, semantic HTML
- **Performance optimization** - WebP images, minimal JS, fast load times
- **Inclusive design** - Simple, clear language with support for image-based learning
- **Sustainable practices** - Optimized for lower bandwidth consumption

## License

MIT
