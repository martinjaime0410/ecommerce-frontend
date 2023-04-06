import type IBrand from './IBrand';
import type ICategory from './ICategory';
import type ILabel from './ILabel';

export default interface IProduct {
  id: number;
  type: 'Core' | 'Bundle/Kit' | 'Variation';
  sku: string;
  upc: string;
  mpn: string;
  name: string;
  buyer_id: number;
  brand_id: number;
  category_id: number;
  label_id: number;
  description: string;
  min_adv_price: number;
  max_shipping_cost: number;
  vendor_cost: number;
  height: number;
  length: number;
  width: number;
  pound: number;
  ounce: number;
  galleries: string[];
  default_vendor_product_id: number;
  bundle_kit_id: number;
  variation_id: number;
  attribute_id: number;
  brand: IBrand;
  label: ILabel;
  category: ICategory;
  custom_fields: any[];
  children?: IProduct[];
  status: boolean;
  quantity?: number;
}
