import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Guide } from 'app/interfaces/guides';
import { GuideService } from 'app/guide.service';
import { GuidePageComponent } from 'app/pages/details-create-pages/details-create-form/details-create-form.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-guide',
  standalone: true,
  imports: [GuidePageComponent],
  templateUrl: './create-guide.component.html',
  styleUrl: './create-guide.component.scss',
})
export class CreateGuideComponent {
  seeResult: boolean = true;
  btnHide: boolean = false;
  transports: string[] = [];
  guideList: Guide[] = [];
  nameForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  uploadPhotoForm = new FormGroup({
    photo: new FormControl(''),
  });
  infoForm = new FormGroup({
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    fee: new FormControl('', Validators.required),
    inside: new FormControl('', Validators.required),
    latitude: new FormControl('', [Validators.min(-90), Validators.max(90)]),
    longitude: new FormControl('', [Validators.min(-180), Validators.max(180)]),
  });
  areatextForm = new FormGroup({
    How: new FormControl(''),
    About: new FormControl('', Validators.required),
  });
  newGuide: Guide = {
    id: 0,
    name: '',
    city: '',
    country: '',
    photo: [''],
    fee: false,
    inside: false,
    transports: [''],
    howText: '',
    descriptionText: '',
    lat: 0,
    lng: 0,
  };
  photoList: string[] = this.newGuide.photo;
  photoId = 0;

  constructor(private guideService: GuideService, private router: Router) {
    this.guideList = this.guideService.getAllGuides();
    this.newGuide.id = this.guideList.length;
  }

  latSubscription = new Subscription();
  lngSubscription = new Subscription();
  latErrorText: string = '';
  lngErrorText: string = '';

  ngOnInit(): void {
    this.latSubscription.add(
      this.infoForm.controls.latitude.valueChanges.subscribe(() => {
        if(this.infoForm.controls.latitude.hasError('max')) {
          this.latErrorText = 'The value should be between -90 and 90';
        }
      })
    );
    this.lngSubscription.add(
      this.infoForm.controls.longitude.valueChanges.subscribe(() => {
        if(this.infoForm.controls.longitude.hasError('max')) {
          this.lngErrorText = 'The value should be between -180 and 180';
        }
      })
    );
  }

  toggleTransport(event: Event) {
    const transport: string = (event.target as HTMLInputElement).value;
    if (!this.transports.includes(transport)) {
      if (this.transports[0] == '') {
        this.transports[0] = transport;
      } else {
        this.transports.push(transport);
      }
    }
  }

  changeClick() {
    this.seeResult = false;
    this.btnHide = true;
    if (this.photoList.length > 0 && this.photoList[0] != '') {
      this.photoList[this.photoId + 1] = '';
    }
  }

  applyClick() {
    this.seeResult = true;

    if (this.nameForm.controls.name.value) {
      this.newGuide.name = this.nameForm.controls.name.value;
    }

    if (this.photoList[this.photoList.length - 1] === '') {
      this.photoList.splice(this.photoList.length - 1, 1);
      if (this.photoId != 0) {
        this.photoId = this.photoList.length - 1;
      }
    }

    if (
      this.infoForm.controls.city.value &&
      this.infoForm.controls.country.value
    ) {
      this.newGuide.city = this.infoForm.controls.city.value;
      this.newGuide.country = this.infoForm.controls.country.value;
    }

    if (this.infoForm.controls.fee.value) {
      this.newGuide.fee = this.infoForm.controls.fee.value === 'true';
    }

    if (this.infoForm.controls.inside.value) {
      this.newGuide.inside = this.infoForm.controls.inside.value === 'true';
    }

    if (this.transports) {
      this.newGuide.transports = this.transports;
    }

    if (
      this.infoForm.controls.latitude.value &&
      this.infoForm.controls.longitude.value
    ) {
      this.newGuide.lat = +this.infoForm.controls.latitude.value;
      this.newGuide.lng = +this.infoForm.controls.longitude.value;
    }

    if (this.areatextForm.controls.How.value) {
      this.newGuide.howText = this.areatextForm.controls.How.value;
    }

    if (this.areatextForm.controls.About.value) {
      this.newGuide.descriptionText = this.areatextForm.controls.About.value;
    }
  }

  createClick() {
    if (this.newGuide.name == '') {
    } else {
      if (this.newGuide.photo[0] == '') {
      } else {
        this.newGuide.photo = this.photoList;
        this.guideList.push(this.newGuide);
        this.router.navigate(['/details', this.newGuide.id]);
      }
    }
  }

  uploadPhoto(event: Event) {
    const file: string = (event.target as HTMLInputElement).files![0].name;
    this.photoList[this.photoId] = 'assets/photos/' + file;
    this.photoList.push('');
  }

  deletePhoto() {
    this.photoList.splice(this.photoId, 1);
    if (this.photoId == 0 && this.photoList.length == 0) {
      this.photoId = 0;
    } else {
      if (this.photoId === this.photoList.length) {
        this.photoId = this.photoList.length - 1;
      }
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

  addExtraSpace() {}
}
