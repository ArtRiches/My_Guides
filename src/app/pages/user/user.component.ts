import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { GuideItemDivComponent } from 'app/guide-item-div/guide-item-div.component';
import { Guide } from 'app/interfaces/guides';
import { AuthRepository } from 'app/stores/user-repository';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [GuideItemDivComponent, GuideItemDivComponent, CommonModule,RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserPageComponent {
  subscription = new Subscription();
  userGuides?: Guide[];
  userFavoriteGuides?: Guide[];
  recomendedGuides?: Guide[];

  constructor(private router: Router, private authRepository: AuthRepository) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authRepository.user$.subscribe((user) => {
        if (user?.id.email == null) {
          this.router.navigate(['/']);
        } else {
          this.userGuides = user?.id.userGuides;
          this.userFavoriteGuides = user?.id.favoriteGuides;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
