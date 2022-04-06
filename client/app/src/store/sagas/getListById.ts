import { call, put, takeLatest } from 'redux-saga/effects'

import {
  ListEntity,
  getListByIdAction,
  getListByIdSuccessAction,
  getListByIdErrorAction,
} from '../slices/listsSlice'
import { fetchOneList } from '../../api/lists'
import { PayloadAction } from '@reduxjs/toolkit'

function* getListByIdWorker(action: PayloadAction<Pick<ListEntity, 'id'>>) {
  try {
    const list: ListEntity = yield call(fetchOneList, action.payload)

    yield put(getListByIdSuccessAction(list))
  } catch (error) {
    yield put({ type: getListByIdErrorAction.type, error })
  }
}

function* getListByIdSaga() {
  yield takeLatest(`${getListByIdAction}`, getListByIdWorker)
}

export default getListByIdSaga
