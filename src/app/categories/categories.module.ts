import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//De MaterialDesing
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

//Del Proyecto
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesContainer } from './containers/categories/categories.container';
import { CategoriesComponent } from './categories.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component'


@NgModule({
  declarations: [    
    CategoriesComponent,
    CategoriesContainer,
    CategoriesListComponent,
    CategoryDeleteComponent,
    CategoryFormComponent,
    CategoryDetailComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    MatAutocompleteModule,
  ]
})
export class CategoriesModule { }
