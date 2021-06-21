import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesContainer } from './containers/categories/categories.container';


//Agregamos la ruta para las categorias y que tenga como hijo el contenedor de este mismo
const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {
        path:'',
        component: CategoriesContainer,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
