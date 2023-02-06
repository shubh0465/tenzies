import { useState } from 'react'
import './App.css'
import Dice from './Components/Dice'
import { nanoid } from 'nanoid';
function App() {


  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({ value: Math.floor(Math.random() * 6) + 1, isHeld: false, id: nanoid() })
    }
    return newDice
  }

  const [allNewDiceArray, setAllNewDiceArray] = useState(allNewDice())
  
  function generateNewArray() {
    setAllNewDiceArray(oldArray =>{
      return oldArray.map(item=>{
        return item.isHeld===false ? {...item, value : Math.floor(Math.random() * 6) + 1} : item;
      })
    })
  }
  
  function holdDice(id) {
    setAllNewDiceArray(oldDice =>{
      return oldDice.map(item=>{
        return item.id === id ? {...item, isHeld:!item.isHeld}:item;
      })
    })
  }
  
  const diceElement = allNewDiceArray.map((item) => {
    return <Dice key={item.id} value={item.value} isHeld={item.isHeld} holdDice={() => holdDice(item.id)} />
  })

  
  return (
    <main className='main-container'>
      <div className='container'>
        <div>
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className='dice-container'>
          {diceElement}
        </div>
        <button onClick={generateNewArray} className="roll-button">Roll</button>
      </div>
    </main>
  )
}

export default App
