import { call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';
import { UrlListEntity, getListByIdAction, getListByIdSuccessAction, getListByIdErrorAction } from '../slices/listsSlice';
import { fetchOneUrlList } from '../../api/url-lists';

function* getListByIdWorker(action: PayloadAction<Pick<UrlListEntity, 'id'>>) {
    try {
        const list = (yield call(fetchOneUrlList, action.payload)) as UrlListEntity;

        yield put(getListByIdSuccessAction(list));
    } catch (error) {
        yield put({ type: getListByIdErrorAction.type, error });
    }
}

function* getListByIdSaga() {
    yield takeLatest(getListByIdAction.type, getListByIdWorker);
}

export default getListByIdSaga;
