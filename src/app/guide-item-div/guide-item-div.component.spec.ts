import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideItemDivComponent } from './guide-item-div.component';

describe('GuideItemDivComponent', () => {
  let component: GuideItemDivComponent;
  let fixture: ComponentFixture<GuideItemDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideItemDivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuideItemDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
