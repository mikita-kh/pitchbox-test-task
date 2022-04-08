import { Card, CardContent, styled, Typography } from '@mui/material';

export const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-content: stretch;
    align-items: stretch;
`;

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(3, 0),
    margin: theme.spacing(0, 4),
}));

export const StyledCardFooter = styled('footer')(({ theme }) => ({
    color: theme.palette.text.secondary,
    borderTop: `solid 1px ${theme.palette.divider}`,
    padding: theme.spacing(3, 0),
    margin: theme.spacing(0, 4),
}));

export const StyledContainer = styled(Typography)`
    display: flex;
    flex-wrap: wrap;
`;

export const StyledBlock = styled('span')(({ theme }) => ({
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',

    '&:first-of-type': {
        marginRight: theme.spacing(3),
    },
}));

export const StyledLabel = styled('span')(({ theme }) => ({
    color: theme.palette.text.secondary,
}));
