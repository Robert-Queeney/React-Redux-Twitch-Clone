

import streams from '../apis/streams';
import  { 
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM 
    } from './types'; // making the types variables NOT strings means an error will thRow if we have a typo

export const signIn = (userId) => {
    return {
        type: SIGN_IN, 
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

// async post request action creators so we r using thunk and dispatch func
export const createStream = formValues => async dispatch => {
    const response = await streams.post('/streams', formValues);

    dispatch({ type: CREATE_STREAM, payload: response.data });
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data })
};

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`)

    dispatch({ type: FETCH_STREAM, payload: response.data })
};

// for edit we need the is ot know which to edit and the inoput data (formValues) to know what to change
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues)

    dispatch({ type: EDIT_STREAM, payload: response.data })
};

// no response needed since it is deleting a record only
export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams${id}`)

    dispatch({ type: DELETE_STREAM, payload: id })
};