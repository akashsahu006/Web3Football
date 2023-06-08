import React, {useContext, useState} from 'react'
import Web3Context from '../contexts';

import IntroVideoComponent from '../components/videoComponents/IntroVideoComponent';
import Toss from '../components/Toss';
import GameComponent from '../components/gameComponents/GameComponent';

const Testing = () => {
    const[introVideoState, setIntroVideoState ] = useState(true);
    const [tossState, setTossState] = useState(false);
    const[gameState, setGameState] = useState(false);
    const [currentStrikerState, setCurrentStrikerState] = useState(0); //1 = player and 2 = Computer

    const {account, Contract, checkIfWalletIsConnected } = useContext(Web3Context);
    console.log(Contract)
  return (
    <div>
        {introVideoState && <IntroVideoComponent setIntroVideoState={setIntroVideoState} setTossState={setTossState}/> }
        {tossState && <Toss setGameState={setGameState} setTossState={setTossState} setCurrentStrikerState={setCurrentStrikerState}/>}
        {gameState && <GameComponent currentStrikerState={currentStrikerState}/>}
    </div>
  )
}

export default Testing