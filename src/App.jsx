import { useState, useCallback, useRef, useEffect} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [allowNumbers, setAllowNumbers] = useState(true);
  const [allowSymbols, setAllowSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = lowercase.toUpperCase();
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+=";

    let characters = lowercase + uppercase;
    characters += allowNumbers ? numbers : "";
    characters += allowSymbols ? symbols : "";

    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(password);
  }, [length, allowNumbers, allowSymbols, setPassword]);

  const passwordRef = useRef(null);
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, allowNumbers, allowSymbols,passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg p-5 my-8 bg-gray-800 text-orange-500">
          <h1 className='text-white text-center my-3'>Password generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              readOnly
              ref={passwordRef}
            ></input>
            <button
              onClick={copyPassword}
              className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            >copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={allowNumbers}
              id="numberInput"
              onChange={() => {
                  setAllowNumbers((prev) => !prev);
              }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={allowSymbols}
                  id="symbolInput"
                  onChange={() => {
                      setAllowSymbols((prev) => !prev )
                  }}
              />
              <label htmlFor="symbolInput">Symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
