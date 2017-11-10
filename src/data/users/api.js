
import { fetchApi } from '../../services/api';

const endPoints = {
	create: '',
	get: '',
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');
export const get = payload => fetchApi(endPoints.get, payload, 'get');
