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
  selectedUrl: any;

  icons: string[] = [
    "https://img.icons8.com/color/48/000000/brief.png",
    "https://img.icons8.com/pastel-glyph/64/000000/cat--v1.png",
    "https://img.icons8.com/cute-clipart/64/000000/cat.png",
    "https://img.icons8.com/bubbles/50/000000/cat.png",
    "https://img.icons8.com/cotton/64/000000/cat--v3.png",
    "https://img.icons8.com/cotton/64/000000/cat--v1.png",
    "https://img.icons8.com/dusk/64/000000/theme-park.png",
    "https://img.icons8.com/dusk/64/000000/restaurant.png",
    "https://img.icons8.com/cute-clipart/64/000000/shopping-cart-loaded.png",
    "https://img.icons8.com/cute-clipart/50/000000/cat.png",
    "https://img.icons8.com/officel/64/000000/train.png",
  ];

  constructor(public data: DataService, private route: ActivatedRoute, private router: Router, private navCtrl: NavController, public loadingController: LoadingController) 
  { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        //this.budgets = this.router.getCurrentNavigation().extras.state.budgets;
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
      budgetModel.iconUrl = this.selectedUrl != null ? this.selectedUrl : "https://img.icons8.com/ultraviolet/48/000000/new.png";

      const loader = await this.loadingController.create({message: "Posting Budget"});
      loader.present();

      this.data.postBudget(budgetModel).subscribe(y => 
      {
        loader.dismiss();
        this.posting = false;
        this.navCtrl.back();
      })
  }

  onUrlSelected(url: any)
  {
    this.selectedUrl = url;
  }
}
