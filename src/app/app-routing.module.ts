import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';

const routes: Routes = [
  { path: "", component: ProductListComponent},
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
