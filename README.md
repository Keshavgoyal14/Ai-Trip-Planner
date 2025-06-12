
# TRIPMATE(AI Trip Planner)

An intelligent travel planning web app powered by Gemini AI, Firebase, and Google Authentication. Users can generate personalized travel itineraries by selecting their travel preferences (like destination, duration, interests, and budget) through an interactive form interface. The app uses AI to automatically create optimized day-wise itineraries based on these inputs.




## Demo

https://ai-trip-planner-beige.vercel.app/


## ✨ Features

🔐 Google Sign-In Authentication  
🧳 Smart travel itinerary generation via Gemini AI  
📍 Select destinations, travel style, budget, and duration  
💾 Real-time data syncing with Firebase  
💾 Save trip history  
✏️ Edit and 🗑️ delete saved trips  
🔗 Sharable trip plans via unique links  
🧾 Download AI-generated trip as a PDF  
📌 Clickable hotel/place names open in Google Maps  
🌗 Light/Dark mode toggle  
📱 UI with React + Tailwind CSS  
🚀 Fast performance via Vite  



## Tech Stack

### 🧩 Frontend
- React  
- Tailwind CSS  
- ShadCN UI  
- jsPDF (PDF generation)  
- React Router (page navigation)  
- Axios (API calls)  

### 🔧 Backend & Services
- Firebase (Database)  
- Google Identity Services (Sign-In & Authentication)  
- Gemini AI (via Google Generative AI SDK)  
- Google Maps API (Location & Navigation)

### ☁️ Hosting
- Vercel


## Screenshots
![image](https://github.com/user-attachments/assets/0ac5494d-6aa1-49c2-9d35-d32aafa0abcc)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory
```env
VITE_GOOGLE_API_KEY=your_google_maps_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_auth_client_id
```bash


Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Authors

- Keshav Goyal

## License

MIT License

Copyright (c) 2025 Keshavgoyal14
