import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '@core/models/category.model';
import { CategoryService } from '@core/services/category/category.service';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Result } from 'src/app/core/Models/result.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm! : FormGroup;
  categories : Category[] = [];
  filteredCategories: Observable<Category[]> = of<Category[]>([]);
  title="";

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public category : Category,
    private dialogRef: MatDialogRef<CategoryFormComponent, Category>
  ) {    }

  ngOnInit(): void {
    console.log("Category Form Works!");
    this.initForm(); 
    this.categoryService.getObjects().subscribe( (result : Result<Category>) => {
      this.categories = result.results;
    });
    this.filteredCategories = this.nameControl.valueChanges.pipe(
      /* Map operator Map operator takes an observable source as input. It applies a project function to each of the 
      values emitted by the source observable and transforms it into a new value. It then emits the new value to the subscribers. */
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this.filtrarCategorias(name, this.categories) : this.categories.slice()))
    );
    if(this.category){
      this.categoryForm.patchValue(this.category);
      //PatchValuemethod to replace any properties defined in the object that have changed in the form model.
    }
  }
  
  initForm(){
    // Inicializamos el form 
    this.categoryForm = this.formBuilder.group({
      id:[null],
      name: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(150)]],      
    });
  }
    
  onSubmit(): void {
    this.close(this.categoryForm.getRawValue());
  }
  
  close(category?: Category): void {
    this.dialogRef.close(category);
  }

  private filtrarCategorias(valor: string, categorias: Category[] ): Category[] {
    const valorLower = valor.toLowerCase();
    return categorias.filter((categoria) => (categoria.name.toLowerCase().includes(valorLower))
    );
  }get nameControl(): FormControl {
    return this.categoryForm.get('name') as FormControl;
  }
}