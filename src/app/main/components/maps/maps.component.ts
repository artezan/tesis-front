import { Marker, ControllerMaps } from './../general-maps/controller-maps';
import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { UserSessionService } from '../../../services/user-session.service';
import { TablesDataService } from '../../../services/tables-data.service';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
    arrLng: number[] = [];
    arrLat: number[] = [];
    markers: Marker[] = [];
    optionSelected: string;
    options = [];
    realData = [];
    hasLatLng = false;
    arrColumn = [];
    isShowList = false;
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private userSessionService: UserSessionService,
        private tableService: TablesDataService,
        private controllerMap: ControllerMaps
    ) {
        this.userSessionService.userTableSelect.subscribe(tableName => {
            if (tableName !== '') {
                this.tableService.getTable(tableName).subscribe((data: any) => {
                    this.realData = data;
                    this.setfilters(data);
                });
            }
        });
    }

    ngOnInit(): void {}
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
    setfilters(data: any[]): void {
        Object.keys(data[0]).forEach(key => {
            this.options.push(key);
        });
    }
    getData(): void {
        let keyLng: string;
        let keyLat: string;
        const data = this.realData;
        Object.keys(data[0]).forEach(key => {
            const searchLat = key.search(/lat/i);
            const searchLong = key.search(/long/i);
            if (searchLat !== -1) {
                if (!isNaN(data[0][key])) {
                    keyLat = key;
                }
            }
            if (searchLong !== -1) {
                if (!isNaN(data[0][key])) {
                    keyLng = key;
                }
            }
        });
        if (keyLng && keyLat) {
            this.getLatLng(keyLng, keyLat, data);
            this.hasLatLng = true;
        } else {
            this.hasLatLng = false;
        }
    }
    getLatLng(keyLng: string, keyLat: string, data: any[]): void {
        data.forEach(item => {
            if (!isNaN(item[keyLat]) && !isNaN(item[keyLng])) {
                if (item[keyLat] === '') {
                } else {
                    if (
                        !isNaN(item[keyLat]) ||
                        item[keyLat] !== '' ||
                        item[keyLat] !== ' ' ||
                        item[keyLat] !== null ||
                        item[keyLat] !== undefined ||
                        !isNaN(item[keyLng]) ||
                        item[keyLng] !== '' ||
                        item[keyLng] !== ' ' ||
                        item[keyLng] !== null ||
                        item[keyLng] !== undefined
                    ) {
                        this.markers.push({
                            id: item['_id'],
                            lng: item[keyLng],
                            lat: item[keyLat],
                            nameColumn: item[this.optionSelected]
                        });
                    }
                }
            }
        });
        this.controllerMap.setMarkers(this.markers);
    }
    showList(event): void {
        this.isShowList = event;
    }
    slectMarker(marker: Marker): void {
        this.controllerMap.selectMarker(marker.lat, marker.lng, marker.id, marker.nameColumn);
    }
}
