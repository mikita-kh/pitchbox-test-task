import { useNavigate, useParams } from 'react-router'
import ListContactsComponent from '../../components/ListContacts/ListContacts.component'
import { listsByIdSelector } from '../../store/selectors'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListByIdAction } from '../../store/slices/listsSlice'

const ListPage = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let { id } = useParams()
  let listsById = useSelector(listsByIdSelector)

  console.log(listsById)

  const list = useMemo(() => (id ? listsById[id] : null), [id, listsById])

  useEffect(() => {
    if (id && !list) {
      dispatch(getListByIdAction({ id }))
    }
  }, [id, list])

  const onClose = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return list && <ListContactsComponent open={!!id} list={list} onClose={onClose} />
}

export default ListPage
