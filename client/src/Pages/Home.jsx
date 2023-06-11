import React,{useContext, useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import Web3Context from '../contexts';
import { getRequestRandomWords, resetGame, signup} from '../contexts/UseContract/writeContract';
import {getInactiveCards, getLastId, getStatus, joinStatus, getPlayerPoints, getPlayerActiveCards } from '../contexts/UseContract/readContract';
import glowFootball from "../assets/images/glowCropped.png"
import title from "../assets/images/title.png"

const Home = () => {
const {account, Contract, checkIfWalletIsConnected,connectWallet } = useContext(Web3Context);
const [connected,setConnected] = useState(false);
const [balance, setBalance] = useState(0);
const [isJoin, setIsJoinStatus] = useState(false);
  useEffect(() => {
    joinStatus(Contract,account).then((data) => setIsJoinStatus(data));
    setLoadModalState(true);
    setTimeout(() => {
      setLoadModalState(false);
      joinStatus(Contract,account).then((data) => setIsJoinStatus(data));

    }, 2000);
  },[])

  useEffect(() => {
    // console.log(checkIfWalletIsConnected(), connected)
    // checkIfWalletIsConnected()
    const check = async () => {
      await checkIfWalletIsConnected().then((data) => {
        if(data === true){
          setConnected(true);
          console.log("check ran")
        }
      })
    }
    check();
    getPlayerPoints(Contract,account).then((data) => setBalance(data));
    joinStatus(Contract,account).then((data) => setIsJoinStatus(data));
    
  },[connected, balance, isJoin]);

  const func = async () => {
    await checkIfWalletIsConnected().then(async (data) => {
      console.log("data:",data);
      if(data === false){
        await connectWallet().then(async () => {
          setConnected(true)
          setLoadModalState(true);
          await joinStatus(Contract,account).then((data) => setIsJoinStatus(data));
          setTimeout(() => {
            setLoadModalState(false);
            window.location.reload(false);
          }, 1000);
        });
        
        console.log("dadsda");
      }
    });
    
  }

  const onClickPlayHandler = async () => {
    console.log("clickes");
    await getRequestRandomWords(Contract);
  }

  const onClickRandomNumberHandler = async () => {
    await getLastId(Contract).then(async (data)=> {
      await getStatus(Contract,data).then((data) => {console.log(data[1])})
    }); 
  }

  const onResetHandler = async() => {
    await resetGame(Contract,account).then(() => console.log("Reset done"));
  }

    const [loadModalState, setLoadModalState] = useState(false);
  const LoadModal = () => {
    return (
      <div className='fixed inset-0 bg-opacity-30 bg-black/50 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[300px] h-[300px] flex justify-center items-center '>
          <img className="animate-spin-slow w-[100px]" src={glowFootball} alt="Loading..." />
        </div>
      </div>
    )
  }
  console.log(Contract)
  return (
    // 
    <div className=' w-screen h-screen p-0'>
        <div className='bg-landingBg  bg-cover h-screen w-screen flex flex-col'>
          <div className='flex justify-between items-center mt-2 mx-7 h-[50px]'>
            <div className='flex flex-row items-center'>
              <img  src={glowFootball} className='animate-spin-slow w-[40px] h-[40px] mr-6' alt="" />
              {isJoin && connected && <Link to={"/Yourcards"}><h1 className='font-Orbitron tracking-widerunderline decoration-bl decoration-solid decoration-1 underline-offset-4 hover:decoration-ebl bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold'>Your cards</h1></Link>}
              {isJoin && connected && <Link to={"/Marketplace"}><h1 className='font-Orbitron tracking-wider ml-4 underline decoration-bl decoration-solid decoration-1 underline-offset-4 hover:decoration-ebl bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold'>Marketplace</h1></Link>}
              {isJoin && connected && <Link to={"/"}><h1 className=' font-Orbitron tracking-wider ml-4 underline decoration-bl decoration-solid decoration-1 underline-offset-4 hover:decoration-ebl bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-medium'>{balance} Points</h1></Link>}

            </div>
            
            <button onClick={func}>{connected && <h1 className='font-Orbitron tracking-wider m-4 text-black font-medium flex justify-center items-center h-[30px] w-[120px] bg-gradient-to-l from-bl to-br rounded-2xl'>Connected</h1>}{!(connected) && <h1 className='font-Orbitron tracking-wider m-4 text-black text-sm font-medium flex justify-center items-center h-[30px] w-[170px] bg-gradient-to-l from-bl to-br rounded-2xl'>Connect Metamask</h1>}</button>
          </div>
          <div className='w-1/2 text-white'>
            <div className='ml-6 h-[260px] flex flex-col justify-end'>
              {/* <button onClick={onClickPlayHandler} className='bg-cyan-200'>random numbers</button>
              <button onClick={onClickRandomNumberHandler}>Random number getter</button>
              <button onClick={onResetHandler}>Reset</button> */}
              {/* <Link to={"/Testing"}><button className='text-blue-500 ' >Play</button></Link> */}
              {/* <button onClick={async() => {
                await getPlayerActiveCards(Contract, account).then((data) => {console.log("Active Cards:",data)});
              }}>Player cards</button>
              <button onClick={async() => {
                await getInactiveCards(Contract, account).then((data) => {console.log("Active Cards:",data)});
              }}>Inactive cards</button> */}
              {/* <button onClick={async () => {
                  await joinStatus(Contract,account).then((data) => console.log(data));
              }}>Join status</button> */}
              <img src={title} alt="" />
              {/* <h1 className='text-[2.5rem] bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold' >Welcome to </h1> */}
              {/* <h1 className=' text-[3rem] bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold '>Web3Football</h1> */}
              <h1 className=' font-Orbitron tracking-wider text-[0.8rem] ml-1 mt-6'>Unlock your favourite player cards. Build your own team. Play penalty shootout. Win game points. Redeem points to upgrade your team</h1>
            </div>
            <div className='flex justify-center mt-4'>
            {isJoin && connected && <Link to={"/Game"}><button><h1 className='font-Orbitron tracking-wider m-4 text-black font-medium flex justify-center items-center h-[30px] w-[100px] bg-gradient-to-l from-bl to-br rounded-2xl'>Play</h1></button></Link>}
            {!(isJoin) && connected && <button onClick={async () => {
                  setLoadModalState(true);
                  await signup(Contract,account).then(() => {
                    setLoadModalState(false)
                    window.location.reload(false);
                  });
              }}><h1 className='font-Orbitron tracking-wider m-4 text-black font-medium flex justify-center items-center h-[30px] w-[100px] bg-gradient-to-l from-bl to-br rounded-2xl'>Join Now</h1></button>}

            </div>
            {loadModalState && <LoadModal/>}
          </div>
        </div>
    </div>
  )
}

export default Home