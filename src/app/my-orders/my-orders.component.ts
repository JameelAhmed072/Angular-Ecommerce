import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../data-types';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  orderData: Order[] | undefined
  constructor(private product: ProductService){}

  ngOnInit() {

      this.getOrderList();
  }

  cancelOrder(orderId: string| undefined){
    orderId && this.product.cancelOrder(orderId)
        .subscribe((result) => {
          this.getOrderList();
        })
  }

  getOrderList(){
    this.product.orderList().subscribe((result) => {
      this.orderData = result;

    })
  }
}
