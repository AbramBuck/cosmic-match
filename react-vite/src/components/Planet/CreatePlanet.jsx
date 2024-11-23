import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPlanet } from '../../redux/planet';
import { useNavigate } from 'react-router-dom';



const CreatePlanet = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImageUrl] = useState("");
    const [deckSize, setDeckSize] = useState(6);
    const [error, setErrors] = useState(null); 

    const handleChange = async (e) => {
        e.preventDefault();
        setDeckSize(e.target.value)
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
    <div className="Create-wrapper">
    
    <div className="create-note-container">
      <h1>Create a New Planet</h1>
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
                      name="deck 6"
                      value="deckSize"
                      checked={deckSize === 6}
                      onChange={handleChange}
                    />
                    <span className="deck-btn">6</span>
                  </label>

                  <label className="deck-label">
                    <input
                      type="radio"
                      name="deck 12"
                      value="deckSize"
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
  );
};

export default CreatePlanet;