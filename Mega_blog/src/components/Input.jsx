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
                className='inline-block mb-2 pl-1 text-sm font-semibold text-slate-700' 
                htmlFor={id}>
                {label}
            </label>
            }


            <input 
                type={type}
                className={`px-4 py-2.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 duration-200 border border-slate-200 w-full transition-all ${className}`}
                ref={ref}
                {...props}
                id={id}
            />

        </div>
    )
})

export default Input