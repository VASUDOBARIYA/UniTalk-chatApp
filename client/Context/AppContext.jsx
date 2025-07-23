import { createContext } from "react"
import axios from 'axios'

export const AppContext = createContext()

const backendurl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendurl

export const AppProvider = ({children})=>{
    const value = {
        axios
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}