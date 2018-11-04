export class CustomerModel {
  id: number = null;
  name: string = null;
  address: string = null;
  phone: string = null;
  
  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}