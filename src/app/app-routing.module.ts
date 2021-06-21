import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [    
    {
        path:'products',
        loadChildren: ()=> import('./products/products.module').then(m=>m.ProductsModule),
    },
    {
        path:'brands',
        loadChildren: ()=> import('./brands/brands.module').then(m=>m.BrandsModule),
    },
    {
        path:'categories',
        loadChildren: ()=> import('./categories/categories.module').then(m=>m.CategoriesModule),
    }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
