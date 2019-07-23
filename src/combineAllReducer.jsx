import { combineReducers } from 'redux';
import InsertReducer from './Component/reducer'

const allReducers = combineReducers({
    InsertReducer: InsertReducer
});

export default allReducers;