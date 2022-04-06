import { RootState } from '../rootReducer'
import { createSelector } from '@reduxjs/toolkit'
import { ListEntity } from '../slices/listsSlice'

export const listsByIdSelector = (state: RootState) => state.lists.listsById
export const listsIdsSelector = (state: RootState) => state.lists.ids
export const listsFetchingSelector = (state: RootState) => state.lists.isFetching
export const listCreatingSelector = (state: RootState) => state.lists.isCreating

export const listsSelector = createSelector(
  [listsIdsSelector, listsByIdSelector],
  (ids, listsById) => ids.map(id => listsById[id] as ListEntity),
)
