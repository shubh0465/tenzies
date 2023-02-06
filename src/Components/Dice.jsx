import React from 'react'

export default function Dice(props) {
  return (
    <div className='dice' style={{backgroundColor : props.isHeld?"#59E391":"#ffffff"}} onClick={props.holdDice}>
        <h2>{props.value}</h2>
    </div>
  )
}
