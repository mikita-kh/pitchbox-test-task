import { Box, Button, Paper, Typography } from '@mui/material';
import { MouseEventHandler, useCallback, useMemo } from 'react';
import ListCardComponent from '../ListCard/ListCard.component';
import { UrlListEntity } from '../../store/slices/listsSlice';

export type ListHistoryComponentProps = {
    lists: UrlListEntity[];
    onAddListClick: MouseEventHandler;
    onListSelect: (list: UrlListEntity) => void;
};

const ListsHistoryComponent = ({ lists, onAddListClick, onListSelect }: ListHistoryComponentProps) => {
    const addUrlListButton = useMemo(
        () => (
            <Button color="primary" variant="contained" onClick={onAddListClick}>
                Add URL List
            </Button>
        ),
        [onAddListClick],
    );

    const onListClickHandler = useCallback<(list: UrlListEntity) => MouseEventHandler>(
        (list) => () => {
            onListSelect(list);
        },
        [onListSelect],
    );

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <Typography variant="h4">View List History</Typography>
                {lists.length > 0 && addUrlListButton}
            </Box>
            {lists.length > 0 ? (
                <>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '24px' }}>
                        {lists.map((list) => (
                            <ListCardComponent key={list.id} list={list} onClick={onListClickHandler(list)} />
                        ))}
                    </Box>
                </>
            ) : (
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '128px 0 80px',
                    }}
                >
                    <svg width="176" height="176" viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="88" cy="88" r="78" fill="#F1F1F1" />
                        <circle cx="88" cy="88" r="87.5" stroke="#F1F1F1" />
                        <g clipPath="url(#clip0_4_306)">
                            <path
                                d="M120.292 48H71.5268C70.1218 48 68.9826 49.139 68.9826 50.5441V87.4334H55.7096C54.3047 87.4334 53.1655 88.5723 53.1655 89.9775V118.301C53.1655 123.649 57.5166 128 62.8648 128H113.204C118.515 128 122.836 123.679 122.836 118.367V50.5441C122.836 49.139 121.697 48 120.292 48ZM62.8648 122.912C60.3223 122.912 58.2538 120.843 58.2538 118.301V92.5216H68.9826C68.9826 120.945 69.1285 121.324 68.608 122.353C68.2565 123.049 67.0035 122.912 62.8648 122.912ZM117.748 118.367C117.748 120.873 115.71 122.912 113.204 122.912H73.7592C74.2051 120.921 74.0709 124.961 74.0709 53.0882H117.748V118.367Z"
                                fill="#9E9E9E"
                            />
                            <path
                                d="M84.247 69.4545H108.129C109.534 69.4545 110.673 68.3155 110.673 66.9103C110.673 65.5052 109.534 64.3662 108.129 64.3662H84.247C82.842 64.3662 81.7029 65.5052 81.7029 66.9103C81.7029 68.3155 82.842 69.4545 84.247 69.4545Z"
                                fill="#9E9E9E"
                            />
                            <path
                                d="M84.247 83.5143H108.129C109.534 83.5143 110.673 82.3753 110.673 80.9701C110.673 79.565 109.534 78.426 108.129 78.426H84.247C82.842 78.426 81.7029 79.565 81.7029 80.9701C81.7029 82.3753 82.842 83.5143 84.247 83.5143Z"
                                fill="#9E9E9E"
                            />
                            <path
                                d="M84.247 97.5738H108.129C109.534 97.5738 110.673 96.4349 110.673 95.0297C110.673 93.6246 109.534 92.4856 108.129 92.4856H84.247C82.842 92.4856 81.7029 93.6246 81.7029 95.0297C81.7029 96.4349 82.842 97.5738 84.247 97.5738Z"
                                fill="#9E9E9E"
                            />
                            <path
                                d="M84.247 111.634H108.129C109.534 111.634 110.673 110.495 110.673 109.09C110.673 107.685 109.534 106.546 108.129 106.546H84.247C82.842 106.546 81.7029 107.685 81.7029 109.09C81.7029 110.495 82.842 111.634 84.247 111.634Z"
                                fill="#9E9E9E"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_4_306">
                                <rect width="80" height="80" fill="white" transform="translate(48 48)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <Typography sx={{ margin: '24px 0' }}>There is no List Names</Typography>
                    {addUrlListButton}
                </Paper>
            )}
        </div>
    );
};

export default ListsHistoryComponent;
