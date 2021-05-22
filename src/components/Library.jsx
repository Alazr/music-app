import React from 'react';
import LibrarySong from './librarySong'

function Library({libraryStatus,songs,onClick,currentSong}) {

    return (
        <div className={`library ${libraryStatus? "library-active": ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
            {
                songs.map(song=>(
                    <LibrarySong currentSong={currentSong} key={song.id} song={song} onClick={onClick}/>
    ))
            }
            </div>
        </div>
    );
}

export default Library;