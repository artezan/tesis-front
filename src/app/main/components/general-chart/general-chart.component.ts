import { element } from 'protractor';
import { ChartControllerService } from './chart-controller.service';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter
} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {
    UserChartSettings,
    UserSessionService
} from '../../../services/user-session.service';

@Component({
    selector: 'app-general-chart',
    templateUrl: './general-chart.component.html',
    styleUrls: ['./general-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class GeneralChartComponent implements OnInit, OnChanges {
    @Output() _helperRefresh = new EventEmitter<any>();
    @Input() title = 'Grafica';
    @Input() showdChart = false;
    @Input()
    lineChartData: {
        data: number[];
        label: string;
    }[] = [];
    @Input() lineChartLabels = [''];
    @Input()
    lineChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(66,165,245, .5)',
            borderColor: 'rgba(66,165,245, 1)',
            borderCapStyle: 'round',
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
    @Input() lineChartLegend = true;
    @Input() lineChartType = 'line';
    @Input()
    lineChartOptions = {
        borderCapStyle: 'round',
        responsive: true
    };
    @Input() numSort: number;
    @Input() typeSort = 'all';
    @Input() titleX = '';
    @Input() isGenerator = true;
    realData;
    realLabel;
    isOneData: boolean;
    @Input() isOneDataSvc;
    // RL
    @Input() isRegression = false;
    @Input()
    statisticsData: {
        variance: number;
        standardDeviation: number;
        sampleCorrelation: number;
        rSquared: number;
        error: number;
    };
    @Input() refreshData: { arrXY: any[]; arrStr: any[] };
    estimateY: Array<{ x: number; y: number }>;

    constructor(
        public controllerChart: ChartControllerService,
        private userSessionService: UserSessionService
    ) {}

    ngOnInit(): void {}
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.lineChartData) {
            if (changes.lineChartData.currentValue) {
                this.lineChartData = changes.lineChartData.currentValue;
                this.realData = this.lineChartData;
            }
        }
        if (changes.lineChartLabels) {
            if (changes.lineChartLabels.currentValue) {
                this.lineChartLabels = changes.lineChartLabels.currentValue;
                this.realLabel = this.lineChartLabels;
            }
        }
        if (
            this.lineChartData.length &&
            this.lineChartData[0].data.length === 1
        ) {
            this.isOneData = true;
        } else {
            this.isOneData = false;
        }
        if (changes.refreshData) {
            if (changes.refreshData.currentValue) {
                this.refreshData = changes.refreshData.currentValue;
                this.remakeChart2(
                    this.refreshData.arrXY,
                    this.refreshData.arrStr
                );
            }
        }

        this.getRegressionArray();
    }
    filterByTop(): void {
        const arrToSort = [];
        const arrNum: number[] = [];
        const arrStr = [];
        // tslint:disable:prefer-const
        let clone = JSON.parse(JSON.stringify(this.realData));
        let clone2 = JSON.parse(JSON.stringify(this.realLabel));
        this.lineChartData = clone;
        this.lineChartLabels = clone2;

        if (this.typeSort === 'all') {
            if (this.numSort) {
                const arrTemp = this.lineChartLabels.slice(0, this.numSort);
                const arrTemp2 = this.lineChartData[0].data.slice(
                    0,
                    this.numSort
                );
                this.remakeChart(arrTemp2, arrTemp);
            } else if (this.numSort === null) {
                this.remakeChart(this.realData[0].data, this.realLabel);
            }
        } else {
            this.lineChartData[0].data.forEach((row, i) => {
                arrToSort.push([this.lineChartLabels[i], row]);
            });
            if (this.typeSort === 'top') {
                arrToSort.sort((a, b) => {
                    return b[1] - a[1];
                });
                if (this.numSort !== null) {
                    arrToSort.slice(0, this.numSort).forEach((item, index) => {
                        arrNum.push(item[1]);
                        arrStr.push(item[0]);
                    });
                } else {
                    arrToSort.forEach((item, index) => {
                        arrNum.push(item[1]);
                        arrStr.push(item[0]);
                    });
                }
            } else if (this.typeSort === 'bottom') {
                arrToSort.sort((a, b) => {
                    return a[1] - b[1];
                });
                if (this.numSort !== null) {
                    arrToSort.slice(0, this.numSort).forEach((item, index) => {
                        arrNum.push(item[1]);
                        arrStr.push(item[0]);
                    });
                } else {
                    arrToSort.forEach((item, index) => {
                        arrNum.push(item[1]);
                        arrStr.push(item[0]);
                    });
                }
            }
            this.remakeChart(arrNum, arrStr);
        }
    }
    private remakeChart(arrNum: number[], arrStr: any[]): void {
        let clone = JSON.parse(JSON.stringify(this.lineChartData));
        let clone2 = JSON.parse(JSON.stringify(this.lineChartLabels));
        clone[0].data = arrNum;
        clone2 = arrStr;
        this.lineChartData = clone;
        setTimeout(() => (this.lineChartLabels = clone2), 0);
    }
    private remakeChart2(arrXY: any[], arrStr: any[]): void {
        let clone = JSON.parse(JSON.stringify(this.lineChartData));
        let clone2 = JSON.parse(JSON.stringify(this.lineChartLabels));
        clone[0].data = arrXY;
        clone2 = arrStr;
        this.lineChartData = clone;
        setTimeout(() => (this.lineChartLabels = clone2), 0);
    }

    changeChart(): void {
        if (this.lineChartType === 'doughnut' || this.lineChartType === 'pie') {
            this.lineChartLegend = false;
        } else {
            this.lineChartLegend = true;
        }
    }
    colorsChart(value): void {
        if (value === 'one') {
            this.lineChartColors = [
                {
                    backgroundColor: 'rgba(66,165,245, .5)',
                    borderColor: 'rgba(66,165,245, 1)',
                    borderCapStyle: 'round',
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
        } else {
            this.lineChartColors = undefined;
        }
    }
    saveChart(): void {
        const dataChart: UserChartSettings = {
            showChart: true,
            lineChartData: this.lineChartData,
            lineChartLabels: this.lineChartLabels,
            lineChartLegend: this.lineChartLegend,
            numSort: this.numSort,
            typeSort: this.typeSort,
            titleX: this.titleX,
            lineChartColors: this.lineChartColors,
            lineChartType: this.lineChartType,
            isOneData: this.isOneData
        };
        this.userSessionService.saveChartUser(dataChart);
    }
    getRegressionArray(): void {
        if (this.isRegression && this.showdChart) {
            const arrEstimateY = [];
            this.lineChartData[0].data.forEach((xy, i) => {
                const x: any = xy;
                arrEstimateY[i] = this.lineChartData[1].data.find(
                    (item: any) => item.x === x.x
                );
            });
            this.estimateY = arrEstimateY;
        }
    }
    // helper
    isNumber(val): boolean {
        return typeof val === 'number';
    }
}
