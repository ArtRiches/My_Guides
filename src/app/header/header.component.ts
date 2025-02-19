import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import { JWTRepository } from 'app/repo/jwt.repo';
import { UserRepository } from 'app/repo/user.repo';

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
  adminName = 'admin';

  constructor(
    private router: Router,
    private jwtRepo: JWTRepository,
    private userRepo: UserRepository
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userRepo.isAuth().subscribe(() => {
        if(this.userRepo.getUser()) {
          this.userName = this.userRepo.getUser()?.split('@')[0]
        }
      })
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  routeToMyPage(): void {
    this.router.navigate(['/',this.userName]);
  }

  logOut(): void {
    this.jwtRepo.clear();
    this.userRepo.clear();
    this.userName = undefined;
    this.router.navigate(['/logout']);
  }
}
