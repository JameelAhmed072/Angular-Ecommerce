import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-seller-update',
  templateUrl: './seller-update.component.html',
  styleUrls: ['./seller-update.component.css']
})
export class SellerUpdateComponent implements OnInit{

  selectedProduct: undefined | Product;
  productUpdateMsg: undefined | string;
  constructor(private route: ActivatedRoute, private product: ProductService, private router: Router){}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    // console.log('seller update product component:  ',productId);
    this.product.getProduct(productId).subscribe((result: Product) => {
      // console.log('seller update product component:  ',result);
      this.selectedProduct = result;
      
    })
  }
  update(data: Product){
    if(this.selectedProduct){
      data.id = this.selectedProduct.id;
    }
    // console.log(data);
    this.product.updateProduct(data).subscribe((result) => {
      if(result){
        
        this.productUpdateMsg = "Product has been Updated";
        setTimeout(() => {
          this.router.navigate(['seller-home']);
        }, 3000);
      }
        setTimeout(() => {
          this.productUpdateMsg = undefined;
        }, 3000)
        
      
    })
    
  }
}
