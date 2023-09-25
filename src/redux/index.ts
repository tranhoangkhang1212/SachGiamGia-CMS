import tokenReducer from './token/tokenReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    tokens: tokenReducer,
});

export default rootReducer;
