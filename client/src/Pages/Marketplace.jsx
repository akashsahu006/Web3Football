import React from 'react'
import p0 from "../assets/images/players/0.png"
import p1 from "../assets/images/players/1.png"
import p2 from "../assets/images/players/2.png"
import p3 from "../assets/images/players/3.png"
import p4 from "../assets/images/players/4.png"
import p5 from "../assets/images/players/5.png"
import p6 from "../assets/images/players/6.png"
import p7 from "../assets/images/players/7.png"
import p8 from "../assets/images/players/8.png"
import p9 from "../assets/images/players/9.png"
import p10 from "../assets/images/players/10.png"
import p11 from "../assets/images/players/11.png"
import p12 from "../assets/images/players/12.png"
import p13 from "../assets/images/players/13.png"
import p14 from "../assets/images/players/14.png"
import {Link} from "react-router-dom"



const Marketplace = () => {
  return (
    <div className=' w-screen h-screen p-0'>
        <div className=" bg-playground bg-cover w-screen h-screen p-4 flex justify-between items-center flex-col" >
            <div className='flex flex-col justify-between h-[80px] items-center'>
                <h1 className='bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold text-2xl'>Marketplace</h1>
                <div className='flex justify-between items-center text-white w-[600px]'>
                    <h1 className='text-sm bg-clip-text text-transparent bg-gradient-to-l from-bl to-br'>Bronze Card: 50 points </h1>
                    <h1 className='text-sm bg-clip-text text-transparent bg-gradient-to-l from-bl to-br'>Silver Card: 100 points </h1>
                    <h1 className='text-sm bg-clip-text text-transparent bg-gradient-to-l from-bl to-br'>Gold Card: 200 points </h1>

                </div>
            </div>
           <div className='grid grid-cols-7 gap-4 mt-3'>
                <img src={p0} className=" cursor-pointer w-[80px]"alt="" />
                <img src={p1}  className="cursor-pointer w-[80px]" alt="" />
                <img src={p2} className="cursor-pointer w-[80px]" alt="" />
                <img src={p3} className="cursor-pointer w-[80px]" alt="" />
                <img src={p4} className="cursor-pointer w-[80px]" alt="" />
                <img src={p5} className="cursor-pointer w-[80px]" alt="" />
                <img src={p6} className="cursor-pointer w-[80px]" alt="" />
                <img src={p8} className="cursor-pointer w-[80px]" alt="" />
                <img src={p9} className="cursor-pointer w-[80px]" alt="" />
                <img src={p10} className="cursor-pointer w-[80px]" alt="" />
                <img src={p11} className="cursor-pointer w-[80px]" alt="" />
                <img src={p12} className="cursor-pointer w-[80px]" alt="" />
                <img src={p13} className="cursor-pointer w-[80px]" alt="" />
                <img src={p14} className="cursor-pointer w-[80px]" alt="" />



                {/* <img src={p4} alt="" /> */}
                {/* <img src={p5} alt="" /> */}

           </div>
           <Link to={"/"}><button><h1 className='m-4 text-black  flex justify-center items-center h-[20px] w-[80px] bg-gradient-to-l from-bl to-br rounded-2xl'>Back</h1></button></Link>

        </div>
    </div>
  )
}

export default Marketplace