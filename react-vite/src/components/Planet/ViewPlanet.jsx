import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { getAllPlanets } from "../../redux/planet";
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
  
  if (!user) navigate(`/login`);

//   const cardsOnPlanet = cards.reduce((acc, note) => {
//     const id = card.planet_id;
//     acc[id] = (acc[id] || 0) + 1; 
//     return acc;
//   }, {});

  
  const alertDelete = () =>{
    alert('You Cannot Delete a Planet that has Cards')
  }


  useEffect(() => { 
    dispatch(getAllPlanets())
}, [dispatch], planets);

  
  return (
    <div className="page-wrapper">
      {/* NavBar End */}
      
      <div className="planets-content-area">
      <h1 className="manage-planet-header">PLANETS </h1>
      <h2 className="create-planet-btn">      <Link to={"/planets/new"}>Create A New Planet</Link>
      </h2>
        <div className="planets-area">
              {planets.map((planet) => (
                <div className="planet-instance" key={planet.id}>
                  <div className="planet-title ubuntu-regular"><IoPlanet />{planet.name}</div>
                  <Link to={`/planets/${planet.id}`}>
                  <div className="crop-container"><img className="crop-container" src={planet.image_url}></img></div>
                  
                  </Link>
                  <div className="edit-delete-btn-area">
                  <OpenModalButton buttonText="Edit"  modalComponent={<EditModal planet={planet}/>}/>
                  <OpenModalButton buttonText="Delete"  modalComponent={<DeleteConfirmModal planetId={planet.id}/>}/>
                    {/* {cardsOnPlanet[planet.id] ? <button onClick={alertDelete}>Delete</button> : <OpenModalButton buttonText="Delete"  modalComponent={<DeletePlanetConfirmModal planetId={planet.id}/>}/>} */}
                  </div>      
                  <div className="manage-planet-title">
                    
                    {/* <h3>Cards:{ cardsInPlanet[planet.id] ? cardsInPlanet[planet.id] : 0 } </h3> */}
                  </div>
          
                </div>
              ))}
              </div>
        </div>
    </div>

)
}
export default ManagePlanets;
