import React, { use, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import assets, {userDummyData} from '../assets/assets';
import { AppContext } from '../../Context/AppContext';

const SideBar = (
    {
        selectedUser,
        setselectedUser
    }
    ) => {
    const {logout} = useContext(AppContext)
    const navigate = useNavigate()
    return (
        <div className={`p-5 h-full rounded-r-xl overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}bg-[#8185b2]/10`}>
            <div className='pb-5'>

                <div className='flex justify-between items-center'>
                    <img src={assets.logo} alt="logo" className='max-w-10'/>
                    <div className='relative left-25'>
                        <img src={assets.filter} alt="filter" className='max-w-10'/>
                    </div>
                    <div className='relative py-2 group '>
                        <img src={assets.menu} alt="menu" className='max-h-5 cursor-pointer'/>
                        <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-gray-200 border border-gray-600 hidden group-hover:block'>
                            <p 
                            onClick={()=>navigate('/profile')}
                             className='cursor-pointer text-sm'
                             >Edit profile</p>
                            <hr className='my-2 border-t-gray-500'/>
                            <p onClick={logout} className='cursor-pointer text-sm'>Logout</p>
                        </div>
                    </div>
                </div>
                
                <div className='bg-[#d0ccda] rounded-full flex items-center gap-2 py-2 px-4
                mt-5 '>
                    <img src={assets.search} alt="search"  className='max-w-3 cursor-pointer'/>
                    <input type="text" className='bg-transparent border-none outline-none text-black text-sm placeholder-[#646464] flex-1' placeholder='Search User'/>
                </div>
            </div>
            <div className='flex flex-col h-[calc(100%-120px)]'>
                {userDummyData.map((user,idx)=>(
                     <div key={idx} 
                      onClick={()=>{
                        setselectedUser(user)
                    }}
                      className={`relative flex items-center gap-2 p-2 pl-4 hover:bg-gray-300 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && "bg-[#284142]/30"}`}>
                        <img src={user?.profilePic || assets.avatar} alt="" className='w-[40px] aspect-[1/1] rounded-full'/>
                        <div className='flex-col leading-5 '>
                            <p>
                                {user.fullName}
                            </p>
                            {idx<3? <span className='text-green-400 text-xs'>online</span> : <span className='text-neutral-400 text-xs'>offline</span>}
                        </div>
                        {idx>2 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-cyan-500/50'>{idx}</p>}
                     </div>   
                ))}
            </div>
        </div>
    );
}

export default SideBar;