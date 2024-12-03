import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { RiSpaceShipFill } from "react-icons/ri";
import "../Card/EditModal.css";
import '../SingleCard/SingleCard.css'
import imageDefault from "../../../src/images/planets/none-selected-image-msg.jpg"
import { thunkShipUpdate, fetchShips } from "../../redux/ship";
import ShipImages from '../SpaceStationHub/DefaultShipImages';

function ShipEditModal({ ship }) {
    const dispatch = useDispatch()
    const noneSelected = imageDefault
    const [name, setName] = useState(ship.name)
    const [imageUrl, setImageUrl] = useState(ship.image_url)
    const [shipId, setPlanetId] = useState(ship.id)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    const ships = useSelector((state) => state.ships.ships )

    useEffect(() => { 
        dispatch(fetchShips())
    }, [dispatch], ships);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === null || name === "" || name  === " "){
          alert("Your ship must have a name")
        } else if( name.length < 4){
          alert("Name must be greater than 4 characters")
        } else if( imageUrl === null || imageUrl === " " || imageUrl === imageDefault || imageUrl === ''){
          alert("Select an image from the dropdown or add a url to a custom ship image")
        }
        else {
          const shipData = {
            name: name,
            image_url: imageUrl,
          }

        try {
          await dispatch(thunkShipUpdate(ship.id, shipData))
          await dispatch(fetchShips())
          closeModal();
        } catch (error) {
          console.error("Error:", error)
          setErrors({ general: "An error occurred." })
        }
        }
      }

    return (
      <>
      <div className='edit-modal-content'>
        <div className="shell frosted-glass">
        <div className={ships ? "create-planet-crop-container create-card-border-radius edit-modal-size" : "create-planet-crop-container create-card-border-radius edit-modal-size" }><img src={imageUrl != "" ? imageUrl : noneSelected} title="Add a ship image to preview it"></img></div>
        <form onSubmit={handleSubmit}>
        <h1><RiSpaceShipFill />Edit Your Ship</h1>
            <div className="form-group">
            <label htmlFor="name" className="form-title">
                Card Name:
            </label>
            {errors.name && <p>{errors.name}</p>}
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
            />
             <div className="form-group margin-top-20">
            <label htmlFor="ship images">Image Select</label>
            <select
            id="ship_images"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            title="Select a Ship Image"
            required={true}
            >
            <option value="">Select a Ship Image</option>
            {ShipImages.map((ship) => (
                <option key={ship.src} value={ship.src}>
                {ship.name}
                </option>
            ))}
            </select>
        </div>
             <label htmlFor="image_url" className="form-title">
                Ship Image Url:
            </label>
            {errors.image_url && <p>{errors.image_url}</p>}
            <input
                type="text"
                id="image_url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
            />
            </div>
          
                
            <div className="modal-buttons">
              <button type="submit" onClick={handleSubmit}>Update Ship</button>
              <button type="submit" onClick={() => closeModal()}>Cancel</button>
            </div>

        </form>
        </div>
      </div>
      </>
    );
  }
  
  export default ShipEditModal;