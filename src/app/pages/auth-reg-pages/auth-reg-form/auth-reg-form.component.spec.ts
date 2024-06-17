import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegFormComponent } from './auth-reg-form.component';

describe('AuthRegFormComponent', () => {
  let component: AuthRegFormComponent;
  let fixture: ComponentFixture<AuthRegFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRegFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthRegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
