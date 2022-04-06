import { UploadListValues } from '../../components/UploadList/UploadList.component'
import { ListEntity } from '../../store/slices/listsSlice'
import faker from 'faker'
import { delay, getRandomNumber } from '../utils'
import Storage from '../storage'

const create: (values: UploadListValues) => ListEntity = values => {
  const list: ListEntity = {
    id: faker.datatype.uuid(),
    createTime: Date.now(),
    name: values.listName,
    contacts: values.domains.flatMap(domain =>
      [...Array(getRandomNumber(0, 10))].map(() => ({
        id: faker.datatype.uuid(),
        domain,
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        confidence: getRandomNumber(0, 100),
      })),
    ),
  }

  Storage.lists.set(Storage.lists.get().concat(list))

  return list
}

// @ts-ignore
export default delay<ListEntity>(create)
