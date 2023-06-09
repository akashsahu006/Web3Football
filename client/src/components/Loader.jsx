import React from 'react'
import glowFootball from "../assets/images/glowFootball.png"

const Loader = () => {
  return (
    <div className='w-full h-[288px] flex justify-center items-center bg-black/80'><img className='animate-spin-slow h-[200px] ' src={glowFootball} alt="Football" /></div>
  )
}

export default Loader