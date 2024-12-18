

//Reducer initial state
const initialState = { 
    ships:[],
};

//Action Type - a variable holding the action type (so redundant)
const GET_SHIPS = "ships/getShips"
const ADD_SHIP = "ships/addShip";
const UPDATE_SHIP = "ships/updateShip";
const DELETE_A_SHIP = "ships/deleteShip"


//Action Creators - the func that returns the variable that holds the action type
const getShips = (ships) => ({
    type: GET_SHIPS,
    payload: ships
});

const addShip = (addedShip) => ({
    type: ADD_SHIP,
    payload: addedShip,
});

const updateShip = (ships) => ({
    type: UPDATE_SHIP,
    payload: ships
});


const deleteShip = (shipId) => ({
    type: DELETE_A_SHIP,
    payload: shipId,
});

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

        if (response.ok){
            const data = await response.json();
            dispatch(addShip(data));
            dispatch(getShips());
            return data;
        }

        if (!response.ok) {

            if (response.status === 400) {
                console.error('Validation Errors:', data.errors);
                throw data.errors;
            }
            throw new Error(data.message || 'Failed to create Ship');
            
        }
        


    } catch (error) {
        console.error('Error creating ship:', error);
        throw error;
    }
};


///////////Delete A SHIP THUNK
export const deleteASHIP = (shipId) => async (dispatch) => {

    try {
        const response = await fetch(`/api/ships/${shipId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch(deleteShip(shipId));
            dispatch(fetchShips());
        } else {
            throw new Error('Failed to delete the Ship');
        }
    } catch (error) {
        console.error('Error deleting the Ship', error);
    }
};

export const thunkShipUpdate = (shipId, updates) => async dispatch => {
    console.log("In the User Update Thunk");
    try {
      const response = await fetch(`/api/ships/${shipId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Data from User Update Thunk", data);
        dispatch(updateShip(data)); // Assuming `updateUser` is your action creator
        return data; // Return the updated data for further use
      } else if (response.status < 500) {
        const errorMessages = await response.json();
        console.error("Error messages from server:", errorMessages);
        return errorMessages; // Return for the caller to handle
      } else {
        console.error("Server error occurred.");
        return { server: "Something went wrong when trying to update user. Please try again" };
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      return { server: "An unexpected error occurred. Please try again" };
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
        
        case ADD_SHIP:
            return{
                ...state,
                ships: action.payload
            }

        case UPDATE_SHIP:
            return{
                ...state,
                ships: action.payload
            }

        case DELETE_A_SHIP:
            return {
                ...state,
                ships: state.ships.filter(ship => ship.id !== action.payload.id)
            };

        default: 
        return state;
    }
};

export default shipsReducer;
