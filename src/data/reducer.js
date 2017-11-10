
import { combineReducers } from 'redux';
import { reducer as usersReducer } from './users/reducer';

export const dataReducer = combineReducers({
    users: usersReducer,
});
