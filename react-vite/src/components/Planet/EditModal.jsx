import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updatePlanet, getAllPlanets } from "../../redux/planet";
import "./EditModal.css";
import PlanetImages from "../../../src/components/Planet/DefaultPlanetImages"
import image1 from "../../../src/images/planets/none-selected-image-msg.jpg"


function EditModal({ planet }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(planet.name)
    const [imageUrl, setImageUrl] = useState(planet.image_url)
    const [planetId, setPlanetId] = useState(null)
    const [errors, setErrors] = useState({});
    const [deckSize, setDeckSize] = useState(3);
    const { closeModal } = useModal();

    useEffect(() => {
      if (planet) {
        setName(planet.name);
        setPlanetId(planet.id)
      }
    }, [planet]);

    const handleChange = (e) => {
        setDeckSize(Number(e.target.value))
      }

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const planetData = {
        id: planetId,
        name: name,
        image_url: imageUrl,
        deck_size: deckSize
      };
      
      try {
        await dispatch(updatePlanet(planetId, planetData));
        await dispatch(getAllPlanets()); 
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
        <div className="create-planet-crop-container z-index-2"><img src={imageUrl != "" ? imageUrl : noneSelected} title="Add a planet image to preview it"></img></div>
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
             <div className="form-group">
                    <label htmlFor="planet images">Image Select</label>
                    <select
                    id="planet_images"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    title="Select a Planet Image"
                    >
                    <option value="">Select a Planet Image</option>
                    {PlanetImages.map((planet) => (
                        <option key={planet.src} value={planet.src}>
                        {planet.name}
                        </option>
                    ))}
                    </select>
                </div>
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
                      value="3"
                      checked={deckSize === 3}
                      onChange={handleChange}
                      title='The amount of cards on your planet is doubled for match missions'
                      />
                      <span className="deck-btn">3</span>
                  </label>

                  <label className="deck-label">
                      <input
                      type="radio"
                      name="deck"
                      value="4"
                      checked={deckSize === 4}
                      onChange={handleChange}
                      title='The amount of cards on your planet is doubled for match missions'
                      />
                      <span className="deck-btn">4</span>
                  </label>

                  <label className="deck-label">
                      <input
                      type="radio"
                      name="deck"
                      value="6"
                      checked={deckSize === 6}
                      onChange={handleChange}
                      title='The amount of cards on your planet is doubled for match missions'
                      />
                      <span className="deck-btn">6</span>
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