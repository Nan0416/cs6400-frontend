import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { ProductSearchDialogComponent } from './components/product-search-dialog/product-search-dialog.component';

const routes: Routes = [
  { path: "", component: ProductSearchDialogComponent},
  { path: "search/:search-text", component: ProductSearchComponent},
  // { path: "search/:search-text/:page-no", component: ProductSearchComponent},
  { path: "login", component: LoginSignupComponent},
  /*{ path: "activate/:code", component: ActivateComponent, 
    resolve:{
      activationResult: ActivationResolverService
    }
  },*/
  { path: "**", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
