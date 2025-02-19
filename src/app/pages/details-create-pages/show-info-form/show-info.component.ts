import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatIconModule } from '@angular/material/icon';
import { Guide } from 'app/interfaces/guide';

@Component({
  selector: 'app-show-info',
  standalone: true,
  imports: [MatIconModule, GoogleMapsModule, CommonModule],
  templateUrl: './show-info.component.html',
  styleUrl: './show-info.component.scss'
})
export class ShowInfoComponent {
center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
@Input() guide?: Guide;

constructor() {}

ngOnChanges() {
  this.center = { lat: this.guide?.lat ?? 0, lng: this.guide?.lng ?? 0}
}
}
