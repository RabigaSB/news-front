import {FETCH_NEWS_SUCCESS} from '../actions/actionTypes';

const initialState = {
	posts: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_NEWS_SUCCESS:
			return {...state, posts: action.data};
		default:
			return state;

	}
};

export default reducer;
