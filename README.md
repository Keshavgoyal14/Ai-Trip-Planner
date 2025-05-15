#🧠 AI Trip Planner
An intelligent travel planning web app powered by Gemini AI, Firebase, and Google Authentication. Users can generate personalized travel itineraries by selecting their travel preferences (like destination, duration, interests, and budget) through an interactive form interface. The app uses AI to automatically create optimized day-wise itineraries based on these inputs.
🌐 Live Demo
https://ai-trip-planner-beige.vercel.app

✨ Features
🔐 Google Sign-In Authentication
🧳 Smart travel itinerary generation via Gemini AI
📍 Select destinations, travel style, budget, and duration
💾 Real-time data syncing with Firebase
🔗 Sharable trip plans via unique links
💾 Save trip history
📱 Responsive UI with React + Tailwind CSS
🚀 Fast performance via Vite

🔧 Tech Stack
Category	           Technology
Frontend	       React, Tailwind CSS, Vite
Backend (AI)	   Google Gemini via @google/genai
Auth & DB     	 Firebase Authentication & Realtime Database
Hosting	                 Vercel 


🔍 How It Works
The AI Trip Planner app helps users generate personalized travel itineraries using a combination of AI, Firebase, and Google Authentication.

1. User Authentication
Users log in securely using Google Sign-In.
Authentication is managed through Firebase Authentication.

2. Trip Preferences Input
After login, users provide trip details such as:
Destination(s)
Travel duration
Budget
Interests (e.g., adventure, culture, relaxation)

3. AI-Powered Itinerary Generation
User input is sent to Gemini AI via the @google/genai SDK.
The AI generates a detailed day-wise travel plan, customized to the user's preferences.

4. Realtime Database Sync
The generated itinerary is saved in Firebase Realtime Database, linked to the authenticated user.
This allows:
Real-time retrieval of past itineraries

5. Sharable Itinerary Link
Each itinerary gets a unique sharable link (either by Firebase path or generated token).
Users can share their travel plans with friends and family.

6. Responsive & Fast UI
The app is built with React and styled using Tailwind CSS.

Bundled using Vite for optimal performance.
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
