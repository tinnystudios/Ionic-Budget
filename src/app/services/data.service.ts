import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExpenseModel, BudgetModel } from '../app.module';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    apiUrl = "https://fountainless-butterfly-1908.dataplicity.io/";
    constructor(private http: HttpClient, private datePipe: DatePipe) {
console.log(this.http , "htt[p")
    }


    getHealth(): Observable<HealthResponse> {
        return this.http.get<HealthResponse>(`${this.apiUrl}GetHealth.php`);
    }

    getBudgets(): Observable<BudgetModel[]>  {
        return this.http.get<BudgetModel[]>(`${this.apiUrl}GetBudgets.php`);
    }

    getExpenses(): Observable<ExpenseModel[]>  {
        return this.http.get<ExpenseModel[]>(`${this.apiUrl}GetExpenses.php`);
    }

  postExpense(data : ExpenseModel) : Observable<any>{
    data.purchaseDate = this.formatDate();

    const headersOption = new HttpHeaders();
    headersOption.append("Accept", 'application/json');
    //headersOption.append('Content-Type', 'application/json' )
    headersOption.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
 
    return this.http.post("https://fountainless-butterfly-1908.dataplicity.io/AddExpenses2.php", data, {headers:headersOption, responseType: "text"});    

    /*
    .subscribe(data => {
      console.log(data);
     }, error => {
      console.log(error);
    })
    }
    */
  }

  formatDate(date= new Date()) {
    //2020-01-29T21:59:03.622502
    return this.datePipe.transform(date,'yyyy-MM-ddThh:mm:ss' );
    //return this.datePipe.transform(date,'MM-dd-yyyy hh-mm-ss' );
  }

  formatJustDate(date= new Date()) {
    return this.datePipe.transform(date,'dd-MM-yy' );
  }
}


export class HealthResponse {
    public status: string;
}

export class BudgetsResponse {
    public budgets: BudgetModel[];
}


