# CineTrack Movie Discovery Hub

A simple and responsive movie discovery app built with React and Vite.

## Features

- Search movies using TMDB API
- Debounced search input (400ms) for optimized API calls
- Responsive movie card grid
- Loading, empty, and error states
- Add/Remove movies from watchlist
- Watchlist persistence via localStorage
- Dynamic movie details route (`/movie/:id`)
- Toggle between All Movies and My Watchlist

## Tech Stack

- HTML5
- CSS3 (Flexbox + CSS Grid)
- React.js (Hooks + Context)
- React Router
- TMDB API

## Folder Structure

- `src/components`: Reusable UI components
- `src/pages`: Screen-level pages (Home, Movie Detail)
- `src/context`: Global watchlist state
- `src/hooks`: Custom hooks (debounce)
- `src/services`: API service functions
- `src/utils`: Helpers (localStorage)

## Setup

1. Install dependencies:
   npm install
2. Create a `.env` file in the project root:
   VITE_TMDB_API_KEY=your_tmdb_bearer_token_here
3. Start the app:
   npm run dev

## Build

- Run production build:
  npm run build
- Preview build:
  npm run preview

## Technical Decisions / Trade-offs

- Used Context API instead of external state libraries to keep solution simple.
- Stored a lightweight movie object in watchlist for easy rendering offline.
- Used TMDB image URLs directly with fallback poster handling.
- Kept styling custom in raw CSS (no component libraries) to satisfy the assignment constraints.

## Deployment

This project is deployed on Vercel.

Live URL: https://cinetrack-pi.vercel.app/

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. In Vercel Project Settings -> Environment Variables, add:
   VITE_TMDB_API_KEY=your_tmdb_bearer_token_here
4. Deploy the project.

Vercel auto-detects Vite settings. If needed, use:
- Build Command: npm run build
- Output Directory: dist
