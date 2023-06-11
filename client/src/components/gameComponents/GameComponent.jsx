import React, { useState, useContext, useEffect } from 'react'
import { getPlayerActiveCards, getInterface, getPlayerState, checkResult, getRoundNumber, penaltyShoot } from '../../contexts/UseContract/readContract';
import { wonPoints } from '../../contexts/UseContract/writeContract';
import Web3Context from '../../contexts';
import {Link} from "react-router-dom"
import glowFootball from "../../assets/images/glowFootball.png"
import redBall from "../../assets/images/redBall.png"
import greenBall from "../../assets/images/greenBall.png"
import ReactPlayer from 'react-player';
import goalSavedVideo from "../../assets/videos/save.mp4"
import goalScoredVideo from "../../assets/videos/goal.mp4"






import p0 from "../../assets/images/players/0.png"
import p4 from "../../assets/images/players/4.png"
import p6 from "../../assets/images/players/6.png"
import p8 from "../../assets/images/players/8.png"
import p10 from "../../assets/images/players/10.png"

import p1 from "../../assets/images/players/1.png"
import p3 from "../../assets/images/players/3.png"
import p5 from "../../assets/images/players/5.png"
import p7 from "../../assets/images/players/7.png"
import p9 from "../../assets/images/players/9.png"





