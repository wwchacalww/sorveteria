import { Product } from "../../../domain/entities/product";
import ProductRepository from "../../../domain/repository/product.repository";
import ProductInMemoryRepository from "../../../infra/repository/product-in-memory.repository";
import ListProductsUseCase from "../list-products.use-case";
describe("ListProductsUseCase", () => {
  let useCase: ListProductsUseCase;
  let repository: ProductInMemoryRepository;

  beforeEach(() => {
    repository = new ProductInMemoryRepository();
    useCase = new ListProductsUseCase(repository);
  });

  test("toOutput method", () => {
    let result = new ProductRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });
    let output = useCase["toOutPut"](result);
    expect(output).toEqual({
      items: [],
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 2,
    });

    const entity = new Product({
      name: "Product 1",
      description: "Description 1",
      category: "Category 1",
      barcode: "2389472394" as any,
    });
    result = new ProductRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });
    output = useCase["toOutPut"](result);
    expect(output).toEqual({
      items: [
        {
          id: entity.id,
          name: entity.name,
          description: entity.description,
          category: entity.category,
          barcode: entity.barcode.value,
          is_active: entity.isActive,
          created_at: entity.createdAt,
          updated_at: entity.updatedAt,
        },
      ],
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 2,
    });
  });

  it("should returns output using empty input with products ordered by created_at", async () => {
    const items = [
      new Product({
        name: "Product 1",
        description: "Description 1",
        category: "Category 1",
        barcode: "2389472394" as any,
        created_at: new Date(2022, 5, 7, 9, 31, 14),
      }),
      new Product({
        name: "Product 2",
        description: "Description 2",
        category: "Category 2",
        barcode: "2389981794" as any,
        created_at: new Date(2022, 5, 7, 9, 33, 14),
      }),
      new Product({
        name: "Product 3",
        description: "Description 3",
        category: "Category 3",
        barcode: "2389981123" as any,
        created_at: new Date(2022, 5, 7, 9, 35, 14),
      }),
    ];
    repository.items = items;
    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: items
        .map((i) => ({
          id: i.id,
          name: i.name,
          description: i.description,
          category: i.category,
          barcode: i.barcode.value,
          is_active: i.isActive,
          created_at: i.createdAt,
          updated_at: i.updatedAt,
        }))
        .reverse(),
      total: 3,
      current_page: 1,
      last_page: 1,
      per_page: 15,
    });
  });

  it("shoult returns output using pagination, sort and filter", async () => {
    const items = [
      new Product({
        name: "Picole de chocolate",
        description: "Description 1",
        category: "picolé",
        barcode: "2389472394" as any,
        created_at: new Date(2022, 5, 7, 9, 31, 14),
      }),
      new Product({
        name: "Picole de Uva",
        description: "Description 2",
        category: "picolé",
        barcode: "2389981794" as any,
        created_at: new Date(2022, 5, 7, 9, 33, 14),
      }),
      new Product({
        name: "Acaí",
        description: "Description 3",
        category: "sorvete",
        barcode: "2389981123" as any,
        created_at: new Date(2022, 5, 7, 9, 35, 14),
      }),
    ];
    repository.items = items;
    const output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "asc",
      filter: "picolé",
    });
    expect(output).toStrictEqual({
      items: [
        {
          id: items[0].id,
          name: "Picole de chocolate",
          description: "Description 1",
          category: "picolé",
          barcode: "2389472394",
          is_active: true,
          created_at: items[0].createdAt,
          updated_at: items[0].updatedAt,
        },
        {
          id: items[1].id,
          name: "Picole de Uva",
          description: "Description 2",
          category: "picolé",
          barcode: "2389981794",
          is_active: true,
          created_at: items[1].createdAt,
          updated_at: items[1].updatedAt,
        },
      ],
      total: 2,
      current_page: 1,
      last_page: 1,
      per_page: 2,
    });
  });
});
