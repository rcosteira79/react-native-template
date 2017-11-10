import * as actionTypes from './actionTypes';

export const initialState = {
	tokens: {
		access: {
			type: null,
			value: null,
			expiresIn: null,
		},
		refresh: {
			type: null,
			value: null,
		},
	},
	user: {
		id: null,
	},
};

export const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return {
				...action.session,
			};
		default:
			return state;
	}
};
