// actions
const CREATE_CREDITCARD = 'creditCards/CREATE_CREDITCARD'
const GET_CREDITCARD = 'creditCards/GET_CREDITCARD'
const EDIT_CREDITCARD = 'creditCards/EDIT_CREDITCARD'
const DELETE_CREDITCARD = "creditCards/DELETE_CREDITCARD";

//action creators
const createCreditCard = (payload) => ({
  type: CREATE_CREDITCARD,
  payload
})

const getCreditCard = (creditCard) => ({
  type: GET_CREDITCARD,
  payload: creditCard
});

const editCreditCard = (creditCard) => ({
  type: EDIT_CREDITCARD,
  payload: creditCard
})

const deleteCreditCard = (creditCard) => ({
  type: DELETE_CREDITCARD,
  payload: creditCard
})

// thunks
export const createUserCreditCard = (creditCard) => async (dispatch) => {
  const newCreditCard = await fetch('/api/creditCards/createCreditCard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creditCard),
  })
  const data = await newCreditCard.json()
  dispatch(createCreditCard(data))
}

export const getCreditCards = (userId) => async (dispatch) => {
  const creditCard = await fetch(`/api/creditCards/${userId}`);
  const data = await creditCard.json()

  dispatch(getCreditCard(data))
}

export const editUserCreditCard = (creditCard) => async (dispatch) => {
  const creditCardUpdate = await fetch(`/api/creditCards/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creditCard)
  });
  const data = await creditCardUpdate.json();

  dispatch(editCreditCard(data))
}

export const deleteUserCreditCard = (creditCardId) => async(dispatch) => {
  const creditCard = await fetch(`/api/creditCards/delete/${creditCardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: creditCardId
  })
  const data = await creditCard.json()

  dispatch(deleteCreditCard(data))
}

let initialState = {};

// reducer
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_CREDITCARD: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState;
    }
    case GET_CREDITCARD: {
      const newState = { ...state };
      action.payload.credit_cards.forEach((creditCard) => {
        newState[creditCard.id] = creditCard
      })
      return newState;
    }
    case EDIT_CREDITCARD: {
      const newState = { ...state };
      newState[action.payload.creditCard.id] = action.payload.creditCard
      return newState;
    }
    case DELETE_CREDITCARD: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
}
