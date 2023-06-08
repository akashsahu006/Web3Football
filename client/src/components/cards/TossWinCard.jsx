import React from 'react'

const TossWinCard = ({setGameState,setTossState,setCurrentStrikerState}) => {
  const onShootFirstHandler = () => {
    setCurrentStrikerState(1);
    setGameState(true);
    setTossState(false);
  }
  const onShootSecondHandler = () => {
    setCurrentStrikerState(2);
    setGameState(true);
    setTossState(false);
  }
  
  return (
    <div>
      <div>You have won the toss!</div>
      <div>
        <button onClick={onShootFirstHandler}><div>Shoot First</div></button>
        <button onClick={onShootSecondHandler}><div>Save First</div></button>
      </div>
    </div>
  )
}

export default TossWinCard