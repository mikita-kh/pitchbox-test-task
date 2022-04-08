import { call, put, select, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';
import { UrlListEntity, fetchAllListsAction, fetchAllListsSuccessAction, fetchAllListsErrorAction } from '../slices/listsSlice';
import { fetchAllUrlLists } from '../../api/url-lists';
import { Pagination, PaginationMeta } from '../../api/utils';
import { currentPageListsSelector } from '../selectors';

function* fetchAllListsWorker({ payload }: PayloadAction<Pick<PaginationMeta, 'currentPage'>>) {
    try {
        const items = (yield select(currentPageListsSelector)) as UrlListEntity[];

        const response = items.length ? { items, ...payload } : ((yield call(fetchAllUrlLists, payload)) as Pagination<UrlListEntity>);

        yield put(fetchAllListsSuccessAction(response as Pagination<UrlListEntity>));
    } catch (error) {
        yield put({ type: fetchAllListsErrorAction.type, error, payload });
    }
}

function* fetchAllListsSaga() {
    yield takeLatest(fetchAllListsAction.type, fetchAllListsWorker);
}

export default fetchAllListsSaga;
