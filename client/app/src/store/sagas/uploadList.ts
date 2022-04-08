import { call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';
import { UrlListEntity, uploadListAction, uploadListSuccessAction, uploadListErrorAction } from '../slices/listsSlice';
import { UploadListValues } from '../../components/UploadList';
import { createUrlList } from '../../api/url-lists';

function* uploadListWorker({ payload }: PayloadAction<UploadListValues>) {
    try {
        const list = (yield call(createUrlList, payload)) as UrlListEntity;

        yield put(uploadListSuccessAction(list));
    } catch (error) {
        yield put({ type: uploadListErrorAction.type, error });
    }
}

function* uploadListSaga() {
    yield takeLatest(uploadListAction.type, uploadListWorker);
}

export default uploadListSaga;
