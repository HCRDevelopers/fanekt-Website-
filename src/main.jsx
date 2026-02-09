// PWA Troubleshooting Guide for Live Servers:
// 1. HTTPS Required: PWA features only work on HTTPS (except localhost)
// 2. Manifest Issues: Ensure manifest.json is accessible and has proper icons
// 3. Service Worker: Check if SW is registered and caching properly
// 4. Install Prompt: May be blocked by browser if not meeting criteria
// 5. Cache Issues: Clear browser cache and hard refresh if issues persist

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MyContextProvider } from './context/context.jsx'

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use absolute path for live server compatibility
    const swUrl = process.env.NODE_ENV === 'production' 
      ? '/sw.js' 
      : '/sw.js';
    
    navigator.serviceWorker.register(swUrl)
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MyContextProvider>
        <App />
      </MyContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
