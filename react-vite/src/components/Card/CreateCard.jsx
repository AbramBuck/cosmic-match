import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateCard, thunkFetchCards } from '../../redux/cards';
import { getAllPlanets } from '../../redux/planet';
import { useNavigate } from 'react-router-dom';
import { FaSdCard } from "react-icons/fa";
import '../Planet/CreatePlanet.css'


const CreateCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const [name, setName] = useState('');
    const [image, setImageUrl] = useState("https://res.cloudinary.com/di0fa12vz/image/upload/v1732376498/default_planet_fzsx8x.jpg");
    const [hostileRating, setHostileRating] = useState("false");
    const [planetId, setPlanetId] = useState(1);
    const [error, setErrors] = useState(null); 
    const planets = useSelector((state) => state.planets.planets)


    if (!user) navigate(`/login`);

  console.log("Hostile Rating",hostileRating)
  console.log("PLanet ID Chosen",planetId)

  useEffect(() => { 
    dispatch(getAllPlanets())
}, [dispatch], planets);
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        const cardData = {
        name,
        planet_id: planetId,
        image_url: image,
        hostile: hostileRating,
        reward: 20,
        description: "description",
        base_game: false,
        };

        try {
            dispatch(thunkCreateCard(cardData))
            dispatch(thunkFetchCards())
            navigate(`/planets/${planetId}`)
        } catch (error) {
            setErrors({ submission: "Error when trying to create a card." });
        }
    };


  return (
    <div className="create-planet-page-wrapper">
        <div className='frosted-glass create-planet-form-glass'>
            <div className="create-container">
            <h1><FaSdCard /> Create a New Card</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="name">Card Name:</label>
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
                                    {planet.name} 
                                    </option>
                                ))}
                                </select>
                        </div>
                </div>
                <button type="submit">Create Card</button>
            </form>

            {error?.submission && <p className="error">{error.submission}</p>}
            </div>
        </div>
    </div>
  );
};

export default CreateCard;