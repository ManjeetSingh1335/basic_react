

import React from 'react';

export default function Button({
    children,
    type = "button",
    bgColor = "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button 
            type={type} 
            className={`px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-95 hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${bgColor} ${textColor} ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
}