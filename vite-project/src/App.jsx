import Newpro from "./newpro";

function App() {
  const name = "John Doe";
  const isboy=true;
  return (
    <>  
    <Newpro />
    <h1>Hello, {name}!</h1>
    {isboy && <p>Yes he is boy!!!</p>}
    </>
    
  );
};

export default App;