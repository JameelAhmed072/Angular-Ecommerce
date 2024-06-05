import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
import {faEdit}  from '@fortawesome/free-solid-svg-icons'
import {faTrash}  from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  productList: undefined | Product[];
  productMessage: undefined | string;
  deleteIcon = faTrash;
  updateIcon = faEdit;

  constructor(private product: ProductService){}
  ngOnInit(): void {
    this.getAllProducts();
    
  }
  deleteProduct(id: string){
    this.product.deleteProduct(id).subscribe((result) => {  
      if(result){
        this.productMessage = "Product Successfully Deleted!"
        this.getAllProducts();
      }
      setTimeout(() => {
        this.productMessage = undefined;
      }, 3000)
    })
  }
  getAllProducts(){
    this.product.productList().subscribe((result) => {
      // console.log(result);
      this.productList = result;
    })
  }


}
