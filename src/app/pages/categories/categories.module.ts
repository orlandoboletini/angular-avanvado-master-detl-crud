import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriyListComponent } from './categoriy-list/categoriy-list.component';
import { CategoriyFormComponent } from './categoriy-form/categoriy-form.component';

@NgModule({
  declarations: [CategoriyListComponent, CategoriyFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
