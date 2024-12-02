import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createShip, fetchShips } from '../../redux/ship';
import { thunkUpdate } from '../../redux/session';
import '../../components/SpaceStationHub/CreateShipForm.css';
import ShipImages from '../SpaceStationHub/DefaultShipImages';
import image1 from "../../../src/images/planets/none-selected-image-msg.jpg"
import bgimaage from "../../../src/images/ships/ship_bg_image.jpg"
import '../Planet/CreatePlanet.css'


function CreateShipForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [shields, setShields] = useState(3);
  const [fuel, setFuel] = useState(5);
  const noneSelected = image1
  const [previewUrl, setPreviewUrl] = useState(noneSelected);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  let createdShip = null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFuel(8 - shields);
    const addedShip = { name, shields, fuel, image_url: previewUrl, runs_completed: 0 }

    
    try {

        createdShip = await dispatch(createShip(addedShip));
        if (createdShip && createdShip.id) {
          await dispatch(thunkUpdate({current_ship: createdShip.id}))
          await dispatch(fetchShips())
          console.log("Created Ship",createdShip)
          }
    } catch (error) {
        setErrors({ submission: "Error when trying to create a review." })
    }
        closeModal();
        // window.location.href = `/spots/${createdSpot.id}`;
  };

  return (
    <>
    <div className='ship-modal-container'>
      <div className='create-ship-form-glass'>
      <div className="create-planet-crop-container create-card-border-radius create-ship-image-preview"><img src={previewUrl != "" ? previewUrl : noneSelected} title="Add a ship image to preview it"></img></div>
      <h1 className='titleText'>Create a New Ship</h1>
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
        <div className="form-group margin-top-20">
            <label htmlFor="ship images">Image Select</label>
            <select
            id="ship_images"
            value={previewUrl}
            onChange={(e) => setPreviewUrl(e.target.value)}
            title="Select a Ship Image"
            >
            <option value="">Select a Ship Image</option>
            {ShipImages.map((ship) => (
                <option key={ship.src} value={ship.src}>
                {ship.name}
                </option>
            ))}
            </select>
        </div>
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
        <div className='create-cancel-btns margin-top-add'>
          <button type="submit" onClick={handleSubmit}>Create Ship</button>
          <button type="submit" onClick={() => closeModal()}>Cancel</button>
        </div>

    </form>
    </div>
    </div>
    </>
  );
}

export default CreateShipForm;