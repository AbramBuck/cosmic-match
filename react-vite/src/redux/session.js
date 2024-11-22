const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const UPDATE_USER = 'session/updateUser'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
});


export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};


export const thunkUpdate = (updates) => async dispatch => {
  console.log("In the User Update Thunk");
  try {
    const response = await fetch(`/api/users/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Data from User Update Thunk", data);
      dispatch(updateUser(data)); // Assuming `updateUser` is your action creator
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


export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case UPDATE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default sessionReducer;
