import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { GuideComponent } from './pages/home/home.component'
import { HeaderComponent } from './header/header.component';
import { GuideItemDivComponent } from './guide-item-div/guide-item-div.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterModule,
    GuideComponent,
    HeaderComponent,
    GuideItemDivComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'My Guides';

}
