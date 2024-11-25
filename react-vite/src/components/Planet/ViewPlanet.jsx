import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllPlanets } from "../../redux/planet";
import { thunkFetchCards } from "../../redux/cards";
import { MdSdCard } from "react-icons/md";
import { IoPlanet } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CardEditModal from "../Card/CardEditModal";
import CardDeleteConfirmModal from "../Card/CardDeleteConfirmModal";
import './ViewPlanet.css'



function ManageCards() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setErrors] = useState(null)
  const user = useSelector((store) => store.session.user)
  const planets = useSelector((state) => state.planets.planets)
  const cards = useSelector((state) => state.cards.cards)
  const [currentPlanet, setCurrentPlanet] = useState([]); 
  const [currentCards, setCurrentCards] = useState([]); 
  const { planetId } = useParams();


  console.log("Planet ID Use Params////////", planetId)
  console.log("Current Planet/////////////",currentPlanet)
  console.log("PLanets/////", planets)
  console.log("Cards ////////", currentCards)

  if (!user) navigate(`/login`)

    useEffect(() => { 
        dispatch(getAllPlanets())
    }, [dispatch], planets);

    useEffect(() => { 
        dispatch(thunkFetchCards())
    }, [dispatch], cards);

    useEffect(() => {
        const thisPlanet = planets.find((planet) => planet.id == planetId);
        setCurrentPlanet(thisPlanet)
    }, [planets]);

    useEffect(() => { 
        const theseCards = cards.filter((card) => card.planet_id == planetId);
        setCurrentCards(theseCards)
    },[cards]);


  const alertDelete = () =>{
    alert('You Cannot Delete a Planet that has Cards')
  }
  
  return (
    <div className="card-page-wrapper">
      
      <div className="cards-content-area">
      <h1 className="manage-cards-header"><IoPlanet />  {currentPlanet.name}</h1>
      <h2 className="create-card-btn">      
        <Link to={"/planets/new"}><MdSdCard /> Create A New Card</Link>
      </h2>
      <h2 className="manage-planets-btn">      
        <Link to={"/planets"}><IoPlanet /> Return to Planets</Link>
      </h2>
        <div className="cards-area">
              {currentCards.map((card) => (
                <div className="card-instance" key={card.id}>
                  <Link to={`/cards/${card.id}`}>
                  <div className="crop-container"><img className="crop-container" src={card.image_url}></img></div>
                  
                  </Link>
                  <div className="card-title ubuntu-regular"><MdSdCard />{card.name}</div>
                  <div className="card-stats">
                    <h4>Planet: {currentPlanet.name}</h4>
                    <h4>Name: {card.name}</h4>
                    <h4>Hostile: {card.hostile ? "True" : "False"}</h4>
                    <h4>Match Reward: {card.reward * 2}</h4>
                    
                  </div>
                  <div className="edit-delete-btn-area">
                  <OpenModalButton buttonText="Edit"  modalComponent={<CardEditModal card={card}/>}/>
                  <OpenModalButton buttonText="Delete"  modalComponent={<CardDeleteConfirmModal cardId={card.id}/>}/>
                    {/* {cardsOncard[card.id] ? <button onClick={alertDelete}>Delete</button> : <OpenModalButton buttonText="Delete"  modalComponent={<DeletecardConfirmModal cardId={card.id}/>}/>} */}
                  </div>      
                  <div className="manage-card-title">
                    
                    {/* <h3>Cards:{ cardsIncard[card.id] ? cardsIncard[card.id] : 0 } </h3> */}
                  </div>
          
                </div>
              ))}
              </div>
        </div>
    </div>

)
}
export default ManageCards;
