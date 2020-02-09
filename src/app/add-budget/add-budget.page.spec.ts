import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBudgetPage } from './add-budget.page';

describe('AddBudgetPage', () => {
  let component: AddBudgetPage;
  let fixture: ComponentFixture<AddBudgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBudgetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
