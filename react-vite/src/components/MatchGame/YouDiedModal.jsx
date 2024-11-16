import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./Modal.css";



function YouDiedModal({gold,turns, shields, fuel }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

  

    const handleSubmit = async (e) => {
      e.preventDefault();
      //submit gold and ship turns and lifetime turns to the server
        
        alert("You Failed");
    };
  
    return (
      <>
      <div className='modal-content'>
        <h1>Mission Failed</h1>
        { fuel <= 0 ? <h2>You ran out of fuel. Upgrade your ship to travel further.</h2> : ""}
        { shields <= 0 ? <h2>Hostile aliens destroyed your shields and your ship went down.</h2> : ""}

        <div className="modal-buttons">
            <button type="submit" onClick={handleSubmit}>Return To Space Station</button>
        </div>
      </div>
      </>
    );
  }
  
  export default YouDiedModal;