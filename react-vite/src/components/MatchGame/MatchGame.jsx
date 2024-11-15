import "../MatchGame/MatchGame.css"
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

function MatchGame() {

    const gotMatch = () => {
        confetti()
    }

    return(
        <div className="page-wrapper">
            <h1 className="mg-title">Match Game</h1>
            <div className="game-area">
            <button onClick={gotMatch}>Matched Card</button>
            </div>
        </div>    
    )
}


export default MatchGame