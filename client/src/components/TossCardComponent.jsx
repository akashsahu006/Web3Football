import React, { useContext, useEffect } from 'react'
import Web3Context from '../contexts'
import { callToss } from '../contexts/UseContract/writeContract';
import { getWinOrLose } from '../contexts/UseContract/readContract';

const TossCardComponent = ({setTossCardState, setLoadingState,setTossWin,setTossResultCardState}) => {
    const {account, Contract, checkIfWalletIsConnected} = useContext(Web3Context);
    useEffect(() => {
      checkIfWalletIsConnected();
      console.log(Contract)
    }, []);
    // const[tossWin, setTossWin] = useState(3);
    const onclickHeadsHandler = async () => {
      console.log(Contract)
        setTossCardState(false);
        setLoadingState(true);
        await callToss(Contract,account,0).then(async ()=> {
          await getWinOrLose(Contract).then((data)=> {{setTossWin(data)}});
        } );
        setLoadingState(false);
        setTossResultCardState(true)
        
    }
    const onclickTailsHandler = async () => {
      setTossCardState(false);
      setLoadingState(true);
      await callToss(Contract,account,1).then(async ()=> {
        await getWinOrLose(Contract).then((data)=> {setTossWin(data)});
      } );
      setLoadingState(false);
      setTossResultCardState(true)
    }
    

  return (
    <div className='flex flex-col justify-center items-center h-[288px]'>
        <div><h1 className='mb-[40px] text-3xl bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold'>Toss</h1></div>
        <div className='flex '>
            <button onClick={onclickHeadsHandler}><div className='m-4 text-black font-medium flex justify-center items-center h-[30px] w-[80px] bg-gradient-to-l from-bl to-br rounded-2xl'>Heads</div></button>
            <button onClick={onclickTailsHandler}><div className='m-4 text-black font-medium flex justify-center items-center h-[30px] w-[80px] bg-gradient-to-l from-bl to-br rounded-2xl'>Tails</div></button>
        </div>
    </div>
  )
}

export default TossCardComponent