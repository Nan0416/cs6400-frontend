import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { ProductThumbnailComponent } from './components/product-thumbnail/product-thumbnail.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductSearchDialogComponent } from './components/product-search-dialog/product-search-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NotFoundComponent,
    LoginSignupComponent,
    ProductThumbnailComponent,
    ProductSearchComponent,
    ProductSearchDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
