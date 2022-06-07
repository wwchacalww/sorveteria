export type PaginationOutputDto<Items> = {
  items: Items[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
};
