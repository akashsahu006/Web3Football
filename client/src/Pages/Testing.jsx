import React, {useContext, useState, useEffect} from 'react'
import Web3Context from '../contexts';
import { getRequestRandomWords } from '../contexts/UseContract/writeContract';
import IntroVideoComponent from '../components/videoComponents/IntroVideoComponent';
import Toss from '../components/Toss';
import GameComponent from '../components/gameComponents/GameComponent';
import glowFootball from "../assets/images/glowFootball.png"

const Testing = () => {
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
    const[introVideoState, setIntroVideoState ] = useState(false);
    const [tossState, setTossState] = useState(false);
    const[gameState, setGameState] = useState(false);
    const [currentPlayerState, setCurrentPlayerState] = useState(0); //1 = player and 2 = Computer

    const {account, Contract, checkIfWalletIsConnected } = useContext(Web3Context);
    const [start, setStart] = useState(true);
    const [loading, setLoading] = useState(false);

    const Loading = () =>{
      return(
          <div className=' border-8  border-gradientLeft rounded-lg w-[500px] h-[260px] flex justify-center items-center bg-black/80'><img className='animate-spin-slow h-[200px] ' src={glowFootball} alt="Football" /></div>
      )
    }
    

    const StartComponent = () => {
      return (
        <div className=' w-[500px]  h-[288px] border-8 bg-black/50 border-gradientLeft rounded-lg flex justify-center items-center'>
          <button onClick={async ()=> {
            setStart(false);
            setLoading(true);
            await getRequestRandomWords(Contract).then(()=>{
              setTimeout(()=> {
                setLoading(false);
                setIntroVideoState(true);
              },70000)
            });

          }}><h1 className='m-4 text-black font-medium flex justify-center items-center h-[30px] w-[100px] bg-gradient-to-l from-bl to-br rounded-2xl'>Start</h1></button>
        </div>
      )
    }
    console.log(Contract)
  return (
      
      <div className="font-Orbitron tracking-wider bg-backGround bg-cover w-screen h-screen flex justify-center items-center" >
        {start && <StartComponent/>}
        {loading && <Loading/>}
        {introVideoState && (<div className=' w-[500px] border-8 border-gradientLeft rounded-lg'><IntroVideoComponent setIntroVideoState={setIntroVideoState} setTossState={setTossState}/> </div>)}
        {tossState && (<div className=' w-[500px] border-8 border-gradientLeft rounded-lg'><Toss setGameState={setGameState} setTossState={setTossState} setCurrentPlayerState={setCurrentPlayerState}/> </div>)}          
          {gameState && (<GameComponent currentPlayerState={currentPlayerState} setCurrentPlayerState={setCurrentPlayerState}/>)} 
      </div>
 
  )
}

export default Testing