/* eslint-disable @typescript-eslint/no-namespace */
import { ProductInMemoryRepository } from '@core/sorveteria-hakuna/product/infra';
import {
  CreateProductUseCase,
  GetProductUseCase,
  ListProductsUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '@core/sorveteria-hakuna/product/application';
import { ProductRepository } from '@core/sorveteria-hakuna/product/domain';

export namespace PRODUCTS_PROVIDERS {
  export namespace REPOSITORIES {
    export const PRODUCT_IN_MEMORY_REPOSITORY = {
      provide: 'ProductInMemoryRepository',
      useClass: ProductInMemoryRepository,
    };
  }

  export namespace USE_CASES {
    export const CREATE_PRODUCT_USE_CASE = {
      provide: CreateProductUseCase.UseCase,
      useFactory: (productRepo: ProductRepository.Repository) => {
        return new CreateProductUseCase.UseCase(productRepo);
      },
      inject: ['ProductRepository'],
    };

    export const GET_PRODUCT_USE_CASE = {
      provide: GetProductUseCase.UseCase,
      useFactory: (productRepo: ProductRepository.Repository) => {
        return new GetProductUseCase.UseCase(productRepo);
      },
      inject: ['ProductRepository'],
    };

    export const LIST_PRODUCTS_USE_CASE = {
      provide: ListProductsUseCase.UseCase,
      useFactory: (productRepo: ProductRepository.Repository) => {
        return new ListProductsUseCase.UseCase(productRepo);
      },
      inject: ['ProductRepository'],
    };

    export const UPDATE_PRODUCT_USE_CASE = {
      provide: UpdateProductUseCase.UseCase,
      useFactory: (productRepo: ProductRepository.Repository) => {
        return new UpdateProductUseCase.UseCase(productRepo);
      },
      inject: ['ProductRepository'],
    };

    export const DELETE_USE_CASE = {
      provide: DeleteProductUseCase.UseCase,
      useFactory: (productRepo: ProductRepository.Repository) => {
        return new DeleteProductUseCase.UseCase(productRepo);
      },
      inject: ['ProductRepository'],
    };
  }
}
