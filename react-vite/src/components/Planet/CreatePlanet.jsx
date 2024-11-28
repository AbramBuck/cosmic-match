import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlanet } from '../../redux/planet';
import { useNavigate } from 'react-router-dom';
import { IoPlanet } from "react-icons/io5";
import './CreatePlanet.css'
import './ManagePlanets.css'
import PlanetImages from "../../../src/components/Planet/DefaultPlanetImages"
import image1 from "../../../src/images/planets/none-selected-image-msg.jpg"

const CreatePlanet = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.session.user)
    const [name, setName] = useState('')
    const [image, setImageUrl] = useState("https://res.cloudinary.com/di0fa12vz/image/upload/v1732376498/default_planet_fzsx8x.jpg")
    const [deckSize, setDeckSize] = useState(3)
    const [error, setErrors] = useState(null)
    const noneSelected = image1

    if (!user) navigate(`/login`);

    const handleChange = async (e) => {
        setDeckSize(Number(e.target.value))
      }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const planetData = {
        name,
        image_url: image,
        deck_size: deckSize,
        };

        try {
            await dispatch(createPlanet(planetData))
            navigate('/planets')
        } catch (error) {
            setErrors({ submission: "Error when trying to create a planet." })
        }
    };


  return (
    <div className="create-planet-page-wrapper">
        <div className='frosted-glass create-planet-form-glass'>
        <div className="create-planet-crop-container"><img src={image != "" ? image : noneSelected} title="Add a planet image to preview it"></img></div>
            <div className="create-container">
            <h1><IoPlanet /> Create a New Planet</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="name">Planet Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>

                <div className="form-group">
                    <label htmlFor="planet images">Image Select</label>
                    <select
                    id="planet_images"
                    value={image}
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

                <div className="form-group">
                <label htmlFor="url">Image url:</label>
                <input
                    type="text"
                    id="url"
                    value={image}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
                </div>

                <div className="priority-container">
                        <label>Deck Size </label>
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
                            />
                            <span className="deck-btn">6</span>
                        </label>
                        </div>
                </div>
                <button type="submit">Create Planet</button>
            </form>

            {error && <p className="error">{error}</p>}
            </div>
        </div>
    </div>
  );
};

export default CreatePlanet;