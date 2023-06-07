import React, { useState } from 'react'
import TossCardComponent from './TossCardComponent'

const Toss = () => {
    const [tossCardState, setTossCardState] = useState(true);


  return (
    <div>
        {tossCardState && <TossCardComponent/>}
    </div>
  )
}

export default Toss