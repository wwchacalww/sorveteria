import { SortDirection } from '@core/sorveteria-hakuna/dist/@seedwork/domain/repository/repository-contracts';
import {
  CreateProductUseCase,
  GetProductUseCase,
  ListProductsUseCase,
  UpdateProductUseCase,
} from '@core/sorveteria-hakuna/product/application';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsController } from './products.controller';

describe('ProductsController Unit Tests', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    controller = new ProductsController();
  });

  it('should create a product', async () => {
    const id = '000a6c80-3659-44de-b763-29d53f0212a7';
    const output: CreateProductUseCase.Output = {
      id,
      name: 'Product 1',
      description: 'Product 1 description',
      category: 'popsicle',
      barcode: '0982034EF03984',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    //@ts-expect-error
    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateProductDto = {
      name: 'Product 1',
      description: 'Product 1 description',
      category: 'popsicle',
      barcode: '0982034EF03984' as any,
      is_active: true,
    };
    const result = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(result).toEqual(output);
  });

  it('should get a product', async () => {
    const id = '000a6c80-3659-44de-b763-29d53f0212a7';
    const output: GetProductUseCase.Output = {
      id,
      name: 'Product 1',
      description: 'Product 1 description',
      category: 'popsicle',
      barcode: '0982034EF03984',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    //@ts-expect-error
    controller['getUseCase'] = mockGetUseCase;
    const result = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(result).toEqual(output);
  });

  it('should list products', async () => {
    const id = '000a6c80-3659-44de-b763-29d53f0212a7';
    const output: ListProductsUseCase.Output = {
      items: [
        {
          id,
          name: 'Product 1',
          description: 'Product 1 description',
          category: 'popsicle',
          barcode: '0982034EF03984',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      current_page: 1,
      per_page: 1,
      last_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error
    controller['listUseCase'] = mockListUseCase;

    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'asc' as SortDirection,
      filter: 'test',
    };
    const result = await controller.search(searchParams);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(result).toEqual(output);
  });

  it('should update a product', async () => {
    const id = '000a6c80-3659-44de-b763-29d53f0212a7';
    const output: UpdateProductUseCase.Output = {
      id,
      name: 'Product Updated',
      description: 'Description Updated',
      category: 'popsicle',
      barcode: '0982034EF03234',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    //@ts-expect-error
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: UpdateProductDto = {
      name: 'Product Updated',
      description: 'Description Updated',
      barcode: '0982034EF03234' as any,
      is_active: true,
    };
    const result = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(result).toEqual(output);
  });

  it('should delete a product', async () => {
    const id = '000a6c80-3659-44de-b763-29d53f0212a7';
    const output = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    //@ts-expect-error
    controller['deleteUseCase'] = mockDeleteUseCase;
    const result = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(result).toEqual(output);
  });
});
