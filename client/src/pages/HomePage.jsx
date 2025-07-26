import React, { useState } from 'react';
import assets from '../assets/assets.js';
import ChatContainer from '../component/ChatContainer'
import MediaContainer from '../component/MediaContainer'
import Sidebar from '../component/SideBar'
const HomePage = () => {
    const [isUserSelected, setisUserSelected] = useState(false);
    return (
        <div className='border w-full h-screen sm:px-[6%] sm:py-[3%]'>
            <div className={`backdrop-blur-md border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid relative ${isUserSelected ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'grid-cols-[1fr_3fr]'}`}>
                <Sidebar />
                <ChatContainer />
                <MediaContainer selectedUser={isUserSelected} />
            </div>
        </div>
    );
};


export default HomePage;
