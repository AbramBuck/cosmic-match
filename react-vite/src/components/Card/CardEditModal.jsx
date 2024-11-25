import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updatePlanet, getAllPlanets } from "../../redux/planet";
import "./EditModal.css";



function EditModal({ card }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(card.name)
    const [imageUrl, setImageUrl] = useState(card.image_url)
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    // useEffect(() => {
    //   if (planet) {
    //     setName(planet.name);
    //   }
    // }, [planet]);

    



    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const planetData = {
        id: planet.id,
        name: name,
        image_url: imageUrl,
      };
      
      try {
        await dispatch(updatePlanet(planet.id, planetData));
        dispatch(getAllPlanets()); 
        closeModal();
      } catch (error) {
  
        console.error("Error:", error);
        setErrors({ general: "An unexpected error occurred." });
      }
    };
  
    return (
      <>
      <div className='edit-modal-content'>
        <div className="shell frosted-glass">
        <form onSubmit={handleSubmit}>
        <h1>Edit Your Card</h1>
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
                required
            />
             <label htmlFor="image_url" className="form-title">
                Planet Image Url:
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
            <div className="priority-container">
                        
                </div>
            <div className="modal-buttons">
              <button type="submit" onClick={handleSubmit}>Update Card</button>
              <button type="submit" onClick={() => closeModal()}>Cancel</button>
            </div>

        </form>
        </div>
      </div>
      </>
    );
  }
  
  export default EditModal;