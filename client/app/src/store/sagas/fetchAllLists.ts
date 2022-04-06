import { call, put, takeLatest } from 'redux-saga/effects'

import {
  ListEntity,
  fetchAllListsAction,
  fetchAllListsSuccessAction,
  fetchAllListsErrorAction,
} from '../slices/listsSlice'
import { fetchAllLists } from '../../api/lists'

function* fetchAllListsWorker() {
  try {
    const lists: ListEntity[] = yield call(fetchAllLists)

    yield put(fetchAllListsSuccessAction(lists))
  } catch (error) {
    yield put({ type: fetchAllListsErrorAction.type, error })
  }
}

function* fetchAllListsSaga() {
  yield takeLatest(`${fetchAllListsAction}`, fetchAllListsWorker)
}

export default fetchAllListsSaga
