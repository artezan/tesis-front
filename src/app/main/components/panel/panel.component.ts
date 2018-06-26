import { Observable } from 'rxjs';
import { FuseNavigationService } from './../../../../@fuse/components/navigation/navigation.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TablesDataService } from '../../../services/tables-data.service';
import { UserSessionService } from '../../../services/user-session.service';
import * as ss from 'simple-statistics';

interface DataTable {
    name?: string;
    type?: string;
    variance?: number;
    desviation?: number;
    totalItems?: number;
    mean?: number;
    min?: number;
    max?: number;
    sum?: number;
}

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PanelComponent implements OnInit {
    columsTable: DataTable[] = [];
    isLoader: boolean;
    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private tableService: TablesDataService,
        private userSessionService: UserSessionService
    ) {}

    ngOnInit(): void {
        this.isLoader = false;
        this.userSessionService.userTableSelect.subscribe(tableName => {
            if (tableName !== '') {
                this.tableService.getTable(tableName).subscribe(d => {
                    this.trasformData(d);
                });
                this.tableService.getTableSumary(tableName);
            }
        });
    }
    // escaneo
    trasformData(dataSource: Array<any>): void {
        Object.keys(dataSource[0]).forEach(key => {
            // nombre
            const nameColum = key;
            let typeColum: string;
            let numItemsColum = 0;
            const arrNumbersColum: number[] = [];
            dataSource.forEach(row => {
                if (row[key]) {
                    numItemsColum++;
                }
                // tipo
                if (isNaN(row[key])) {
                    typeColum = 'caracter';
                } else {
                    typeColum = 'numerico';
                    if (
                        row[key] === '' ||
                        row[key] === null ||
                        row[key] === undefined
                    ) {
                        row[key] = 0;
                    }
                    arrNumbersColum.push(row[key]);
                }
            });
            console.log(arrNumbersColum);
            let meanColum;
            let varianceColum;
            let desviationnColum;
            let maxColum;
            let minColum;
            let sumColum;
            if (arrNumbersColum.length) {
                meanColum = ss.mean(arrNumbersColum);
                varianceColum = ss.variance(arrNumbersColum);
                desviationnColum = ss.standardDeviation(arrNumbersColum);
                maxColum = ss.max(arrNumbersColum);
                minColum = ss.min(arrNumbersColum);
                sumColum = ss.sumSimple(arrNumbersColum);
                if (isNaN(meanColum)) {
                    meanColum = 0;
                }
                if (isNaN(varianceColum)) {
                    varianceColum = 0;
                }
                if (isNaN(maxColum)) {
                    maxColum = 0;
                }
                if (isNaN(desviationnColum)) {
                    desviationnColum = 0;
                }
                if (isNaN(minColum)) {
                    minColum = 0;
                }
                if (isNaN(sumColum)) {
                    sumColum = 0;
                }
            }

            this.columsTable.push({
                name: nameColum,
                totalItems: numItemsColum,
                type: typeColum,
                mean: meanColum,
                variance: varianceColum,
                desviation: desviationnColum,
                max: maxColum,
                min: minColum,
                sum: sumColum
            });
        });
        this.isLoader = true;
        console.log(this.columsTable);
    }
}
