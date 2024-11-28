import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { getAllPlanets } from "../../redux/planet";
import { thunkFetchCards } from "../../redux/cards";
import { IoPlanet } from "react-icons/io5";
import { FaSdCard } from "react-icons/fa";
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
  const cards = useSelector((state) => state.cards.cards )

  if (!user) navigate(`/login`);

  const alertDelete = () =>{
    alert('You Cannot Delete a Planet that has Cards')
  }

  useEffect(() => { 
    dispatch(getAllPlanets())
}, [dispatch], planets);

useEffect(() => { 
  dispatch(thunkFetchCards())
}, [dispatch], cards);

const cardsOnPlanet = cards.reduce((acc, card) => {
  const id = card.planet_id;
  acc[id] = (acc[id] || 0) + 1; 
  return acc;
}, {});
  
  return (
    <div className="page-wrapper">
      <div className="planets-content-area">
      <h1 className="manage-planet-header"><IoPlanet /> PLANETS </h1>
      <h2 className="create-planet-btn">      
        <Link to={"/planets/new"}>Create A New Planet</Link>
      </h2>
      <h2 className="return-station-btn">      
        <Link to={"/"}><IoPlanet /> Return to Station</Link>
      </h2>
        <div className="planets-area">
              {planets.map((planet) => (
                <div className="planet-instance" key={planet.id} style={{
                  background: `linear-gradient(to bottom, rgba(17, 85, 133, 0.5), rgba(17, 85, 133, 0.8)), url(${planet.image_url})`,backgroundSize: 'cover',}}>
                  <div className="planet-title ubuntu-regular"><IoPlanet />{planet.name}</div>
                  <Link to={`/planets/${planet.id}`}>
                  <div className="planet-crop-container"><img src={planet.image_url} title="Click to visit Planet"></img></div>
                  
                  </Link>
                  <div className="edit-delete-btn-area">
                  <OpenModalButton buttonText="Edit"  modalComponent={<EditModal planet={planet}/>}/>
                    {cardsOnPlanet[planet.id] ? <button onClick={alertDelete}>Delete</button> : <OpenModalButton buttonText="Delete"  modalComponent={<DeleteConfirmModal planetId={planet.id}/>}/>}
                  </div>      
                  <div className="manage-planet-title">
                    <h3 className="card-count-icon"><FaSdCard />: { cardsOnPlanet[planet.id] ? cardsOnPlanet[planet.id] : 0 } | {planet && planet.deck_size ? planet.deck_size : " " }</h3>
                  </div>
          
                </div>
              ))}
              </div>
        </div>
    </div>

)
}
export default ManagePlanets;
