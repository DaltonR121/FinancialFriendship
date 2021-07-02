// actions
const GET_ACCOUNT = 'accounts/GET_ACCOUNT'
const EDIT_ACCOUNT = 'accounts/EDIT_ACCOUNT'

//action creators
const getAccount = (account) => ({
  type: GET_ACCOUNT,
  payload: account
});

const editAccount = (account) => ({
  type: EDIT_ACCOUNT,
  payload: account
})

// thunks
export const getUserAccount = (userId) => async (dispatch) => {
  const account = await fetch(`/api/accounts/${userId}`);
  const data = await account.json()
  console.log(data);

  dispatch(getAccount(data))
}

export const editUserAccount = (accountId) => async (dispatch) => {
  const body = 'PLACEHOLDER' // START HERE WHEN I COME BACK
  const account = await fetch(`/api/accounts/${accountId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  const data = await account.json()
  console.log(data);

  dispatch(editAccount(data))
}

let initialState = {};

// reducer
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_ACCOUNT: {
      const newState = { ...state };
      action.payload.accounts.forEach((account) => {
        newState[account.id] = account
      })
      return newState;
    }
    case EDIT_ACCOUNT: {
      const newState = { ...state };
      action.payload.accounts.forEach((account) => {
        newState[account.id] = account
      })
      return newState;
    }
    default:
      return state;
  }
}
