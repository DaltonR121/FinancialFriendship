// actions
const CREATE_ACCOUNT = 'accounts/CREATE_ACCOUNT'
const GET_ACCOUNT = 'accounts/GET_ACCOUNT'
const EDIT_ACCOUNT = 'accounts/EDIT_ACCOUNT'

//action creators
const createAccount = (payload) => ({
  type: CREATE_ACCOUNT,
  payload
})

const getAccount = (account) => ({
  type: GET_ACCOUNT,
  payload: account
});

const editAccount = (account) => ({
  type: EDIT_ACCOUNT,
  payload: account
})

// thunks
export const createUserAccount = (account) => async (dispatch) => {
  const newAccount = await fetch('/api/accounts/createAccount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account),
  })
  const data = await newAccount.json()
  dispatch(createAccount(data))
}

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
    case CREATE_ACCOUNT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState;
    }
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
