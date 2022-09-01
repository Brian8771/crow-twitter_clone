const GET_CAW = 'caws/GET_CAW';
const GET_ALL_CAWS = 'caws/GET_ALL_CAWS';
const CREATE_CAW = 'caws/CREATE_CAW';

const getCaw = (caw) => (
    {
        type: GET_CAW,
        payload: caw
    }
)

const getCaws = (caws) => (
    {
        type: GET_ALL_CAWS,
        payload: caws
    }
)

const cawCreation = (caw) => (
    {
        type: CREATE_CAW,
        payload: caw
    }
)


const initialState = { caw: {}, caws: {} }

export const getCawFromId = (id) => async dispatch => {
    const response = await fetch(`api/caws/caw/${id}`)
    if (response.ok) {
        const caw = await response.json()
        dispatch(getCaw(caw))
    }
}

export const getAllCaws = () => async dispatch => {
    const response = await fetch('/api/caws/')
    if (response.ok) {
        const caws = await response.json()
        dispatch(getCaws(caws))
    }
}

export const createCaw = (cawInfo) => async dispatch => {
    const response = await fetch('api/caws/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cawInfo)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(cawCreation(data))
        return data
    }
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_CAW:
            newState.caw = action.payload.Caw
            return newState
        case GET_ALL_CAWS:
            action.payload.Caws.forEach(caw => {
                newState.caws[caw.id] = caw
            })
            return newState
        case CREATE_CAW:
            newState.caws[action.payload.id] = action.payload
            return newState
        default:
            return state
    }
}
