

//Reducer initial state
const initialState = { 
    ships:[],
};

//Action Type - a variable holding the action type (so redundant)
const GET_SHIPS = "ships/getShips"
const ADD_SHIP = "ships/addShip";


//Action Creators - the func that returns the variable that holds the action type
const getShips = (ships) => ({
    type: GET_SHIPS,
    payload: ships
});

const addShip = (addedShip) => ({
    type: ADD_SHIP,
    addedShip,
});

const addImage = (image) => ({
    type: ADD_IMAGE_TO_SHIP,
    image,
});

// const deleteShip = (shipId) => ({
//     type: DELETE_A_SHIP,
//     shipId,
// });

// const updateShip = (updatedShip) => ({
//     type: UPDATE_SHIP,
//     updatedShip,
// });

//Thunk - The actual action to be done
//Get All Ships
export const fetchShips = () => async (dispatch) => {
    const response = await fetch("api/ships/");

    if (response.ok){
        const data = await response.json();
        dispatch(getShips(data.ships));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
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



//SHIP REDUCER//////////////////////////////////////////////////////////////////////////////////////
const shipsReducer = (state = initialState, action) => {

    switch(action.type) {
        case GET_SHIPS:
            return {
                ...state,
                ships: action.payload,
            };

        default: 
        return state;
    }
};

export default shipsReducer;