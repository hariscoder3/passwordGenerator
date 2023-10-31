import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(6);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordRef = useRef();
  
// function password Generator
 const passwordGenerator = useCallback(()=>{

  let password = "";
  let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(allowNumber) string += "0123456789"
  if(allowChar) string += "!;#$%&'()*+,-./:;<=>?@[]^_`{|}~"
  for (let i = 1; i <= length; i++) {
    let index = Math.floor(Math.random()*string.length)+1;
    password += string.charAt(index);
  }
  setPassword(password);

 },[length,allowNumber,allowChar,setPassword])

 const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(Password);
 },[Password])

//  use effect 
 useEffect(()=>{
  passwordGenerator();
 },[length,allowChar,allowNumber,passwordGenerator])
  
 return (
    
      <div className="w-full max-w-md mx-auto px-4 py-3 my-8 bg-gray-800">
        <h1 className="text-white text-center my-3 text-4xl">Password Generator</h1>
        <div className="flex justify-center mb-4">
          <input type="text"
          value={Password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="text-white outline-none bg-blue-500 py-1 px-3">Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex text-center gap-x-1">
            <input type="range" 
            className="cursor-pointer"
            min={6}
            max={100}
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label className="text-white">length: {length}</label>
          </div>
          <div className="flex gap-x-1 items-center">
            <input type="checkbox" 
            className=""
            defaultChecked={allowNumber}
            onChange={()=>{
              setAllowNumber((prev)=>!prev)
            }}
            />
            <label className="text-white">Numbers</label>
          </div>
          <div className="flex gap-x-1 items-center">

            <input type="checkbox" 
            className=""
            defaultChecked={allowChar}
            onChange={()=>{setAllowChar((prev)=>!prev)}}
            />
            <label className="text-white">Characetrs</label>
          </div>
        </div>
      </div>
  )
}

export default App
