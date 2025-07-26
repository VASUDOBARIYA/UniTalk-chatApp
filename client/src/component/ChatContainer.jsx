import React, { useEffect, useRef, useState, useContext } from 'react';
import assets,{} from '../assets/assets';
import { formateTime } from '../lib/time';
import { AppContext } from '../../Context/AppContext';
import { MessageContext } from '../../Context/messageContext';
import toast from "react-hot-toast";

const ChatContainer = () => {
        const scrollend = useRef()
        const {messages, selecteduser, setSelecteduser, sendMessages, getMessages} = useContext(MessageContext);
        const {onlineUser, authUser} = useContext(AppContext);

        useEffect(() => {
            if(selecteduser){
                getMessages(selecteduser._id);
            }
        }, [selecteduser]);

        useEffect(()=>{
            if(scrollend.current && messages) {
                scrollend.current.scrollIntoView({behavior:"smooth"})
            }
        },[messages])

        const [input, setinput] = useState("");

        //handle sending message
        const handleSendmsg = async (e)=>{
            e.preventDefault();

            if(input.trim() === "") return null;

            await sendMessages({text : input.trim()})

            setinput("");
        }
        
        //handle sending image
        const handleSendimg = async (e) => {
            const file = e.target.files[0];
            if(!file || !file.type.startsWith('image/')){
                toast.error("please select an image file")
                return
            }

            const reader = new FileReader()
            reader.onloadend = async () => {
                await sendMessages({image : reader.result})
                e.target.value = "";
            }
            reader.readAsDataURL(file);
        }

    return selecteduser ? (
        <div className='h-full overflow-scroll relative backdrop-blur-lg'>
            {/* Header section */}
            <div className='flex items-center gap-3 py-3 mx-4 border-b w-240 border-stone-500'>
                <img src={selecteduser.profilePic || assets.avatar} className='w-12 h-12 rounded-full' />
                <p className='flex-1 text-lg text-black flex items-center gap-2'> 
                    {selecteduser.name}    
                    {onlineUser.includes(selecteduser._id) &&
                    <span className={`h-2 w-2 rounded-full bg-green-500`}>
                    </span>
                    }
                </p>
                <img onClick={()=>(setSelecteduser(null))} src={assets.back} className='md:max-w-7 cursor-pointer'/>
                <img src={assets.info} className='max-md:hidden max-w-5 cursor-pointer' />
            </div>
            {/* Chat section */}
            <div className=' flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
                {messages.map((msg,idx)=>(
                    <div className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse '}` } key={idx}>
                        {msg.image ? (
                            <img src={msg.image} className='max-w-[230px] border-gray-700 overflow-hidden mb-8'/>
                        ) : (
                            <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all text-black ${msg.senderId === authUser._id ? 'rounded-br-none bg-green-500/30' : 'rounded-bl-none bg-cyan-500/30'}`}>{msg.text}
                            <p className='text-gray-500 text-xs'>{formateTime(msg.createdAt)}</p>
                            </p>   
                        )}
                    </div>
                ))}
                <div ref={scrollend}></div>
            </div>
            {/* bottom area */}
            <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 '>
                <div className='flex-1 flex items-center bg-gray-300 px-3 rounded-full '>
                    <input type="text" name="" value={input} onChange={(e)=>{setinput(e.target.value)}} placeholder='send a message' onKeyDown={(e)=> e.key==="Enter" ? handleSendmsg(e) : null } id='' className='flex-1 p-3 rounded-lg text-black placeholder-gray-400 text-sm border-none outline-none'/>
                    <input onChange={handleSendimg} type="file" name="" id="image" accept='image/png,image/jpg' hidden/>
                    <label htmlFor="image"><img src={assets.share_image} alt="" className='w-5 m-2 cursor-pointer' /></label>
                </div>
                <img onClick={handleSendmsg} src={assets.send} alt="" className={`w-7 mr-2 cursor-pointer active:scale-85`}/>
            </div>
        </div>
    ) : (
        <div className='flex items-center flex-col justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
            <img src={assets.logo} className='max-w-16' />
            <p className='text-lg font-md text-black'>Chat anytime, anywhere</p>
        </div>
    );
}

export default ChatContainer;
