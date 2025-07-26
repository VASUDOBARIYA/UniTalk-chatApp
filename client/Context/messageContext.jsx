import { createContext, useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import toast from "react-hot-toast";

export const MessageContext = createContext();

export const MessageProvider = ({children})=>{
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selecteduser, setSelecteduser] = useState(null);
    const [unseen, setUnseen] = useState({});
    const {socket, axios} = useContext(AppContext);

    //function to get all user for left sidebar
    const getUsers = async ()=>{
        try {
            const { data } =  await axios.get('/api/messages/users')

            if(data.success){
                setUsers(data.users)
                setUnseen(data.messages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to get all messages of selected user

    const getMessages = async (userId)=>{
        try {
           const { data } = await axios.get(`/api/messages/${userId}`)

           if(data.success){
                setMessages(data.messages)
           }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to send messages to seleted user

    const sendMessages = async (messages) =>{
         try {
            const { data } = await axios.post(`/api/messages/send/${selecteduser._id}`, messages)
            if(data.success){
                setMessages((prevmsg)=>[...prevmsg, data.newmsg])
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to seen messages for selected user

    const subscribeMsg = async () =>{
         try {
            if(!socket) return
            socket.on('newMessage',(newmsg)=>{
                if(selecteduser && newmsg.senderId === selecteduser._id){
                    newmsg.seen = true
                    setMessages((prevmsg)=>[...prevmsg,newmsg])
                    axios.put(`/api/messages/send/${newmsg._id}`)
                }
                else{
                    setUnseen((prevmsg)=>(
                        {...prevmsg, [newmsg.senderId] : prevmsg[newmsg.senderId] ? prevmsg[newmsg.senderId] + 1 : 1 }
                    ));
                }
            })
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to unsubscribe new messages

    const unsubscribeMsg = ()=>{
        if(socket) socket.off('newMessage');
    }

    useEffect(() => {
        subscribeMsg();
        return ()=>unsubscribeMsg()
    }, [socket, selecteduser]);


    const value = {
        messages,
        users,
        selecteduser,
        setSelecteduser,
        unseen,
        getMessages,
        getUsers,
        sendMessages,
        setUnseen
    }
    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    )
}