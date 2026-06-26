import React,{useId} from 'react';
const Input=React.forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
}, ref){
    const id=useId();
    return(
        <div className="w-full text-left">

            {label && <label 
                className='inline-block mb-2 pl-1 text-sm font-medium text-slate-300' 
                htmlFor={id}>
                {label}
            </label>
            }


            <input 
                type={type}
                className={`px-4 py-2.5 rounded-xl bg-slate-900/40 text-slate-100 placeholder-slate-500 outline-none focus:bg-slate-900/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 duration-200 border border-slate-800 w-full transition-all ${className}`}
                ref={ref}
                {...props}
                id={id}
            />

        </div>
    )
})

export default Input