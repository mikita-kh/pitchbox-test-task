import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export const listsByIdSelector = (state: RootState) => state.lists.listsById;
export const listsPagesSelector = (state: RootState) => state.lists.pages;
export const currentPageSelector = (state: RootState) => state.lists.currentPage;
export const totalPagesSelector = (state: RootState) => state.lists.totalPages;
export const listCreatingSelector = (state: RootState) => state.lists.isCreating;

export const currentPageListsSelector = createSelector(
    [listsByIdSelector, listsPagesSelector, currentPageSelector],
    (listsById, pages, currentPage) => (pages[currentPage]?.ids ?? []).map((id) => listsById[id]),
);

export const currentPageFetchingSelector = createSelector(
    [listsPagesSelector, currentPageSelector],
    (pages, currentPage) => !!pages[currentPage]?.isFetching,
);
