function customrender(reactelement,container){
    const domelement=document.createElement(reactelement.type)
    // Set attributes from props
    for(const prop in reactelement.props){
        // Skip children prop
        if(prop==="children") continue; 
        domelement.setAttribute(prop, reactelement.props[prop])
    }
    // Set text content(children)
    // domelement.textContent=reactelement.children;
    domelement.innerHTML=reactelement.children;
    // Append to container
    container.appendChild(domelement);
}
const reactelement={
    type:"a",
    props:{
        href:"https://www.google.com",
        target:'_blank'
    },
    children:"Click to go to google"
}


const maincontainer=document.getElementById("root");
customrender(reactelement,maincontainer);





