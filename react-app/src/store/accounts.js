// actions
const CREATE_ACCOUNT = 'accounts/CREATE_ACCOUNT'
const GET_ACCOUNT = 'accounts/GET_ACCOUNT'
const EDIT_ACCOUNT = 'accounts/EDIT_ACCOUNT'
const DELETE_ACCOUNT = "accounts/DELETE_ACCOUNT";

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

const deleteAccount = (account) => ({
  type: DELETE_ACCOUNT,
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

  dispatch(getAccount(data))
}

export const editUserAccount = (account) => async (dispatch) => {
  console.log(account)
  const accountUpdate = await fetch(`/api/accounts/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account)
  });
  const data = await accountUpdate.json();

  dispatch(editAccount(data))
}

export const deleteUserAccount = (accountId) => async(dispatch) => {
  const account = await fetch(`/api/accounts/delete/${accountId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: accountId
  })
  const data = await account.json()

  dispatch(deleteAccount(data))
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
      newState[action.payload.account.id] = action.payload.account
      return newState;
    }
    case DELETE_ACCOUNT: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
}
