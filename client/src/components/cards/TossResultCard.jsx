import React from 'react'
import TossWinCard from './TossWinCard'
import TossLostCard from './TossLostCard'

const TossResultCard = ({tossWin, setGameState,setTossState,setCurrentPlayerState}) => {
  return (
    <div className='flex flex-col justify-center items-center h-[288px]'>
      {tossWin && <TossWinCard setGameState={setGameState} setTossState={setTossState} setCurrentPlayerState={setCurrentPlayerState}/>}
      {!(tossWin) && <TossLostCard setGameState={setGameState} setTossState={setTossState} setCurrentPlayerState={setCurrentPlayerState}/>}
    </div>
  )
}

export default TossResultCard