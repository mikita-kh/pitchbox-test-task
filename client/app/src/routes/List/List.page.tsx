import { useNavigate, useParams } from 'react-router';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ListContactsComponent from '../../components/ListContacts';
import { listsByIdSelector } from '../../store/selectors';

const ListPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const listsById = useSelector(listsByIdSelector);

    const list = useMemo(() => (id ? listsById[id] : null), [id, listsById]);

    const onClose = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return list && <ListContactsComponent open={!!id} list={list} onClose={onClose} />;
};

export default ListPage;
