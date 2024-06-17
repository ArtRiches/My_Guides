import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import { AuthRepository } from '../stores/user-repository';
import { UsersList } from '../interfaces/users';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  subscription = new Subscription();
  userName?: string;
  adminName = UsersList[0].email.split('@')[0];

  constructor(private router: Router, private authRepository: AuthRepository) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authRepository.user$.subscribe((user) => {
        this.userName = user?.id.email.split('@')[0];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  routeToMyPage(): void {
    this.router.navigate(['/user-page']);
  }

  logOut(): void {
    this.userName = '';
    this.router.navigate(['/']);
  }
}
