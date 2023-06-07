import React,{useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import Web3Context from '../contexts';
import { getRequestRandomWords} from '../contexts/UseContract/writeContract';
import { getLastId, getStatus } from '../contexts/UseContract/readContract';

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

  return (
    <div>
      <button onClick={onClickPlayHandler} className='bg-cyan-200'>random numbers</button>
      <button onClick={onClickRandomNumberHandler}>Random number getter</button>
        <Link to={"/Testing"}><button className='text-blue-500 ' >Play</button></Link>
    </div>
  )
}

export default Home