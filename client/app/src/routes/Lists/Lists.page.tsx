import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListsHistoryComponent from '../../components/ListsHistory'
import UploadListComponent from '../../components/UploadList'
import { fetchAllListsAction, ListEntity, uploadListAction } from '../../store/slices/listsSlice'
import { listCreatingSelector, listsFetchingSelector, listsSelector } from '../../store/selectors'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router'

const ListsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchAllListsAction({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isListsFetching = useSelector(listsFetchingSelector)
  const isListCreating = useSelector(listCreatingSelector)
  const lists = useSelector(listsSelector)

  const [uploadListOpen, setUploadListOpen] = useState(false)

  useEffect(() => {
    if (!isListCreating) {
      setUploadListOpen(false)
    }
  }, [isListCreating])

  const onListSelect = useCallback(
    ({ id }: ListEntity) => {
      navigate(`/lists/${id}`)
    },
    [navigate],
  )

  const onAddListClick = useCallback(() => {
    setUploadListOpen(true)
  }, [])

  const onUploadListSubmit = useCallback(
    values => {
      dispatch(uploadListAction(values))
    },
    [dispatch],
  )

  const onUploadListClose = useCallback(() => {
    setUploadListOpen(false)
  }, [])

  return isListsFetching ? (
    <CircularProgress />
  ) : (
    <div>
      <ListsHistoryComponent
        lists={lists}
        onAddListClick={onAddListClick}
        onListSelect={onListSelect}
      />
      <UploadListComponent
        open={uploadListOpen}
        onSubmit={onUploadListSubmit}
        submitting={isListCreating}
        onClose={onUploadListClose}
      />
    </div>
  )
}

export default ListsPage
