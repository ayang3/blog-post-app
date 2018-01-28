import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

// Default state to an object.
export default function(state = {}, action) {
    switch (action.type) {
    case FETCH_POSTS:
        //consle.log(action.payload.data); // [post1, post2]
        return _.mapKeys(action.payload.data, 'id');
    default:
        return state;
    }
}