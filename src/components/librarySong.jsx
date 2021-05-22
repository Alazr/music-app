import React from 'react';

function LibrarySong({song,onClick,currentSong}) {
    return (
        <div onClick={()=>onClick(song)} className={`library-song ${currentSong.id === song.id ? "selected" : ""}`}>
           <img src={song.cover} alt="" />
            <div className="song-desc">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4> </div> 
        </div>
    );
}

export default LibrarySong;