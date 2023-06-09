import React from 'react'
import glowFootballPic from "../assets/images/glowFootball.png"

const HeroFootball = () => {
  return (
    <div className='animate-spin-slow h-[400px] w-[400px]'>
        <img src={glowFootballPic} alt="" />
    </div>
  )
}

export default HeroFootball