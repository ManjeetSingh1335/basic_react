import { useState, useCallback, useEffect,useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");


  //Password Generator
  //useCallback
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length+1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed,setPassword]);
  
  //useEffect
  useEffect(() => {
    passwordGenerator();
  }, [length,numberAllowed,charAllowed,passwordGenerator]);

  //useRef
  const passref=useRef(null);

  const copyPasswordToClipboard=useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passref.current?.select()
    // passref.current?.setSelectionRange(0, 99999);
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-green-400 bg-gray-800">
      <h1 className="text-xl text-center mb-4">🔐 Password Generator</h1>

        {/* Password Field */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          readOnly
          className="outline-none w-full py-2 px-3 text-white bg-gray-700"
          placeholder="Password"
          ref={passref}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-700 text-white px-3"
        >Copy
        </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 text-sm">
        
          {/* Length */}
          <div className="flex items-center gap-2">
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e)=> setLength(e.target.value)}
          />
          <label>Length: {length}</label>
          </div>

          {/* Include Special Characters */}
          <div className='flex items-center gap-2'>
           <input
           type='checkbox'
           defaultChecked={charAllowed}
           onChange={() => setCharAllowed((prev) => !prev)}
           />
           <label>Include Special Characters</label>
          </div>

          {/* Include Numbers */}
          <div className='flex items-center gap-2'>
           <input
           type='checkbox'
           defaultChecked={numberAllowed}
           onChange={() => setNumberAllowed((prev) => !prev)}
           />
           <label>Include Numbers</label>
          </div>



       
      </div>
    </div>
  );
}

export default App;