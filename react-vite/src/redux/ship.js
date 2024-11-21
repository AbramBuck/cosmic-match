
//Reducer initial state
const initialState = { 
    ships:[],
};

//Action Type - a variable holding the action type (so redundant)
const GET_SHIPS = "ships/getShips"
const ADD_SHIP = "ships/addShip";
const ADD_IMAGE_TO_SHIP = "ships/addImageToShip";
const GET_SHIP_DETAILS = "ships/getShipDetails";
const DELETE_A_SHIP = "ships/deleteShip"
const UPDATE_SHIP = "ships/updateShip"

//Action Creators - the func that returns the variable that holds the action type
const getShips = (ships) => ({
    type: GET_SHIPS,
    ships,
});

const addShip = (addedShip) => ({
    type: ADD_SHIP,
    addedShip,
});

const addImage = (image) => ({
    type: ADD_IMAGE_TO_SHIP,
    image,
});

const deleteShip = (shipId) => ({
    type: DELETE_A_SHIP,
    shipId,
});

const updateShip = (updatedShip) => ({
    type: UPDATE_SHIP,
    updatedShip,
});

//Thunk - The actual action to be done
//Get All Spots
export const fetchShips = () => async (dispatch) => {
    const response = await csrfFetch('api/ships');
    const data = await response.json();
    dispatch(getShips(data.Ships));
};

//GET SPOT DETAILS THUNK 
export const fetchSpotDetails = (spotId) => async (dispatch) => {

    try{
        const response = await csrfFetch(`/api/spots/${spotId}`);
        const data = await response.json();
        dispatch(getSpotDetails(data));
    } catch (error) {
        console.error('Error fetching spot details', error);
    }

};

//CREATE SHIP Thunk
export const createShip = (addedShip) => async (dispatch) => {
    console.log("Inside Thunk - ADDED SHIP INFO:", addedShip)
    const { name, shields, fuel, image_url, runs_completed} = addedShip;
    try {
        const response = await fetch("/api/ships/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                shields,
                fuel,
                image_url,
                runs_completed
            })
        });
        const data = await response.json();
        console.log("Data retruend", data)
        if (!response.ok) {

            if (response.status === 400) {
                console.error('Validation Errors:', data.errors);
                throw data.errors;
            }
            throw new Error(data.message || 'Failed to create spot');
            
        }
        
        dispatch(addShip(data)); 
        return data;

    } catch (error) {
        console.error('Error creating ship:', error);
        throw error;
    }
};


//Add Image Thunk
export const addImageToShip = (shipId, imageUrl) => async (dispatch) => {
    try {
      const response = await fetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotId,
          url: imageUrl,
          preview: isPreview
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add image');
      }
  
      const image = await response.json();
      dispatch(addImage(image));
      return image;
    } catch (error) {
      console.error('Error adding image to spot:', error);
      throw error;
    }
  };

//Get User Spots Thunk
export const fetchUserSpots = () => async (dispatch) => {

    try{
        const response = await fetch(`/api/spots/current`);
        const data = await response.json();
        dispatch(getUserSpots(data.Spots));
    } catch (error) {
        console.error('Error fetching spot details', error);
    }
};


//DELETE A SPOT THUNK
export const deleteAShip = (shipId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/spots/${shipId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(deleteSpot(shipId));
        } else {
            throw new Error('Failed to delete spot');
        }
    } catch (error) {
        console.error('Error deleting the spot', error);
    }
};

//Update Spot THUNKs
export const updateSpot = (shipId, ship) => async (dispatch) => { 
    console.log("=============THUNK CAKLLL",spotId);
    try {
        const response = await fetch(`/api/ships/${shipId}`, {
            
            method: 'PUT',
            body: JSON.stringify(spot),
        });
        if (response.ok) {
            const updatedSpot = await response.json();
            dispatch(updateShipAction(updatedShip)); 
            return updatedShip;
        }
    } catch (err) {
        console.error(`Error updating spot: ${err}`);
    }
};

//SPOT REDUCER//////////////////////////////////////////////////////////////////////////////////////
const shipsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SHIPS:
            return {
                ...state,
                spots: action.spots,
            };
        case GET_SHIP_DETAILS:
            return {
                ...state,
                spotDetails: action.spotDetails,
            };
        case ADD_SHIP:
            return {
                ...state,
                ships: [...state.ships, action.addedShip],
            };
        case ADD_IMAGE_TO_SHIP:
            return {
                ...state,
                spots: state.spots.map((spot) =>
                    spot.id === action.image.spotId
                    ? {...spot, images: [...spot.images, action.image]}
                    :spot
                ), 
            };
        case DELETE_A_SHIP:
        return {
            ...state,
            spots: state.spots.filter(spot => spot.id !== action.spotId),
            userSpots: state.userSpots.filter(spot => spot.id !== action.spotId),
        };
        case UPDATE_SHIP:
            return {
                ...state,
                userSpots: state.userSpots.map((spot) =>
                    spot.id === action.updatedSpot.id ? action.updatedSpot : spot
                ),
            };

        default: 
        return state;
    }
};

export default shipsReducer;
