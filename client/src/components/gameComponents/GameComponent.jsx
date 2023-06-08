import React, { useState, useContext, useEffect } from 'react'
import { getInterface, getPlayerState, getComputerScore, getPlayerScore, checkResult, getRoundNumber } from '../../contexts/UseContract/readContract';
import { updatePlayerState, penaltyShoot } from '../../contexts/UseContract/writeContract';
import Web3Context from '../../contexts';

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
            <div>Loading...</div>
        )
      }

    const ResultComponent = () => {
        if(result.value === '1'){
            return (
                <div>Player Won</div>
            )
        }
        else{
            return(
                <div>Opponent Won</div>
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
            <div>
                Interface - 1
                <button className='bg-cyan-400' onClick={() => onClickShoot(1)}>Options</button>
            </div>
        )
    }
    const InterfaceTwo = () => {
        return (
            <div>
                Interface - 2
                <button className='bg-cyan-400' onClick={() => onClickShoot(1)}>Options</button>
            </div>
            
        )
    }
    const InterfaceThree = () => {
        return (
            <div>
                Interface - 3
                <button className='bg-cyan-400' onClick={() => onClickShoot(1)}>Options</button>
            </div>
        )
    }
    
    const onClickShoot = async (option) => {
        setInterfaceState(false);
        setIsLoading(true);
        await penaltyShoot(Contract,account,interFace.value,option)
        await getPlayerScore(Contract).then((data)=>setPlayerScore(data));
        await getComputerScore(Contract).then((data)=>setComputerScore(data));
        await getRoundNumber(Contract).then((data)=> console.log(`Round number is ${data}`))

        const t =await getInterface(Contract)
        setInterFace({value:t})
        
        const res = await checkResult(Contract);
        setResult({value:res});
        if(res !== '0'){
            setIsLoading(false);
            setResultState(true);
        }
        else{
            setIsLoading(false);
            setInterfaceState(true);
        }
        // console.log(interFace);
        // console.log(playerScore, computerScore);

    }

    const GameOpeningComponent = () => {
        return (
            <div>
                <h1>Game Opening</h1>
                <button onClick={onClickLetsPlay}>Click</button>
            </div>
        )
    }
    const onClickLetsPlay = async () => {
        const t = await getInterface(Contract);
        console.log(t);
        await setInterFace({value:t});
        setGameOpeningState(false);
        setIsLoading(true);
        await updatePlayerState(Contract,account,currentPlayerState);
        await getPlayerState(Contract).then((data)=> console.log(data))
        setIsLoading(false)
        setInterfaceState(true)
        

        
        // console.log(interFace);
        // console.log(currentPlayerState)
    }


  return (
    <div>
        {gameOpeningState && <GameOpeningComponent/> }
        {interfaceState && <InterfaceComponent/>}
        {isLoading && <Loading/>}
        {resultState && <ResultComponent/>}
        {playerScore}
        {computerScore}
        
    </div>
    
  )
}

export default GameComponent