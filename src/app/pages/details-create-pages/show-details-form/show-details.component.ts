import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Guide } from 'app/interfaces/guide';
import { GuideService } from 'app/services/guide.service';
import { UserRepository } from 'app/repo/user.repo';
import { GuidePageComponent } from 'app/pages/details-create-pages/guide-details/guide-details.component';
import { UserService } from 'app/services/user.service';
import { User } from 'app/interfaces/user';

@Component({
  selector: 'app-guide-details',
  standalone: true,
  imports: [GuidePageComponent],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.scss',
})
export class GuideDetailsComponent {
  userName?: string;
  guide?: Guide;
  guideId = 0;
  photoId = 0;
  photoList: { id: number; guideId: number; path: string }[] = [];
  userFavoriteGuides?: Guide[];
  isFavorite: boolean = false;

  constructor(
    private guideService: GuideService,
    private route: ActivatedRoute,
    private userRepo: UserRepository,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    
    if (Number(this.route.snapshot.params['id'])) {
      this.guideId = Number(this.route.snapshot.params['id']);
      this.guideService
        .getGuideById(this.guideId)
        .subscribe((response: Guide) => {
          this.guide = response;
          if (this.guide) {
            this.photoList = this.guide.photos;
          } 
        });
    }

    this.userName = this.userRepo.getUser()?.split('@')[0];
    this.userFavoriteGuides = [];

    this.userFavoriteGuides?.forEach((guide) => {
      if (guide.id == this.guideId) {
        this.isFavorite = true;
        return;
      }
    });
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
      this.userFavoriteGuides?.indexOf(this.guide), 1);
    }
    // Вызвать данные о пользователе
    const USER: User = {
      email: this.userRepo.getUser() || '',
      favoriteGuides: this.userFavoriteGuides || [],
      userGuides: [],
      role: "ROLE_USER"
    };
    this.userService.updateUser(USER).subscribe();
    
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
