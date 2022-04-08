import { all } from 'redux-saga/effects';
import { fetchAllListsWatcher, getListByIdWatcher, uploadListWatcher } from './sagas';

function* rootSaga() {
    yield all([fetchAllListsWatcher(), uploadListWatcher(), getListByIdWatcher()]);
}

export default rootSaga;
