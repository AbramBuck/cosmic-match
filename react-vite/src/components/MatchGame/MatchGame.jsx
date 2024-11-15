import "../MatchGame/MatchGame.css"
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import matchSnd from '../../audio/CardMatched.mp3'

function MatchGame() {
    let matchedAudio = new Audio(matchSnd);

    const gotMatch = () => {
        confetti()
        matchedAudio.play();
    }

    return(
        <div className="page-wrapper">
            <h1 className="mg-title">Planet Zarros</h1>
            <div className="game-area">
            <button onClick={gotMatch}>Matched Card</button>
            </div>
        </div>    
    )
}


export default MatchGame