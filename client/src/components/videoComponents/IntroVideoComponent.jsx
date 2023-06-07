import React from 'react'
import ReactPlayer from 'react-player'
import introVideo from "../../assets/videos/introVideo.mp4"

const IntroVideoComponent = ({setIntroVideoState,setTossState}) => {
    const onEndedHandler = () =>{
        setIntroVideoState(false);
        setTossState(true);
        console.log("video ended")
    }

  return (
    <div><ReactPlayer url={introVideo} playing muted onEnded={onEndedHandler}/></div>
  )
}

export default IntroVideoComponent