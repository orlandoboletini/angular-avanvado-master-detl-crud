import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Category } from "../shared/category-model";
import { CategoryService } from "../shared/category.service";

import { switchMap } from "rxjs/operators";
import toastr from "toastr";

@Component({
  selector: 'app-categoriy-form',
  templateUrl: './categoriy-form.component.html',
  styleUrls: ['./categoriy-form.component.css']
})

export class CategoriyFormComponent implements OnInit {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[]=null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder 
  ) { }

  ngOnInit() {

    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();

  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if(this.currentAction == "new"){
      this.createCategory();
    }
    else {
      this.updateCategory();
    }
  }

  private createCategory(){
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category).subscribe(category => this.actionsForSussess(category),   
                                                    error => this.actionsForErro(error));
  }

  private actionsForSussess(category: Category){
    toastr.success("Processado com Sucesso")
    this.router.navigateByUrl("categories", {skipLocationChange: true}).then(
      () => this.router.navigate(['categories', category.id, 'edit'])
    );
    
  }

  private actionsForErro(error){
    toastr.error("Erro ao processar a solicitação")

    this.submittingForm = false;

    if(error.status == 422){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }
    else {
      this.serverErrorMessages = ['Falha na comunição']
    }
  }

  private updateCategory(){
    const category: Category = Object.assign(new Category(), this.categoryForm.value);  
    this.categoryService.update(category).subscribe(category => this.actionsForSussess(category),   
                                                    error => this.actionsForErro(error));
  }

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new"){
      this.currentAction = "new";
    }
    else {
      this.currentAction = "edit";
    }
  }

  private buildCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getByID(+params.get("id")))
      ).subscribe(
        (category) => {
          this.category = category
          this.categoryForm.patchValue(this.category) //BINDS category load view
        }, (error) => alert('Erro no Servidor')
      )
    }
  }

  private setPageTitle() {
    if(this.currentAction == "new"){
      this.pageTitle = 'Cadastro de Nova Categoria'
    }
    else {
      const categoryName = this.category.name || ""
      this.pageTitle = 'Editando Categoria: ' + categoryName
    }
  }
}
