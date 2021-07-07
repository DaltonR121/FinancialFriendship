// actions
const CREATE_OTHEROBLIGATION = 'otherObligations/CREATE_OTHEROBLIGATION'
const GET_OTHEROBLIGATION = 'otherObligations/GET_OTHEROBLIGATION'
const EDIT_OTHEROBLIGATION = 'otherObligations/EDIT_OTHEROBLIGATION'
const DELETE_OTHEROBLIGATION = "otherObligations/DELETE_OTHEROBLIGATION";

//action creators
const createOtherObligation = (payload) => ({
  type: CREATE_OTHEROBLIGATION,
  payload
})

const getOtherObligation = (otherObligation) => ({
  type: GET_OTHEROBLIGATION,
  payload: otherObligation
});

const editOtherObligation = (otherObligation) => ({
  type: EDIT_OTHEROBLIGATION,
  payload: otherObligation
})

const deleteOtherObligation = (otherObligation) => ({
  type: DELETE_OTHEROBLIGATION,
  payload: otherObligation
})

// thunks
export const createUserOtherObligation = (otherObligation) => async (dispatch) => {
  const newOtherObligation = await fetch('/api/otherObligations/createOtherObligation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(otherObligation),
  })
  const data = await newOtherObligation.json()
  dispatch(createOtherObligation(data))
}

export const getUserOtherObligation = (userId) => async (dispatch) => {
  const otherObligation = await fetch(`/api/otherObligations/${userId}`);
  const data = await otherObligation.json()

  dispatch(getOtherObligation(data))
}

export const editUserOtherObligation = (otherObligation) => async (dispatch) => {
  console.log(otherObligation)
  const otherObligationUpdate = await fetch(`/api/otherObligations/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(otherObligation)
  });
  const data = await otherObligationUpdate.json();

  dispatch(editOtherObligation(data))
}

export const deleteUserOtherObligation = (otherObligationId) => async(dispatch) => {
  const otherObligation = await fetch(`/api/otherObligations/delete/${otherObligationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: otherObligationId
  })
  const data = await otherObligation.json()

  dispatch(deleteOtherObligation(data))
}

let initialState = {};

// reducer
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_OTHEROBLIGATION: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState;
    }
    case GET_OTHEROBLIGATION: {
      const newState = { ...state };
      action.payload.other_obligations.forEach((otherObligation) => {
        newState[otherObligation.id] = otherObligation
      })
      return newState;
    }
    case EDIT_OTHEROBLIGATION: {
      const newState = { ...state };
      newState[action.payload.other_obligation.id] = action.payload.other_obligation
      return newState;
    }
    case DELETE_OTHEROBLIGATION: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
}
