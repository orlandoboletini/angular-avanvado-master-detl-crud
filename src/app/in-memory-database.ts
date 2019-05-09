import {InMemoryDbService} from "angular-in-memory-web-api";

export class InMemoryDatabase implements InMemoryDbService {

    createDb(){
        const categories =  [
            {id: 1,name: "Lazer", description: "Ciname, Park,etc"},
            {id: 1,name: "Moradia", description: "Pagamento de Conta da Casa"},
            {id: 1,name: "Saúde", description: "Pagamento do Plano se Saúde"},
            {id: 1,name: "Salario", description: "Recibo de Salário"},
            {id: 1,name: "Freelance", description: "Comissão"}
        ];

        return {categories}
    }
}