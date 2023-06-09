import React from 'react'

const TossLostCard = ({setGameState,setTossState, setCurrentPlayerState}) => {
  const onContinueHandler = () => {
    setCurrentPlayerState(1);
    setTossState(false)
    setGameState(true);
  }
  
  return (
    <div className='flex flex-col justify-center items-center h-[288px]'>
      <h1 className='mb-[40px] text-2xl bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold'>You have lost the toss</h1>
      <button className='m-4 text-black text-sm font-medium flex justify-center items-center h-[30px] w-[80px] bg-gradient-to-l from-bl to-br rounded-2xl' onClick={onContinueHandler}>Continue</button>
    </div>
  )
}

export default TossLostCard