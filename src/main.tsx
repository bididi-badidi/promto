import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StorageProvider } from './context/StorageContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StorageProvider>
      <App />
    </StorageProvider>
  </StrictMode>,
)
