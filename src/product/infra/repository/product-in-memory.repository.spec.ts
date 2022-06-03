import { Product } from "../../domain/entities/product";
import ProductInMemoryRepository from "./product-in-memory.repository";
describe("ProductInMemoryRepository", () => {
  let repository: ProductInMemoryRepository;

  beforeEach(() => (repository = new ProductInMemoryRepository()));
  it("should no filter items when filter object is null", async () => {
    const items = [
      new Product({
        name: "test",
        description: "test description",
        category: "test category",
      }),
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it("should filter items using filter parameter", async () => {
    const items = [
      new Product({
        name: "test",
        description: " description",
        category: "category",
      }),
      new Product({
        name: "TEST",
        description: " description",
        category: "category",
      }),
      new Product({
        name: "fake",
        description: " description",
        category: "category",
      }),
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, "TEST");
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it("should sort by created_at when sort param is null", async () => {
    const items = [
      new Product({
        name: "test",
        description: "Description",
        category: "Category",
        created_at: new Date(2022, 5, 2, 10, 31, 4),
      }),
      new Product({
        name: "TEST",
        description: "Description",
        category: "Category",
        created_at: new Date(2022, 5, 2, 10, 35, 4),
      }),
      new Product({
        name: "fake",
        description: "Description",
        category: "Category",
        created_at: new Date(2022, 5, 2, 10, 35, 14),
      }),
    ];

    let itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it("should sort by name", async () => {
    const items = [
      new Product({
        name: "Cacau",
        description: "Description",
        category: "Category",
      }),
      new Product({
        name: "manga",
        description: "Description",
        category: "Category",
      }),
      new Product({
        name: "ABACATE",
        description: "Description",
        category: "Category",
      }),
    ];

    let itemsSorted = await repository["applySort"](items, "name", "asc");
    expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);

    itemsSorted = await repository["applySort"](items, "name", "desc");
    expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);
  });
});
