import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Tile from './Tile.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Tile />
  </StrictMode>
)
