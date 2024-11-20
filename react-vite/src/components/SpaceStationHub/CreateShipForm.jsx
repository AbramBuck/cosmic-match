import { useState, useSelector, useEffect, React } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { createImage } from "../../redux/imageThunk";
// import * as spotActions from '../../store/spotActions';
import '../../components/SpaceStationHub/CreateShipForm.css';
// import { createSpot } from '../../store/spotActions';
// import defaultPreview from '../../images/defaultImage-00-Preview.jpg'

function CreateShipForm({User}) {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState("");
  const [shields, setShields] = useState("");
  const [fuel, setFuel] = useState(2);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});

    console.log("From Ship Form: USER", User)

  const { closeModal } = useModal();
  let createdShip = null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFuel(8 - shields);
    const addedShip = { name, image, shields, fuel, previewUrl };

    try {
        const formData = new FormData();
        formData.append("image", image);
        
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        await dispatch(createImage(formData));
        navigate.push("/images");


        createdSpot = await dispatch(createSpot(addedSpot));
        console.log('Spot created:', createdSpot);
        // Handle success
    } catch (error) {
        const errorData = await error.json();
        if (errorData?.errors) {
            setErrors(errorData.errors);
        } else {
            console.error('Error creating spot:', error);
        }
    }

    try {

      if (createdShip.id) {
        await dispatch(spotActions.addImageToSpot(creaShip.id, previewUrl, true));
        
        for (const imageUrl of additionalImages) {
          await dispatch(spotActions.addImageToSpot(creaShip.id, imageUrl, false));
        }
        closeModal();
        window.location.href = `/spots/${createdSpot.id}`;
      } else {
        console.error("Failed to create spot, ID is undefined");
      }
  
    } catch (error) {
      console.error("Error submitting the form:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        

        setErrors(errors);
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  return (
    <>
    <div className='modal-container'>
      <h1 className='titleText'>Create a New Ship</h1>
      <h2 className='subhead'>Give your ship name some flair!</h2>
      <form 
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
        <label className='label'>
          Upload an Image
          <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            
            {(imageLoading)&& <p>Loading...</p>}
        </label>

        <h2 className='subhead'>Give your ship a name... Like Star Flayer or something cool.</h2>

        <label className='label'>
          <input className='fullInputWidth'
            placeholder='Name your ship'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p className="error-message">{errors.name}</p>}
        <h1 className='subhead'>You can allocate 8 stat points</h1>
        <p className='subhead'>Shields prevent enemeis from destroying your ship</p>
        <p className='subhead'> Fuel lets you take more guesses</p>
        <label className='label'>
        <h2 className='subhead'>Shields: {shields} | Fuel: {8 - shields}</h2>
          <input className='fullInputWidth'
            placeholder="Set Shields Stat"
            type="range"
            defaultValue={2}
            min={2}
            max={6}
            value={shields}
            onChange={(e) => setShields(e.target.value)}
            required
          />
        </label>
        {errors.shields && <p className="error-message">{errors.shields}</p>}
        <h2 className='subhead'>Test Photo URL</h2>
        <caption className='caption'>Test</caption>
        <label className='label'>
          <input className='fullInputWidth'
            type="text"
            value={previewUrl}
            placeholder='Url to your ship image'
            onChange={(e) => setPreviewUrl(e.target.value)}
            required
          />
        </label>
        {errors.previewUrl && <p>{errors.previewUrl}</p>}
        <button type="submit" onClick={handleSubmit}>Create Ship</button>
    </form>
    </div>
    </>
  );
}

export default CreateShipForm;