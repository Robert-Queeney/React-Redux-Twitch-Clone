import _ from 'lodash';
import {
        FETCH_STREAM, 
        FETCH_STREAMS, 
        CREATE_STREAM, 
        EDIT_STREAM, 
        DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_STREAMS:
        // need to merge data from array (results of API call) and object (state)
        // will use mapKeys from lodash
        // "id" in mapkeys will be the key for the new object created
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_STREAM:
        // this dynamically adds new key value pair on the fly
            return { ...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
        // using lodash to delete, the payload is the id 
            return _.omit(state, action.payload); 

        default:
            return state;
    }
}