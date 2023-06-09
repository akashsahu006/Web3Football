import React,{useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import Web3Context from '../contexts';
import { getRequestRandomWords, resetGame} from '../contexts/UseContract/writeContract';
import { getLastId, getStatus } from '../contexts/UseContract/readContract';
import HeroFootball from '../components/HeroFootball';

const Home = () => {
const {account, Contract, checkIfWalletIsConnected } = useContext(Web3Context);
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const onClickPlayHandler = async () => {
    console.log("clickes");
    await getRequestRandomWords(Contract);
  }

  const onClickRandomNumberHandler = async () => {
    await getLastId(Contract).then(async (data)=> {
      await getStatus(Contract,data).then((data) => {console.log(data[1])})
    }); 
  }

  const onResetHandler = async() => {
    await resetGame(Contract,account).then(() => console.log("Reset done"));
  }
  console.log(Contract)
  return (
    // 
    <div className='w-screen h-screen bg-gradient-to-br from-gradientLeft to-gradientRight'>
        <div className='w-screen flex'>
          <div className='w-1/2 text-white'>
            <div>
              <button onClick={onClickPlayHandler} className='bg-cyan-200'>random numbers</button>
              <button onClick={onClickRandomNumberHandler}>Random number getter</button>
              <button onClick={onResetHandler}>Reset</button>
              <Link to={"/Testing"}><button className='text-blue-500 ' >Play</button></Link>
            </div>
          </div>
          <div className='w-1/2'><HeroFootball/></div>
        </div>
    </div>
  )
}

export default Home