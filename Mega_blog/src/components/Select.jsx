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
                    className='inline-block mb-2 pl-1 text-sm font-semibold text-slate-700'>
                    {label}
                  </label>
        }

        <select
            ref={ref}
            {...props}
            id={id}
            className={`px-4 py-2.5 rounded-xl bg-white text-slate-900 outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 duration-200 border border-slate-200 w-full transition-all cursor-pointer ${className}`}
        >
            {options?.map((option)=>(
                <option key={option} value={option} className="bg-white text-slate-900">
                    {option}
                </option>
            ))}

        </select>
      
    </div>
  )
}

export default React.forwardRef(Select)
