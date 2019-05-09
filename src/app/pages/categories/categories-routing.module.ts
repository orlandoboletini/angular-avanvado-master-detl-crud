import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriyListComponent } from './categoriy-list/categoriy-list.component';
import { CategoriyFormComponent } from './categoriy-form/categoriy-form.component';

const routes: Routes = [
  {path: '', component: CategoriyListComponent},
  {path: 'new', component: CategoriyFormComponent},
  {path: ':id/edit', component: CategoriyFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
