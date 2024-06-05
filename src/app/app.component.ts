import { Component, OnInit } from '@angular/core';
import { SellerService } from './services/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecommerce-project';

  constructor(private seller: SellerService){}
  ngOnInit(){
    this.seller.reloadSeller();
  }
}