const GameComponent = ({currentPlayerState, setCurrentPlayerState}) => {
    const {account, Contract, checkIfWalletIsConnected } = useContext(Web3Context);
    useEffect(() => {
        checkIfWalletIsConnected();
        console.log(Contract)
        getPlayerActiveCards(Contract,account).then((data) => {
            setCardsData(cardsData => [...cardsData,data]);
            setCardsStatus(true);
          });
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

    const [round, setRound] = useState(0);
    const [playerScoreRecord, setPlayerScoreRecord] = useState([])

    const [computerScoreRecord, setComputerScoreRecord] = useState([])

    const[cardsData, setCardsData] = useState([]);
    const[gkData, setGkData] =useState([]);
    const[cardsStatus, setCardsStatus] = useState(false);

    ////shootout logic
     
      const [shootNumber, setShootNumber] = useState(0);

      const onClickShoot = async (option) => {
        setInterfaceState(false);
        setIsLoading(true);
        setTimeout(async () => {
            await penaltyShoot(Contract, interFace.value, option, shootNumber).then(async (data) => {
                setIsLoading(false);
                
    
                if(currentPlayerState ===1 && !(data)){
                    setComputerScore(computerScore+1);
                    setComputerScoreRecord(computerScoreRecord=> [...computerScoreRecord,1]);
                    setGoalScoredState(true);
                    
                }
                else if(currentPlayerState === 1 && data){
                    setComputerScoreRecord(computerScoreRecord=> [...computerScoreRecord,0]);
                    setGoalSavedState(true);
                }
                else if(currentPlayerState ===2 && data){
                    setPlayerScore(playerScore+1);
                    setPlayerScoreRecord(playerScoreRecord => [...playerScoreRecord, 1]);
                    setGoalScoredState(true);
                }
                else if(currentPlayerState === 2 && !(data)){
                    setPlayerScoreRecord(playerScoreRecord => [...playerScoreRecord, 0]);
                    setGoalSavedState(true);
                }
                console.log("shoot number",shootNumber, interFace.value)
                
                if(currentPlayerState === 1){
                    setCurrentPlayerState(2);
                }
                else{
                    setCurrentPlayerState(1);
                }
                const tempShootNumber = shootNumber + 1;
                
                const t = await getInterface(Contract,account, tempShootNumber, currentPlayerState);
                console.log(interFace.value);
                setInterFace({value:t});
                setShootNumber(shootNumber+1);
            })
        }, 2000);

      }

      useEffect(() => {
        console.log(playerScoreRecord,computerScoreRecord)
      },[round])

      const ScoreComponent = () => {
        return (
            <div className='w-[450px] h-[30px] bg-gradientLeft/80 mt-4 flex border-4 border-gradientLeft '>
                <div className='w-1/2 flex items-center'>
                    <h1 className='font-Orbitron tracking-wider bg-clip-text text-transparent bg-gradient-to-l from-bl to-br'>Player:</h1>
                    {playerScoreRecord.map((data) => {
                        if(data===0){
                            return (
                                <img className='w-[18px] ml-2' src={redBall} alt="" />
                            )
                        }
                        else{
                            return (
                                <img className='w-[18px] ml-2' src={greenBall} alt="" />
                            )
                        }
                        
                    })}
                </div>
                <div className='w-1/2 flex items-center'>
                    <h1 className='bg-clip-text text-transparent bg-gradient-to-l from-bl to-br'>Web3:</h1>
                    {computerScoreRecord.map((data) => {
                        if(data===0){
                            return (
                                <img className='w-[18px] ml-2' src={redBall} alt="" />
                            )
                        }
                        else{
                            return (
                                <img className='w-[18px] ml-2' src={greenBall} alt="" />
                            )
                        }
                    })}

                </div>
            </div>
        )
      }

      const Loading = () =>{
        return(
            <div className='w-full h-[260px] flex justify-center items-center bg-black/80'><img className='animate-spin-slow h-[200px] ' src={glowFootball} alt="Football" /></div>
        )
      }

      const onHomeButton = async () => {

      }

      const [isDepositing, setIsDepositing] = useState(false);
      const Deposited = () => {
        return (
            <div className='flex flex-col justify-center items-center h-[288px] bg-black/70'>
                <Link to={"/"}><button className='m-4 text-black font-medium flex justify-center items-center h-[30px] w-[210px] bg-gradient-to-l from-bl to-br rounded-2xl'><h1>Return home</h1></button></Link>
            </div>
        )
      }

      const ResultComponent = () => {
        if(result.value === '1'){
            return (
                <div className='flex flex-col justify-center items-center h-[288px] bg-black/70'>
                    <div className='mb-[40px] text-3xl bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold'>You won!</div>
                     <button className='m-4 text-black font-medium flex justify-center items-center h-[30px] w-[210px] bg-gradient-to-l from-bl to-br rounded-2xl' onClick={() => {
                        setResultState(false);
                        setIsLoading(true);
                        wonPoints(Contract,account).then(() => {
                            setIsLoading(false);
                            setIsDepositing(true);
                        })
                        }}><h1>Collect points</h1></button>
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
    
    // const onClickShoot = async (option) => {
    //     setInterfaceState(false);
    //     setIsLoading(true);
    //     // const ps = playerScore;
    //     // const cs = computerScore;
    //     // console.log("Before",ps,cs);
    //     await penaltyShoot(Contract,account,interFace.value,option)
    //     await getPlayerScore(Contract).then((data)=>{
    //         // console.log("AfterinsidePs:",data);
    //         if(currentPlayerState === 2){
    //             if(oldPS === data){
    //                 setPlayerScoreRecord(playerScoreRecord => [...playerScoreRecord, 0]);
    //                 setIsLoading(false);
    //                 setGoalSavedState(true);
    //             }
    //             else{
    //                 setPlayerScoreRecord(playerScoreRecord => [...playerScoreRecord, 1]);
    //                 setOldPS(data);
    //                 setIsLoading(false);
    //                 setGoalScoredState(true);
    //             }
    //             setCurrentPlayerState(1);

    //         }
    //         setPlayerScore(data)
    //     });
    //     await getComputerScore(Contract).then((data)=>{
    //         // console.log("AfterinsideCd:",cs);
    //         if(currentPlayerState === 1){
    //             if(oldCS === data){
    //                 setComputerScoreRecord(computerScoreRecord => [...computerScoreRecord, 0])
    //                 setIsLoading(false);
    //                 setGoalSavedState(true);
    //             }
    //             else{
    //                 setComputerScoreRecord(computerScoreRecord => [...computerScoreRecord, 1])
    //                 setOldCS(data);
    //                 setIsLoading(false);
    //                 setGoalScoredState(true);
    //             }
    //             setCurrentPlayerState(2);

    //         }

    //         setComputerScore(data)}
    //         );
    //     console.log("Update",playerScore,computerScore);
        
    //     setRound(round +1);

    //     const t =await getInterface(Contract)
    //     setInterFace({value:t})
        
        
        
    //     // console.log(interFace);
    //     // console.log(playerScore, computerScore);

    // }

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
        // await updatePlayerState(Contract,account,currentPlayerState);
        const t = await getInterface(Contract,account, shootNumber,currentPlayerState );
        console.log(t);
        await setInterFace({value:t});
        
        
        
        // await getPlayerState(Contract).then((data)=> console.log(data))
        setIsLoading(false)
        setInterfaceState(true)
        

        
        // console.log(interFace);
        // console.log(currentPlayerState)
    }

    const[ goalScoredState, setGoalScoredState] = useState(false);
    const onGoalEnded = async () => {
        await getRoundNumber(Contract).then(async (data)=> {
            const res = await checkResult(Contract,playerScore, computerScore,shootNumber, currentPlayerState);
            console.log(`Round is ${data}`)
            console.log(playerScore,computerScore)

            setResult({value:res});
            // console.log(`Round check result is ${result.value}`)
            setGoalScoredState(false);
            if(res !== '0'){
                setIsLoading(false);
                setResultState(true);
            }
            else{
                setIsLoading(false);
                setInterfaceState(true);
            }

        })
    }
    const GoalScored = () => {
        return  <ReactPlayer url={goalScoredVideo} height="100%" width="100%" playing muted onEnded={onGoalEnded}/>
    }


    const[ goalSavedState, setGoalSavedState] = useState(false);
    const onSaveEnded = async () => {
        await getRoundNumber(Contract).then(async (data)=> {
            const res = await checkResult(Contract,playerScore, computerScore,shootNumber, currentPlayerState);
            console.log(`Round is ${data}`)
            console.log(playerScore,computerScore)

            setResult({value:res});
            // console.log(`Round check result is ${result.value}`)
            setGoalSavedState(false);
            if(res !== '0'){
                setIsLoading(false);
                setResultState(true);
            }
            else{
                setIsLoading(false);
                setInterfaceState(true);
            }

        })
    }
    const GoalSaved = () => {
        return <ReactPlayer url={goalSavedVideo} height="100%" width="100%" playing muted onEnded={onSaveEnded}/>
    }

  return (
    <div className='flex'>
        <div className='flex flex-col items-center mr-8 bg-black/50 p-4'>
            <h1 className='bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold mb-4'>Your Cards</h1>
            <div className='grid grid-cols-1 gap-1'>
                <img src={p0} className='w-[40px] ' alt="" />
                <img src={p8} className='w-[40px]' alt="" />
                <img src={p10} className='w-[40px]' alt="" />
                <img src={p4} className='w-[40px]' alt="" />
                <img src={p6} className='w-[40px]' alt="" />
            </div>
        </div>
        <div>
            <div className='w-[500px] border-8 border-gradientLeft rounded-lg'>
                {gameOpeningState && <GameOpeningComponent/> }
                {interfaceState && <InterfaceComponent/>}
                {isLoading && <Loading/>}
                {resultState && <ResultComponent/>}
                {goalSavedState && <GoalSaved/>}
                {goalScoredState && <GoalScored/>}
                {isDepositing && <Deposited/>}
                
            </div>
            <div className='flex justify-center '>
                <ScoreComponent/>
            </div>
        </div>
        <div className='flex flex-col items-center ml-8 bg-black/50 p-4'>
            <h1 className='bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold mb-4'>Web3 Cards</h1>
            <div className='grid grid-cols-1 gap-1'>
                <img src={p3} className='w-[40px]' alt="" />
                <img src={p1} className='w-[40px] ' alt="" />
                <img src={p5} className='w-[40px]' alt="" />
                <img src={p7} className='w-[40px]' alt="" />
                <img src={p9} className='w-[40px]' alt="" />
            </div>
        </div>
        
    </div>
    
  )
}

export default GameComponent