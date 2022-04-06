import { call, put, takeLatest } from 'redux-saga/effects'

import {
  ListEntity,
  uploadListAction,
  uploadListSuccessAction,
  uploadListErrorAction,
} from '../slices/listsSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { UploadListValues } from '../../components/UploadList/UploadList.component'
import { createList } from '../../api/lists'

function* uploadListWorker({ payload }: PayloadAction<UploadListValues>) {
  try {
    const list: ListEntity = yield call(createList, payload)

    yield put(uploadListSuccessAction(list))
  } catch (error) {
    yield put({ type: uploadListErrorAction.type, error })
  }
}

function* uploadListSaga() {
  yield takeLatest(`${uploadListAction}`, uploadListWorker)
}

export default uploadListSaga
