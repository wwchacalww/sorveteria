import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Put,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  CreateProductUseCase,
  GetProductUseCase,
  ListProductsUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '@core/sorveteria-hakuna/product/application';
import { SearchProductDto } from './dto/search-product.dto';

@Controller('products')
export class ProductsController {
  @Inject(CreateProductUseCase.UseCase)
  private createUseCase: CreateProductUseCase.UseCase;

  @Inject(GetProductUseCase.UseCase)
  private getUseCase: GetProductUseCase.UseCase;

  @Inject(ListProductsUseCase.UseCase)
  private listUseCase: ListProductsUseCase.UseCase;

  @Inject(UpdateProductUseCase.UseCase)
  private updateUseCase: UpdateProductUseCase.UseCase;

  @Inject(DeleteProductUseCase.UseCase)
  private deleteUseCase: DeleteProductUseCase.UseCase;

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.createUseCase.execute(createProductDto);
  }

  @Get()
  search(@Query() searchParams: SearchProductDto) {
    return this.listUseCase.execute(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUseCase.execute({ id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.updateUseCase.execute({ id, ...updateProductDto });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute({ id });
  }
}
