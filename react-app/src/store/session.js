// constants
const SET_USER = 'session/SET_USER';
const EDIT_USER = 'session/EDIT_USER';
const GET_ALL_USERS = 'session/GET_ALL_USERS';
const SET_USER_PROFILE = 'session/SET_USER_PROFILE';
const REMOVE_USER = 'session/REMOVE_USER';
const FOLLOW_USER = 'session/FOLLOW_USER';
const UNFOLLOW_USER = 'session/UNFOLLOW_USER';
const GET_FOLLOWERS = 'session/GET_FOLLOWERS';
const GET_FOLLOWINGS = 'session/GET_FOLLOWINGS';

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

const follow_user = (user) => (
  {
    type: FOLLOW_USER,
    payload: user
  }
)

const unfollow_user = (user) => ({
  type: UNFOLLOW_USER,
  payload: user
})

const get_followers = (users) => ({
  type: GET_FOLLOWERS,
  payload: users
})

const get_followings = (users) => ({
  type: GET_FOLLOWINGS,
  payload: users
})


const initialState = { user: null, currentUserProfile: {}, users: {}, followers: {}, followings: {} };

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

export const followUser = (username) => async dispatch => {
  const response = await fetch(`/api/users/follow/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(follow_user(data))
  }
}

export const unfollowUser = (username) => async dispatch => {
  const response = await fetch(`/api/users/unfollow/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(unfollow_user(data))
  }
}

export const getFollowers = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}/followers`)

  if (response.ok) {
    const data = await response.json()
    dispatch(get_followers(data))
  }
}

export const getFollowings = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}/following`)

  if (response.ok) {
    const data = await response.json()
    dispatch(get_followings(data))
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
    case FOLLOW_USER:
      newState.currentUserProfile = action.payload
      return newState
    case UNFOLLOW_USER:
      newState.currentUserProfile = action.payload
      return newState
    case SET_USER_PROFILE:
      newState.currentUserProfile = action.payload;
      return newState
    case REMOVE_USER:
      newState.user = null
      return newState
    case GET_FOLLOWERS:
      newState.followers = {}
      action.payload.followers.forEach(user => {
        newState.followers[user.id] = user
      })
      return newState
    case GET_FOLLOWINGS:
      newState.followings = {}
      action.payload.following.forEach(user => {
        newState.followings[user.id] = user
      })
      return newState
    default:
      return state;
  }
}
