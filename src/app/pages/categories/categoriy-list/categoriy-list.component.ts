import { Component, OnInit } from '@angular/core';
import { Category } from "../shared/category-model";
import { CategoryService } from "../shared/category.service";

@Component({
  selector: 'app-categoriy-list',
  templateUrl: './categoriy-list.component.html',
  styleUrls: ['./categoriy-list.component.css']
})
export class CategoriyListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories, error => alert('Erro ao carregar Lista')
    )
  }

  deleteCategory(category){
    const deletar = confirm('Deseja Realmente deletar?');

    if(deletar){
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        () => alert('Erro ao tentar excluir')
      )
    }
  }
}
