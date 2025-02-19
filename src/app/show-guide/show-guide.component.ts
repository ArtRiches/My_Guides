import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { Guide } from 'app/interfaces/guide';
import { GuideService } from 'app/services/guide.service';
import { UserRepository } from 'app/repo/user.repo';



@Component({
  selector: 'app-show-guide',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './show-guide.component.html',
  styleUrl: './show-guide.component.scss',
})


export class GuideItemDivComponent {
  guideList?: Guide[];
  userGuides?: Guide[];
  userFavoriteGuides?: Guide[];

  @Input() whatList?: string;
  constructor(private guideService: GuideService, private userRepo: UserRepository) {}

  ngOnInit(): void {
    this.guideService.getGuides().subscribe(
      (response: Guide[]) => {
        this.guideList = response;
      }
    )
    this.userFavoriteGuides = [];
    this.userGuides = [];
  }

}
