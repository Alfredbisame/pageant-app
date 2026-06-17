export interface PaginationQuery {
    page?: number;
    limit?: number;
}
export declare function getPagination(query: PaginationQuery): {
    page: number;
    limit: number;
    skip: number;
};
export declare function buildPaginationMeta(total: number, page: number, limit: number): {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};
