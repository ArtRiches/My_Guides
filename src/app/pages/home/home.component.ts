import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';

import { GuideItemDivComponent } from 'app/show-guide/show-guide.component';


@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    GuideItemDivComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class GuideComponent {}
