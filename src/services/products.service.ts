import api from '../lib/axios';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  linkUrl?: string;
  inStock: boolean;
}

export const fetchProducts = async () => {
  const { data } = await api.get('/products');
  return data.data.products;
};

export const createProduct = async (productData: Partial<Product>) => {
  const { data } = await api.post('/products', productData);
  return data.data.product;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};
