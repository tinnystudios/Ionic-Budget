import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { BudgetModel } from '../app.module';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.page.html',
  styleUrls: ['./add-budget.page.scss'],
})
export class AddBudgetPage implements OnInit {

  @ViewChild('inputName',{static: false}) inputName: ElementRef;
  @ViewChild('inputAmount',{static: false}) inputAmount: ElementRef;
  @ViewChild('inputStartDate',{static: false}) inputStartDate: ElementRef;
  @ViewChild('inputEndDate',{static: false}) inputEndDate: ElementRef;
  @ViewChild('inputRepeatType',{static: false}) inputRepeatType: ElementRef;
  posting: boolean;
  budgets: BudgetModel[];

  constructor(public data: DataService, private route: ActivatedRoute, private router: Router, private navCtrl: NavController, public loadingController: LoadingController) 
  { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.budgets = this.router.getCurrentNavigation().extras.state.budgets;
      }
    });
  }

  ngOnInit() {

  }

  async onSubmit()
  {
      if(this.posting)
        return;

      this.posting = true;

      var budgetModel = new BudgetModel();
      budgetModel.name = this.inputName['value'];
      budgetModel.amount = this.inputAmount['value'];
      
      budgetModel.startDate = this.inputStartDate['value'] + "T00:00:00";
      budgetModel.endDate = this.inputEndDate['value'] + "T00:00:00";

      budgetModel.repeatType = this.inputRepeatType['value'];
      budgetModel.iconUrl = "https://img.icons8.com/ultraviolet/48/000000/new.png"

      const loader = await this.loadingController.create({message: "Posting Budget"});
      loader.present();

      this.data.postBudget(budgetModel).subscribe(y => 
      {
        loader.dismiss();
        this.posting = false;
        this.navCtrl.back();
        /*
          this.data.getBudgets().subscribe(x => 
            {
              this.budgets = x;
              loader.dismiss();
              this.posting = false;
              this.navCtrl.back();
            });
            */
      })
  }
}
