import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-types';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp){
    this.http.post('http://localhost:3000/seller',data, { observe: 'response' })
    .subscribe((result) => {
      // console.log(result);
      if(result){
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      }
    })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home']);
    }
  }

  UserLogin(data: Login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{ observe: 'response' })
    .subscribe((result: any) => {
      // console.log('this is from seller service:  ',result);
      if(result && result.body && result.body.length){
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
        console.log('User logged In: ');

      }else{
        console.log('Login failed');
        this.isLoginError.emit(true);

      }
    })

  }
}
