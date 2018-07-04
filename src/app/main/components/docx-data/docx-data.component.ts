import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { TablesDataService } from '../../../services/tables-data.service';
import { UserSessionService } from '../../../services/user-session.service';
import { fuseAnimations } from '@fuse/animations';
import { prepositionDefault } from '_config/preposition';

@Component({
    selector: 'app-docx-data',
    templateUrl: './docx-data.component.html',
    styleUrls: ['./docx-data.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DocxDataComponent implements OnInit, OnDestroy {
    sizeOfDoc: number;
    showdChart = false;
    optionNumeric: string[] = [];
    optionString: string[] = [];
    optionY: string;
    optionX: string;
    realData = [];
    lineChartData: {
        data: any[];
        label: string;
    }[] = [];
    lineChartLabels: string[] = [];
    optionGrid = 'option1';
    refreshData: { arrXY: any[]; arrStr: any[] };
    lineChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(66,165,245, .5)',
            borderColor: 'rgba(66,165,245, 1)',
            borderWidth: 5,
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#2196F3',
            pointBackgroundColor: '#2196F3',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(66,165,245, .5)',
            pointHoverBorderColor: 'rgba(66,165,245,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10
        }
    ];
    lineChartOptions = {
        borderCapStyle: 'round',
        responsive: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0
                    }
                }
            ]
        }
    };
    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private tableService: TablesDataService,
        private userSessionService: UserSessionService
    ) {
        // ocultar menu
        this._fuseNavigationService.getNavigationItem(
            'regression'
        ).hidden = true;
        this._fuseNavigationService.getNavigationItem('chart').hidden = true;
        this._fuseNavigationService.getNavigationItem(
            'chart-save'
        ).hidden = true;
        this._fuseNavigationService.getNavigationItem('brain').hidden = true;
        this._fuseNavigationService.getNavigationItem('maps').hidden = true;
        this._fuseNavigationService.getNavigationItem(
            'table-data'
        ).hidden = true;
        this._fuseNavigationService.getNavigationItem('panel').hidden = true;
    }

    ngOnInit(): void {
        this.userSessionService.userTableSelect.subscribe(tableName => {
            if (tableName !== '') {
                this.tableService.getTable(tableName).subscribe((data: any) => {
                    this.generateOptions(data);
                    console.log(data);
                });
            }
        });
    }
    generateOptions(data: any[]): void {
        const arrXY: any[] = [];
        const arrStr: { str: string; val: number }[] = [];
        Object.keys(data[0]).forEach(key => {
            const isNumber: any = key;
            if (key !== '_id' && key !== '' && key !== ' ' && isNaN(isNumber)) {
                arrXY.push({ y: data[0][key], x: key });
                arrStr.push({ str: key, val: data[0][key] });
            }
        });
        // ordenar arreglos de mayor a menor
        arrStr.sort((a, b) => {
            return b.val - a.val;
        });
        arrXY.sort((a, b) => {
            return b.y - a.y;
        });
        const arrNum = arrStr.map(item => item.val);
        const labels = arrStr.map(item => item.str);
        this.lineChartLabels = labels;
        this.lineChartData[0] = {
            data: arrNum,
            label: 'Conteo de Palabra'
        };
        this.realData[0] = {
            data: arrXY,
            label: 'Conteo de Palabra'
        };
        this.sizeOfDoc = labels.length;
        this.showdChart = true;
    }
    // Eliminar
    remove(label: string): void {
        const arrStr = this.lineChartLabels;
        const arrData = this.lineChartData;
        arrStr.splice(this.lineChartLabels.indexOf(label), 1);
        const i = this.realData[0].data.findIndex(item => item.x === label);
        arrData[0].data.splice(i, 1);
        this.realData[0].data.splice(i, 1);
        this.refreshData = {
            arrXY: arrData[0].data,
            arrStr: arrStr
        };
        this.sizeOfDoc = arrStr.length;
    }
    // Cambiar vista
    changeGrid(option): void {
        this.optionGrid = option;
    }
    quickFilter(): void {
        prepositionDefault.forEach(word => {
            const finded = this.lineChartLabels.find(label => label === word);
            if (finded) {
                this.remove(finded);
            }
        });
    }
    ngOnDestroy(): void {
        // mostrar menu
        this._fuseNavigationService.getNavigationItem(
            'regression'
        ).hidden = false;
        this._fuseNavigationService.getNavigationItem('chart').hidden = false;
        this._fuseNavigationService.getNavigationItem(
            'chart-save'
        ).hidden = false;
        this._fuseNavigationService.getNavigationItem('brain').hidden = false;
        this._fuseNavigationService.getNavigationItem('maps').hidden = false;
        this._fuseNavigationService.getNavigationItem(
            'table-data'
        ).hidden = false;
        this._fuseNavigationService.getNavigationItem('panel').hidden = false;
    }
}
