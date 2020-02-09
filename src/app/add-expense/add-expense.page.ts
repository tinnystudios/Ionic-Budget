import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ExpenseModel, BudgetModel } from '../app.module';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {

  @ViewChild('inputName',{static: false}) inputName: ElementRef;
  @ViewChild('inputCost', {static: false}) inputCost: ElementRef;
  budget:BudgetModel;
  posting:any;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router, private navCtrl: NavController, public loadingController: LoadingController) 
  { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.budget = this.router.getCurrentNavigation().extras.state.budget;
      }
    });
  }

  ngOnInit() {
    this.posting = false;
    if(this.budget == null)
    {
        console.log("boot");
        this.router.navigateByUrl('', { replaceUrl: true });
    }
  }

  async onSubmit()
  {
    if(this.posting)
      return;

    this.posting = true;
    const loader = await this.loadingController.create({message: "Posting expense"});
    loader.present();

    var data = new ExpenseModel();
    data.budgetId = this.budget.id;
    data.cost = this.inputCost['value'];
    data.name = this.inputName['value'];
    data.userId = 0;
    
      this.data.postExpense(data).subscribe(x => 
      {
        var id = this.budget.id;
        var expenses = this.data.getExpenses().subscribe(x => 
          {
              this.budget.expenses = x.filter(x => x['budgetId'] === id);
              loader.dismiss();
              this.navCtrl.back();
          });
      })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}
