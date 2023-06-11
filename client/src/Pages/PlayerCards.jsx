import React, {useEffect, useContext, useState} from 'react'
import { getInactiveCards, getPlayerActiveCards, getPlayerActiveGKCard } from '../contexts/UseContract/readContract'
import Web3Context from '../contexts'
import playgroundImg from "../assets/images/pg.png"
import p0 from "../assets/images/players/0.png"
import p3 from "../assets/images/players/3.png"
import p5 from "../assets/images/players/5.png"
import p8 from "../assets/images/players/8.png"
import p9 from "../assets/images/players/9.png"
import g1 from "../assets/images/keepers/1.png"
import {Link} from "react-router-dom"


const PlayerCards = () => {
  
  const[inactiveCardsData, setInactiveCardsData] = useState([]);

  const[cardsStatus, setCardsStatus] = useState(false);
  const[inactiveCardsStatus, setInactiveCardsStatus] = useState(false);
  const[cardsData, setCardsData] = useState([]);
  const[gkData, setGkData] =useState([]);

  useEffect(() => {
    checkIfWalletIsConnected();
    getPlayerActiveCards(Contract,account).then((data) => {
      setCardsData(cardsData => [...cardsData,data]);
      setCardsStatus(true);
    });
    getPlayerActiveGKCard(Contract,account).then((data) => {
      setGkData(gkData=> [...gkData,data]);
    });
    getInactiveCards(Contract,account).then((data) => {
      setInactiveCardsData(inactiveCardsData=> [...inactiveCardsData,data]);
      setInactiveCardsStatus(true);
    })
  }, []);
const {checkIfWalletIsConnected, Contract, account} = useContext(Web3Context);

  return (
    <div className=' w-screen h-screen p-0'>
        <div className=" bg-playground bg-cover w-screen h-screen flex flex-col justify-center items-center" >
                <h1 className='font-Orbitron tracking-wider bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold text-3xl'>Your Cards</h1>
                <h1 className='font-Orbitron tracking-wider bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold text-lg'>Playing VI</h1>
                <div className='grid grid-cols-6 gap-4 mt-5'>
                  {cardsStatus && cardsData[0].map((data)=> 
                  
                  <div>
                      <img className="cursor-pointer w-[60px]" src={`/images/players/${data.id}.png`} alt="asd" />
                  </div>)}
                  {cardsStatus && <img className="cursor-pointer w-[60px]" src={`/images/keepers/${gkData[0][0]}.png`} alt="asd" />}
                  
                </div>
                <h1 className='font-Orbitron tracking-wider bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold text-lg'>Inactive Cards</h1>
                <div className='grid grid-cols-6 gap-4 mt-5'>
                    {inactiveCardsStatus && inactiveCardsData[0].map((data)=> {
                      return (
                        <img className="cursor-pointer w-[60px]" src={`/images/players/${data.id}.png`} alt="asd" />
                      )
                    })}
                </div>
                {/* <button onClick={async() => {
                await getInactiveCards(Contract, account).then((data) => {console.log("Inactive Cards:",data)});
              }}>Inactive cards</button> */}
           <Link to={"/"}><button><h1 className='m-4 text-black  flex justify-center items-center h-[20px] w-[80px] bg-gradient-to-l from-bl to-br rounded-2xl'>Back</h1></button></Link>
        </div>
    </div>
  )
}

export default PlayerCards