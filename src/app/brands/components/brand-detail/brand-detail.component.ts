import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from '@core/models/brand.model';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public brand:Brand, 
    private dialogRef:MatDialogRef<BrandDetailComponent>
  ) { }

  ngOnInit(): void {
  }

  close():void{
    this.dialogRef.close();
  }
}
