import { fetchApi } from '../api';
// import apiConfig from '../api/config';

const endPoints = {
	authenticate: 'authenticate'
};

export const login = (email, password) => fetchApi(endPoints.authenticate,
	{ email, password }, 'post', {});
