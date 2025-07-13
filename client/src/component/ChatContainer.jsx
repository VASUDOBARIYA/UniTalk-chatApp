import React, { useEffect, useRef } from 'react';
import assets,{messagesDummyData} from '../assets/assets';
import { formateTime } from '../lib/time';

const ChatContainer = (
    {
        selectedUser,
        setselectedUser
    }
    ) => {
        const scrollend = useRef()
        
        useEffect(()=>{
            if(scrollend.current) {
                scrollend.current.scrollIntoView({behavior:"smooth"})
            }
        })
    return selectedUser ? (
        <div className='h-full overflow-scroll relative backdrop-blur-lg'>
            {/* Header section */}
            <div className='flex items-center gap-3 py-3 mx-4 border-b w-160 border-stone-500'>
                <img src={assets.profile_alison} className='w-12 h-12 rounded-full' />
                <p className='flex-1 text-lg text-black flex items-center gap-2'> {selectedUser.fullName}<span className={`h-2 w-2 rounded-full bg-green-500`}></span></p>
                <img onClick={()=>(setselectedUser(null))} src={assets.back} className='md:hidden max-w-7 cursor-pointer'/>
                <img src={assets.info} className='max-md:hidden max-w-5' />
            </div>
            {/* Chat section */}
            <div className=' flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 '>
                {messagesDummyData.map((msg,idx)=>(
                    <div className={`flex items-end gap-2 justify-end ${msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse '}` } key={idx}>
                        {msg.image ? (
                            <img src={msg.image} className='max-w-[230px] border-gray-700 overflow-hidden mb-8'/>
                        ) : (
                            <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all text-black ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none bg-green-500/30' : 'rounded-bl-none bg-cyan-500/30'}`}>{msg.text}</p>    
                        )}
                        <div className='text-center text-xs '>
                            <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar : assets.profile_alison} className='rounded-full w-7' />
                            <p className='text-gray-500 '>{formateTime(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}
                <div ref={scrollend}></div>
            </div>
            {/* bottom area */}
            <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 '>
                <div className='flex-1 flex items-center bg-gray-300 px-3 rounded-full '>
                    <input type="text" name="" placeholder='send a message' id='' className='flex-1 p-3 rounded-lg text-black placeholder-gray-400 text-sm border-none outline-none'/>
                    <input type="file" name="" id="image" accept='image/png,image/jpg' hidden/>
                    <label htmlFor="image"><img src={assets.share_image} alt="" className='w-5 m-2 cursor-pointer' /></label>
                </div>
                <img src={assets.send} alt="" className='w-5 mr-2 cursor-pointer'/>
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
