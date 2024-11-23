import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updatePlanet, getAllPlanets } from "../../redux/planet";
import "./EditModal.css";



function EditModal({ planet }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(planet.name)
    const [imageUrl, setImageUrl] = useState(planet.image_url)
    const [errors, setErrors] = useState({});
    const [deckSize, setDeckSize] = useState(6);
    const { closeModal } = useModal();

    useEffect(() => {
      if (planet) {
        setName(planet.name);
      }
    }, [planet]);

    
    const handleChange = async (e) => {
        setDeckSize(Number(e.target.value))
      }


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
        <h1>Edit Your Planet</h1>
            <div className="form-group">
            <label htmlFor="name" className="form-title">
                Planet Name:
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
                        <label><h4>Deck Size</h4></label>
                        <div className="deck-options">

                        <label className="deck-label">
                            <input
                            type="radio"
                            name="deck"
                            value="6"
                            checked={deckSize === 6}
                            onChange={handleChange}
                            />
                            <span className="deck-btn">6</span>
                        </label>

                        <label className="deck-label">
                            <input
                            type="radio"
                            name="deck"
                            value="12"
                            checked={deckSize === 12}
                            onChange={handleChange}
                            />
                            <span className="deck-btn">12</span>
                        </label>
                        </div>
                </div>
            <div className="modal-buttons">
              <button type="submit" onClick={handleSubmit}>Update Planet</button>
              <button type="submit" onClick={() => closeModal()}>Cancel</button>
            </div>

        </form>
        </div>
      </div>
      </>
    );
  }
  
  export default EditModal;