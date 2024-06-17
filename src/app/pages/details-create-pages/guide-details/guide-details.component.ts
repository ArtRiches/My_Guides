import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Guide } from 'app/interfaces/guides';
import { GuideService } from 'app/guide.service';
import { AuthRepository } from 'app/stores/user-repository';
import { GuidePageComponent } from 'app/pages/details-create-pages/details-create-form/details-create-form.component';

@Component({
  selector: 'app-guide-details',
  standalone: true,
  imports: [GuidePageComponent],
  templateUrl: './guide-details.component.html',
  styleUrl: './guide-details.component.scss',
})
export class GuideDetailsComponent {
  subscription = new Subscription();
  userName?: string;
  guide?: Guide;
  guideId = 0;
  photoId = 0;
  photoList: string[] = [];
  userFavoriteGuides?: Guide[];
  isFavorite: boolean = false;

  constructor(
    private guideService: GuideService,
    private route: ActivatedRoute,
    private authRepository: AuthRepository
  ) {
    this.guideId = Number(this.route.snapshot.params['id']);
    this.guide = this.guideService.getGuideById(this.guideId);
    if (this.guide == null) {
      return;
    }
    this.photoList = this.guide?.photo;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authRepository.user$.subscribe((user) => {
        this.userName = user?.id.email.split('@')[0];
        this.userFavoriteGuides = user?.id.favoriteGuides;
      })
    );

    this.userFavoriteGuides?.forEach((guide) => {
      if (this.guide == null) {
        return;
      }
      if (guide.name.indexOf(this.guide.name) != -1) {
        this.isFavorite = true;
        return;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleFavorite() {
    if (this.guide == null) {
      return;
    }
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.userFavoriteGuides?.push(this.guide);
    } else {
      this.userFavoriteGuides?.splice(
        this.userFavoriteGuides?.indexOf(this.guide),
        1
      );
    }
  }

  nextPhoto() {
    this.photoId = (this.photoId + 1) % this.photoList.length;
  }

  prevPhoto() {
    if (this.photoId === 0) {
      this.photoId = this.photoList.length - 1;
    } else {
      this.photoId = this.photoId - 1;
    }
  }
}
