import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkShipUpdate } from "../../redux/ship";
import { thunkUpdate } from "../../redux/session";
import "./Modal.css";




function YouDiedModal({gold,turns, shields, fuel }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state) => state.session.user);
    const Ships = useSelector((state) => state.ships.ships);
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
      console.log("Update Ship Info - YOU WON MODAL")
      const shipUpdates = { 
          runs_completed: currentShip.runs_completed += turns,
        }
      const shipId = currentShip.id

      
      await dispatch(thunkShipUpdate(shipId, shipUpdates))
        navigate("/");
    };
  
    return (
      <>
      <div className='won-modal-content'>
        <h1>Mission Successful</h1>
        <h2>You explored the planet and you returned safely.</h2>
        <h2>Completion Bonus: +100 Gold</h2>

        <div className="modal-buttons">
            <button type="submit" onClick={handleSubmit}>Return To Space Station</button>
        </div>
      </div>
      </>
    );
  }
  
  export default YouDiedModal;