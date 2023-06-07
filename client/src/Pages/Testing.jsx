import React, {useContext, useState} from 'react'
import Web3Context from '../contexts';

import IntroVideoComponent from '../components/videoComponents/IntroVideoComponent';
import Toss from '../components/Toss';

const Testing = () => {
    const[introVideoState, setIntroVideoState ] = useState(true);
    const [tossState, setTossState] = useState(false);

    const {account, Contract, checkIfWalletIsConnected } = useContext(Web3Context);
    console.log(Contract)
  return (
    <div>
        {introVideoState && <IntroVideoComponent setIntroVideoState={setIntroVideoState} setTossState={setTossState}/> }
        {tossState && <Toss/>}
    </div>
  )
}

export default Testing