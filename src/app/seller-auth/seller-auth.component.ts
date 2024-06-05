import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{

  showLogin: boolean = false;
  authError: string = '';

  constructor(private seller: SellerService, private router: Router){}

  ngOnInit(): void {
      this.seller.reloadSeller();
  }
  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }
  login(data: Login): void{
    // console.log(data);
    this.seller.UserLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if(isError){
        this.authError = "Incorrect Email or Password";
        setTimeout(() => {
          this.authError = "";
        }, 3000)
      }
    })
  }

  openLogin(){
    this.showLogin = !this.showLogin;
  }

}
