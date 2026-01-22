import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx';
// import ConfiguredToast from './components/ConfiguredToast.jsx';
import { Toaster } from 'react-hot-toast';


const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element. Ensure index.html has a <div id='root'></div>");
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000, }} />
      {/* <ConfiguredToast /> */}
      <App />
    </AuthProvider>
  </StrictMode>,
)
