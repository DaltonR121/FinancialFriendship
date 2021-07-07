// actions
const CREATE_ASSET = 'assets/CREATE_ASSET'
const GET_ASSET = 'assets/GET_ASSET'
const EDIT_ASSET = 'assets/EDIT_ASSET'
const DELETE_ASSET = "assets/DELETE_ASSET";

//action creators
const createAsset = (payload) => ({
  type: CREATE_ASSET,
  payload
})

const getAsset = (asset) => ({
  type: GET_ASSET,
  payload: asset
});

const editAsset = (asset) => ({
  type: EDIT_ASSET,
  payload: asset
})

const deleteAsset = (asset) => ({
  type: DELETE_ASSET,
  payload: asset
})

// thunks
export const createUserAsset = (asset) => async (dispatch) => {
  const newAsset = await fetch('/api/assets/createAsset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(asset),
  })
  const data = await newAsset.json()
  dispatch(createAsset(data))
}

export const getUserAsset = (userId) => async (dispatch) => {
  const asset = await fetch(`/api/assets/${userId}`);
  const data = await asset.json()

  dispatch(getAsset(data))
}

export const editUserAsset = (asset) => async (dispatch) => {
  const assetUpdate = await fetch(`/api/assets/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(asset)
  });
  const data = await assetUpdate.json();

  dispatch(editAsset(data))
}

export const deleteUserAsset = (assetId) => async(dispatch) => {
  const asset = await fetch(`/api/assets/delete/${assetId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: assetId
  })
  const data = await asset.json()

  dispatch(deleteAsset(data))
}

let initialState = {};

// reducer
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_ASSET: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState;
    }
    case GET_ASSET: {
      const newState = { ...state };
      action.payload.assets.forEach((asset) => {
        newState[asset.id] = asset
      })
      return newState;
    }
    case EDIT_ASSET: {
      const newState = { ...state };
      newState[action.payload.asset.id] = action.payload.asset
      return newState;
    }
    case DELETE_ASSET: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
}
