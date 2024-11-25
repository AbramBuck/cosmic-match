import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlanet } from '../../redux/planet';
import { useNavigate } from 'react-router-dom';
import { IoPlanet } from "react-icons/io5";
import './CreatePlanet.css'


const CreatePlanet = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const [name, setName] = useState('');
    const [image, setImageUrl] = useState("https://res.cloudinary.com/di0fa12vz/image/upload/v1732376498/default_planet_fzsx8x.jpg");
    const [deckSize, setDeckSize] = useState(6);
    const [error, setErrors] = useState(null); 

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
                <button type="submit">Create Planet</button>
            </form>

            {error && <p className="error">{error}</p>}
            </div>
        </div>
    </div>
  );
};

export default CreatePlanet;