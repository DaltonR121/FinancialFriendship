// actions
const CREATE_MONTHLYREOCCURRING = 'monthlyReoccurring/CREATE_MONTHLYREOCCURRING'
const GET_MONTHLYREOCCURRING = 'monthlyReoccurring/GET_MONTHLYREOCCURRING'
const EDIT_MONTHLYREOCCURRING = 'monthlyReoccurring/EDIT_MONTHLYREOCCURRING'
const DELETE_MONTHLYREOCCURRING = "monthlyReoccurring/DELETE_MONTHLYREOCCURRING";

//action creators
const createMonthlyReoccurring = (payload) => ({
  type: CREATE_MONTHLYREOCCURRING,
  payload
})

const getMonthlyReoccurring = (payload) => ({
  type: GET_MONTHLYREOCCURRING,
  payload
});

const editMonthlyReoccurring = (monthlyReoccurring) => ({
  type: EDIT_MONTHLYREOCCURRING,
  payload: monthlyReoccurring
})

const deleteMonthlyReoccurring = (monthlyReoccurring) => ({
  type: DELETE_MONTHLYREOCCURRING,
  payload: monthlyReoccurring
})

// thunks
export const createUserMonthlyReoccurring = (monthlyReoccurring) => async (dispatch) => {
  const newMonthlyReoccurring = await fetch('/api/monthlyReoccurring/createMonthlyReoccurring', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(monthlyReoccurring),
  })
  const data = await newMonthlyReoccurring.json()
  dispatch(createMonthlyReoccurring(data))
}

export const getUserMonthlyReoccurring = (userId) => async (dispatch) => {
  const monthlyReoccurring = await fetch(`/api/monthlyReoccurring/${userId}`);
  const data = await monthlyReoccurring.json()

  dispatch(getMonthlyReoccurring(data))
}

export const editUserMonthlyReoccurring = (monthlyReoccurring) => async (dispatch) => {
  const monthlyReoccurringUpdate = await fetch(`/api/monthlyReoccurring/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(monthlyReoccurring)
  });
  const data = await monthlyReoccurringUpdate.json();

  dispatch(editMonthlyReoccurring(data))
}

export const deleteUserMonthlyReoccurring = (monthlyReoccurringId) => async(dispatch) => {
  const monthlyReoccurring = await fetch(`/api/monthlyReoccurring/delete/${monthlyReoccurringId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: monthlyReoccurringId
  })
  const data = await monthlyReoccurring.json()

  dispatch(deleteMonthlyReoccurring(data))
}

let initialState = {};

// reducer
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_MONTHLYREOCCURRING: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState;
    }
    case GET_MONTHLYREOCCURRING: {
      const newState = { ...state };
      action.payload.monthly_reoccurrings.forEach((monthlyReoccurring) => {
        newState[monthlyReoccurring.id] = monthlyReoccurring
      })
      return newState;
    }
    case EDIT_MONTHLYREOCCURRING: {
      const newState = { ...state };
      newState[action.payload.monthly_reoccurring.id] = action.payload.monthly_reoccurring
      return newState;
    }
    case DELETE_MONTHLYREOCCURRING: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
}
