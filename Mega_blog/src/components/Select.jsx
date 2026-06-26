import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id=useId();
  return (
    <div className='w-full text-left'>

        {label && <label 
                    htmlFor={id} 
                    className='inline-block mb-2 pl-1 text-sm font-medium text-slate-300'>
                    {label}
                  </label>
        }

        <select
            ref={ref}
            {...props}
            id={id}
            className={`px-4 py-2.5 rounded-xl bg-slate-900/40 text-slate-100 outline-none focus:bg-slate-900/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 duration-200 border border-slate-800 w-full transition-all cursor-pointer ${className}`}
        >
            {options?.map((option)=>(
                <option key={option} value={option} className="bg-slate-900 text-slate-100">
                    {option}
                </option>
            ))}

        </select>
      
    </div>
  )
}

export default React.forwardRef(Select)
