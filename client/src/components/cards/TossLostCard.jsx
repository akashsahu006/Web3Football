import React from 'react'

const TossLostCard = ({setGameState,setTossState, setCurrentPlayerState}) => {
  const onContinueHandler = () => {
    setCurrentPlayerState(1);
    setTossState(false)
    setGameState(true);
  }
  
  return (
    <div>
      <h1>You have lost the toss</h1>
      <button onClick={onContinueHandler}>Continue</button>
    </div>
  )
}

export default TossLostCard