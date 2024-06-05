import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Cart, Order, Product } from "../data-types";

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  cartData = new EventEmitter<Product[] | []>();

  constructor(private http: HttpClient){}


  addProduct(data: Product){
    return this.http.post('http://localhost:3000/products', data);
  }

  productList(){
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: string){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string){
    return this.http.get(`http://localhost:3000/products/${id}`)
  }
  updateProduct(data: Product){
    return this.http.put<Product>(`http://localhost:3000/products/${data.id}`,data)
  }

  popularProducts(){
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=4');
  }
  trendyProducts(){
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(){
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  localAddToCart(data: Product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }

  }

  removeItemFromCart(productId: string){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: Cart){
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: string){
    return this.http.get<Product[]>('http://localhost:3000/cart?userId=' +userId,
      { observe: 'response' }).subscribe((result) => {
        // console.log('result is :',result);
        if(result && result.body){
        this.cartData.emit(result.body);
      }
    })
  }

  removeToCart(cartId: string){
    return this.http.delete('http://localhost:3000/cart/'+ cartId);
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    return this.http.get<Cart[]>('http://localhost:3000/cart?userId='+ userData.id);
  }

  orderNow(data: Order){
    return this.http.post('http://localhost:3000/orders', data);
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    console.log('user data is : ',userData.id);

    return this.http.get<Order[]>(`http://localhost:3000/orders?userId=${userData.id}`);
  }

  deleteCartItems(cartId: string){
    return this.http.delete('http://localhost:3000/cart/'+ cartId, {observe: 'response'})
      .subscribe((result) => {
        if(result){
          this.cartData.emit([]);
        }
      })
  }

  cancelOrder(orderId: string){
    return this.http.delete(`http://localhost:3000/orders/${orderId}`);
  }
}
