import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogProps,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MouseEventHandler, useMemo } from 'react';
import { UrlListEntity } from '../../store/slices/listsSlice';
import { StyledBlock, StyledContainer, StyledLabel } from '../ListCard';

export type ListContactsComponentProps = DialogProps & { list: UrlListEntity | null };

const ListContactsComponent = ({ list, onClose, ...rest }: ListContactsComponentProps) => {
    const numContacts = useMemo(() => list?.domains?.reduce((acc, { contacts }) => acc + contacts.length, 0) || 0, [list]);

    return (
        <Dialog {...rest} onClose={onClose} fullWidth maxWidth="lg" scroll="paper">
            <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={onClose as unknown as MouseEventHandler}>
                <CloseIcon />
            </IconButton>
            {list?.domains?.length ? (
                <>
                    <DialogTitle
                        sx={{ pt: 7, pb: 3 }}
                        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                        // @ts-ignore
                        variant="h4"
                        align="center"
                    >
                        {list.name}
                    </DialogTitle>
                    <StyledContainer sx={{ mt: 0, mx: 'auto', mb: 1 }}>
                        <StyledBlock>
                            <StyledLabel>Date:</StyledLabel> {list.createdAt.slice(0, 10)}
                        </StyledBlock>
                        <StyledBlock>
                            <StyledLabel>Num Contacts:</StyledLabel> {numContacts}
                        </StyledBlock>
                    </StyledContainer>
                    <TableContainer component={DialogContent} sx={{ pt: 0, pl: 10, pr: 7, pb: 4 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Domain</TableCell>
                                    <TableCell>Email Address</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Confidence</TableCell>
                                </TableRow>
                            </TableHead>
                            {list.domains.map(({ contacts, domainName, id: domainId }) => (
                                <TableBody key={domainId}>
                                    {contacts.map((contact) => (
                                        <TableRow key={contact.id}>
                                            <TableCell>{domainName}</TableCell>
                                            <TableCell>{contact.email}</TableCell>
                                            <TableCell>{contact.firstName}</TableCell>
                                            <TableCell>{contact.lastName}</TableCell>
                                            <TableCell>{contact.confidence}%</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ))}
                        </Table>
                    </TableContainer>
                </>
            ) : (
                <CircularProgress />
            )}
        </Dialog>
    );
};

export default ListContactsComponent;
