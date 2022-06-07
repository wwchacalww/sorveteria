export type ProductOutput = {
  id: string;
  name: string;
  description: string;
  category: string;
  barcode?: string;
  is_active?: boolean;
  created_at: Date;
  updated_at: Date;
};
