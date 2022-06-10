import { UpdateProductUseCase } from '@core/sorveteria-hakuna/product/application';

export class UpdateProductDto implements UpdateProductUseCase.Input {
  id: string;
  name: string;
  description: string;
  barcode?: string;
  is_active?: boolean;
}
