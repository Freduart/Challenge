import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsComponent } from './brands.component';
import { BrandsContainer } from './containers/brands/brands.container';
import { BrandsListComponent } from './components/brands-list/brands-list.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandFormComponent } from './components/brand-form/brand-form.component';

@NgModule({
  declarations: [
    BrandsComponent,
    BrandsContainer,
    BrandsListComponent,    
    BrandDetailComponent,
    BrandDeleteComponent,
    BrandFormComponent,    
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
    BrandsRoutingModule,
    MatAutocompleteModule,
  ]
})
export class BrandsModule { }
