import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice.js'
import {Button, Input, Logo} from "./index.js"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth.js"
import {useForm} from "react-hook-form"


function Login() {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm();
    const [error,setError]=useState("");

    const login=async(data)=>{
        setError("")
        try{
            const session=await authService.login(data);
            if(session){
                const userData=await authService.getCurrentUser();
                if(userData){
                    dispatch(authLogin({userData}));
                    navigate("/")
                }
            }
        }catch(error){
            setError(error.message);
        }
    }


  return (
    <div className='flex items-center justify-center w-full min-h-[70vh] px-4 py-12'>
        <div className="mx-auto w-full max-w-md glass-card rounded-2xl p-8 md:p-10 border border-slate-800 shadow-2xl relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="mb-6 flex justify-center">
                <span className="inline-block">
                    <Logo />
                </span>
            </div>
            
            <h2 className="text-center text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
                Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
                Don&apos;t have an account?&nbsp;
                <Link
                    to="/signup"
                    className="font-semibold text-indigo-400 transition-all duration-200 hover:text-indigo-300 hover:underline"
                >
                    Create one free
                </Link>
            </p>
            
            {error && (
                <div className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl mt-6 text-sm text-center font-medium">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
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
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button
                        type="submit"
                        className="w-full mt-2"
                    >
                        Sign In
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
