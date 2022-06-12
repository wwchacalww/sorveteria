import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PRODUCTS_PROVIDERS } from './products.provider';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ...Object.values(PRODUCTS_PROVIDERS.REPOSITORIES),
    ...Object.values(PRODUCTS_PROVIDERS.USE_CASES),
  ],
})
export class ProductsModule {}
