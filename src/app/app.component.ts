import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { GuideService } from './services/guide.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterModule,
    HeaderComponent
  ],
  providers: [GuideService, UserService, AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'My Guides';

}
