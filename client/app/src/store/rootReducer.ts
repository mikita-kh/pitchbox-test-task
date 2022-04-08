import { combineReducers } from '@reduxjs/toolkit';

import listsReducer, { ListsState } from './slices/listsSlice';

export interface RootState {
    lists: ListsState;
}

const rootReducer = combineReducers({
    lists: listsReducer,
});

export default rootReducer;
