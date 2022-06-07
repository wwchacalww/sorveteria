import { SearchResult } from "../../domain/repository/repository-contracts";
import { PaginationOutputMapper } from "./pagination-output";

describe("PaginationOutputMapper Unit Test", () => {
  test("PaginationOutputMapper", () => {
    const result = new SearchResult({
      items: [] as any,
      total: 1,
      current_page: 1,
      per_page: 2,
      filter: null,
      sort: null,
      sort_dir: null,
    });
    const output = PaginationOutputMapper.toOutput(result);
    expect(output).toStrictEqual({
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });
});
