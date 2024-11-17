import React from "react"
import "../MatchGame/MatchGame.css"
import confetti from 'https://cdn.skypack.dev/canvas-confetti'
import matchSnd from '../../audio/CardMatched.mp3'
import noMatchSnd from '../../audio/NoCardMatch.mp3'
import gameAudio from '../../audio/gameAudio.mp3'
import { useEffect, useState } from "react"
import SignleCard from "../SingleCard/SingleCard"
import YouDiedModal from "./YouDiedModal"
import YouWonModal from "./YouWonModal"

const testDeck = [
    { "src" : "../../../src/images/helmet-1.png", matched: false },
    { "src" : "../../../src/images/potion-1.png", matched: false },
    { "src" : "../../../src/images/ring-1.png", matched: false },
    { "src" : "../../../src/images/scroll-1.png", matched: false },
    { "src" : "../../../src/images/shield-1.png", matched: false },
    { "src" : "../../../src/images/sword-1.png", matched: false },
]

const cardDeck= [
    { "src" : "../../../src/images/enemies/alien_enemy.jpg", matched: false, hostile: true, reward: 30 },
    { "src" : "../../../src/images/enemies/alien_green_enemy.jpg", matched: false, hostile: true, reward: 30 },
    { "src" : "../../../src/images/items/cosmic-blossom.jpg", matched: false, hostile: false, reward: 10 },
    { "src" : "../../../src/images/terrain/cold_planet.jpg", matched: false, hostile: false, reward: 10 },
    { "src" : "../../../src/images/terrain/space_city.jpg", matched: false, hostile: false, reward: 10  },
    { "src" : "../../../src/images/terrain/majestic_forest.jpg", matched: false, hostile: false, reward: 10 },
]

function MatchGame() {
    let matchedAudio = new Audio(matchSnd);
    let noMatchedAudio = new Audio(noMatchSnd);
    let gameMusic = new Audio(gameAudio);
    
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [shields, setShields] = useState(3)
    const [fuel, setFuel] = useState(10)
    const [showModal, setShowModal] = useState(false)
    const [gold, setGold ] = useState(0)

    const allMatched = cards.every(card => card.matched === true) 
    
    //Bonus Gold
    React.useEffect(() => {
        if (allMatched && turns > 0) {
          setGold(prevGold => prevGold + 100);
        }
      }, [allMatched]); 
    
    //Game Management
    useEffect(() => {
        if (fuel <= 0 || shields <= 0) {
            setTimeout(() => setShowModal(true), 1000)
        }    
    }, [fuel, shields])
    



    //shuffle
    const shuffleCards = () => {
        const shuffledCards = [...cardDeck, ...cardDeck]
            .sort(() => Math.random() -0.5)
            .map((card) => ({...card, id: Math.random()}))
        
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setFuel(prevFuel => prevFuel - 1)
        setDisabled(false)
    }

    const gotMatch = () => {
        let amount = choiceOne.reward + choiceTwo.reward
        confetti()
        setGold(prevGold => prevGold + amount)
        matchedAudio.play();
    }

    const noMatch = () => {
        console.log(choiceOne.hostile)
        if (choiceOne.hostile === true && choiceTwo.hostile !==true || choiceOne.hostile !== true && choiceTwo.hostile ===true){
            setShields(prevShields => prevShields - 1)
        }
        noMatchedAudio.play()
    };


    //Engage Mission
    useEffect(() => {
        shuffleCards()
        
    }, [])

    //compare both cards
    useEffect(() => {
        
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                setTimeout(() => gotMatch(), 500)
                resetTurn()
            } else {
                setTimeout(() => noMatch(), 500)
                setTimeout(() => resetTurn(), 1000)
                
            }
        }
    }, [choiceOne, choiceTwo])




    return(
        <div className="page-wrapper">
            <h1 className="mg-title">Planet Zarros</h1>
            <div className="game-area">
            <div className="hud">
            <h2>Shields: {shields}</h2>
            <h2>|</h2>
            <h2>Fuel: {fuel}</h2>
            <h2>|</h2>
            <h2>Gold: {gold}</h2>
            <h2>|</h2>
            <h2>Turns: {turns}</h2>
            </div>
            <div className="card-grid">
                {showModal && allMatched ? < YouWonModal/> : "" }
                {showModal && !allMatched ? <YouDiedModal fuel={fuel} shields={shields} gold={gold} turns={turns}/> : "" }
                { !showModal ? cards.map(card =>(
                    <SignleCard 
                        key={card.id} 
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                         /> 
                )) : ""
                }
            </div>
            </div>
        </div>    
    )
}


export default MatchGame