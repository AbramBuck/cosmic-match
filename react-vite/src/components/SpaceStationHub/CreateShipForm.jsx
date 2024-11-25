import { useState, useSelector, useEffect, React } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { createImage } from "../../redux/imageThunk";
import { createShip } from '../../redux/ship';
// import * as spotActions from '../../store/spotActions';
import '../../components/SpaceStationHub/CreateShipForm.css';
// import { createSpot } from '../../store/spotActions';
// import defaultPreview from '../../images/defaultImage-00-Preview.jpg'

function CreateShipForm({User}) {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
//   const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState("");
  const [shields, setShields] = useState(3);
  const [fuel, setFuel] = useState(5);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  let createdShip = null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFuel(8 - shields);
    const addedShip = { name, shields, fuel, image_url: previewUrl, runs_completed: 0 };

    
    try {

        createdShip = await dispatch(createShip(addedShip));
        // Handle success
    } catch (error) {
        setErrors({ submission: "Error when trying to create a review." });
    }


      if (createdShip) {
        console.log("Created Ship",createdShip)
        }
        closeModal();
        // window.location.href = `/spots/${createdSpot.id}`;
  };

  return (
    <>
    <div className='ship-modal-container'>
      <div className='create-ship-form-glass'>
      <h1 className='titleText'>Create a New Ship</h1>
      <h2 className='subhead'>Give your ship name some flair!</h2>
      <form 
            onSubmit={handleSubmit}
            // encType="multipart/form-data"
        >
        {/* <label className='label'>
          Upload an Image
          <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            
            {(imageLoading)&& <p>Loading...</p>}
        </label> */}

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
        <h2 className='subhead'>Photo URL</h2>
        <caption className='caption'>Add a photo url here</caption>
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
    </div>
    </>
  );
}

export default CreateShipForm;