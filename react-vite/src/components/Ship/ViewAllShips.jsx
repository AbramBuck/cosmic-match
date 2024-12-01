import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import CreateShipForm from '../SpaceStationHub/CreateShipForm';
import { fetchShips } from "../../redux/ship";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ShipEditModal from './ShipEditModal' 
import ShipDeleteConfirmModal from "./ShipDeleteConfirmModal";
import { RiSpaceShipFill } from "react-icons/ri";
import '../Planet/ViewPlanet.css'




function ViewAllShips() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setErrors] = useState(null)
  const [shipLevelById, setShipLevelById] = useState(null)
  const user = useSelector((store) => store.session.user)
  const ships = useSelector((state) => state.ships.ships)
  const User = useSelector((state) => state.session.user);

  console.log ("SHIPS",ships)

  if (!user) navigate(`/login`)

    useEffect(() => { 
        dispatch(fetchShips())
    }, [dispatch], ships);

    useEffect(() => {
        if (ships && ships.length) {
            const shipRunsById = ships.reduce((acc, ship) => {
                acc[ship.id] = { runsCompleted: ship.runs_completed };
                return acc;
            }, {});
    
            const newShipLevelById = { ...shipRunsById };
    
            for (const ship of ships) {
                if (shipRunsById[ship.id].runsCompleted < 20) {
                    newShipLevelById[ship.id].level = 0;
                } else {
                    newShipLevelById[ship.id].level = Math.floor(shipRunsById[ship.id].runsCompleted / 20);
                }
            }
    
            setShipLevelById(newShipLevelById);
        }
    }, [ships, setShipLevelById]);
    

  const alertAdd = () =>{
    alert('That Planet has the maximum deck size. Delete some cards from that Planet to add more')
  }
  
  console.log("Ship Level By Id",shipLevelById)



  return (
    <div className="ship-page-wrapper">
      
      <div className="cards-content-area">
      <h1 className="manage-cards-header"><RiSpaceShipFill /> Ships</h1>
      <div className="ship-page-button-div">
            <div className={"create-ship-button"}><OpenModalButton buttonText="Create A Ship"  modalComponent={<CreateShipForm User={User} />}/></div>
      </div> 

        <div className="cards-area">
              {ships && shipLevelById && ships.length ? ships.map((ship) => (
                <div className="card-instance" key={ship.id}>
                  <div>
                  <div className="crop-container"><img className="crop-container" src={ships ? ship.image_url : ""}></img></div>
                  </div>
                  <div className="card-title ubuntu-regular"><RiSpaceShipFill />{ship.name}</div>
                  <div className="card-stats">
                    {ships && shipLevelById !== null && shipLevelById[ship.id]?.level !== undefined ? <h4>Lvl: {shipLevelById[ship.id].level}  </h4> : " "}
                    <h4>Runs Completed: {ships ?  ship.runs_completed : " "}</h4>
                  </div>
                  <div className="edit-delete-btn-area">
                  <OpenModalButton buttonText="Edit"  modalComponent={<ShipEditModal ship={ship}/>}/>
                  <OpenModalButton buttonText="Delete"  modalComponent={<ShipDeleteConfirmModal shipId={ship.id}/>}/>
                  </div>      
                  <div className="manage-card-title">
                    
                  </div>
                
                </div>
              )) : " "}
              </div>
        </div>
    </div>

)
}
export default ViewAllShips;
