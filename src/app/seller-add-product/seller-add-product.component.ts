import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit{
  AddProductMessage: string | undefined;
  constructor(private product: ProductService){}

  ngOnInit(): void {

  }

  submit(data: Product){
    // console.log(data);
    this.product.addProduct(data)
    .subscribe((result) => {
      
      // console.log(result);
      if(result){
        this.AddProductMessage = "Product successfully added";
      }
        setTimeout(() => {
          this.AddProductMessage = undefined;
        }, 3000);

    })


  }


}
