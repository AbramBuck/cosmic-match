import "../MatchGame/MatchGame.css"
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import matchSnd from '../../audio/CardMatched.mp3'
import noMatchSnd from '../../audio/NoCardMatch.mp3'
import { useEffect, useState } from "react";
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
    let noMatchedAudio = new Audio(noMatchSnd);


    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)

    
    //shuffle
    const shuffleCards = () => {
        const shuffledCards = [...cardDeck, ...cardDeck]
            .sort(() => Math.random() -0.5)
            .map((card) => ({...card, id: Math.random()}))
        
        setCards(shuffledCards)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
    }

    const gotMatch = () => {
        confetti()
        matchedAudio.play();
    }

    const noMatch = () => {
        noMatchedAudio.play()
    };

    //compare both cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {

            if (choiceOne.src === choiceTwo.src) {
                console.log('Matched Baby!')
                gotMatch()
                resetTurn()
            } else {
                console.log("No match")
                noMatch()
                resetTurn()
            }
        }
    }, [choiceOne, choiceTwo])

    return(
        <div className="page-wrapper">
            <h1 className="mg-title">Planet Zarros</h1>
            <div className="game-area">
            <button onClick={gotMatch}>Matched Card</button>
            <button onClick={shuffleCards}>Start New Game</button>
            <div className="card-grid">
                {cards.map(card =>(
                    <SignleCard 
                        key={card.id} 
                        card={card}
                        handleChoice={handleChoice}
                         />
                ))}
            </div>
            </div>
        </div>    
    )
}


export default MatchGame