import { all } from 'redux-saga/effects'
import { fetchAllListsWatcher, getListByIdWatcher, uploadListWatcher } from './sagas'

export default function* () {
  yield all([fetchAllListsWatcher(), uploadListWatcher(), getListByIdWatcher()])
}
