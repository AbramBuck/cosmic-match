import React from "react"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchShips } from "../../redux/ship";
import { getAllPlanets } from "../../redux/planet";
import { thunkFetchCards } from "../../redux/cards";
import "../MatchGame/MatchGame.css"
import confetti from 'https://cdn.skypack.dev/canvas-confetti'
import matchSnd from '../../audio/CardMatched.mp3'
import noMatchSnd from '../../audio/NoCardMatch.mp3'
import gameAudio from '../../audio/gameAudio.mp3'
import SignleCard from "../SingleCard/SingleCard"
import YouDiedModal from "./YouDiedModal"
import YouWonModal from "./YouWonModal"


function CustomMatchGame() {
    const matchedAudio = new Audio(matchSnd);
    const noMatchedAudio = new Audio(noMatchSnd);
    const gameMusic = new Audio(gameAudio);
  
    const dispatch = useDispatch();
    const User = useSelector((state) => state.session.user);
    const Ships = useSelector((state) => state.ships.ships);
    const planets = useSelector((state) => state.planets.planets);
    const fetchedCards = useSelector((state) => state.cards.cards);
  
    // State hooks
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [shields, setShields] = useState(3);
    const [fuel, setFuel] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [gold, setGold] = useState(0);
    const [currentShip, setCurrentShip] = useState([]);
    const [customDeck, setCustomDeck] = useState([]);
    const deckRef = useRef(null);
    const allMatched = cards.every(card => card.matched);

    console.log("CARDS ARRAY",cards)
    if (!User) navigate(`/login`);
  
 
    useEffect(() => {
      if (customDeck.length && !deckRef.current) {
        shuffleCards();
      }
    }, [customDeck]);
  
    
    useEffect(() => {
      dispatch(fetchShips());
      dispatch(getAllPlanets());
      dispatch(thunkFetchCards());
    }, [dispatch]);
  
    
    useEffect(() => {
      const filteredDeck = fetchedCards.filter(
        (card) => card.planet_id === User.mission_deck
      );
      setCustomDeck(structuredClone(filteredDeck));
    }, [fetchedCards, User]);
  
    useEffect(() => {
      if (Ships.length && User.current_ship) {
        const foundShip = Ships.find((e) => e.id === User.current_ship);
        setCurrentShip(foundShip || null);
      }
    }, [Ships, User]);
  
    useEffect(() => {
      if (currentShip) {
        setFuel(currentShip.fuel);
        setShields(currentShip.shields);
      }
    }, [currentShip]);
  
    
    useEffect(() => {
      if (allMatched && turns > 0) {
        setGold((prevGold) => prevGold + 100);
        setTimeout(() => setShowModal(true), 1000);
      }
    }, [allMatched]);
  

    useEffect(() => {
      if (fuel <= 0 || shields <= 0) {
        setTimeout(() => setShowModal(true), 1000);
      }
    }, [fuel, shields]);
  

    const shuffleCards = () => {
      const shuffledCards = [...customDeck, ...customDeck]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({
          ...card,
          src: card.image_url,
          matched: false,
          order: Math.random(),
        }));
  
      setCards(structuredClone(shuffledCards));
      setTurns(0);
      deckRef.current = shuffledCards;
    };
  

    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };
  

    const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns((prevTurns) => prevTurns + 1);
      setFuel((prevFuel) => prevFuel - 1);
      setDisabled(false);
    };
  

    const gotMatch = () => {
      const amount = choiceOne.reward + choiceTwo.reward;
      confetti();
      setGold((prevGold) => prevGold + amount);
      matchedAudio.play();
    };
  

    const noMatch = () => {
      if (
        (choiceOne.hostile && !choiceTwo.hostile) ||
        (!choiceOne.hostile && choiceTwo.hostile)
      ) {
        setShields((prevShields) => prevShields - 1);
      }
      noMatchedAudio.play();
    };
  
  
    useEffect(() => {
      if (choiceOne && choiceTwo) {
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src) {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.src === choiceOne.src ? { ...card, matched: true } : card
            )
          );
          setTimeout(() => gotMatch(), 500);
          resetTurn();
        } else {
          setTimeout(() => noMatch(), 500);
          setTimeout(() => resetTurn(), 1000);
        }
      }
    }, [choiceOne, choiceTwo]);
  
    

    // useEffect(() => {
    //     console.log("fetchedCards////////",fetchedCards)
    //     console.log("Planets//////",planets)
    //     console.log("USer//////",User)
    //     console.log("Custom Deck////////",customDeck)
    //     console.log("Cards////////",cards)
    // }, [cards, planets, User, fetchedCards, customDeck]);

    return(
        <div className="game-page-wrapper">
            <h1 className="mg-title">Exploration Mission</h1>
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
                        key={card.order} 
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


export default CustomMatchGame