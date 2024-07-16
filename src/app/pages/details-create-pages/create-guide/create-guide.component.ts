import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Guide } from 'app/interfaces/guides';
import { GuideService } from 'app/guide.service';
import { GuidePageComponent } from 'app/pages/details-create-pages/details-form/details-form.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-guide',
  standalone: true,
  imports: [GuidePageComponent, ReactiveFormsModule],
  templateUrl: './create-guide.component.html',
  styleUrl: './create-guide.component.scss',
})
export class CreateGuideComponent {
  seeResult: boolean = true;
  btnHide: boolean = false;
  transports: string[] = [];
  guideList: Guide[] = [];
  nameForm = new FormGroup({
    name: new FormControl<string | null>('', Validators.required),
  });
  uploadPhotoForm = new FormGroup({
    photo: new FormControl<string | null>('', Validators.required),
  });
  infoForm = new FormGroup({
    city: new FormControl<string | null>('', Validators.required),
    country: new FormControl<string | null>('', Validators.required),
    fee: new FormControl<boolean>(false, Validators.required),
    inside: new FormControl<boolean>(false, Validators.required),
    latitude: new FormControl<number | null>(0, [
      Validators.min(-90),
      Validators.max(90),
    ]),
    longitude: new FormControl<number | null>(0, [
      Validators.min(-180),
      Validators.max(180),
    ]),
    transport: new FormControl<string[] | null>([''], Validators.required),
  });
  areatextForm = new FormGroup({
    How: new FormControl<string | null>(''),
    About: new FormControl<string | null>('', Validators.required),
  });
  newGuide: Guide = {
    id: 0,
    name: '',
    city: '',
    country: '',
    photo: [''],
    fee: false,
    inside: false,
    transports: [],
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
        if (this.infoForm.controls.latitude.hasError('max')) {
          this.latErrorText = 'The value should be between -90 and 90';
        }
      })
    );
    this.lngSubscription.add(
      this.infoForm.controls.longitude.valueChanges.subscribe(() => {
        if (this.infoForm.controls.longitude.hasError('max')) {
          this.lngErrorText = 'The value should be between -180 and 180';
        }
      })
    );
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
      this.photoId = 0;
    }

    if (
      this.infoForm.controls.city.value &&
      this.infoForm.controls.country.value
    ) {
      this.newGuide.city = this.infoForm.controls.city.value;
      this.newGuide.country = this.infoForm.controls.country.value;
    }

    if (this.infoForm.controls.fee.value != null) {
      this.newGuide.fee = this.infoForm.controls.fee.value;
    }

    if (this.infoForm.controls.inside.value != null) {
      this.newGuide.inside = this.infoForm.controls.inside.value;
    }

    if (this.infoForm.controls.transport.value) {
      this.newGuide.transports = [];
      this.infoForm.controls.transport.value.forEach((transport) => {
        this.newGuide.transports.push(transport);
      });
    }

    if (
      this.infoForm.controls.latitude.value &&
      this.infoForm.controls.longitude.value
    ) {
      this.newGuide.lat = this.infoForm.controls.latitude.value;
      this.newGuide.lng = this.infoForm.controls.longitude.value;
    }

    if (this.areatextForm.controls.How.value != null) {
      this.newGuide.howText = this.areatextForm.controls.How.value;
    }

    if (this.areatextForm.controls.About.value != null) {
      this.newGuide.descriptionText = this.areatextForm.controls.About.value;
    }
  }

  createClick() {
    if (
      this.nameForm.valid &&
      this.uploadPhotoForm.valid &&
      this.infoForm.valid &&
      this.areatextForm.valid
    ) {
      this.newGuide.photo = this.photoList;
      this.guideList.push(this.newGuide);
      this.router.navigate(['/details', this.newGuide.id]);
    } else {
      this.nameForm.markAllAsTouched();
      this.uploadPhotoForm.markAllAsTouched();
      this.infoForm.markAllAsTouched();
      this.areatextForm.markAllAsTouched();
      this.seeResult = !this.seeResult;
    }
  }

  uploadPhoto(event: Event) {
    const file: string = (event.target as HTMLInputElement).files![0].name;
    this.photoList[this.photoId] = 'assets/photos/' + file;
    this.photoList.push('');
    console.log(this.photoList);
  }

  deletePhoto() {
    this.photoList.splice(this.photoId, 1);
    this.photoId = 0;
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
