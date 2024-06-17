import { Injectable } from '@angular/core';

import { Guide } from './interfaces/guides';

@Injectable({
  providedIn: 'root',
})
export class GuideService {
  protected guideList: Guide[] = [
    {
      id: 0,
      name: 'Fushimi Inari Taisha Sembon Torii (Thousand Torii Gates)',
      city: 'Kyoto',
      country: 'Japan',
      photo: [
        'assets/photos/Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine,_Kyoto,_Japan.jpg',
        'assets/photos/image-2.jpg',
        'assets/photos/image-3.jpg',
        'assets/photos/image-4.jpg',
      ],
      fee: false,
      inside: true,
      transports: ['subway'],
      howText:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium earum suscipit aperiam odio voluptatibus aliquam numquam accusantium temporibus dolore libero velit debitis eligendi ab soluta fugit corrupti eum, pariatur modi.           Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium earum suscipit aperiam odio voluptatibus aliquam numquam accusantium temporibus dolore libero velit debitis eligendi ab soluta fugit corrupti eum, pariatur modi.',
      descriptionText:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium earum suscipit aperiam odio voluptatibus aliquam numquam accusantium temporibus dolore libero velit debitis eligendi ab soluta fugit corrupti eum, pariatur modi.',
      lat: 34.96720814823946,
      lng: 135.77415633483966,
    },
    {
      id: 1,
      name: 'Tokyo Tower',
      city: 'Tokyo',
      country: 'Japan',
      photo: ['assets/photos/tokyo2260-13.jpg'],
      fee: false,
      inside: true,
      transports: ['subway'],
      howText:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium earum suscipit aperiam odio voluptatibus aliquam numquam accusantium temporibus dolore libero velit debitis eligendi ab soluta fugit corrupti eum, pariatur modi.',
      descriptionText:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium earum suscipit aperiam odio voluptatibus aliquam numquam accusantium temporibus dolore libero velit debitis eligendi ab soluta fugit corrupti eum, pariatur modi.',
      lat: 35.65876353431419,
      lng: 139.74543289690558,
    },
    {
      id: 2,
      name: 'Sapporo Underground Pedestrian Space',
      city: 'Sapporo',
      country: 'Japan',
      photo: ['assets/photos/caption.jpg'],
      fee: false,
      inside: true,
      transports: ['subway'],
      howText:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium earum suscipit aperiam odio voluptatibus aliquam numquam accusantium temporibus dolore libero velit debitis eligendi ab soluta fugit corrupti eum, pariatur modi.',
      descriptionText:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium earum suscipit aperiam odio voluptatibus aliquam numquam accusantium temporibus dolore libero velit debitis eligendi ab soluta fugit corrupti eum, pariatur modi.',
      lat: 43.06357270966457,
      lng: 141.35139719716602,
    },
  ];

  getAllGuides(): Guide[] {
    return this.guideList;
  }

  getGuideById(id: number): Guide | undefined {
    return this.guideList.find((guide) => guide.id === id);
  }
}
