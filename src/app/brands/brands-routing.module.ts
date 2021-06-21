import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './brands.component';
import { BrandsContainer } from './containers/brands/brands.container';

const routes: Routes = [
  {
    path: '',
    component: BrandsComponent,
    children: [
      {
        path:'',
        component: BrandsContainer,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
