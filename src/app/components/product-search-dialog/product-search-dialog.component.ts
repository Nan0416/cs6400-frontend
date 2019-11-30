import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-product-search-dialog',
  templateUrl: './product-search-dialog.component.html',
  styleUrls: ['./product-search-dialog.component.scss']
})
export class ProductSearchDialogComponent implements OnInit {

  constructor(
    private router: Router,
  ) { 
  }
  searchProducts(text){
    this.router.navigateByUrl(`/search/${encodeURI(text)}`);
  }

  ngOnInit() {
  }

}
