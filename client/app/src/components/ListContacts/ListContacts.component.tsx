import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Typography,
} from '@mui/material'
import { ListEntity } from '../../store/slices/listsSlice'

export type ListContactsComponentProps = DialogProps & { list: ListEntity | null }

const ListContactsComponent = ({ list, ...rest }: ListContactsComponentProps) => (
  <Dialog {...rest} fullWidth maxWidth="lg" scroll="paper">
    {list ? (
      <>
        <DialogTitle sx={{ pt: 6, pb: 3, textAlign: 'center' }}>{list.name}</DialogTitle>
        <Box sx={{ px: 10, textAlign: 'center' }}>
          <Typography>Date: {new Date(list.createTime).toISOString().slice(0, 10)}</Typography>
          <Typography>Num Contacts: {list.contacts.length}</Typography>
        </Box>
        <DialogContent sx={{ pt: 0, pl: 10, pr: 7, pb: 4 }}>
          <table>
            <thead>
              <tr>
                <th>Domain</th>
                <th>Email Address</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {list.contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.domain}</td>
                  <td>{contact.email}</td>
                  <td>{contact.firstName}</td>
                  <td>{contact.lastName}</td>
                  <td>{contact.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
      </>
    ) : (
      <CircularProgress />
    )}
  </Dialog>
)

export default ListContactsComponent
