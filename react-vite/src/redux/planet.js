//// Action Type
const GET_PLANETS = "planets/getPlanets";
const ADD_PLANET = "planets/addPlanet";
const DELETE_A_PLANET = "planets/deletePlanet"
const UPDATE_PLANET = "planets/updatePlanet";

//// Action creator
const getPlanets = (planets) => ({
    type: GET_PLANETS,
    payload: planets,
});

const addPlanet = (addedPlanet) => ({
    type: ADD_PLANET,
    payload: addedPlanet,
});

const deletePlanet = (planetToDelete) => ({
    type: DELETE_A_PLANET,
    payload: planetToDelete
});

const updatePlanetAction = (updatedPlanet) => ({
    type: UPDATE_PLANET,
    payload: updatedPlanet,
});


/////////////////////// THUNKS //////////////////////////


///////Add a PLANET THUNK
export const createPlanet = (addedPlanet) => async (dispatch) => {
    addedPlanet;

    try {
        const response = await fetch("/api/planets", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addedPlanet)
        });
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 400) {
                console.error('Validation Errors:', data.errors);
                throw data.errors;
            }
            throw new Error(data.message || 'Failed to create a planet');
        }

        dispatch(addPlanet(data));
        return data;

    } catch (error) {
        console.error('Error creating planet:', error);
        throw error;
    }
};

/////Update A Planet THUNK
export const updatePlanet = (planetId, planet) => async (dispatch) => { 

    try {
        const response = await fetch(`/api/planets/${planetId}`, {
            
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(planet)
        });
        if (response.ok) {
            const updatedPlanet = await response.json();
            dispatch(updatePlanetAction(updatedPlanet));
            return updatedPlanet;
        }
    } catch (err) {
        console.error(`Error updating planet: ${err}`);
    }
};



/////Get ALL Planets THUNK
export const getAllPlanets = () => async (dispatch) => {
    const response = await fetch("/api/planets");


    if(response.ok) {
        const data = await response.json();
        dispatch(getPlanets(data));

    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
      } else {
        return { server: "Something went wrong. Please try again" }
      }
    
};


///////////Delete A PLANET THUNK

export const deleteAPLANET = (planetId) => async (dispatch) => {

    try {
        const response = await fetch(`/api/planets/${planetId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch(deletePlanet(planetId));
            dispatch(getAllPlanets());
        } else {
            throw new Error('Failed to delete the Planet');
        }
    } catch (error) {
        console.error('Error deleting the Planet', error);
    }
};



const initialState = {
    planets: [],
};


///////////// PLANET REDUCER /////////////
const planetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PLANETS:
            return {
                ...state,
                planets: action.payload,
            };

        case ADD_PLANET:
            return {
                ...state,
                planet: [...state.planets, action.payload],
            };

        case DELETE_A_PLANET:
            return {
                ...state,
                planet: state.planets.filter(planet => planet.id !== action.payload.id)
            };
        
        case UPDATE_PLANET:
            return {
                ...state,
                planets: state.planets.map((planet) =>
                    planet.id === action.updatedPlanet.id ? action.payload : planet
                ),
            };

        default: 
            return state;
    }
};

export default planetsReducer;