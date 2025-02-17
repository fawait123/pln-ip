export interface IPagination<T> {
  data: T;
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: null | string;
  next_page_url: null | string;
  path: string;
  per_page: null | number;
  prev_page_url: null | number;
  to: number;
  total: number;
}

export interface IParams {
  search: string;
  filter?: string;
  filters?: string;
  currentPage?: number;
  perPage?: number;
}
