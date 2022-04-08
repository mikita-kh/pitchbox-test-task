import { UrlListEntity } from '../store/slices/listsSlice';
import { fetchJSON, Pagination, PaginationMeta } from './utils';
import { UploadListValues } from '../components/UploadList';

export async function fetchAllUrlLists({ currentPage }: Pick<PaginationMeta, 'currentPage'>) {
    return fetchJSON<Pagination<UrlListEntity[]>>(`/api/v1/url-lists?page=${currentPage}`);
}

export async function fetchOneUrlList({ id }: Pick<UrlListEntity, 'id'>) {
    return fetchJSON<UrlListEntity>(`/api/v1/url-lists/${id}`);
}

export async function createUrlList({ listName, domains }: UploadListValues) {
    return fetchJSON<UrlListEntity>('/api/v1/url-lists', {
        method: 'POST',
        body: JSON.stringify({
            listName,
            domains: Array.from(new Set(domains.map((d) => new URL(d).host))),
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
