import { SearchParams } from "./repository-contracts";
describe("Searchparams Unit Test", () => {
  test("page prop", () => {
    const arrange = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: "", expected: 1 },
      { page: "a", expected: 1 },
      { page: "1", expected: 1 },
      { page: "0", expected: 1 },
      { page: "2", expected: 2 },
      { page: -3, expected: 1 },
      { page: 0, expected: 1 },
      { page: false, expected: 1 },
      { page: true, expected: 1 },
      { page: {}, expected: 1 },
      { page: 1, expected: 1 },
      { page: 15, expected: 15 },
    ];
    arrange.forEach(({ page, expected }) => {
      const searchParams = new SearchParams({ page: page as any });
      expect(searchParams.page).toBe(expected);
    });
  });

  test("per_page prop", () => {
    const searchParams = new SearchParams();
    expect(searchParams.per_page).toBe(15);
    const arrange = [
      { per_page: null, expected: 15 },
      { per_page: undefined, expected: 15 },
      { per_page: "", expected: 15 },
      { per_page: "a", expected: 15 },
      { per_page: "1", expected: 1 },
      { per_page: "0", expected: 15 },
      { per_page: "2", expected: 2 },
      { per_page: -3, expected: 15 },
      { per_page: 0, expected: 15 },
      { per_page: false, expected: 15 },
      { per_page: true, expected: 15 },
      { per_page: {}, expected: 15 },
      { per_page: 1, expected: 1 },
      { per_page: 25, expected: 25 },
    ];
    arrange.forEach(({ per_page, expected }) => {
      const searchParams = new SearchParams({ per_page: per_page as any });
      expect(searchParams.per_page).toBe(expected);
    });
  });

  test("sort prop", () => {
    const searchParams = new SearchParams();
    expect(searchParams.sort).toBeNull();
    const arrange = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: "", expected: null },
      { sort: "1", expected: "1" },
      { sort: "0", expected: "0" },
      { sort: -3, expected: "-3" },
      { sort: false, expected: "false" },
      { sort: true, expected: "true" },
      { sort: {}, expected: "[object Object]" },
      { sort: "field", expected: "field" },
    ];
    arrange.forEach(({ sort, expected }) => {
      const searchParams = new SearchParams({ sort: sort as any });
      expect(searchParams.sort).toBe(expected);
    });
  });

  test("sort_dir prop", () => {
    let searchParams = new SearchParams();
    expect(searchParams.sort_dir).toBeNull();
    searchParams = new SearchParams({ sort: null });
    expect(searchParams.sort_dir).toBeNull();
    const arrange = [
      { sort_dir: null, expected: "asc" },
      { sort_dir: undefined, expected: "asc" },
      { sort_dir: "", expected: "asc" },
      { sort_dir: "1", expected: "asc" },
      { sort_dir: "0", expected: "asc" },
      { sort_dir: -3, expected: "asc" },
      { sort_dir: false, expected: "asc" },
      { sort_dir: true, expected: "asc" },
      { sort_dir: {}, expected: "asc" },
      { sort_dir: "DESC", expected: "desc" },
      { sort_dir: "ASC", expected: "asc" },

      { sort_dir: "desc", expected: "desc" },
      { sort_dir: "asc", expected: "asc" },
    ];
    arrange.forEach(({ sort_dir, expected }) => {
      const searchParams = new SearchParams({
        sort: "field",
        sort_dir: sort_dir as any,
      });
      expect(searchParams.sort_dir).toBe(expected);
    });
  });

  test("filter prop", () => {
    const searchParams = new SearchParams();
    expect(searchParams.filter).toBeNull();
    const arrange = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: "", expected: null },
      { filter: "1", expected: "1" },
      { filter: "0", expected: "0" },
      { filter: -3, expected: "-3" },
      { filter: false, expected: "false" },
      { filter: true, expected: "true" },
      { filter: {}, expected: "[object Object]" },
      { filter: "field", expected: "field" },
    ];
    arrange.forEach(({ filter, expected }) => {
      const searchParams = new SearchParams({ filter: filter as any });
      expect(searchParams.filter).toBe(expected);
    });
  });
});
