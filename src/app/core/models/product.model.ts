import { Resource } from './resource.model';

export interface Product extends Resource {
  brand: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  name: string;
  currentPrice: string;
  rawPrice: string;
  likesCount: number;
  discount: number;
  isNew: false;
  model: string;
  url: string;
  imageUrl: string;
}
