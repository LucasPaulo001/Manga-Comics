import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { UserPovider } from './contexts/UserContext.jsx'
import { SearchProvider } from './contexts/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserPovider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </UserPovider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
