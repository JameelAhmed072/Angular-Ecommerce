export interface SignUp{

  name: string;
  password: string;
  email: string;
}

export interface Login{

  email: string;
  password: string;
}

export interface Product{

  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  id?: string;
  quantity: undefined | number;
  productId: undefined | string;

}


export interface Cart{
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  id?: string | undefined;
  quantity: undefined | number;
  userId: string;
  productId: string;
}

export interface PriceSummary{
  price: number,
  discount: number,
  tax: number,
  delivery: number,
  total: number

}

export interface Order{
  email : string,
  address: string,
  contact: string,
  totalPrice: number,
  userId: string,
  id?: string | undefined
}
