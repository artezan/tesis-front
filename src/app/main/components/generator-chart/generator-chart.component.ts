import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TablesDataService } from '../../../services/tables-data.service';
import { UserSessionService } from '../../../services/user-session.service';

@Component({
    selector: 'app-generator-chart',
    templateUrl: './generator-chart.component.html',
    styleUrls: ['./generator-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class GeneratorChartComponent implements OnInit {
    showdChart = false;
    optionNumeric: string[] = [];
    optionString: string[] = [];
    optionY: string;
    optionX: string;
    realData: any[] = [];
    lineChartData: {
        data: number[];
        label: string;
    }[] = [];
    lineChartLabels: string[] = [];
    constructor(
        private tableService: TablesDataService,
        private userSessionService: UserSessionService
    ) {}

    ngOnInit(): void {
        this.userSessionService.userTableSelect.subscribe(tableName => {
            if (tableName !== '') {
                this.tableService.getTable(tableName).subscribe((data: any) => {
                    this.realData = data;
                    this.generateOptions(data);
                });
            }
        });
    }
    generateOptions(data: any[]): void {
        Object.keys(data[0]).forEach(key => {
            // si es numero
            if (!isNaN(data[0][key])) {
                this.optionNumeric.push(key);
                // sino
            } else {
                this.optionString.push(key);
            }
        });
    }
    // ETL
    setfilters(): void {
        const arrOptionsY: number[] = [];
        const arrOptionsX: string[] = [];
        if (this.optionX && this.optionY) {
            this.realData.forEach(row => {
                if (
                    isNaN(row[this.optionY]) ||
                    row[this.optionY] === '' ||
                    row[this.optionY] === null ||
                    row[this.optionY] === undefined
                ) {
                    row[this.optionY] = 0;
                }
                const pos = arrOptionsX.indexOf(row[this.optionX]);
                if (pos === -1) {
                    arrOptionsX.push(row[this.optionX]);
                    arrOptionsY.push(row[this.optionY]);
                } else {
                    arrOptionsY[pos] += row[this.optionY];
                }
            });
            this.lineChartData[0] = {
                data: arrOptionsY,
                label: this.optionY
            };
            this.lineChartLabels = arrOptionsX;
            this.showdChart = true;
        }
    }
    
}
