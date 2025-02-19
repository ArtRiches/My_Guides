import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Guide } from 'app/interfaces/guide';
import { GuideService } from 'app/services/guide.service';
import { GuidePageComponent } from 'app/pages/details-create-pages/guide-details/guide-details.component';


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
    id: 4,
    name: '',
    city: '',
    country: '',
    photos: [{id:0, guideId:0, path:''}],
    fee: false,
    inside: false,
    transports: [{id: 0, icon:''}],
    howText: '',
    descriptionText: '',
    lat: 0,
    lng: 0,
  };
  photoId = 0;

  constructor(
    private guideService: GuideService,
    private router: Router,
  ) {
    this.newGuide.photos[0].guideId =this.newGuide.id;
  }

  latSubscription = new Subscription();
  lngSubscription = new Subscription();
  userGuidesSubscription = new Subscription();
  userGuides?: Guide[];
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

  ngOnDestroy(): void {
    this.userGuidesSubscription.unsubscribe();
    this.latSubscription.unsubscribe();
    this.lngSubscription.unsubscribe();
  }

  changeClick() {
    this.seeResult = false;
    this.btnHide = true;
    if (this.newGuide.photos[0].path != '') {
      this.newGuide.photos.push({id:this.photoId+1, guideId:0, path:''});
    }
 
  }

  applyClick() {
    this.seeResult = true;

    if (this.nameForm.controls.name.value) {
      this.newGuide.name = this.nameForm.controls.name.value;
    }

    if (this.newGuide.photos[this.newGuide.photos.length - 1].path === '') {
      this.newGuide.photos.splice(this.newGuide.photos.length - 1, 1);
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
      let i = 0;
      this.infoForm.controls.transport.value.forEach((transport) => {

        this.newGuide.transports[i] = {id: i, icon:transport};
        i++;
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
      this.guideService.addGuide(1, this.newGuide).subscribe();
      this.userGuides?.push(this.newGuide);
      this.router.navigate(['/guides']);
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
    this.newGuide.photos[this.photoId].path = 'assets/photos/' + file;
    this.newGuide.photos[this.photoId].guideId = this.newGuide.id;
    this.newGuide.photos.push({id:-1,  guideId: -1, path:''});
  }

  deletePhoto() {
    this.newGuide.photos.splice(this.photoId, 1);
    this.photoId = 0;
  }

  nextPhoto() {
    this.photoId = (this.photoId + 1) % this.newGuide.photos.length;
  }

  prevPhoto() {
    if (this.photoId === 0) {
      this.photoId = this.newGuide.photos.length - 1;
    } else {
      this.photoId = this.photoId - 1;
    }
  }
}
