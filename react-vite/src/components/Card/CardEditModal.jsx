import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updatePlanet, getAllPlanets } from "../../redux/planet";
import { FaSdCard } from "react-icons/fa";
import "./EditModal.css";
import { thunkFetchCards, thunkUpdateCard } from "../../redux/cards";
import '../SingleCard/SingleCard.css'
import imageDefault from "../../../src/images/items/default-card-image.jpg"


function EditModal({ card }) {
    const dispatch = useDispatch();
    const noneSelected = imageDefault
    const [name, setName] = useState(card.name)
    const [imageUrl, setImageUrl] = useState(card.image_url)
    const [hostileRating, setHostileRating] = useState(card.hostile);
    const [planetId, setPlanetId] = useState(card.planet_id);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const planets = useSelector((state) => state.planets.planets)
    const cards = useSelector((state) => state.cards.cards )
    const cardsOnPlanet = cards.reduce((acc, card) => {
      const id = card.planet_id;
      acc[id] = (acc[id] || 0) + 1; 
      return acc;
    }, {});
    const thisCardsPlanet = planets.filter((planet) => planet.id === card.planet_id);
    const cardsAtMax = cardsOnPlanet >= thisCardsPlanet.deck_size
    const handleSubmit = async (e) => {
      e.preventDefault();
      

      if (cardsAtMax === true) {
        alert("This planet's deck is maxed out. Delete some cards on this planet to add more")
      } else {

        const cardData = {
          planet_id: planetId,
          name: name,
          image_url: imageUrl,
          hostile: hostileRating,
        };

        try {
          await dispatch(thunkUpdateCard(card.id, cardData));
          dispatch(thunkFetchCards()); 
          closeModal();
        } catch (error) {
    
          console.error("Error:", error);
          setErrors({ general: "An error occurred." });
        }
      }
    };

    return (
      <>
      <div className='edit-modal-content'>
        <div className="shell frosted-glass">
        <div className={ hostileRating && hostileRating === true ? "create-planet-crop-container create-card-border-radius hostile edit-modal-size" : "create-planet-crop-container create-card-border-radius edit-modal-size" }><img src={imageUrl != "" ? imageUrl : noneSelected} title="Add a planet image to preview it"></img></div>
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
                <div className="priority-container">
                <h2>Hostile</h2>
                <label><h3>Hostile cards damage player shields if they are not matched</h3></label>
                <div className="card-options">

                <label className="card-label">
                    <input
                    type="radio"
                    name="enemy"
                    value={true}
                    checked={hostileRating === true}
                    onChange={() => setHostileRating(true)}
                    />
                    <span className="card-btn">Hostile</span>
                </label>

                <label className="card-label">
                    <input
                    type="radio"
                    name="enemy"
                    value={false}
                    checked={hostileRating === false}
                    onChange={() => setHostileRating(false)}
                    />
                    <span className="card-btn">Non-Hostile</span>
                </label>
                </div>
                        <div className="form-group">
                            <label htmlFor="card_id">Planet:</label>
                                <select
                                id="card_id"
                                value={planetId}
                                onChange={(e) => setPlanetId(e.target.value)}
                                required
                                >
                                <option value="">Select a Planet</option>
                                {planets.map((planet) => (
                                    <option key={planet.id} value={planet.id}>
                                    {planet.name} <FaSdCard />: { cardsOnPlanet[planet.id] ? cardsOnPlanet[planet.id] : 0 } | {planets ? planet.deck_size : ""}
                                    </option>
                                ))}
                                </select>
                        </div>
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