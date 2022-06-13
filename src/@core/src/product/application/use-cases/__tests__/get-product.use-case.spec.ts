import NotFoundError from "#seedwork/domain/errors/not-found.error";
import { Product } from "#product/domain/entities/product";
import ProductInMemoryRepository from "#product/infra/db/in-memory/product-in-memory.repository";
import { GetProductUseCase } from "../get-product.use-case";
describe("GetProductUseCase Unit Test", () => {
  let usecase: GetProductUseCase.UseCase;
  let repository: ProductInMemoryRepository;

  beforeEach(() => {
    repository = new ProductInMemoryRepository();
    usecase = new GetProductUseCase.UseCase(repository);
  });
  it("should throw an error if product not found", async () => {
    expect(() => usecase.execute({ id: "not-found" })).rejects.toThrow(
      new NotFoundError("Entity not found with id: not-found")
    );
  });

  it("should get a product", async () => {
    const items = [
      new Product({
        name: "Product Test",
        description: "Product Description Test",
        category: "Product Category Test",
      }),
    ];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await usecase.execute({ id: items[0].id });
    expect(output).toStrictEqual({
      id: items[0].id,
      name: "Product Test",
      description: "Product Description Test",
      category: "Product Category Test",
      barcode: null,
      is_active: true,
      created_at: items[0].createdAt,
      updated_at: items[0].updatedAt,
    });
    expect(spyFindById).toHaveBeenCalled();
  });
});
