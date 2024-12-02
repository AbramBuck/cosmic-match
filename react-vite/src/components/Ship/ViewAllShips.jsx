import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import CreateShipForm from '../SpaceStationHub/CreateShipForm';
import { fetchShips } from "../../redux/ship";
import { thunkUpdate } from "../../redux/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ShipEditModal from './ShipEditModal' 
import ShipDeleteConfirmModal from "./ShipDeleteConfirmModal";
import { RiSpaceShipFill } from "react-icons/ri";
import '../Planet/ViewPlanet.css'
import '../Planet/ManagePlanets.css'



function ViewAllShips() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setErrors] = useState(null)
  const [shipLevelById, setShipLevelById] = useState(null)
  const [currentShip, setCurrentShip] = useState(null);
  const user = useSelector((store) => store.session.user)
  const ships = useSelector((state) => state.ships.ships)
  const User = useSelector((state) => state.session.user);

  console.log ("SHIPS",ships)
  console.log ("CURRENT SHIP",currentShip)

  useEffect(() => {
    if (ships && ships.length && User && User.current_ship) {
        const foundShip = ships.find((e) => e.id === User.current_ship)
        setCurrentShip(foundShip || null);
    }
}, [ships, User]);

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
    

    const handleShipChange = async (shipId) => {
        await dispatch(thunkUpdate({current_ship: shipId}))
        await dispatch(fetchShips())
      }



  return (
    <div className="ship-page-wrapper">
      
      <div className="cards-content-area">
      <h1 className="manage-cards-header"><RiSpaceShipFill /> Ships</h1>
      <div className="ship-page-button-div">
            <div className="create-ship-button"><OpenModalButton buttonText="Create A Ship"  modalComponent={<CreateShipForm User={User} />}/></div>
      </div> 

        <div className="cards-area">
        <div className="current-ship-instance">
        <h1 ><RiSpaceShipFill /> Current Ship:</h1>
                  <div>
                  <div className="current-ship-crop-container">{ ships && ships.length && currentShip && currentShip != null && currentShip !== 0 ? <img className="current-ship-crop-container" src={currentShip.image_url}></img> : ""}</div>
                  </div>
                  <div className="card-title ubuntu-regular"><RiSpaceShipFill />{ships && currentShip && currentShip.name ? currentShip.name : "No Ship Selected"}</div>
                </div>
              {ships && shipLevelById && ships.length ? ships.map((ship) => (
                <div className="ship-instance" key={ship.id}>
                  <div>
                  <div className="current-ship-crop-container"><img src={ships ? ship.image_url : ""}></img></div>
                  </div>
                  <div className="card-title ubuntu-regular"><RiSpaceShipFill />{ship.name}</div>
                  <div className="card-stats">
                    {ships && shipLevelById !== null && shipLevelById[ship.id]?.level !== undefined ? <h4>Lvl: {shipLevelById[ship.id].level}  </h4> : " "}
                    <h4>Runs Completed: {ships ?  ship.runs_completed : " "}</h4>
                  </div>
                  <div className="edit-delete-btn-area">
                  <button onClick={() => handleShipChange(ship.id)}>set current ship</button>
                  <OpenModalButton buttonText="Edit"  modalComponent={<ShipEditModal ship={ship}/>}/>
                  <OpenModalButton buttonText="Delete"  modalComponent={<ShipDeleteConfirmModal shipId={ship.id}/>}/>
                  </div>      
                  <div className="manage-card-title">
                    
                  </div>
                </div>
              )) : <h1 className="no-stuff-message">When you Create Ships they will show up here.</h1>}
              </div>
        </div>
    </div>

)
}
export default ViewAllShips;
