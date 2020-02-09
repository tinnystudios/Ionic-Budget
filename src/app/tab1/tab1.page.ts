import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import {ExpenseModel, BudgetModel} from '../app.module'
import { TestpagePage } from '../testpage/testpage.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  Health: string;
  Budgets: BudgetModel[];
  Expenses: ExpenseModel[];

  constructor(private router : Router, private data: DataService){

  }

  ngOnInit(): void {
    this.getContext();

    this.data.getHealth().subscribe(x => {
      this.Health = x.status;
    });
  }

  getContext()
  {
    this.data.getBudgets().subscribe(x => {
      this.Budgets = x;

      this.data.getExpenses().subscribe(x => {
        this.Expenses = x;

        this.Budgets.forEach(budget => {
          budget.expenses = this.Expenses.filter(
            x => x['budgetId'] === budget['id']);
    

          let sum = 0;
          for (let expense of budget.expenses) {
            sum += Number(expense.cost);
          }

          budget.spent = sum;

        });
      });
    });
  }

  OnBudgetClicked(id : any)
  {
    var target = this.Budgets[id];
    console.log(target['name']);

    target.expenses = this.Expenses.filter(
    x => x['budgetId'] === target['id']);
    
    let navigationExtras: NavigationExtras = {
      state: {
        budget: target
      }
    };

    this.router.navigateByUrl('/tabs/tab1/testpage', navigationExtras);
  }

  ionViewWillEnter()
  {
    this.getContext();
  }

  onNewBudget()
  {
    this.router.navigateByUrl('/tabs/tab1/add-budget');
  }

}



