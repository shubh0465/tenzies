import { useState } from 'react'
import './App.css'
import Dice from './Components/Dice'

function App() {
  function allNewDice(){
    const newDice =[];
    for(let i = 0 ; i<10; i++){
      newDice.push(Math.floor(Math.random()*6)+1)
    }
    return newDice
  }
  const [allNewDiceArray, setAllNewDiceArray] = useState(allNewDice())
  const diceElement = allNewDiceArray.map((item,index)=>{
    return <Dice key={index} value={item}/>
  })
  return (
    <main className='main-container'>
      <div className='container'>
        <div className='dice-container'>
          {diceElement}
        </div>
      </div>
    </main>
  )
}

export default App
