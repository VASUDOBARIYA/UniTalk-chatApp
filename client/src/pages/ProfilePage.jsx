import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

const ProfilePage = () => {

    const [selectedimage, setselectedimage] = useState(null);
    const [name, setname] = useState("");
    const [bio, setbio] = useState("");
    const navigate = useNavigate();

    const submithandler = (e)=>{
        e.preventDefault();
        navigate('/')
    }

    return (
        <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center '>
            <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-600 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg '>
                <form onSubmit={submithandler} className='flex flex-col gap-5 p-10 flex-1'>

                    <h3 className='text-lg'>Profile Details</h3>

                    <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
                        <input onChange={(e)=>setselectedimage(e.target.files[0])} type="file" id='avatar' accept='.png , .jpg , .jpeg' hidden/>
                        <img src={selectedimage ? URL.createObjectURL(selectedimage) : assets.avatar}  alt="" className={`w-25 h-25 ${selectedimage && "rounded-full"}`}/>
                        { selectedimage ? "Change Avatar" : "Select Avatar"}    
                    </label>

                    <input onChange={(e)=>setname(e.target.value)}
                    value={name}
                    type="text" placeholder="your name" className='p-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ' required name="" id="" />

                    <textarea value={bio}
                    onChange={(e)=>setbio(e.target.value)}
                    className='p-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ' name="" id="" rows={4} required placeholder='Write profile bio'>
                    </textarea>

                    <button onSubmit className='p-2 text-lg bg-cyan-800 rounded-full cursor-pointer text-white active:scale-95'>Save changes</button>
                </form>
                <img src={assets.logo} className='max-w-44 aspect-square mx-10 max-sm:mt-10' alt="" />
            </div>
        </div>
    );
}

export default ProfilePage;
