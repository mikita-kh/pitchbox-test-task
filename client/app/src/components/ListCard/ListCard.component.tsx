import { ListEntity } from '../../store/slices/listsSlice'
import { CardProps, Card, CardContent, Typography, CardActionArea } from '@mui/material'
import { MouseEventHandler } from 'react'

export interface ListCardComponentProps extends CardProps {
  list: ListEntity
}

const ListCardComponent = ({ list, onClick, ...rest }: ListCardComponentProps) => (
  <Card sx={{ justifyContent: 'stretch', alignItems: 'stretch', display: 'flex' }} {...rest}>
    <CardActionArea onClick={onClick as unknown as MouseEventHandler}>
      <CardContent>
        <Typography variant="h5">{list.name}</Typography>
      </CardContent>
      <CardContent
        sx={{ borderTop: 'solid 1px #E3E3E3', display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography>Date: {new Date(list.createTime).toISOString().slice(0, 10)}</Typography>
        <Typography>Num Contacts: {list.contacts.length}</Typography>
      </CardContent>
    </CardActionArea>
  </Card>
)

export default ListCardComponent
