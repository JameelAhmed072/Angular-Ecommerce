import { Component, OnInit } from '@angular/core';
import { Product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];
  constructor(private product: ProductService){

  }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data: Product[]) => {
      // console.log(data);
      this.popularProducts = data;
    });
    this.product.trendyProducts().subscribe((result) => {
      this.trendyProducts = result;
    })
  }
}
