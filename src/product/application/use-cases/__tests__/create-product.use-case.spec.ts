import ProductInMemoryRepository from "../../../infra/repository/product-in-memory.repository";
import CreateProductUseCase from "../create-product.use-case";
describe("CreateProductUseCase Unit Test", () => {
  let createProductUseCase: CreateProductUseCase;
  let repository: ProductInMemoryRepository;

  beforeEach(() => {
    repository = new ProductInMemoryRepository();
    createProductUseCase = new CreateProductUseCase(repository);
  });
  it("should create a product with use case", async () => {
    let input = {
      name: "Product Test",
      description: "Product Description Test",
      category: "Product Category Test",
    };
    let output = await createProductUseCase.execute(input);
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "Product Test",
      description: "Product Description Test",
      category: "Product Category Test",
      barcode: null,
      is_active: true,
      created_at: repository.items[0].createdAt,
      updated_at: repository.items[0].updatedAt,
    });

    let inputBarcode = {
      name: "Product Test",
      description: "Product Description Test",
      category: "Product Category Test",
      barcode: "123456as 789" as any,
      is_active: false,
    };
    output = await createProductUseCase.execute(inputBarcode);
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: "Product Test",
      description: "Product Description Test",
      category: "Product Category Test",
      barcode: "123456as 789",
      is_active: false,
      created_at: repository.items[1].createdAt,
      updated_at: repository.items[1].updatedAt,
    });
  });
});
