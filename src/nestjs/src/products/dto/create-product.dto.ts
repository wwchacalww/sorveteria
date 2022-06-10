import Barcode from '@core/sorveteria-hakuna/dist/@seedwork/domain/value-objects/barcode.vo';
import { CreateProductUseCase } from '@core/sorveteria-hakuna/product/application';

export class CreateProductDto implements CreateProductUseCase.Input {
  name: string;
  description: string;
  category: string;
  barcode?: Barcode;
  is_active?: boolean;
}
