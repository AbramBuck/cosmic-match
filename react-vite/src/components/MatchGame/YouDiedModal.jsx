import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom"
import { thunkShipUpdate } from "../../redux/ship"
import { thunkUpdate } from "../../redux/session"
import "./Modal.css"



function YouDiedModal({gold,turns, shields, fuel }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const User = useSelector((state) => state.session.user)
    const Ships = useSelector((state) => state.ships.ships)
    const [name, setName] = useState("")
    const [currentShip, setCurrentShip] = useState([])
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
 

    useEffect(() => {
      if (Ships.length && User.current_ship) {
          const foundShip = Ships.find((e) => e.id === User.current_ship);
          setCurrentShip(foundShip || null); // Set null if no ship matches
      }
  }, [Ships, User]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Update Ship Info - YOU DIED MODAL")
      const shipUpdates = { 
          runs_completed: currentShip.runs_completed += turns,
        }
      const shipId = currentShip.id
      const userUpdates = {
        gold: User.gold += gold,
        total_runs: User.total_runs += turns
      }

      await dispatch(thunkUpdate(userUpdates))
      await dispatch(thunkShipUpdate(shipId, shipUpdates))
        navigate("/");
    };
  
    return (
      <>
      <div className='fail-modal-content'>
        <h1>Mission Failed</h1>
        { fuel <= 0 && shields > 0 ? <h2>You ran out of fuel. Upgrade your ship to travel further.</h2> : ""}
        { shields <= 0 || shields <=0 && fuel <=0 ? <h2>Hostile aliens destroyed your shields and your ship went down.</h2> : ""}

        <div className="modal-buttons">
            <button type="submit" onClick={handleSubmit}>Return To Space Station</button>
        </div>
      </div>
      </>
    );
  }
  
  export default YouDiedModal