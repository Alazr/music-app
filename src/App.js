import {useState,useRef} from 'react'
import Player from './components/Player'
import Song from './components/Song'
import "./styles/app.scss"
import data from './data'
import Library from './components/Library'
import Nav from './components/nav'
function App() {

  const [songs,setSongs] = useState(data())
  const [isPlaying,setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  
  const [libraryStatus,setLibraryStatus] = useState(false)
  const libraryToggler = () =>{
    setLibraryStatus(!libraryStatus)
  }
  const [currentSong,setCurrentSong] = useState(songs[0])
  const skipHandler = async (d) =>{
    const idx = songs.indexOf(currentSong)
    if(d === "next"){
       const  currentSong = songs[(idx + 1) % songs.length]
      await setCurrentSong(currentSong)
    }else if (d === "back"){
      if ((idx-1) === -1){
       await setCurrentSong(songs[songs.length-1])
        if(isPlaying) audioRef.current.play()
        return
      }
      await setCurrentSong(songs[(idx-1)%songs.length])
    }
    if(isPlaying) audioRef.current.play()
}  
const songEndHandler = async ()=>{
  const idx = songs.indexOf(currentSong)
  await setCurrentSong(songs[(idx + 1) % songs.length])
  if(isPlaying) audioRef.current.play()
}
  const selectHandler = async (song)=>{
   await setCurrentSong(song)
    if(isPlaying) audioRef.current.play()
  }
  const playClickHandler = ()=>{
    if(!isPlaying){
        audioRef.current.play()
        setIsPlaying(!isPlaying)
    }
    else{
        audioRef.current.pause()
        setIsPlaying(!isPlaying)
    }
}
  return (
    <div className={`App ${libraryStatus? 'active-library' : ""}`}>
      <Nav libraryToggler={libraryToggler}/>
      <Song currentSong={currentSong} />
      <Player songEndHandler={songEndHandler} skipHandler={skipHandler} playClickHandler={playClickHandler} currentSong={currentSong} audioRef={audioRef} isPlaying={isPlaying}/>
      <Library libraryStatus={libraryStatus} songs={songs} onClick={selectHandler} audioRef={audioRef} currentSong={currentSong}/>
    </div>
  ); 
}

export default App;
