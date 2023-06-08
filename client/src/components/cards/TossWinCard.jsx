import React from 'react'

const TossWinCard = ({setGameState,setTossState,setCurrentPlayerState}) => {
  const onShootFirstHandler = () => {
    setCurrentPlayerState(2);
    setGameState(true);
    setTossState(false);
  }
  const onShootSecondHandler = () => {
    setCurrentPlayerState(1);
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