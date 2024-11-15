import "../MatchGame/MatchGame.css"
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import matchSnd from '../../audio/CardMatched.mp3'
import { useState } from "react";
import SignleCard from "../SingleCard/SingleCard";


const cardDeck = [
    { "src" : "../../../src/images/helmet-1.png"},
    { "src" : "../../../src/images/potion-1.png"},
    { "src" : "../../../src/images/ring-1.png"},
    { "src" : "../../../src/images/scroll-1.png"},
    { "src" : "../../../src/images/shield-1.png"},
    { "src" : "../../../src/images/sword-1.png"},
]


function MatchGame() {
    let matchedAudio = new Audio(matchSnd);

    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);

    //shuffle
    const shuffleCards = () => {
        const shuffledCards = [...cardDeck, ...cardDeck]
            .sort(() => Math.random() -0.5)
            .map((card) => ({...card, id: Math.random()}))
        
        setCards(shuffledCards)
        setTurns(0)
    }

    console.log("Cards //////////:", cards, "Turns ////////", turns)

    const gotMatch = () => {
        confetti()
        matchedAudio.play();
    }

    return(
        <div className="page-wrapper">
            <h1 className="mg-title">Planet Zarros</h1>
            <div className="game-area">
            <button onClick={gotMatch}>Matched Card</button>
            <button onClick={shuffleCards}>Start New Game</button>
            <div className="card-grid">
                {cards.map(card =>(
                    <SignleCard key={card.id} card={card} />
                ))}
            </div>
            </div>
        </div>    
    )
}


export default MatchGame