import { Product } from '../src/models/Product.js';

describe('Product Model', () => {
  it('should calculate stock correctly', () => {
    const product = new Product();
    product.stock = 100;
    product.minStock = 10;

    expect(product.stock).toBe(100);
    expect(product.stock > product.minStock).toBe(true);
  });
});