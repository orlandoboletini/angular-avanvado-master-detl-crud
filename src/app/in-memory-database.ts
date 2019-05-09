import {InMemoryDbService} from "angular-in-memory-web-api";
import {Category} from "./pages/categories/shared/category-model";

export class InMemoryDatabase implements InMemoryDbService {

    createDb(){
        const categories:Category[] =  [
            {id: 1,name: "Lazer", description: "Ciname, Park,etc"},
            {id: 2,name: "Moradia", description: "Pagamento de Conta da Casa"},
            {id: 3,name: "Saúde", description: "Pagamento do Plano se Saúde"},
            {id: 4,name: "Salario", description: "Recibo de Salário"},
            {id: 5,name: "Freelance", description: "Comissão"}
        ];

        return {categories}
    }
}