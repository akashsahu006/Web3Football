import React from 'react'
import TossWinCard from './TossWinCard'
import TossLostCard from './TossLostCard'

const TossResultCard = ({tossWin, setGameState,setTossState,setCurrentStrikerState}) => {
  return (
    <div>
      {tossWin && <TossWinCard setGameState={setGameState} setTossState={setTossState} setCurrentStrikerState={setCurrentStrikerState}/>}
      {!(tossWin) && <TossLostCard setGameState={setGameState} setTossState={setTossState} setCurrentStrikerState={setCurrentStrikerState}/>}
    </div>
  )
}

export default TossResultCard