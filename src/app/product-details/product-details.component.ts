import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart:boolean =  false;
  cartData: Product | undefined;

  constructor(private activatedRoute: ActivatedRoute, private product: ProductService){}
  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    // console.log(productId);
    if(productId){
      this.product.getProduct(productId).subscribe((result: Product) => {
        this.productData = result;

        let cartData = localStorage.getItem('localCart');
        if(productId && cartData){
          let items = JSON.parse(cartData);
          items = items.filter((item: Product) => productId === item.id.toString());
          if(items.length){
            this.removeCart = true;

          }else{
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if(user){
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter((item:Product) => productId?.toString() === item.productId?.toString());
            if(item.length){
              this.cartData = item[0];
              this.removeCart = true;
            }
          })
        }

      })
    }
  }
  handleQuantity(val:string){
    if(this.productQuantity < 20 && val === 'plus'){
      this.productQuantity += 1;
    }else if(this.productQuantity > 1 && val === 'min'){
      this.productQuantity -= 1;
    }
  }
  AddToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        // console.log(this.productData);
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }else{
        console.log('User is Logged in: ');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.log(userId);
        let cartData: Cart = {
          ...this.productData,
          userId: userId,
          productId: this.productData.id,
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if(result){
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }
  removeToCart(productId: string){
    if(!localStorage.getItem('user')){
      this.product.removeItemFromCart(productId);
      this.removeCart = false;
    }else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.log('CartData id is : ===> ',this.cartData);
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result) => {
        if(result){
          this.product.getCartList(userId);
        }
      });
    }
    this.removeCart = false;
  }
}
