import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResult: undefined | Product[];
  noProduct: string | undefined;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService, private router: Router){}
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('name');
    // console.log(query);
    query && this.product.searchProducts().subscribe((result) => {

      if (Array.isArray(result)) {
        const filteredProducts = result.filter(product =>
          product.name.toLowerCase().includes(query)
        );
        if(filteredProducts.length > 5){
          filteredProducts.length = 5;
        }if(filteredProducts.length === 0){
            this.noProduct = "No Product Found "
            setTimeout(() => {
              this.noProduct = undefined;
              this.router.navigate(['']);
            }, 3000);
        }
        this.searchResult = filteredProducts;
        // console.log('Filtered Products:', filteredProducts); // Log the filtered products
      } else {
        // console.error('API Result is not an array:', result);
      }
    })
    
  }
}
