import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./Modal.css";




function YouDiedModal({gold,turns, shields, fuel }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

  

    const handleSubmit = async (e) => {
      e.preventDefault();
      //submit gold and ship turns and lifetime turns to the server
        
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