
const GET_CARDS = 'cards/getCard';
const CREATE_CARD = 'cards/createCard';
const UPDATE_CARD = 'cards/updateCard';
const DELETE_CARD = 'cards/deleteCard';


const getCards = (cards) => ({
  type: GET_CARDS,
  payload: cards,
});
const createCard = (card) => ({
    type: CREATE_CARDS,
    payload: card,
  });
  
  const updateCard = (card) => ({
    type: UPDATE_CARD,
    payload: card,
  });
  
  const deleteCard = (cardId) => ({
    type: DELETE_CARD,
    payload: cardId,
  });


export const thunkFetchCards = () => async (dispatch) => {

      const response = await fetch('/api/cards');  
      
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Cards:", data);  
        dispatch(getCards(data));  

      } else {
        console.error("Server error:", response.status);
        return { server: "Something went wrong. Please try again" };
      }
  };


  export const thunkCreateCard = (newCard) => async (dispatch) => {

      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });
      
      if (response.ok) {
        const createdCard = await response.json();
        console.log("Created Card:", createdCard);
        dispatch(createCard(createdCard)); 

      } else {
        console.error("Server error:", response.status);
        return { server: "Something went wrong. Please try again" };
      }

  };
  


  export const thunkUpdateCard = (cardId, updatedCard) => async (dispatch) => {
    // try {
      console.log("Updating card with ID:", cardId);
      const response = await fetch(`/api/cards/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCard),
      });
      
      if (response.ok) {
      const updatedCard = await response.json();

      dispatch({
        type: 'UPDATE_CARD',
        payload: updatedCard,
      });
    } else {
      console.error('Failed to update card');
    }

};
  

  // Delete a card
  export const thunkDeleteCard = (cardId) => async (dispatch) => {

      const response = await fetch(`/api/cards/${cardId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        console.log("Deleted Card:", cardId);
        dispatch(deleteCard(cardId)); 

      } else {
        console.error("Server error:", response.status);
        return { server: "Something went wrong. Please try again" };
      }

  };


const initialState = {
  cards: [],
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
      case CREATE_CARD:
        return {
          ...state,
          cards: [...state.cards, action.payload],
        };
  
      case UPDATE_CARD:
        return {
          ...state,
          cards: state.cards.map(card =>
            card.id === action.payload.id ? action.payload : card
          ),
        };
  
      case DELETE_CARD:
        return {
          ...state,
          cards: state.cards.filter(card => card.id !== action.payload),
        };

    default:
      return state;
  }
};

export default cardsReducer;