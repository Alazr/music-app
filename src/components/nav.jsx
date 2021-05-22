import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMusic} from '@fortawesome/free-solid-svg-icons'

function Nav({libraryToggler}) {
 

    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={libraryToggler}>
                Library
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    );
}

export default Nav;