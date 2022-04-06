import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer'
import { UploadListValues } from '../../components/UploadList/UploadList.component'

export interface ListEntity {
  id: string
  createTime: number
  name: string
  contacts: Array<{
    id: string
    domain: string
    email: string
    firstName: string
    lastName: string
    confidence: number
  }>
}

export type ListsState = {
  listsById: Record<string, ListEntity>
  ids: string[]
  isFetching: boolean
  isCreating: boolean
  error: boolean
}

const initialState: ListsState = {
  listsById: {},
  ids: [] as string[],
  isFetching: false,
  isCreating: false,
  error: false,
}

const listsSlice = createSlice<
  ListsState,
  Record<
    'fetchAllLists' | 'fetchAllListsError' | 'uploadListError' | 'getListByIdError',
    CaseReducer<ListsState, PayloadAction<any>>
  > & {
    fetchAllListsSuccess: CaseReducer<ListsState, PayloadAction<ListEntity[]>>
    getListById: CaseReducer<ListsState, PayloadAction<Pick<ListEntity, 'id'>>>
    getListByIdSuccess: CaseReducer<ListsState, PayloadAction<ListEntity>>
    uploadList: CaseReducer<ListsState, PayloadAction<UploadListValues>>
    uploadListSuccess: CaseReducer<ListsState, PayloadAction<ListEntity>>
  },
  string
>({
  initialState,
  name: 'lists',
  reducers: {
    fetchAllLists: state => ({ ...state, isFetching: true }),
    //TODO: server paging???
    fetchAllListsSuccess: (state, { payload: lists }) => ({
      ...state,
      listsById: lists.reduce((m, l) => ({ ...m, [l.id]: l }), {}),
      ids: lists.map(l => l.id),
      isFetching: false,
    }),
    fetchAllListsError: state => ({ ...state, isFetching: false, error: true }),

    getListById: state => ({ ...state, isFetching: true }),
    //TODO: server paging???
    getListByIdSuccess: (state, { payload: list }: PayloadAction<ListEntity>) => ({
      ...state,
      listsById: {
        ...state.listsById,
        [list.id]: list,
      },
      ids: state.ids.concat(list.id),
      isFetching: false,
    }),
    getListByIdError: state => ({ ...state, isFetching: false }),

    uploadList: state => ({ ...state, isCreating: true }),
    uploadListSuccess: (state, { payload: list }: PayloadAction<ListEntity>) => ({
      ...state,
      listsById: {
        ...state.listsById,
        [list.id]: list,
      },
      ids: state.ids.concat(list.id),
      isCreating: false,
    }),
    uploadListError: state => ({ ...state, isCreating: false, error: true }),
  },
})

const {
  getListById: getListByIdAction,
  uploadList: uploadListAction,
  getListByIdError: getListByIdErrorAction,
  getListByIdSuccess: getListByIdSuccessAction,
  uploadListSuccess: uploadListSuccessAction,
  fetchAllListsError: fetchAllListsErrorAction,
  fetchAllListsSuccess: fetchAllListsSuccessAction,
  uploadListError: uploadListErrorAction,
  fetchAllLists: fetchAllListsAction,
} = listsSlice.actions

export {
  getListByIdAction,
  uploadListAction,
  getListByIdErrorAction,
  getListByIdSuccessAction,
  uploadListSuccessAction,
  fetchAllListsErrorAction,
  fetchAllListsSuccessAction,
  uploadListErrorAction,
  fetchAllListsAction,
}

export default listsSlice.reducer
