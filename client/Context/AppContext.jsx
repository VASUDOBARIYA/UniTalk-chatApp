import { createContext, useState, useEffect } from "react"
import axios from 'axios'
import toast from "react-hot-toast";
import {io} from "socket.io-client"

export const AppContext = createContext()

const backendurl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendurl

export const AppProvider = ({children})=>{

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [socket, setSocket] = useState(null);
    
    //check if user is authenticated then set the user data and connect with socket
    const CheckAuth = async ()=>{
        if(!token) return;
        try {
            const {data} = await axios.get('/api/user/check')

            if(data.success){
                setAuthUser(data.user)
                connectSocket(data.user);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //login function for user authentication and socket connection 

    const login = async (state,credential)=>{
        try {
            const { data } = await axios.post(`/api/user/${state}`,credential)
            console.log(data);
    
            if(data.success){
                setAuthUser(data.userdata);
                connectSocket(data.userdata);
    
                axios.defaults.headers.common['token'] = data.token;
                setToken(data.token);
                localStorage.setItem('token',data.token);
                toast.success(data.message);
            }
            else{
                console.log("error in login")
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error error in login");
            toast.error(error.message);
        }
    }

    //logout function for user logout and socket disconnection
    const logout = async ()=>{
        localStorage.removeItem('token');
        setToken(null)
        setAuthUser(null)
        setOnlineUser([])
        axios.defaults.headers.common['token'] = null;
        toast.success("Logout Successfully")
        socket.disconnect();
    }

    //update profile function to handle user profile updates
    
    const updateProfile = async (body)=>{
        try {
            const { data } = await axios.put('/api/user/update-profile', body);
            console.log(data)

            if(data.success){
                setAuthUser(data.user)
                toast.success("Profile updated successfully")
            }
            else{
                console.log("error upload")
                toast.error("Something went wrong")
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //connect Socket function to hendle Scoket function and online users update 
    const connectSocket = (userData)=>{
        if(!userData || socket?.connected) return;
        
        const newSocket = io(backendurl,{
            query:{
                userId : userData._id
            }
        })

        newSocket.connect();
        setSocket(newSocket);

        newSocket.on('getOnlineUsers',(userIds)=>{
            setOnlineUser(userIds);
        })
    }


    useEffect(() => {
        if(token){
            axios.defaults.headers.common['token'] = token;
        }
        CheckAuth();
    }, [token]);

    const value = {
        axios,
        authUser,
        onlineUser,
        socket,
        login,
        logout,
        updateProfile
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}