import React, { useState } from "react";
import Header from "../Header/Header";

function Keyboard(props) {
  const [inputValue, setInputValue] = useState("");
 
  function handleKeyPress(key) {
    setInputValue(inputValue + key);
    const data = [inputValue + key];
    props.onData(data);
  }

  function handleBackspace() {
    setInputValue(inputValue.slice(0, -1));
    const data = [inputValue.slice(0,-1)];
    props.onData(data);
  }

  const arabicKeys = [
    ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج"],
    ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك"],
    ["ظ", "ط", "ذ", "د", "ز", "ر", "و", "ة", "ى"],
    [" ", " ", " ", " ", " ", " ", " ", " ", ".", "إ"],
  ];

  <Header val={inputValue}/>
  return (
    <>
    <div className="flex justify-center items-center fixed w-auto h-1/3 bg-gray-200 z-30 ml-32 mt-10">
      {/* <input value={inputValue} /> */}
      <div className="">
        {arabicKeys.map((row, i) => (
          <div key={i} className="">
            {row.map((key) => (
              <button key={key} onClick={() => handleKeyPress(key)}   className={
                key === " "
                  ? "w-10 h-10 bg-gray-300"
                  : "w-10 h-10 bg-white border border-slate-700 drop-shadow-lg"
              }>
                {key}
              </button> 
            ))}
          </div>
        ))}
        <div className="flex bg-gray-200 flex-col absolute h-1/3 ml-[443px] gap-2 mt-[-173px]">
                      <button onClick={() => handleBackspace()} className="w-full h-1/2">Backspace</button>
                      
        </div>
        <div className="flex bg-gray-200 flex-col absolute h-1/3 w-1/6 ml-[423px] gap-2 mt-[-133px]">
           <button onClick={() => handleBackspace()} className="w-1/3 h-1/2 bg-white">Enter</button>              
        </div>
        <div className="flex bg-gray-200 flex-col absolute h-1/3 w-1/6 ml-[403px] gap-2 mt-[-93px]">
           <button onClick={() => handleBackspace()} className="w-1/3 h-1/2 bg-white">Shift</button>              
        </div>

     
      </div>
     

    </div>
        </>
  );
}

export default Keyboard;
