/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Pagination, PaginationItem } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import ListsHistoryComponent from '../../components/ListsHistory';
import UploadListComponent, { UploadListValues } from '../../components/UploadList';
import { fetchAllListsAction, UrlListEntity, uploadListAction } from '../../store/slices/listsSlice';
import { listCreatingSelector, currentPageFetchingSelector, currentPageListsSelector, totalPagesSelector } from '../../store/selectors';

const ListsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const fetchingCurrentPage = useRef(-1);
    const currentPage = useMemo<number>(() => Number(searchParams.get('page')) || 1, [searchParams]);

    const isListsFetching = useSelector(currentPageFetchingSelector);
    const isListCreating = useSelector(listCreatingSelector);
    const lists = useSelector(currentPageListsSelector);
    const totalPages = useSelector(totalPagesSelector);

    useEffect(() => {
        // fix to prevent double requests
        if (fetchingCurrentPage.current !== currentPage) {
            dispatch(fetchAllListsAction({ currentPage }));
            fetchingCurrentPage.current = currentPage;
        }
        // eslint-base-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const [uploadListOpen, setUploadListOpen] = useState(false);

    useEffect(() => {
        if (!isListCreating) {
            setUploadListOpen(false);
        }
    }, [isListCreating]);

    const onListSelect = useCallback(
        ({ id }: UrlListEntity) => {
            navigate({
                pathname: `/lists/${id}`,
                search: searchParams.toString(),
            });
        },
        [navigate, searchParams],
    );

    const onAddListClick = useCallback(() => {
        setUploadListOpen(true);
    }, []);

    const onUploadListSubmit = useCallback(
        (values: UploadListValues) => {
            dispatch(uploadListAction(values));
        },
        [dispatch],
    );

    const onUploadListClose = useCallback(() => {
        setUploadListOpen(false);
    }, []);

    return isListsFetching ? (
        <CircularProgress />
    ) : (
        <div>
            <ListsHistoryComponent lists={lists} onAddListClick={onAddListClick} onListSelect={onListSelect} />
            <UploadListComponent
                open={uploadListOpen}
                onSubmit={onUploadListSubmit}
                submitting={isListCreating}
                onClose={onUploadListClose}
            />
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 6 }}>
                    <Pagination
                        page={currentPage}
                        count={totalPages}
                        variant="outlined"
                        shape="rounded"
                        color="primary"
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/lists${!item.page || item.page === 1 ? '' : `?page=${item.page}`}`}
                                sx={{
                                    background: '#fff',
                                }}
                                {...item}
                            />
                        )}
                    />
                </Box>
            )}
            <Outlet />
        </div>
    );
};

export default ListsPage;
