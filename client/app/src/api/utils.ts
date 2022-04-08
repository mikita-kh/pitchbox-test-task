export class HTTPError extends Error {}

export interface PaginationMeta {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface Pagination<T> {
    items: T[];
    meta: PaginationMeta;
}

export const fetchJSON = async <T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    const response = await fetch(input, init);

    if (!response.ok) {
        throw new HTTPError(`Fetch error: ${response.statusText}`);
    }

    return (await response.json()) as T;
};
