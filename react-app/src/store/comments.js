const GET_COMMENTS = 'comments/GET_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';

const getAllComments = (comments) => (
    {
        type: GET_COMMENTS,
        payload: comments
    }
)

const addAComment = (comment) => (
    {
        type: ADD_COMMENT,
        payload: comment
    }
)


const initialState = { comments: {} };


export const getComments = (id) => async dispatch => {
    const response = await fetch(`/api/caws/${id}/comments`)

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllComments(data))
    }
}

export const addComment = (id, commentInfo) => async dispatch => {
    const response = await fetch(`/api/caws/${id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentInfo)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addAComment(data))
        return data;
    }
}



export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_COMMENTS:
            const newestState = { comments: {} }
            action.payload.comments.forEach(comment => {
                newestState.comments[comment.id] = comment
            })
            return newestState
        case ADD_COMMENT:
            newState.comments[action.payload.comment.id] = action.payload.comment;
            return newState
        default:
            return state

    }
}
