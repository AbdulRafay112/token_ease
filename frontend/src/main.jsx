import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppState from './State/State.jsx'
createRoot(document.getElementById('root')).render(
    <AppState>
    <App />
    </AppState>
)
