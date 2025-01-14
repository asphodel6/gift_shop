export interface IGift {
  id: string;
  title: string;
  price: number;
  rating: number;
  ratingCount: number;
  file: string;
  info: Info[],
  deliveryDate: string;
  description?: string;
}

export interface Info {
  label: string;
  value: string;
}
