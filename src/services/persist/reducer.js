import * as actionTypes from './actionTypes';

export const initialState = {
    isHydrated: false,
};

export function persistReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.UPDATE:
        return action.payload;
    default:
        return state;
    }
}
