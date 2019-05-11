import {FETCH_COMMENTS_SUCCESS, FETCH_NEWS_SUCCESS, FETCH_POST_SUCCESS} from '../actions/actionTypes';

const initialState = {
	posts: [],
	post: {},
	comments: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_NEWS_SUCCESS:
			return {...state, posts: action.data};
		case FETCH_POST_SUCCESS:
			return {...state, post: action.data};
		case FETCH_COMMENTS_SUCCESS:
			return {...state, comments: action.data};
		default:
			return state;

	}
};

export default reducer;
