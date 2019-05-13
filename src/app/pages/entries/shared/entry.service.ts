import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { flatMap } from "rxjs/operators";
import { Entry } from "./entry-model";
import { CategoryService } from "../../categories/shared/category.service";

import { BaseResourceService } from "../../../shared/models/base-resource.service";

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{
  
  constructor( 
    protected injector: Injector,
    private categoryService: CategoryService) {
      super("api/entries", injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {

    return this.categoryService.getByID(entry.categoryId).pipe(
      flatMap( category => {
          entry.category = category;

          return super.create(entry)
        })
    )
  }

  update(entry: Entry): Observable<Entry> {

    return this.categoryService.getByID(entry.categoryId).pipe(
      flatMap( category => {
          entry.category = category;
         
          return super.update(entry)
      })
    )
  }
}
