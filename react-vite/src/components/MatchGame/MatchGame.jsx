import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchShips } from "../../redux/ship";
import "../MatchGame/MatchGame.css"
import confetti from 'https://cdn.skypack.dev/canvas-confetti'
import matchSnd from '../../audio/CardMatched.mp3'
import noMatchSnd from '../../audio/NoCardMatch.mp3'
import gameAudio from '../../audio/gameAudio.mp3'
import SignleCard from "../SingleCard/SingleCard"
import YouDiedModal from "./YouDiedModal"
import YouWonModal from "./YouWonModal"
import card1 from '../../../src/images/enemies/alien_enemy.jpg'
import card2 from '../../../src/images/enemies/alien_green_enemy.jpg'
import card3 from '../../../src/images/items/cosmic-blossom.jpg'
import card4 from '../../../src/images/terrain/cold_planet.jpg'
import card5 from '../../../src/images/terrain/space_city.jpg'
import card6 from '../../../src/images/terrain/majestic_forest.jpg'


const cardDeck= [
    { "src" : card1, matched: false, hostile: true, reward: 30 },
    { "src" : card2, matched: false, hostile: true, reward: 30 },
    { "src" : card3, matched: false, hostile: false, reward: 10 },
    { "src" : card4, matched: false, hostile: false, reward: 10 },
    { "src" : card5, matched: false, hostile: false, reward: 10  },
    { "src" : card6, matched: false, hostile: false, reward: 10 },
]


function MatchGame() {
    let matchedAudio = new Audio(matchSnd);
    let noMatchedAudio = new Audio(noMatchSnd);
    let gameMusic = new Audio(gameAudio);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const User = useSelector((state) => state.session.user);
    const Ships = useSelector((state) => state.ships.ships);
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [shields, setShields] = useState(3)
    const [fuel, setFuel] = useState(10)
    const [showModal, setShowModal] = useState(false)
    const [gold, setGold ] = useState(0)
    const [currentShip, setCurrentShip] = useState([])
    const allMatched = cards.every(card => card.matched === true) 
       
    
    if (!User) navigate(`/login`);


    useEffect(() => {
        dispatch(fetchShips())
      },[dispatch]);
    
    useEffect(() => {
        if (Ships.length && User.current_ship) {
            const foundShip = Ships.find((e) => e.id === User.current_ship);
            setCurrentShip(foundShip || null); // Set null if no ship matches
        }
    }, [Ships, User]);


    useEffect(() => {
        const startingFuel = currentShip.fuel
        const startingShields = currentShip.shields
        
        setFuel(startingFuel)
        setShields(startingShields)
    }, [Ships, User])


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
        if (choiceOne.hostile === true && choiceTwo.hostile !==true || choiceOne.hostile !== true && choiceTwo.hostile ===true || choiceOne.hostile && choiceTwo.hostile && choiceOne.src !== choiceTwo.src){
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
        <div className="game-page-wrapper">
            <h1 className="mg-title">Planet Zarros</h1>
            <div className="game-area">
            <div className="hud">
            <h2>Shields: {shields}</h2>
            <h2>|</h2>
            <h2>Fuel: {fuel}</h2>
            <h2>|</h2>
            <h2>Credits: {gold}</h2>
            <h2>|</h2>
            <h2>Turns: {turns}</h2>
            </div>
            <div className="card-grid">
                {showModal && allMatched ? < YouWonModal gold={gold} turns={turns}/> : "" }
                {showModal && !allMatched ? <YouDiedModal fuel={fuel} shields={shields} gold={gold} turns={turns}/> : "" }
                { !showModal ? cards.map(card =>(
                    <SignleCard 
                        key={card.id} 
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                        hostile={card.hostile}
                         /> 
                )) : ""
                }
            </div>
            </div>
        </div>    
    )
}


export default MatchGame