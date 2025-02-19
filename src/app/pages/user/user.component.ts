import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { GuideItemDivComponent } from 'app/show-guide/show-guide.component';
import { Guide } from 'app/interfaces/guide';
import { UserService } from 'app/services/user.service';
import { UserRepository } from 'app/repo/user.repo';
import { GuideService } from 'app/services/guide.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    GuideItemDivComponent,
    GuideItemDivComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserPageComponent {
  subscription = new Subscription();
  userGuides?: Guide[];
  userFavoriteGuides?: Guide[];

  constructor(
    private userRepo: UserRepository,
    private guideService: GuideService
  ) {}

  // Вызвать данные о пользователе
  ngOnInit(): void {
    this.userFavoriteGuides = [];
    this.userGuides = [];
    // if (this.userRepo.getUser() && this.userRepo.getUser()?.id) {
    //   this.guideService.getGuidesByUserId(this.userRepo.getUser()!.id).subscribe((response: Guide[]) => {
    //     if (response) {
    //       this.userGuides = response;
    //     } else {
    //       this.userGuides = [];
    //     }
    //   });
    // }
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
