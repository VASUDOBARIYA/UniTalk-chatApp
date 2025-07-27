import React,{useState, useEffect} from 'react';
import assets,{imagesDummyData} from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { MessageContext } from '../../Context/messageContext';

const MediaContainer = () => {
    const {logout, onlineUser} = useContext(AppContext);
    const {selecteduser, messages} = useContext(MessageContext);
    const [msgimg, setmsgimg] = useState([]);
    //get all images from messages
    useEffect(() => {
        setmsgimg(
            messages.filter((msg) => msg.image).map((msg) => msg.image)
        )
    }, [messages]);

    return selecteduser && (
        <div className={`bg-[#8185B2]/10 w-full relative overflow-y-scroll ${selecteduser ? "max-md:hidden" : ""}`}>

            <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
                <img src={selecteduser?.profilePic || assets.avatar} alt=""  className='rounded-full w-20 aspect-[1/1]'/>
                <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2 '>
                    {onlineUser.includes(selecteduser._id) && <span className='w-2 h-2 rounded-full bg-green-500'></span>}
                    {selecteduser.name}
                </h1>
                <p className='px-10 mx-auto'>
                    {selecteduser.bio}
                </p>
            </div>

            <hr className='border-[ffffff50] my-4'/>

            <div className='px-5 text-sm '>
                <p>Media</p>
                <div className='max-h-[200px] mt-2 overflow-y-scroll grid grid-cols-2 gap-4 opacity-80 '>
                    {msgimg.map((url,idx)=>(
                        <div onClick={()=>window.open(url)} key={idx} className='cursor-pointer rounded'>
                            <img src={url} alt="" className='h-full rounded-md '/>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex items-center gap-2 mt-15 justify-center absolute bottom-25 left-25'>
                <a href="https://www.instagram.com/" target='_blank' rel='noopnernoreferrer'><img src={assets.instagram} alt="instagram" className='w-10 active:scale-95 hover:opacity-40'/></a>
                <a href="https://www.facebook.com/" target='_blank' rel='noopnernoreferrer'><img src={assets.facebook} alt="facebook" className='w-10 active:scale-95 hover:opacity-40'/></a>
                <a href="https://www.twitter.com/" target='_blank' rel='noopnernoreferrer'><img src={assets.twitter} alt="twitter" className='w-10 active:scale-95 hover:opacity-40'/></a>
            </div>
            <button onClick={logout} className='absolute bottom-5 left-1/2 transform -translate-x-1/2  bg-cyan-800 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer active:scale-95'>Logout</button>
        </div>
    ) 
}

export default MediaContainer;
