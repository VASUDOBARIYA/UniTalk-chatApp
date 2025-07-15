import React,{useState} from 'react';
import assest from '../assets/assets'


const Login = () => {
    const [curState, setcurState] = useState("Sign up");
    const [fullname, setfullname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [bio, setbio] = useState("");
    const [isdatasubmitted, setisdatasubmitted] = useState(false);
    const submithandler = (e)=>{
        e.preventDefault();
        if(curState === 'Sign up' && !isdatasubmitted){
            setisdatasubmitted(true)
            return;
        }
    }

    return (
        <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-xl'>
            {/* left */}
            <div>
                <img src={assest.logo} alt="" className=' w-[min(23vw,188px)]'/>
                <h1 className='flex items-center justify-center text-2xl mt-2'>Chat anytime,anywhere</h1>
            </div>

            {/* right */}
            <form 
            onSubmit={submithandler}
            className='border-2 bg-white/8 text-black border-gray-500 p-20 flex flex-col gap-6
            rounded-lg shadow-lg'>
                <h2 className='font-medium flex text-2xl justify-between items-center pb-2'>
                    {curState}
                    {isdatasubmitted && (<img src={assest.back} onClick={()=>setisdatasubmitted(false)} className='w-5 cursor-pointer' alt="" />)}
               </h2>
               {curState === 'Sign up' && !isdatasubmitted && (
                <input value={fullname} onChange={(e)=>setfullname(e.target.value)} type="text" placeholder='FullName' id="" className={"p-2 border border-gray-500  rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-none"} required/>
               )}
               {!isdatasubmitted && (
                <>
                <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" placeholder='Email' id="" className='p-2 border border-gray-500  rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-none' required/> 
                <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" placeholder='Password' id="" className='p-2 border border-gray-500  rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-none' required/>
                </>
               )}
               {curState === 'Sign up' && isdatasubmitted && 
               (
                <textarea name="" id="" rows={4} placeholder='add bio' required value={bio}
                onChange={(e)=>setbio(e.target.value)}
                className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-none'></textarea>
               )}
               <button type='submit' className='py-3 bg-cyan-800 rounded-md cursor-pointer text-white active:scale-95'>{curState === 'Sign up' ? "Create Account" : "Log in"}</button>

               {curState === 'Sign up' && 
               (
                <div className=' flex items-center gap-2 text-sm text-gray-500'>
                <input type="checkbox" name="" id="" required/>
                <p>Agree to the term & privecy policy.</p>
               </div>
               )}
               <div>
               {curState === "Sign up" ? (
                <p className='text-sm text-gray-600'>Already have an account?<span
                onClick={()=>{setcurState("Login"),setisdatasubmitted(false)}}  className='font-medium text-cyan-800 cursor-pointer'> Login here</span></p>
               ) : (
                <p className='text-sm text-gray-600'>Create an account <span onClick={()=>setcurState("Sign up")} className='font-medium text-cyan-800 cursor-pointer'>Click here</span></p>
               )}
               </div>
            </form>
        </div>
    );
}

export default Login;
