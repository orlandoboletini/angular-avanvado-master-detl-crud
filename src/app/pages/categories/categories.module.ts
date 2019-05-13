import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriyListComponent } from './categoriy-list/categoriy-list.component';
import { CategoriyFormComponent } from './categoriy-form/categoriy-form.component';

@NgModule({
  declarations: [CategoriyListComponent, CategoriyFormComponent],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
