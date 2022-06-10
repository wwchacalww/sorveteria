import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CreateProductUseCase } from '@core/sorveteria-hakuna/product/application';
import { ProductInMemoryRepository } from '@core/sorveteria-hakuna/product/infra';
import ProductRepository from '@core/sorveteria-hakuna/dist/product/domain/repository/product.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'ProductRepository',
      useClass: ProductInMemoryRepository,
    },
    {
      provide: CreateProductUseCase.UseCase,
      useFactory: (productRepo: ProductRepository.Repository) => {
        return new CreateProductUseCase.UseCase(productRepo);
      },
      inject: ['ProductRepository'],
    },
  ],
})
export class ProductsModule {}
