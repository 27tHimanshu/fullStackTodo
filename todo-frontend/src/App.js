import React from 'react'
import './App.css'
import { useState } from 'react'

const App = () => {
  const [todos,setTodos] = useState([]);
  const [inputValue,setInputValue] = useState('');
  
  const handleChange = (e) => {
     console.log(e.target.value);
     setInputValue(e.target.value);
  }

  const handleSubmit = async()=>{
      try{
        
      }
      catch(err){
        console.log(err);
      }
  }

  return (
    <div className="outer">
      <div className="todobox">
         <h1> To-Do List </h1>
        <input type="text"
          value={inputValue}
          placeholder='Enter To-do'
          onChange={handleChange}
        />
        <button onClick={handleSubmit}> Add To-Do </button>
        <div className="todos">
          <ul>
            {
               
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;