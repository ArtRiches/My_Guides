import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { Guide } from 'app/interfaces/guides';
import { GuideService } from 'app/guide.service';
import { AuthRepository } from 'app/stores/user-repository';
import { GuideComponent } from 'app/pages/home/home.component';

@Component({
  selector: 'app-guide-item-div',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatIconModule, CommonModule, GuideComponent],
  templateUrl: './guide-item-div.component.html',
  styleUrl: './guide-item-div.component.scss',
})


export class GuideItemDivComponent {
  guideList: Guide[] = [];

  subscription = new Subscription();
  userFavoriteGuides?: Guide[];
  userGuides?: Guide[];

  @Input() whatList?: string;
  constructor(private guideService: GuideService, private authRepository: AuthRepository) {
    this.guideList = this.guideService.getAllGuides();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authRepository.user$.subscribe((user) => {
        this.userFavoriteGuides = user?.id.favoriteGuides;
        this.userGuides = user?.id.userGuides;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
