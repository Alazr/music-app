import React,{useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay,faAngleLeft,faAngleRight,faPause} from '@fortawesome/free-solid-svg-icons'

function player({songEndHandler,skipHandler,currentSong,audioRef,isPlaying,playClickHandler}) {

    
    const [songInfo,setSongInfo] = useState({
        currentTime:0,
        duration:0,
        animatePercentage:0
    })

    const timeUpdateHandler =({target})=>{
        let current =  target.currentTime
        let duration = target.duration
        // calculate percentage
        const roundedCurrent = Math.round(current) 
        const roundedDuration = Math.round(duration)
        const animation = Math.round((roundedCurrent / roundedDuration)*100)
       
        setSongInfo({currentTime:current,duration,animatePercentage:animation})
    }

    const tranckAnim = {
        transform:`translateX(${songInfo.animatePercentage}%)`
    }

    const dragHandler = ({target})=>{
        audioRef.current.currentTime = target.value
        setSongInfo({...songInfo,currentTime:target.value})
    }

    const getTime = (time)=>{
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

   
    
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
               <div style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                <input min={0} max={songInfo.duration || 0} onChange={dragHandler} value={songInfo.currentTime} type="range" />
                <div style={tranckAnim} className="animate-track"></div>
               </div>
               
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control"> 
                <FontAwesomeIcon className="skip-back" onClick={()=>skipHandler("back")} size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon className="play" onClick={playClickHandler} size="2x"  icon={isPlaying? faPause:faPlay}/>
                <FontAwesomeIcon className="skip-forward" size="2x"  onClick={()=>skipHandler("next")} icon={faAngleRight}/>
            </div>
            <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler}  ref={audioRef} src={currentSong.audio}></audio>
        </div>
    );
}

export default player;