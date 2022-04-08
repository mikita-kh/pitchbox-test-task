import { CardProps, Typography, CardActionArea } from '@mui/material';
import { MouseEventHandler, useMemo } from 'react';
import { UrlListEntity } from '../../store/slices/listsSlice';
import { StyledBlock, StyledCard, StyledCardContent, StyledCardFooter, StyledContainer, StyledLabel } from './ListCard.styles';

export interface ListCardComponentProps extends CardProps {
    list: UrlListEntity;
}

const ListCardComponent = ({ list, onClick, ...rest }: ListCardComponentProps) => {
    const numContacts = useMemo(() => list.domains.reduce((acc, { contacts }) => acc + contacts.length, 0), [list]);

    return (
        <StyledCard {...rest}>
            <CardActionArea onClick={onClick as unknown as MouseEventHandler}>
                <StyledCardContent>
                    <Typography variant="h5">{list.name || '\u0004'}</Typography>
                </StyledCardContent>
                <StyledCardFooter>
                    <StyledContainer>
                        <StyledBlock>
                            <StyledLabel>Date:</StyledLabel> {list.createdAt.slice(0, 10)}
                        </StyledBlock>
                        <StyledBlock>
                            <StyledLabel>Num Contacts:</StyledLabel> {numContacts}
                        </StyledBlock>
                    </StyledContainer>
                </StyledCardFooter>
            </CardActionArea>
        </StyledCard>
    );
};

export default ListCardComponent;
