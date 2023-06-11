import React from 'react'

const TossWinCard = ({setGameState,setTossState,setCurrentPlayerState}) => {
  const onShootFirstHandler = () => {
    setCurrentPlayerState(2);
    setGameState(true);
    setTossState(false);
  }
  const onShootSecondHandler = () => {
    setCurrentPlayerState(1);
    setGameState(true);
    setTossState(false);
  }
  
  return (
    <div className='flex flex-col justify-center items-center h-[288px]'>
      <div className='mb-[40px] text-2xl bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold'>You have won the toss!</div>
      <div className='flex'>
        <button className='m-4 text-black text-sm font-medium flex justify-center items-center h-[30px] w-[100px] bg-gradient-to-l from-bl to-br rounded-2xl' onClick={onShootFirstHandler}><div>Shoot First</div></button>
        <button className='m-4 text-black text-sm font-medium flex justify-center items-center h-[30px] w-[100px] bg-gradient-to-l from-bl to-br rounded-2xl' onClick={onShootSecondHandler}><div>Save First</div></button>
      </div>
    </div>
  )
}

export default TossWinCard