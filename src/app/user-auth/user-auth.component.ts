import { Component, OnInit } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../data-types';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';
  constructor(
    private userService: UserService,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signUp(data: SignUp) {
    this.userService.userSignUp(data);
  }
  login(data: Login) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result) => {
      console.log('apple', result);
      if (result) {
        this.authError = 'Please enter valid user details';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  // localCartToRemoteCart(){
  //   let data = localStorage.getItem('localCart');
  //   let cartDataList: Product[] = JSON.parse(data);

  //   setTimeout(() => {
  //     let user  = localStorage.getItem('user');
  //     let userId = user && JSON.parse(user).id;
  //     if(data){
  //         cartDataList.forEach((product: Product, index) => {
  //           let cartData:Cart  = {
  //             ...product,
  //             productId: product.id,
  //             userId: userId,
  //           };
  //           delete cartData.id;
  //           setTimeout(() => {
  //             this.product.addToCart(cartData)
  //             .subscribe((result) => {
  //               if(result){
  //                 console.log('Item stored in DB: ');
  //               }
  //             })
  //             if(cartDataList.length === index+1){
  //               localStorage.removeItem('localCart');
  //             }
  //           }, 1000);
  //         });
  //     }

  //     setTimeout(() => {
  //       this.product.getCartList(userId);
  //     },2000);

  //     console.log('user id is : ', userId);
  //   }, 3000)
  // }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let userId = '';
    setTimeout(() => {
      let user = localStorage.getItem('user');
      userId = user && JSON.parse(user).id;
      if (data) {
        let cartDataList: Product[] = JSON.parse(data);

        cartDataList.forEach((product: Product, index) => {
          let cartData: Cart = {
            ...product,
            productId: product.id,
            userId: userId,
          };
          delete cartData.id;
          setTimeout(() => {
            this.product.addToCart(cartData).subscribe((result) => {
              if (result) {
                console.log('Item stored in DB : ');
              }
            });
            if (cartDataList.length === index + 1) {
              localStorage.removeItem('localCart');
            }
          }, 100);
        });
      }
    }, 500);

    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
