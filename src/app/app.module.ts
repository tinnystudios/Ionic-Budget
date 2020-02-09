import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    [DatePipe]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export class ExpenseModel
{
  public id: any;
  public name: any;
  public cost: any;
  public budgetId: any;
  public userId: any;
  public purchaseDate: any;

  constructor(){

  }
}

export class BudgetModel
{
  public id: any;
  public name: string;
  public amount: any;
  public repeatType: any;
  public endDate: any;
  public expenses: Array<ExpenseModel>;

  public iconUrl: string;

  public spent: any;

}