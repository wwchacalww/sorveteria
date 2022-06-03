import Entity from "../../entity/entity";
import { InMemorySearchableRepository } from "../in-memory.repository";
import { SearchParams, SearchResult } from "../repository-contracts";
type StubProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ["name"];

  protected async applyFilter(
    items: StubEntity[],
    filter: string
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter((i) => {
      return (
        i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        i.props.price.toString() === filter
      );
    });
  }
}

describe("InMemorySearchableRepository Unit Test", () => {
  let repository: StubInMemorySearchableRepository;
  beforeEach(() => {
    repository = new StubInMemorySearchableRepository();
  });
  describe("applyFilter method", () => {
    it("should no filter if filter is null", async () => {
      const items = [
        new StubEntity({ name: "test", price: 1 }),
        new StubEntity({ name: "test", price: 2 }),
        new StubEntity({ name: "test", price: 3 }),
      ];
      const spyFilterMethod = jest.spyOn(items, "filter" as any);
      const result = await repository["applyFilter"](items, null);
      expect(result).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    test("filter by name", async () => {
      const items = [
        new StubEntity({ name: "test", price: 10 }),
        new StubEntity({ name: "TESTE", price: 13 }),
        new StubEntity({ name: "fake", price: 10 }),
      ];
      const spyFilterMethod = jest.spyOn(items, "filter" as any);
      let result = await repository["applyFilter"](items, "test");
      expect(result).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);
      result = await repository["applyFilter"](items, "10");
      expect(result).toStrictEqual([items[0], items[2]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);
      result = await repository["applyFilter"](items, "no-filter");
      expect(result).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe("applySort method", () => {
    it("should no sort if sort is null", async () => {
      const items = [
        new StubEntity({ name: "Goiaba", price: 1 }),
        new StubEntity({ name: "Acerola", price: 2 }),
        new StubEntity({ name: "Manga", price: 3 }),
      ];
      let result = await repository["applySort"](items, null, null);
      expect(result).toStrictEqual(items);
      result = await repository["applySort"](items, "price", "asc");
      expect(result).toStrictEqual(items);
    });

    it("should sort by name", async () => {
      const items = [
        new StubEntity({ name: "Goiaba", price: 1 }),
        new StubEntity({ name: "acerola", price: 2 }),
        new StubEntity({ name: "MaNga", price: 3 }),
      ];
      let result = await repository["applySort"](items, "name", "asc");
      expect(result).toStrictEqual([items[1], items[0], items[2]]);
      result = await repository["applySort"](items, "name", "desc");
      expect(result).toStrictEqual([items[2], items[0], items[1]]);
    });
  });

  describe("applyPaginate method", () => {
    it("should paginate items", async () => {
      const items = [
        new StubEntity({ name: "Goiaba", price: 1 }),
        new StubEntity({ name: "Acerola", price: 2 }),
        new StubEntity({ name: "Manga", price: 3 }),
        new StubEntity({ name: "Limão", price: 4 }),
        new StubEntity({ name: "Pinha", price: 5 }),
      ];

      let result = await repository["applyPaginate"](items, 1, 2);
      expect(result).toStrictEqual([items[0], items[1]]);
      result = await repository["applyPaginate"](items, 2, 2);
      expect(result).toStrictEqual([items[2], items[3]]);
      result = await repository["applyPaginate"](items, 3, 2);
      expect(result).toStrictEqual([items[4]]);
      result = await repository["applyPaginate"](items, 4, 2);
      expect(result).toStrictEqual([]);
    });
  });

  describe("search method", () => {
    it("should apply only paginate when other params are null", async () => {
      const entity = new StubEntity({ name: "Goiaba", price: 1 });
      const items = Array(16).fill(entity);
      repository.items = items;
      const result = await repository.search(new SearchParams());
      expect(result).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          current_page: 1,
          per_page: 15,
          filter: null,
          sort: null,
          sort_dir: null,
        })
      );
    });

    it("should apply Paginate and filter", async () => {
      const items = [
        new StubEntity({ name: "Atesto", price: 1 }),
        new StubEntity({ name: "aresta", price: 4 }),
        new StubEntity({ name: "atestado", price: 2 }),
        new StubEntity({ name: "Na testa", price: 3 }),
        new StubEntity({ name: "ATESTA", price: 5 }),
      ];
      repository.items = items;
      let result = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 2,
          filter: "TEST",
        })
      );

      expect(result).toStrictEqual(
        new SearchResult({
          items: [items[0], items[2]],
          total: 4,
          current_page: 1,
          per_page: 2,
          filter: "TEST",
          sort: null,
          sort_dir: null,
        })
      );

      result = await repository.search(
        new SearchParams({
          page: 2,
          per_page: 2,
          filter: "TEST",
        })
      );
      expect(result).toStrictEqual(
        new SearchResult({
          items: [items[3], items[4]],
          total: 4,
          current_page: 2,
          per_page: 2,
          filter: "TEST",
          sort: null,
          sort_dir: null,
        })
      );
    });

    it("should apply Paginate and sort", async () => {
      const items = [
        new StubEntity({ name: "MORANGO", price: 4 }),
        new StubEntity({ name: "uva", price: 2 }),
        new StubEntity({ name: "jAcA", price: 3 }),
        new StubEntity({ name: "Laranja", price: 5 }),
        new StubEntity({ name: "abacate", price: 1 }),
      ];
      repository.items = items;

      const arrange = [
        {
          params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
          }),
          result: new SearchResult({
            items: [items[4], items[2]],
            total: 5,
            current_page: 1,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "asc",
          }),
        },
        {
          params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
          }),
          result: new SearchResult({
            items: [items[3], items[0]],
            total: 5,
            current_page: 2,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "asc",
          }),
        },
        {
          params: new SearchParams({
            page: 3,
            per_page: 2,
            sort: "name",
          }),
          result: new SearchResult({
            items: [items[1]],
            total: 5,
            current_page: 3,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "asc",
          }),
        },
        {
          params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new SearchResult({
            items: [items[1], items[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "desc",
          }),
        },
        {
          params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new SearchResult({
            items: [items[3], items[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "desc",
          }),
        },
      ];

      for (const { params, result } of arrange) {
        const output = await repository.search(params);
        expect(output).toStrictEqual(result);
      }
    });

    it("should apply Paginate, filter and sort", async () => {
      const items = [
        new StubEntity({ name: "Frutado", price: 5 }),
        new StubEntity({ name: "Fruta Pão", price: 2 }),
        new StubEntity({ name: "abacate", price: 1 }),
        new StubEntity({ name: "SUCO de FRUTAS", price: 3 }),
        new StubEntity({ name: "desfrute bem", price: 4 }),
      ];
      repository.items = items;

      const arrange = [
        {
          params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
            filter: "frut",
          }),
          result: new SearchResult({
            items: [items[4], items[1]],
            total: 4,
            current_page: 1,
            per_page: 2,
            filter: "frut",
            sort: "name",
            sort_dir: "asc",
          }),
        },
        {
          params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
            filter: "FRUT",
          }),
          result: new SearchResult({
            items: [items[0], items[3]],
            total: 4,
            current_page: 2,
            per_page: 2,
            filter: "FRUT",
            sort: "name",
            sort_dir: "asc",
          }),
        },
      ];

      for (const { params, result } of arrange) {
        const output = await repository.search(params);
        expect(output).toStrictEqual(result);
      }
    });
  });
});
