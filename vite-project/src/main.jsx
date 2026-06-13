import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from "react";

// it is not working because it is not matching the react element structure
// const reactelement={
//     type:"a",
//     props:{
//         href:"https://www.google.com",
//         target:'_blank'
//     },
//     children:"Click to go to google"
// } 

//it is working 
// function MyApp(){
//     return(
//         <div>hello World!!!</div>
//     )
// }

//it is working
// const anotherelement=(
//     <a href="https://www.google.com" target="_blank">
//            Click to go to google
//     </a>
// )

const reactElement = React.createElement(
    "a",  // type
    {    // props
        href: "https://www.google.com",
        target: "_blank"
    },
    "Click to go to google"  // children
);


createRoot(document.getElementById('root')).render(
    // MyApp()
    // anotherelement
    // reactElement
    <App />

)
