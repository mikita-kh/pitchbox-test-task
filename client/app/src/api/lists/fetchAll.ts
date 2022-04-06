import Storage from '../storage'
import { delay } from '../utils'
import { ListEntity } from '../../store/slices/listsSlice'

export default delay<ListEntity[]>(() => Storage.lists.get())
