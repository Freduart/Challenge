import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Brand } from '@core/models/brand.model';
import { Result } from '@core/models/result.model';
import { BrandService } from '@core/services/brand/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.container.html',
  styleUrls: ['./brands.container.css']
})
export class BrandsContainer implements OnInit {
  result

  constructor(private matDialog:MatDialog, private brandService:BrandService) { }

  ngOnInit(): void {
    console.log("Brands Container Works!")
    this.getBrandPage(0);
  }

  getBrandPage(pageEvent:PageEvent | number):void{
    const number=(typeof pageEvent==='number'?pageEvent:pageEvent.pageIndex)+1;
    let pageSize=20;
    if(typeof pageEvent!=='number'){
      pageSize=pageEvent.pageSize;
    }
    // Al observable de serices le mandamos el numero de pagina y el tamaño de los items que queremos solicitar
    this.brandService.getBrands(number, pageSize).subscribe((result:Result<Brand>)=>{
      this.result=result;
    });
  }

  detailBrand(id:number):void{
    
  }

  updateBrand(id:number):void{

  }

  deleteBrand(brand:Brand):void{
    this.openConfirmation(brand);
  }

  openConfirmation(brand:Brand):void{    
  }

}
