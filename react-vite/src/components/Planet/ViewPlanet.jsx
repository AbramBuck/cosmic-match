import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllPlanets } from "../../redux/planet";
import { thunkFetchCards } from "../../redux/cards";
import { IoPlanet } from "react-icons/io5";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditModal from "./EditModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import './ManagePlanets.css'



function ManagePlanets() {
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
    <div className="page-wrapper">
      
      <div className="planets-content-area">
      <h1 className="manage-planet-header">{currentPlanet.name}</h1>
      <h2 className="create-planet-btn">      <Link to={"/planets/new"}>Create A New Card</Link>
      </h2>
        <div className="planets-area">
              {currentCards.map((card) => (
                <div className="card-instance" key={card.id}>
                  <div className="card-title ubuntu-regular"><IoPlanet />{card.name}</div>
                  <Link to={`/cards/${card.id}`}>
                  <div className="crop-container"><img className="crop-container" src={card.image_url}></img></div>
                  
                  </Link>
                  <div className="edit-delete-btn-area">
                  <OpenModalButton buttonText="Edit"  modalComponent={<EditModal card={card}/>}/>
                  <OpenModalButton buttonText="Delete"  modalComponent={<DeleteConfirmModal cardId={card.id}/>}/>
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
export default ManagePlanets;
