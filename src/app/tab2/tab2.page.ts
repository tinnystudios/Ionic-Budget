import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TestpagePage } from '../testpage/testpage.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private router: Router) {

  }
  onTest(){

    let navigationExtras: NavigationExtras = {
      state: {
        testData: 5
      }
    };

    this.router.navigateByUrl('/tabs/tab2/testpage', navigationExtras);
  }
}
