import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { UploadListValues } from '../../components/UploadList';
import { Pagination, PaginationMeta } from '../../api/utils';

export interface UrlListEntity {
    id: string;
    createdAt: string;
    name: string;
    domains: Array<{
        id: string;
        domainName: string;
        contacts: Array<{
            id: string;
            email: string;
            firstName?: string | null;
            lastName?: string | null;
            confidence: number;
        }>;
    }>;
}

export type ListsState = {
    listsById: Record<string, UrlListEntity>;
    isFetching: boolean;
    isCreating: boolean;
    createError?: boolean;
    fetchError?: boolean;

    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pages: Record<
        number,
        {
            ids?: string[];
            error?: boolean;
            isFetching?: boolean;
        }
    >;
};

const initialState: ListsState = {
    listsById: {},
    isFetching: false,
    isCreating: false,
    pages: {},
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
};

const listsSlice = createSlice<
    ListsState,
    Record<'uploadListError' | 'getListByIdError', CaseReducer<ListsState, PayloadAction<unknown>>> & {
        fetchAllLists: CaseReducer<ListsState, PayloadAction<Pick<PaginationMeta, 'currentPage'>>>;
        fetchAllListsSuccess: CaseReducer<ListsState, PayloadAction<Pagination<UrlListEntity>>>;
        fetchAllListsError: CaseReducer<ListsState, PayloadAction<Pick<PaginationMeta, 'currentPage'>>>;
        getListById: CaseReducer<ListsState, PayloadAction<Pick<UrlListEntity, 'id'>>>;
        getListByIdSuccess: CaseReducer<ListsState, PayloadAction<UrlListEntity>>;
        uploadList: CaseReducer<ListsState, PayloadAction<UploadListValues>>;
        uploadListSuccess: CaseReducer<ListsState, PayloadAction<UrlListEntity>>;
    },
    string
>({
    initialState,
    name: 'lists',
    reducers: {
        fetchAllLists: (state, { payload: { currentPage } }) => ({
            ...state,
            currentPage,
            pages: {
                ...state.pages,
                [currentPage]: {
                    ...state.pages[currentPage],
                    isFetching: true,
                    error: false,
                },
            },
        }),
        fetchAllListsSuccess: (
            state,
            {
                payload: {
                    items,
                    meta: { totalItems, totalPages, currentPage, itemsPerPage },
                },
            },
        ) => ({
            ...state,
            listsById: {
                ...state.listsById,
                ...items.reduce((m, l) => ({ ...m, [l.id]: l }), {}),
            },
            currentPage,
            totalItems: totalItems ?? state.totalItems,
            totalPages: totalPages ?? state.totalPages,
            itemsPerPage: itemsPerPage ?? state.itemsPerPage,
            pages: {
                ...state.pages,
                [currentPage]: {
                    ids: items.map((l) => l.id),
                    isFetching: false,
                    error: false,
                },
            },
        }),
        fetchAllListsError: (state, { payload: { currentPage } }) => ({
            ...state,
            pages: {
                ...state.pages,
                [currentPage]: {
                    ...state.pages[currentPage],
                    isFetching: false,
                    error: true,
                },
            },
        }),

        getListById: (state) => ({ ...state, isFetching: true }),
        // TODO: server paging???
        getListByIdSuccess: (state, { payload: list }: PayloadAction<UrlListEntity>) => ({
            ...state,
            listsById: {
                ...state.listsById,
                [list.id]: list,
            },
            isFetching: false,
        }),
        getListByIdError: (state) => ({ ...state, isFetching: false, fetchError: true }),

        uploadList: (state) => ({ ...state, isCreating: true }),
        uploadListSuccess: (state, { payload: list }: PayloadAction<UrlListEntity>) => {
            const totalItems = state.totalItems + 1;
            const totalPages = Math.ceil(totalItems / state.itemsPerPage);
            return {
                ...state,
                listsById: {
                    ...state.listsById,
                    [list.id]: list,
                },
                totalItems,
                totalPages,
                isCreating: false,
                pages: {
                    ...state.pages,
                    [totalPages]: {
                        ids: (state.pages[totalPages]?.ids ?? []).concat(list.id),
                    },
                },
            };
        },
        uploadListError: (state) => ({ ...state, isCreating: false, createError: true }),
    },
});

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
} = listsSlice.actions;

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
};

export default listsSlice.reducer;
