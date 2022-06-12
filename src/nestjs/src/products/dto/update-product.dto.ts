import { UpdateProductUseCase } from '@core/sorveteria-hakuna/product/application';

export class UpdateProductDto
  implements Omit<UpdateProductUseCase.Input, 'id'>
{
  name: string;
  description: string;
  barcode?: string;
  is_active?: boolean;
}
