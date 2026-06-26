

import React from 'react';

export default function Button({
    children,
    type = "button",
    bgColor = "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button 
            type={type} 
            className={`px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-95 hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${bgColor} ${textColor} ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
}