import Storage from '../storage'
import { delay } from '../utils'
import { ListEntity } from '../../store/slices/listsSlice'

// @ts-ignore
export default delay<ListEntity>(({ id }: Pick<ListEntity, 'id'>) => {
  const lists = Storage.lists.get()

  const list = lists.find(list => list.id === id)

  if (!list) {
    throw new Error('Not found')
  }

  return list
})
