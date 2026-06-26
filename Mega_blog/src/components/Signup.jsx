import {useState} from 'react'
import authService from '../appwrite/auth.js'
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {Button,Input,Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'


function Signup() {

    const navigate=useNavigate();
    const [error,setError]=useState("");
    const dispatch=useDispatch();
    const {register, handleSubmit}=useForm();

    const create=async(data)=>{ 
        setError("");
        try{
            const userData=await authService.createAccount(data);
            if(userData){
                const userData=await authService.getCurrentUser();
                if(userData) dispatch(login({userData}));
                navigate("/");
            }
        }catch(error){
            setError(error.message);
        }
    }


  return (
    <div className="flex items-center justify-center w-full min-h-[70vh] px-4 py-12">
        <div className="mx-auto w-full max-w-md glass-card rounded-2xl p-8 md:p-10 border border-slate-800 shadow-2xl relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="mb-6 flex justify-center">
                <span className="inline-block">
                    <Logo />
                </span>
            </div>
            
            <h2 className="text-center text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
                Create Account
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-semibold text-indigo-400 transition-all duration-200 hover:text-indigo-300 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            
            {error && (
                <div className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl mt-6 text-sm text-center font-medium">
                    {error}
                </div>
            )}
               
            <form onSubmit={handleSubmit(create)} className="mt-8">
                <div className='space-y-5'>
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <Input
                        label="Email Address"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button type="submit" className="w-full mt-2">
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup

