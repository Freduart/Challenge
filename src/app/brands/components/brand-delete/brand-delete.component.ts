import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from '@core/models/brand.model';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public brand:Brand,
  ) { }

  ngOnInit(): void {
  }

}
