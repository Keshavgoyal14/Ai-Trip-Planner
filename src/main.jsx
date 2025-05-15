import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter} from 'react-router-dom'
import { DarkModeProvider } from './components/DarkMode/index.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
  <StrictMode>
    <DarkModeProvider>
   <App/>
   </DarkModeProvider>
  </StrictMode>
  </GoogleOAuthProvider></BrowserRouter>
)
