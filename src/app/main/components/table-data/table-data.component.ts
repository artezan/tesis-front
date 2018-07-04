import { Component, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { TablesDataService } from '../../../services/tables-data.service';
import { UserSessionService } from '../../../services/user-session.service';

@Component({
    selector: 'app-table-data',
    templateUrl: './table-data.component.html',
    styleUrls: ['./table-data.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class TableDataComponent implements OnInit, OnChanges {
    rows: any[];
    rows2: any[];
    loadingIndicator: boolean;
    dataTemp: any;
    columns = [];

    constructor(
        private tableService: TablesDataService,
        private userSessionService: UserSessionService
    ) {}

    ngOnInit(): void {
        this.userSessionService.userTableSelect.subscribe(tableName => {
            if (tableName !== '') {
                this.tableService.getTable(tableName).subscribe(d => {
                    this.trasformData(d);
                });
            }
        });
    }
    // escaneo
    trasformData(dataSource: Array<any>): void {
        Object.keys(dataSource[0]).forEach(key => {
            if (key !== '_id') {
                this.columns.push({
                prop: key,
                name: key
              });
            }
        });
        this.rows = dataSource;
        this.rows2 = dataSource;
    }
    change(event: { value: string; name: string }): void {
        this.rows = this.rows2;
        this.dataTemp = this.rows;
        const val = event.value;
        const colName = event.name;
        // filter our data
        if (val && val.trim() !== '') {
            this.rows = this.dataTemp.filter(d => {
                if (d[colName] !== '') {
                    return (
                        d[colName]
                            .toString()
                            .toLowerCase()
                            .indexOf(val) !== -1 || !val
                    );
                }
            });
        } else {
            this.rows = this.rows2;
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.rows) {
            if (changes.rows.currentValue) {
                this.rows = [...changes.rows.currentValue];
                this.rows2 = this.rows;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 1000);
            }
        }
    }
}
