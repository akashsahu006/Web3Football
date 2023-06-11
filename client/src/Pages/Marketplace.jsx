import React, {useEffect, useContext, useState} from 'react'
import { getAvailableCards } from '../contexts/UseContract/readContract'
import { buyPlayer } from '../contexts/UseContract/writeContract'
import Web3Context from '../contexts'
import {Link} from "react-router-dom"
import glowFootball from "../assets/images/glowFootball.png"



const Marketplace = () => {
  const[allCardsData, setAllCardsData] = useState([]);
  const[allCardsStatus, setAllCardsStatus] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
    getAvailableCards(Contract).then((data) => {
      setAllCardsData(allCardsData => [...allCardsData,data]);
      setAllCardsStatus(true);
    });
  }, []);
const {checkIfWalletIsConnected, Contract, account} = useContext(Web3Context);
const[modalStatus, setModalStatus] = useState(false); 
const [modalId, setModalID] = useState(0);
const [modalLoading, setModalLoading] = useState(false);
const [buyStatus, setBuyStatus] = useState(false);

  const ModalLoading = () => {
    return (
      <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[300px] h-[300px]  p-10 shadow-2xl bg-blend-normal rounded-3xl shadow-black bg-black/90 flex flex-col justify-center  items-center'>
          <img className="animate-spin-slow" src={glowFootball} alt="Loading..." />
        </div>
      </div>
    )
  }

  const BuyCompleted = () => {
    return (
      <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[300px] h-[300px]  p-10 shadow-2xl bg-blend-normal rounded-3xl shadow-black bg-black/90 flex flex-col justify-center  items-center'>
          <img className=" mb-8 w-[80px]" src={`/images/players/${modalId}.png`} alt="asd" />
          <div className='fixed'>
            <img className="w-[43px]" src={`/images/success.png`} alt="asd" />
          </div>
          <h1 className='font-Orbitron tracking-wider rounded-2xl w-[160px] flex justify-center bg-gradient-to-l from-bl to-br'>Buy Completed</h1>
          <button onClick={() => {setBuyStatus(false)}}><h1 className='font-Orbitron tracking-wider m-4 border-white border-[1px] text-black  flex justify-center items-center h-[20px] w-[80px] bg-clip-text text-transparent bg-gradient-to-l from-bl to-br rounded-2xl'>Return</h1></button>
        </div>
      </div>
    )
  }

  const Modal = () => {
    return (
      <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[300px] h-[300px]  p-10 shadow-2xl bg-blend-normal rounded-3xl shadow-black bg-black/90 flex flex-col justify-center  items-center'>
          <img className=" mb-8 w-[80px]" src={`/images/players/${modalId}.png`} alt="asd" />
          <div className='flex'>
            <button onClick={async() => {
              setModalLoading(true);
              await buyPlayer(Contract, account, modalId, 2).then(() => {
                setModalStatus(false);
                setModalLoading(false);
                setBuyStatus(true);
              });
            }}><h1 className='font-Orbitron tracking-wider m-4 text-black/90 text-sm  flex justify-center items-center h-[20px] w-[80px] bg-gradient-to-l from-bl to-br rounded-2xl'>Buy</h1></button>
            <button onClick={() => setModalStatus(false)}><h1 className='font-Orbitron tracking-wider m-4 border-white border-[1px] text-black  flex justify-center items-center h-[20px] w-[80px] bg-clip-text text-transparent bg-gradient-to-l from-bl to-br rounded-2xl'>Return</h1></button>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className=' w-screen h-screen p-0'>
        <div className=" bg-playground bg-cover w-screen h-screen p-4 flex justify-between items-center flex-col" >
            <div className='flex flex-col justify-between h-[80px] items-center'>
                <h1 className='font-Orbitron tracking-wider bg-clip-text text-transparent bg-gradient-to-l from-bl to-br font-bold text-2xl'>Marketplace</h1>
                <div className='flex justify-between items-center text-white w-[600px]'>
                    <h1 className='font-Orbitron tracking-wider text-sm bg-clip-text text-transparent bg-gradient-to-l from-bl to-br'>Bronze Card: 50 points </h1>
                    <h1 className='font-Orbitron tracking-wider text-sm bg-clip-text text-transparent bg-gradient-to-l from-bl to-br'>Silver Card: 100 points </h1>
                    <h1 className='font-Orbitron tracking-wider text-sm bg-clip-text text-transparent bg-gradient-to-l from-bl to-br'>Gold Card: 200 points </h1>

                </div>
            </div>
           <div className='grid grid-cols-8 gap-4 mt-3'>
                {allCardsStatus && allCardsData[0].map((data)=> 
                  
                  <button onClick={() => {
                    setModalID(data.id);
                    setModalStatus(true)}}>
                        <div>
                        <img className=" w-[60px]" src={`/images/players/${data.id}.png`} alt="asd" />
                  </div></button>)}

           </div>
           <Link to={"/"}><button><h1 className='m-4 text-black  flex justify-center items-center h-[20px] w-[80px] bg-gradient-to-l from-bl to-br rounded-2xl'>Back</h1></button></Link>
           {modalStatus && <Modal/>}
           {modalLoading && <ModalLoading/>}
           {buyStatus && <BuyCompleted/>}
        </div>
    </div>
  )
}

export default Marketplace