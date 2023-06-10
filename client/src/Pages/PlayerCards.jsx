import React from 'react'
import playgroundImg from "../assets/images/pg.png"
import p0 from "../assets/images/players/0.png"
import p3 from "../assets/images/players/3.png"
import p5 from "../assets/images/players/5.png"
import p8 from "../assets/images/players/8.png"
import p9 from "../assets/images/players/9.png"
import g1 from "../assets/images/keepers/1.png"
import {Link} from "react-router-dom"


const PlayerCards = () => {
  return (
    <div className=' w-screen h-screen p-0'>
        <div className=" bg-playground bg-cover w-screen h-screen flex flex-col justify-center items-center" >
                <h1 className='bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold text-2xl'>Your Cards</h1>

           <div className='grid grid-cols-3 gap-4 mt-5'>
                <img src={p0} className="cursor-pointer w-[80px]" alt="" />
                <img src={p3} className="cursor-pointer w-[80px]" alt="" />
                <img src={p5} className="cursor-pointer w-[80px]" alt="" />
                <img src={p8} className="cursor-pointer w-[80px]" alt="" />
                <img src={p9} className="cursor-pointer w-[80px]" alt="" />
                <img src={g1} className="cursor-pointer w-[80px]" alt="" />




                {/* <img src={p4} alt="" /> */}
                {/* <img src={p5} alt="" /> */}

           </div>
           <Link to={"/"}><button><h1 className='m-4 text-black  flex justify-center items-center h-[20px] w-[80px] bg-gradient-to-l from-bl to-br rounded-2xl'>Back</h1></button></Link>
        </div>
    </div>
  )
}

export default PlayerCards