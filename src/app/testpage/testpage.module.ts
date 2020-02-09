import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestpagePageRoutingModule } from './testpage-routing.module';

import { TestpagePage } from './testpage.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    TestpagePageRoutingModule,
  ],
  declarations: [TestpagePage]
})
export class TestpagePageModule {}
