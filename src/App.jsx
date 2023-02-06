import { useState,useEffect } from 'react'
import './App.css'
import Dice from './Components/Dice'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
function App() {

  const [allNewDiceArray, setAllNewDiceArray] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const val = allNewDiceArray[0].value
    const res = allNewDiceArray.every((item)=>{
      return item.isHeld === true && item.value===val;
    })
    if(res){
      setTenzies(true);
      console.log("You Won!")
    }
  }, [allNewDiceArray])
  

  function generateDie() {
    return { value: Math.floor(Math.random() * 6) + 1, isHeld: false, id: nanoid() }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie())
    }
    return newDice
  }

  function generateNewArray() {
    setAllNewDiceArray(oldArray => {
      return oldArray.map(item => {
        return item.isHeld ? item : generateDie();
      })
    })
  }

  function generateNewGame(){
    setTenzies(false)
    setAllNewDiceArray(oldArray => {
      return oldArray.map(()=> {
        return generateDie();
      })
    })
  }

  function holdDice(id) {
    setAllNewDiceArray(oldDice => {
      return oldDice.map(item => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    })
  }

  const diceElement = allNewDiceArray.map((item) => {
    return <Dice key={item.id} value={item.value} isHeld={item.isHeld} holdDice={() => holdDice(item.id)} />
  })


  return (
    <main className='main-container'>
      {tenzies && <Confetti/>}
      <div className='container'>
        <div>
          <h1>Tenzies</h1>
          <p className='information'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className='dice-container'>
          {diceElement}
        </div>
        {tenzies? <button onClick={generateNewGame} className="roll-button">New Game</button> : <button onClick={generateNewArray} className="roll-button">Roll</button>}
      </div>
    </main>
  )
}

export default App
