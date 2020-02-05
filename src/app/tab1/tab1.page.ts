import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  Health: string;
  Expenses: ExpenseModel[];
  Budgets: BudgetModel[];

  constructor(public http: HttpClient){

    this.getHealth();
    this.getBudgets();
    this.getExpenses();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoaded');
  }

  getHealth(){
    this.http.get('https://fountainless-butterfly-1908.dataplicity.io/GetHealth.php')
    .subscribe((response) => {
      console.log(response);
      var healthResponse = response as HealthResponse;
      this.Health = healthResponse.Status;
    });
  }

  getBudgets()
  {
    this.http.get('https://fountainless-butterfly-1908.dataplicity.io/GetBudgets.php')
    .subscribe((response) => {
      console.log(response);
      var budgetsResponse = response as BudgetsResponse;
      this.Budgets = budgetsResponse.Budgets;
    });
  }

  getExpenses()
  {
   this.http.get('https://fountainless-butterfly-1908.dataplicity.io/GetExpenses.php', {responseType: 'text'})
   .subscribe((data) => {
    console.log(data);
    this.Expenses = JSON.parse(data);
    //console.log(this.Expenses[0]["name"]);
   });
  }
}

class HealthResponse
{
  public Status: string;
}

class BudgetsResponse
{
  public Budgets: Array<BudgetModel>;
}

class ExpensesReponse
{
  public Expenses: Array<ExpenseModel>;
}

class BudgetModel
{
  public Id: any;
  public Name: string;
  public Expenses: Array<ExpenseModel>;
}

class ExpenseModel
{
  public Id: any;
  public Name: any;
  public Cost: any;

  constructor(){

  }
}