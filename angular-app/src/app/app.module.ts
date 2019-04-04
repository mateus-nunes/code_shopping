import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { CategoryListComponent } from './components/pages/category/category-list/category-list.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AlertErrorComponent } from './components/bootstrap/alert-error/alert-error.component';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { CategoryNewModalComponent } from './components/pages/category/category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from './components/pages/category/category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from './components/pages/category/category-delete-modal/category-delete-modal.component';
import { NgxPaginationModule } from "ngx-pagination";
import { ProductDeleteModalComponent } from './components/pages/product/product-delete-modal/product-delete-modal.component';
import { ProductEditModalComponent } from './components/pages/product/product-edit-modal/product-edit-modal.component';
import { ProductListComponent } from './components/pages/product/product-list/product-list.component';
import { ProductNewModalComponent } from './components/pages/product/product-new-modal/product-new-modal.component';
import { MoneyFormatBrPipe } from './pipes/money-format-br.pipe';
import { ProductCategoryListComponent } from "./components/pages/product-category/product-category-list/product-category-list.component";
import { ProductCategoryNewComponent } from './components/pages/product-category/product-category-new/product-category-new.component';
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";
import {AuthService} from "./services/auth.service";
import { NavbarComponent } from './components/bootstrap/navbar/navbar.component';
import { UserListComponent } from './components/pages/user/user-list/user-list.component';
import { UserDeleteModalComponent } from './components/pages/user/user-delete-modal/user-delete-modal.component';
import { UserEditModalComponent } from './components/pages/user/user-edit-modal/user-edit-modal.component';
import { UserNewModalComponent } from './components/pages/user/user-new-modal/user-new-modal.component';
import {RefreshTokenInterceptorService} from "./services/refresh-token-interceptor.service";
import {AppRoutingModule} from "./app-routing.module";
import { SortCollumnComponent } from './components/common/sort-collumn/sort-collumn.component';
import { CategorySearchFormComponent } from './components/pages/category/category-search-form/category-search-form.component';
import { CategoryFormComponent } from './components/pages/category/category-form/category-form.component';
import { FieldErrorComponent } from './components/bootstrap/field-error/field-error.component';
import {IsInvalidControlDirective, IsInvalidDirective} from './directives/is-invalid.directive';
import { ListErrorComponent } from './components/bootstrap/list-error/list-error.component';
import { CardErrorComponent } from './components/bootstrap/card-error/card-error.component';
import { ProductFormComponent } from './components/pages/product/product-form/product-form.component';
import { ProductCategoryDeleteModalComponent } from './components/pages/product-category/product-category-delete-modal/product-category-delete-modal.component';
import { UserFormComponent } from './components/pages/user/user-form/user-form.component';
import { ProductInputFormComponent } from './components/pages/product-input/product-input-form/product-input-form.component';
import { ProductInputListComponent } from './components/pages/product-input/product-input-list/product-input-list.component';
import { ProductInputNewModalComponent } from './components/pages/product-input/product-input-new-modal/product-input-new-modal.component';
import { ProductInputSearchFormComponent } from './components/pages/product-input/product-input-search-form/product-input-search-form.component';
import {ProductSearchFormComponent} from "./components/pages/product/product-search-form/product-search-form.component";
import {UserSearchFormComponent} from "./components/pages/user/user-search-form/user-search-form.component";
import {Select2Module} from "ng2-select2";
import { ProductOutputListComponent } from './components/pages/product-output/product-output-list/product-output-list.component';
import { ProductOutputNewModalComponent } from './components/pages/product-output/product-output-new-modal/product-output-new-modal.component';
import { ProductOutputFormComponent } from './components/pages/product-output/product-output-form/product-output-form.component';
import { ProductOutputSearchFormComponent } from './components/pages/product-output/product-output-search-form/product-output-search-form.component';

function jwtFactory(authService: AuthService){
  return {
    whitelistedDomains: [
      new RegExp('localhost:8000/*')
    ],
    tokenGetter: () => {
      return authService.getToken();
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoryListComponent,
    AlertErrorComponent,
    ModalComponent,
    CategoryNewModalComponent,
    CategoryEditModalComponent,
    CategoryDeleteModalComponent,
    ProductCategoryListComponent,
    ProductDeleteModalComponent,
    ProductEditModalComponent,
    ProductListComponent,
    ProductNewModalComponent,
    MoneyFormatBrPipe,
    ProductCategoryNewComponent,
    NavbarComponent,
    UserListComponent,
    UserDeleteModalComponent,
    UserEditModalComponent,
    UserNewModalComponent,
    SortCollumnComponent,
    CategorySearchFormComponent,
    CategoryFormComponent,
    FieldErrorComponent,
    IsInvalidDirective,
    IsInvalidControlDirective,
    ListErrorComponent,
    CardErrorComponent,
    ProductFormComponent,
    ProductCategoryDeleteModalComponent,
    UserFormComponent,
    UserSearchFormComponent,
    ProductSearchFormComponent,
    ProductInputFormComponent,
    ProductInputListComponent,
    ProductInputNewModalComponent,
    ProductInputSearchFormComponent,
    ProductOutputListComponent,
    ProductOutputNewModalComponent,
    ProductOutputFormComponent,
    ProductOutputSearchFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Select2Module,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthService]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
