import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { BudgetModel, ExpenseModel } from '../app.module';
import { Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getLocaleDateTimeFormat } from '@angular/common';
import { IonDatetime } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.page.html',
  styleUrls: ['./testpage.page.scss'],
})
export class TestpagePage implements OnInit {
  @ViewChild('inputName',{static: false}) inputName: ElementRef;
  @ViewChild('inputCost', {static: false}) inputCost: ElementRef;
  budget:BudgetModel;
  
  spent: any;
  remaining: any;
  endDate : string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, public data: DataService) 
  { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.budget = this.router.getCurrentNavigation().extras.state.budget;
      }
    });
  }

  ngOnInit() {

    if(this.budget == null)
    {
        console.log("boot");
        this.router.navigateByUrl('', { replaceUrl: true });
    }

    let sum = 0;
    for (let expense of this.budget.expenses) {
      sum += Number(expense.cost);
     }
    console.log(sum);
    this.spent = sum;

    this.remaining = Number(this.budget.amount) - Number(this.spent);

    this.endDate = this.data.formatJustDate(this.budget.endDate);
  }

  onNewExpense()
  {

    let navigationExtras: NavigationExtras = {
      state: {
        budget: this.budget
      }
    };

    this.router.navigateByUrl('/tabs/tab1/add-expense', navigationExtras);
  }
}
