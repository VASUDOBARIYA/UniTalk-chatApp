import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { AppProvider } from '../Context/AppContext.jsx';
import { MessageProvider } from '../Context/messageContext.jsx';

createRoot(document.getElementById('root')).render(
    
    <BrowserRouter>
        <AppProvider>
            <MessageProvider>
                <App/>
            </MessageProvider>
        </AppProvider>
    </BrowserRouter>
)