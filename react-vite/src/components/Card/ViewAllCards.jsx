import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllPlanets } from "../../redux/planet";
import { thunkFetchCards } from "../../redux/cards";
import { MdSdCard } from "react-icons/md";
import { IoPlanet } from "react-icons/io5";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CardEditModal from "./CardEditModal";
import CardDeleteConfirmModal from "./CardDeleteConfirmModal";
import '../Planet/ViewPlanet.css'



function ViewAllCards() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setErrors] = useState(null)
  const { planetId } = useParams();
  const user = useSelector((store) => store.session.user)
  const planets = useSelector((state) => state.planets.planets)
  const cards = useSelector((state) => state.cards.cards)

  if (!user) navigate(`/login`)


    useEffect(() => { 
        dispatch(getAllPlanets())
    }, [dispatch], planets);

    useEffect(() => { 
        dispatch(thunkFetchCards())
    }, [dispatch], cards);

  const planetNamesById = planets.reduce((acc, planet) =>{
    acc[planet.id] = planet.name
    return acc
  }, {})

console.log("PLanet Names By Id", planetNamesById)
  const alertAdd = () =>{
    alert('That Planet has the maximum deck size. Delete some cards from that Planet to add more')
  }
  
  return (
    <div className="card-page-wrapper">
      
      <div className="cards-content-area">
      <h1 className="manage-cards-header"><MdSdCard /> Cards</h1>
      <h2 className="create-card-btn">      
        <Link to={"/cards/new"}><MdSdCard /> Create A New Card</Link>
      </h2>
        <div className="cards-area">
              {cards.map((card) => (
                <div className="card-instance" key={card.id}>
                  <div>
                  <div className="crop-container"><img className="crop-container" src={card.image_url}></img></div>
                  </div>
                  <div className="card-title ubuntu-regular"><MdSdCard />{card.name}</div>
                  <div className="card-stats">
                    {planets && planets[card.planet_id] ? <h4>Planet: {planetNamesById[card.planet_id]} </h4> : " "}
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
export default ViewAllCards;
