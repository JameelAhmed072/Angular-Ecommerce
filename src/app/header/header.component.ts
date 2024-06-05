import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges{
  menuType: string = '';
  sellerName: string = '';
  userName: string = '';
  cartItems = 0;
  searchResult: undefined | Product[];
  constructor(private router: Router, private product: ProductService){

    console.log('constructor is called!');
  }
  ngOnChanges(){
    console.log('ngOnChange is calledd!');
  }

  ngOnInit(): void {
    console.log('OnInit is called!');

    this.router.events.subscribe((val: any) => {
      // console.log(val.url);
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          // console.log("in seller area");
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        }
        else{
          // console.log("outside seller");
          this.menuType = 'default'
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    })
  }


  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      const searchTerm = element.value.toLowerCase();
      this.product.searchProducts().subscribe((result) => {
        // console.log('API Result:', result); // Log the API result
        // Ensure that result is an array
        if (Array.isArray(result)) {
          const filteredProducts = result.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
          );
          if(filteredProducts.length > 5){
            filteredProducts.length = 5;
          }
          this.searchResult = filteredProducts;
          // console.log('Filtered Products:', filteredProducts); // Log the filtered products
        } else {
          // console.error('API Result is not an array:', result);
        }
      }, error => {
        // console.error('API Call Error:', error); // Log any errors from the API call
      });
    }
  }
  hideSearch(){
    this.searchResult = undefined;
  }
  SubmitSearch(val: string){
    // console.log(val);
    this.router.navigate([`search/${val}`])
  }
  redirectToDetail(id: string){
    this.router.navigate(['/details/'+id])
  }

}
