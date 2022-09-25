// constants
const SET_USER = 'session/SET_USER';
const EDIT_USER = 'session/EDIT_USER';
const GET_ALL_USERS = 'session/GET_ALL_USERS';
const SET_USER_PROFILE = 'session/SET_USER_PROFILE';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const edit_user = (user) => ({
  type: SET_USER,
  payload: user
})

const get_all_users = (users) => ({
  type: GET_ALL_USERS,
  payload: users
})

const removeUser = () => ({
  type: REMOVE_USER,
})

const setCurrentUser = (user) => (
  {
    type: SET_USER_PROFILE,
    payload: user
  }
)


const initialState = { user: null, currentUserProfile: {}, users: {} };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const getAllUsers = () => async dispatch => {
  const response = await fetch('/api/users/')

  if (response.ok) {
    const data = await response.json();
    dispatch(get_all_users(data))
  }
}

export const editUser = (id, userInfo) => async dispatch => {
  const response = await fetch(`/api/auth/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })

  if (response.ok) {
    const user = await response.json();
    dispatch(edit_user(user))
  }
}

export const getCurretProfile = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}`)

  if (response.ok) {
    const data = await response.json();
    dispatch(setCurrentUser(data))
  }
}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (firstName, lastName, username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SET_USER:
      newState.user = action.payload
      return newState
    case EDIT_USER:
      newState.currentUserProfile = action.payload;
      newState.users[action.payload.id] = action.payload;
      return newState;
    case GET_ALL_USERS:
      action.payload.users.forEach(user => {
        newState.users[user.id] = user
      })
      return newState;
    case SET_USER_PROFILE:
      newState.currentUserProfile = action.payload;
      return newState
    case REMOVE_USER:
      newState.user = null
      return newState
    default:
      return state;
  }
}
