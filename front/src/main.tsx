import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Cadastro from './components/cadastro/cadastro.tsx'
import Login from './components/login/login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Cadastro />
    <hr style={{ margin: '40px 0' }} />
    <Login />
  </StrictMode>,
)
