/**
 * Pagination conventions — Document 09 §4.
 */

export type PaginationInput = {
  page?: number;
  pageSize?: number;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
};

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

export function normalizePagination(input: PaginationInput = {}): {
  page: number;
  pageSize: number;
} {
  const page = Math.max(1, Math.floor(input.page ?? 1));
  const requested = Math.floor(input.pageSize ?? DEFAULT_PAGE_SIZE);
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, requested));
  return { page, pageSize };
}

export function toPaginated<T>(allItems: T[], input: PaginationInput = {}): Paginated<T> {
  const { page, pageSize } = normalizePagination(input);
  const totalCount = allItems.length;
  const start = (page - 1) * pageSize;
  const items = allItems.slice(start, start + pageSize);
  return {
    items,
    page,
    pageSize,
    totalCount,
    hasMore: start + items.length < totalCount,
  };
}
