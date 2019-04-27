import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/pages/login/login.component";
import {GuestGuard} from "./guards/guest.guard";
import {UserListComponent} from "./components/pages/user/user-list/user-list.component";
import {CategoryListComponent} from "./components/pages/category/category-list/category-list.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProductListComponent} from "./components/pages/product/product-list/product-list.component";
import {ProductCategoryListComponent} from "./components/pages/product-category/product-category-list/product-category-list.component";
import {ProductInputListComponent} from "./components/pages/product-input/product-input-list/product-input-list.component";
import {ProductOutputListComponent} from "./components/pages/product-output/product-output-list/product-output-list.component";
import {ProductPhotoManagerComponent} from "./components/pages/product-photo-manager/product-photo-manager/product-photo-manager.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'users/list',
    component: UserListComponent ,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories/list',
    component: CategoryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/list',
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/:productId/categories/list',
    component: ProductCategoryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/:productId/photos/manager',
    component: ProductPhotoManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inputs/list',
    component: ProductInputListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'outputs/list',
    component: ProductOutputListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  providers:[
    AuthGuard,
    GuestGuard
  ]
})
export class AppRoutingModule { }
