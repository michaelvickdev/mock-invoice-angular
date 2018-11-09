export class ProductModel {
  _id: string = null;
  name: string = null;
  price: number = null;
  
  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}