import {FETCH_NEWS_SUCCESS, CREATE_POST_SUCCESS} from './actionTypes';
import axios from '../../axios-api';

export const fetchNewsSuccess = data => {
	return {type: FETCH_NEWS_SUCCESS, data};
};

export const fetchNews = () => {
	return dispatch => {
		return axios.get('/news').then(
			response => dispatch(fetchNewsSuccess(response.data))
		)
	};
};

export const createPostSuccess = () => {
	return {type: CREATE_POST_SUCCESS};
};

export const createPost = (data) => {
	return dispatch => {
		return axios.post('/news', data).then(
			response => dispatch(createPostSuccess())
		);
	};
};
