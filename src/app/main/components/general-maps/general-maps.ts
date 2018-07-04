import {
    Component,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {} from '@types/googlemaps';
import { ControllerMaps, Marker } from './controller-maps';
declare var google;

@Component({
    selector: 'app-general-maps',
    templateUrl: 'general-maps.html',
    styleUrls: ['./general-maps.scss'],
})
export class GeneralMapsComponent implements AfterViewInit {
    @Output() changeList: EventEmitter<any> = new EventEmitter();
    @Output() changeDetails: EventEmitter<number> = new EventEmitter();
    @Output() mapCharge: EventEmitter<boolean> = new EventEmitter();
    @ViewChild('gmap2') gmapElement: ElementRef;
    // mapa
    map: google.maps.Map;
    // marcadores
    markers: google.maps.Marker[] = [];
    marker: google.maps.Marker;
    // cenntrar lat lng
    lat = 23.7221837;
    lng = -99.5119105;
    isDevice: boolean;
    showModal = false;
    itemId: string | number;
    buttonMap = 'Resultados';
    titleItem: string;

    constructor(public mapController: ControllerMaps) {
       // marcador select
        mapController.markerSeleceted$.subscribe(item => {
            if (item) {
                this.showModal = true;
                this.itemId = item.id;
                this.titleItem = item.nameColumn;
                this.buttonMap = 'Detalles';
                this.findMarker(item);
            } else {
                this.showModal = false;
            }
        });
        // end observer
    }

    ngAfterViewInit(): void {
        // crear mapa
        this.startMap();
        // debe de estar despues de cargar la vista para poder agregar
        // inicia subscribe a observables
        this.mapController.arrMarkers$.subscribe(arr => {
            if (arr.length === 0) {
                this.startMap();
            } else {
                this.clearMarkers();
                arr.forEach(marker => {
                    this.addMarker(
                        marker.lat,
                        marker.lng,
                        marker.nameColumn,
                        marker.id
                    );
                });
            }
            this.mapCharge.emit(true);
        });
    }
    startMap(): void {
        const myLatLng = new google.maps.LatLng(this.lat, this.lng);
        // crear mapa
        const mapOpt = {
            center: myLatLng,
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // Cargar mapa
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapOpt);
        // crea marcador inicial
        this.initMarker(19.39068, -99.2836964);
    }
    // marcador inicial
    initMarker(lat: number, lng: number): void {
        const myLatLng = new google.maps.LatLng(lat, lng);
        this.marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map
            //   icon: 'http://dondecomprar.poliflex.mx/bundles/poliflexapp/images/poi.png'
        });
        this.marker.setMap(this.map);
    }
    // agrega marcadores
    addMarker(
        lat: number,
        lng: number,
        nombreEmpresa?: string,
        id?: any
    ): void {
        const myLatLng = new google.maps.LatLng(lat, lng);
        const infowindow = new google.maps.InfoWindow({
            content: '<p  ><b>' + nombreEmpresa + '</b></p>'
        });
        const marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            title: nombreEmpresa,
            //   icon:
            //     'http://dondecomprar.poliflex.mx/bundles/poliflexapp/images/poi.png',
            infowindow: infowindow
        });
        marker.setValues({ id: id });
        this.markers.push(marker);
        this.setMapOnAll();
    }
    // Seta en mapa
    setMapOnAll(): void {
        const bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(this.map);
            bounds.extend(this.markers[i].getPosition());
        }
        this.map.fitBounds(bounds);
        this.map.panToBounds(bounds);
        // evento click marcadores
        this.markers.forEach((marker: google.maps.Marker) => {
            marker.addListener('click', () => {
                if (!this.isDevice) {
                    this.showModal = true;
                } else {
                    this.buttonMap = 'Detalles';
                }
                this.itemId = marker.get('id');
                this.titleItem = marker.get('title');
                this.toggleBounce(marker);
            });
        });
    }
    // Limpia marcadores
    clearMarkers(): void {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
    }
    changeToList(): void {
        this.changeList.emit();
    }
    changeToDetails(): void {
        if (this.itemId) {
            this.changeDetails.emit(+this.itemId);
            this.itemId = null;
            this.buttonMap = 'Resultados';
        } else {
            this.changeToList();
        }
    }
    findMarker(idMarker: Marker): void {
        const markerAnimate = this.markers.find(marker => {
            return marker.get('id') === idMarker.id;
        });
        this.toggleBounce(markerAnimate);
    }
    toggleBounce(marker: google.maps.Marker): void {
        this.map.setCenter(marker.getPosition());
        this.map.panBy(-25, 0);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
            marker.setAnimation(null);
        }, 2000);
        this.showWindow(marker);
    }
    showWindow(marker: any): void {
        // close all windows
        this.markers.forEach((m: any) => {
            m.infowindow.close(this.map, m);
        });
        // open one window
        marker.infowindow.open(this.map, marker);
    }
    // getPixelOffset(marker): google.maps.Point {
    //   // Calculate marker position in pixels form upper left corner
    //   var scale = Math.pow(2, this.map.getZoom());
    //   var nw = new google.maps.LatLng(
    //     this.map
    //       .getBounds()
    //       .getNorthEast()
    //       .lat(),
    //     this.map
    //       .getBounds()
    //       .getSouthWest()
    //       .lng()
    //   );
    //   var worldCoordinateNW = this.map.getProjection().fromLatLngToPoint(nw);
    //   var worldCoordinate = this.map
    //     .getProjection()
    //     .fromLatLngToPoint(marker.getPosition());
    //   var pixelOffset = new google.maps.Point(
    //     Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
    //     Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
    //   );
    //   return pixelOffset;
    // }
}
