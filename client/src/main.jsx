
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/sonner"
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <>
    <App />
    <Toaster closeButton/>
    </>
    
)
