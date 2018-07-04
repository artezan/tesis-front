import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Marker {
  lat?: number;
  lng?: number;
  nameColumn?: string;
  id?: any;
}

@Injectable({
    providedIn: 'root'
})
export class ControllerMaps {
  arrMarkers$ = new BehaviorSubject<Marker[]>([]);
  markerSeleceted$ = new Subject<Marker>();
  private API_Key = 'AIzaSyDMzptCTUeHTmppIcYL9-H9mFdKrhb7-A0';

  constructor(private http: HttpClient) {}
  setMarkers(array: Array<Marker>): void {
    this.arrMarkers$.next(array);
  }
  getLocalitation(
    latitude: string | number,
    longitude: string | number
  ): Observable<any> {
    const lat = latitude.toString();
    const lng = longitude.toString();
    return this.http.get(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
        lat +
        ',' +
        lng +
        '&result_type=administrative_area_level_2&key=' +
        this.API_Key
    );
  }
  selectMarker(latitude: string | number, longitude: string | number, id: any, nameColumn): void {
    const lat = +latitude;
    const lng = +longitude;
    this.markerSeleceted$.next({ lat: lat, lng: lng, id: id, nameColumn: nameColumn });
  }
  closeModal(data): void {
    this.markerSeleceted$.next(data);
  }
}
