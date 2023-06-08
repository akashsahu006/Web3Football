import React, { useState } from 'react'

const GameComponent = ({currentStrikerState}) => {

    const [interfaceState, setInterfaceState] = useState(1);

    const InterfaceComponent = () => {
        if(interfaceState === 1){
            return (<InterfaceOne/>)
        }
        else if(interfaceState === 2){
            return (<InterfaceTwo/>)
        }
        else{
            return (<InterfaceThree/>)
        }
    }
    const InterfaceOne = () => {
        return (
            <div>Interface - 1</div>
        )
    }
    const InterfaceTwo = () => {
        return (
            <div>Interface - 2</div>
        )
    }
    const InterfaceThree = () => {
        return (
            <div>Interface - 3</div>
        )
    }



  return (
    <div>
        <InterfaceComponent/>
        <button onClick={console.log(currentStrikerState)}>Click</button>
    </div>
    
  )
}

export default GameComponent