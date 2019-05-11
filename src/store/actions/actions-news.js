import {
	FETCH_NEWS_SUCCESS,
	CREATE_POST_SUCCESS,
	DELETE_POST_SUCCESS,
	FETCH_POST_SUCCESS,
	FETCH_COMMENTS_SUCCESS
} from './actionTypes';
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

export const deletePostSuccess = () => {
	return {type: DELETE_POST_SUCCESS};
};

export const deletePost = (id) => {
	return dispatch => {
		return axios.delete('/news/' + id).then(
			response => dispatch(deletePostSuccess())
		);
	};
};

export const fetchPostSuccess = data => {
	return {type: FETCH_POST_SUCCESS, data};
};

export const fetchPost = id => {
	return dispatch => {
		return axios.get('/news/' + id).then(
			response => dispatch(fetchPostSuccess(response.data[0]))
		)
	};
};

export const fetchCommentsSuccess = data => {
	return {type: FETCH_COMMENTS_SUCCESS, data};
};

export const fetchComments = id => {
	return dispatch => {
		return axios.get('/comments?news_id=' + id).then(
			response => {
				dispatch(fetchCommentsSuccess(response.data));
				console.log(response.data);
			}
		)
	};
};
