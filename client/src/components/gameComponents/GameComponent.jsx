import React, { useState, useContext, useEffect } from 'react'
import { getInterface, getPlayerState, getComputerScore, getPlayerScore, checkResult, getRoundNumber } from '../../contexts/UseContract/readContract';
import { updatePlayerState, penaltyShoot } from '../../contexts/UseContract/writeContract';
import Web3Context from '../../contexts';
import {Link} from "react-router-dom"
import glowFootball from "../../assets/images/glowFootball.png"

const GameComponent = ({currentPlayerState, setCurrentPlayerState}) => {
    const {account, Contract, checkIfWalletIsConnected } = useContext(Web3Context);
    useEffect(() => {
        checkIfWalletIsConnected();
      }, []);
      const initialValue = 0;
    const [gameOpeningState,setGameOpeningState] = useState(true);
    const [interfaceState, setInterfaceState] = useState(false);
    const [interFace,setInterFace] = useState({value:initialValue});
    const [playerScore,setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [result, setResult] = useState({value:initialValue});
    const [resultState, setResultState] = useState(false);
    const[isLoading,setIsLoading] = useState(false);


      const Loading = () =>{
        return(
            <div className='w-full h-[260px] flex justify-center items-center bg-black/80'><img className='animate-spin-slow h-[200px] ' src={glowFootball} alt="Football" /></div>
        )
      }

      const onHomeButton = async () => {

      }
      const ResultComponent = () => {
        if(result.value === '1'){
            return (
                <div className='flex flex-col justify-center items-center h-[288px] bg-black/70'>
                    <div className='mb-[40px] text-3xl bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold'>You won!</div>
                    <Link to={"/"} className='m-4 text-black font-medium flex justify-center items-center h-[30px] w-[210px] bg-gradient-to-l from-bl to-br rounded-2xl'><h1>Collect points and return</h1></Link>
                </div>
            )
        }
        else{
            return(
                <div className='flex flex-col justify-center items-center h-[288px] bg-black/70'>
                    <div className='mb-[40px] text-3xl bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold'>Sorry, You lost!</div>
                    <Link to={"/"}><h1 className='m-4 text-black font-medium flex justify-center items-center h-[30px] w-[80px] bg-gradient-to-l from-bl to-br rounded-2xl'>Return</h1></Link>
                </div>
            )
        }
    }

    const InterfaceComponent = () => {
        if(interFace.value === '1'){
            return (<InterfaceOne/>)
        }
        else if(interFace.value === '2'){
            return (<InterfaceTwo/>)
        }
        else{
            return (<InterfaceThree/>)
        }
    }
    const InterfaceOne = () => {
        return (
            <div className='bg-interface bg-cover w-full h-[250px] flex pt-6  '>
                <div className=''>
                    <button onClick={() => onClickShoot(1)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[200px] h-[140px] bg-black/50 ml-3 mr-[60px] flex justify-center items-center'>1</div></button>
                    <button onClick={() => onClickShoot(2)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[200px] h-[140px] bg-black/50  flex justify-center items-center'>2</div></button>
                </div>
            </div>
        )
    }
    const InterfaceTwo = () => {
        return (
            <div className="bg-interface bg-cover w-full h-[250px] flex flex-col pt-6">
                {/* <button className='bg-cyan-400' onClick={() => onClickShoot(1)}>Options</button> */}
                <div className='flex justify-between  mr-3'>
                    <button onClick={() => onClickShoot(1)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[200px] h-[70px] bg-black/50 ml-3 flex justify-center items-center'>1</div></button>
                    <button onClick={() => onClickShoot(2)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[200px] h-[70px] bg-black/50 ml-3 flex justify-center items-center'>2</div></button>
                </div>
                <div className='flex justify-between mt-2 mr-3'>
                    <button onClick={() => onClickShoot(3)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[200px] h-[70px] bg-black/50 ml-3 flex justify-center items-center'>3</div></button>
                    <button onClick={() => onClickShoot(4)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[200px] h-[70px] bg-black/50 ml-3 flex justify-center items-center'>4</div></button>
                </div>
            </div>
            
        )
    }
    const InterfaceThree = () => {
        return (
            <div className="bg-interface bg-cover w-full h-[250px] flex flex-col pt-6">
                {/* <button className='bg-cyan-400' onClick={() => onClickShoot(1)}>Options</button> */}
                <div className='flex justify-between  '>
                    <button onClick={() => onClickShoot(1)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[100px] h-[70px] bg-black/50 ml-3 flex justify-center items-center'>1</div></button>
                    <button onClick={() => onClickShoot(2)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[100px] h-[70px] bg-black/50 flex justify-center items-center'>2</div></button>
                    <button onClick={() => onClickShoot(3)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[100px] h-[70px] bg-black/50 ml-6 flex justify-center items-center'>3</div></button>
                    <button onClick={() => onClickShoot(4)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[100px] h-[70px] bg-black/50 mr-3 flex justify-center items-center'>4</div></button>
                </div>
                <div className='flex justify-between mt-2 '>
                <button onClick={() => onClickShoot(5)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[100px] h-[70px] bg-black/50 ml-3 flex justify-center items-center'>5</div></button>
                    <button onClick={() => onClickShoot(6)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[100px] h-[70px] bg-black/50 flex justify-center items-center'>6</div></button>
                    <button onClick={() => onClickShoot(7)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[100px] h-[70px] bg-black/50 ml-6 flex justify-center items-center'>7</div></button>
                    <button onClick={() => onClickShoot(8)}><div className='text-br font-semibold text-xl hover:text-white hover:bg-green-500/30 w-[100px] h-[70px] bg-black/50 mr-3 flex justify-center items-center'>8</div></button>
                </div>
            </div>
        )
    }
    
    const onClickShoot = async (option) => {
        setInterfaceState(false);
        setIsLoading(true);
        await penaltyShoot(Contract,account,interFace.value,option)
        await getPlayerScore(Contract).then((data)=>setPlayerScore(data));
        await getComputerScore(Contract).then((data)=>setComputerScore(data));
        await getRoundNumber(Contract).then(async (data)=> {
            const res = await checkResult(Contract);
            console.log(`Round is ${data}`)
            console.log(playerScore,computerScore)

            setResult({value:res});
            console.log(`Round check result is ${result.value}`)
            if(res !== '0'){
                setIsLoading(false);
                setResultState(true);
            }
            else{
                setIsLoading(false);
                setInterfaceState(true);
            }
        })

        const t =await getInterface(Contract)
        setInterFace({value:t})
        
        
        
        // console.log(interFace);
        // console.log(playerScore, computerScore);

    }

    const GameOpeningComponent = () => {
        return (
            <div className='flex flex-col justify-center items-center h-[288px] bg-black/50'>
                <button className='m-4 text-black font-medium flex justify-center items-center h-[30px] w-[100px] bg-gradient-to-l from-bl to-br rounded-2xl' onClick={onClickLetsPlay}>Let's Play</button>
            </div>
        )
    }
    // console.log(currentPlayerState);
    const onClickLetsPlay = async () => {
        setGameOpeningState(false);
        setIsLoading(true);
        await updatePlayerState(Contract,account,currentPlayerState);
        const t = await getInterface(Contract);
        console.log(t);
        await setInterFace({value:t});
        
        
        
        await getPlayerState(Contract).then((data)=> console.log(data))
        setIsLoading(false)
        setInterfaceState(true)
        

        
        // console.log(interFace);
        // console.log(currentPlayerState)
    }


  return (
    <div className=''>
        <div className='w-[500px] border-8 border-gradientLeft rounded-lg'>
            {gameOpeningState && <GameOpeningComponent/> }
            {interfaceState && <InterfaceComponent/>}
            {isLoading && <Loading/>}
            {resultState && <ResultComponent/>}
            
        </div>
        <div>{playerScore}
            {computerScore}</div>
    </div>
    
  )
}

export default GameComponent