const GET_ALL_CAWS = 'caws/GET_ALL_CAWS'

const getCaws = (caws) => (
    {
        type: GET_ALL_CAWS,
        payload: caws
    }
)


const initialState = { caws: {} }

export const getAllCaws = () => async dispatch => {
    const response = await fetch('/api/caws/')
    if (response.ok) {
        const caws = await response.json()
        dispatch(getCaws(caws))
    }
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_ALL_CAWS:
            console.log(action.payload.Caws)
            action.payload.Caws.forEach(caw => {
                newState.caws[caw.id] = caw
            })
            return newState
        default:
            return state
    }
}
