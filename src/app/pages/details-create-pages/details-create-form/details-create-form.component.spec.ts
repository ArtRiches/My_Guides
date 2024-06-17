import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidePageComponent } from './details-create-form.component';

describe('GuidePageComponent', () => {
  let component: GuidePageComponent;
  let fixture: ComponentFixture<GuidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
