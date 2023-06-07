import React, { useContext, useState } from 'react'
import Web3Context from '../contexts'
import { callToss } from '../contexts/UseContract/writeContract';
import { getWinOrLose } from '../contexts/UseContract/readContract';

const TossCardComponent = () => {
    const {account, Contract} = useContext(Web3Context);
    const[tossWin, setTossWin] = useState(3);
    const onclickHeadsHandler = async () => {
      console.log(Contract)
        await callToss(Contract,account,0).then(async ()=> {
          await getWinOrLose(Contract).then((data)=> {console.log(data)});
        } );
        // console.log(res);
        // setTossWin(res);
        // console.log(tossWin);
    }
    const onclickTailsHandler = async () => {
      await callToss(Contract,account,1).then(async ()=> {
        await getWinOrLose(Contract).then((data)=> {console.log(data)});
      } );
      // console.log(res);
      // setTossWin(res);
      // console.log(tossWin);
    }

  return (
    <div className='flex flex-col justify-center items-center  w-[400px] h-[200px] bg-red-500'>
        <div><h1>Choose</h1></div>
        <div className='flex '>
            <button onClick={onclickHeadsHandler}><div className='flex justify-center items-center h-[30px] w-[60px] bg-white'>Heads</div></button>
            <button onClick={onclickTailsHandler}><div className='flex justify-center items-center h-[30px] w-[60px] bg-white'>Tails</div></button>
        </div>
    </div>
  )
}

export default TossCardComponent