import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DeveloperPortfolio from './DeveloperPortfolio.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DeveloperPortfolio />
  </React.StrictMode>
)