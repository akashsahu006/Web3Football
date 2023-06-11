import React, { useState } from 'react'
import TossCardComponent from './TossCardComponent'
import TossLoadingComponent from './TossLoadingComponent';
import TossResultCard from './cards/TossResultCard';
import Loader from './Loader';

const Toss = ({setGameState,setTossState,setCurrentPlayerState}) => {
    const [tossCardState, setTossCardState] = useState(true);
    const [loadingState, setLoadingState] = useState(false);
    const [tossResultCardState, setTossResultCardState] = useState(false);
    const[tossWin, setTossWin] = useState(false);
    
  return (
    <div className='w-full h-full bg-black/50'>
        {}
        {tossCardState && <TossCardComponent setTossCardState={setTossCardState} setLoadingState={setLoadingState} setTossWin={setTossWin} setTossResultCardState={setTossResultCardState}/>}
        {loadingState && <Loader/>}
        {tossResultCardState && <TossResultCard tossWin={tossWin} setGameState={setGameState} setTossState={setTossState} setCurrentPlayerState={setCurrentPlayerState}/>}
    </div>
  )
}

export default Toss