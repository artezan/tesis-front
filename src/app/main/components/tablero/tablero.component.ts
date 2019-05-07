import {
    chartSettings1,
    chartSettings2,
    chartSettings3,
    chartSettings4,
    chartSettings5,
    chartSettings6,
    chartSettings7,
    chartSettings8
} from './chart-option';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TablesDataService } from '../../../services/tables-data.service';
import {
    UserSessionService,
    UserChartSettings
} from '../../../services/user-session.service';
import { SocketIoService } from '../../../services/socket-io.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-tablero',
    templateUrl: './tablero.component.html',
    styleUrls: ['./tablero.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TableroComponent implements OnInit {
    showLoader = false;
    mes = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ];
    // g1
    chartData1: {
        data: number[];
        label: string;
    }[] = [];
    chartTitle1: { title1: string; title2: string };
    chartLabels1: string[] = [];
    chartOptions1 = chartSettings1.options;
    chartType1 = chartSettings1.chartType;
    chartColors1 = chartSettings1.colors;
    showChart = false;
    // g2
    chartTitle2: { title1: string; title2: string };

    chartData2: {
        data: number[];
        label: string;
    }[] = [];
    chartLabels2: string[] = [];
    chartOptions2 = chartSettings2.options;
    chartType2 = chartSettings2.chartType;
    chartColors2 = chartSettings2.colors;
    showChart2 = false;
    widget5SelectedDay = 'top';
    // g3
    chartTitle3: { title1: string; title2: string };

    chartData3: {
        data: number[];
        label: string;
    }[] = [];
    chartLabels3: string[] = [];
    chartOptions3 = chartSettings3.options;
    chartType3 = chartSettings3.chartType;
    chartColors3 = chartSettings3.colors;
    showChart3 = false;
    widget3SelectedDay = 'top';
    // g4
    chartTitle4: { title1: string; title2: string };

    chartData4: {
        data: number[];
        label: string;
    }[] = [];
    chartLabels4: string[] = [];
    chartOptions4 = chartSettings4.options;
    chartType4 = chartSettings4.chartType;
    chartColors4 = chartSettings4.colors;
    showChart4 = false;
    widget4SelectedDay = 'top';

    // g5
    chartTitle5: { title1: string; title2: string };

    chartData5: {
        data: number[];
        label: string;
    }[] = [];
    chartLabels5: string[] = [];
    chartOptions5 = chartSettings5.options;
    chartType5 = chartSettings5.chartType;
    chartColors5 = chartSettings5.colors;
    showChart5 = false;
    widget55SelectedDay = 'top';
    // g6
    chartTitle6: { title1: string; title2: string };

    sc = 0;
    totalTap1 = 0;
    totalTap0 = 0;
    totalTap2 = 0;
    chartData6Entregado: {
        data: number[];
        label: string;
    }[] = [];
    chartData650: {
        data: number[];
        label: string;
    }[] = [];
    chartData6Sin: {
        data: number[];
        label: string;
    }[] = [];
    chartLabels6: string[] = [];
    chartLabels6Entregado: string[] = [];
    chartOptions6 = chartSettings6.options;
    chartType6 = chartSettings6.chartType;
    chartColors6 = chartSettings6.colors;
    showChart6 = false;
    widget6SelectedDay = 'top';
    // g7
    chartTitle7: { title1: string; title2: string };

    chartData7: {
        data: number[];
        label: string;
    }[] = [];
    chartLabels7: string[] = [];
    chartOptions7 = chartSettings7.options;
    chartType7 = chartSettings7.chartType;
    chartColors7 = chartSettings7.colors;
    showChart7 = false;
    widget7SelectedDay = 'top';
    // g8
    chartTitle8: { title1: string; title2: string };

    chartData8: {
        data: number[];
        label: string;
    }[] = [];
    chartLabels8: string[] = [];
    chartOptions8 = chartSettings8.options;
    chartType8 = chartSettings8.chartType;
    chartColors8 = chartSettings8.colors;
    showChart8 = false;
    widget8SelectedDay = 'top';
    tableName: string;
    constructor(
        private tableService: TablesDataService,
        private userSessionService: UserSessionService,
        private socketService: SocketIoService,
        private router: Router
    ) {
        // Register the custom chart.js plugin
        this._registerCustomChartJSPlugin();
    }

    ngOnInit(): void {
        this.showLoader = true;
        // real time
        this.userSessionService.userTableSelect.subscribe(tableName => {
            if (tableName !== '') {
                this.tableName = tableName;
                this.getData();
            }
        });
        // this.socketService.onGetEventTable().subscribe(name => {
        //     if (name === this.tableName) {
        //         this.getData();
        //     }
        // });
    }
    // genera graficas
    getData(): void {
        this.userSessionService.userChartSaved.subscribe(
            (settingsArr: UserChartSettings[]) => {
                if (settingsArr.length > 0) {
                    this.showLoader = false;
                    this.chart1(settingsArr);
                    //  data 4
                    this.chart2(settingsArr);
                    this.chart3(settingsArr);
                    // data 2
                    this.chart4(settingsArr);
                    this.chart5(settingsArr);
                    this.chart6(settingsArr);
                    this.chart7(settingsArr);
                    this.chart8(settingsArr);
                }
            }
        );
    }
    // generar graficas en especifico
    getOneChartData(option: number, isTop: boolean): void {
        this.userSessionService.userChartSaved.subscribe(
            (settingsArr: UserChartSettings[]) => {
                // g1
                if (option === 1) {
                }
                if (option === 2) {
                    this.chart2(settingsArr, isTop);
                }
                if (option === 3) {
                    this.chart3(settingsArr, isTop);
                }
                if (option === 4) {
                    this.chart4(settingsArr, isTop);
                }
                if (option === 5) {
                    this.chart5(settingsArr, isTop);
                }
                if (option === 6) {
                    this.chart6(settingsArr);
                }
                if (option === 7) {
                    this.chart7(settingsArr, isTop);
                }
                if (option === 8) {
                    this.chart8(settingsArr, isTop);
                }
            }
        );
    }
    /**
     * Graficas x / y
     */
    // G1 mes/cant
    chart1(data: UserChartSettings[]): void {
        if (data[0]) {
            this.chartTitle1 = {
                title1: data[0].titleX,
                title2: data[0].titleY
            };
            this.chartData1[0] = {
                data: data[0].lineChartData[0].data,
                label: data[0].titleY
            };
            // para chart
            this.chartLabels1 = data[0].lineChartLabels;
            this.showChart = true;
        }
    }
    // G2 muebles / cant esspecial data 4
    chart2(data: UserChartSettings[], isTop = true): void {
        const dataChart = data[6];

        if (dataChart) {
            this.chartTitle2 = {
                title1: dataChart.titleX,
                title2: dataChart.titleY
            };
            const arrObj = this.sumOfItems(
                dataChart.lineChartLabels,
                dataChart.lineChartData[0].data,
                isTop
            );
            this.chartData2[0] = {
                data: arrObj.map(item => item.number).slice(0, 10),
                label: dataChart.lineChartData[0].label
            };
            this.chartLabels2 = arrObj.map(item => item.label).slice(0, 10);
            this.showChart2 = true;
        }
    }
    // G3  distrib/ cant
    chart3(data: UserChartSettings[], isTop = true): void {
        const dataChart = data[1];

        if (dataChart) {
            this.chartTitle3 = {
                title1: dataChart.titleX,
                title2: dataChart.titleY
            };
            const arrObj = this.sumOfItems(
                dataChart.lineChartLabels,
                dataChart.lineChartData[0].data,
                isTop
            );
            this.chartData3[0] = {
                data: arrObj.map(item => item.number).slice(0, 10),
                label: dataChart.lineChartData[0].label
            };
            this.chartLabels3 = arrObj.map(item => item.label).slice(0, 10);
            this.showChart3 = true;
        }
    }
    // G4  Tela /cant
    chart4(data: UserChartSettings[], isTop = true): void {
        const dataChart = data[2];

        if (dataChart) {
            this.chartTitle4 = {
                title1: dataChart.titleX,
                title2: dataChart.titleY
            };
            const arrObj = this.sumOfItems(
                dataChart.lineChartLabels,
                dataChart.lineChartData[0].data,
                isTop
            );
            this.chartData4[0] = {
                data: arrObj.map(item => item.number).slice(0, 10),
                label: dataChart.lineChartData[0].label
            };
            this.chartLabels4 = arrObj.map(item => item.label).slice(0, 10);
            this.showChart4 = true;
        }
    }

    // G5  madeera / cant
    chart5(data: UserChartSettings[], isTop = true): void {
        const dataChart = data[3];

        if (dataChart) {
            this.chartTitle5 = {
                title1: dataChart.titleX,
                title2: dataChart.titleY
            };
            const arrObj = this.sumOfItems(
                dataChart.lineChartLabels,
                dataChart.lineChartData[0].data,
                isTop
            );
            this.chartData5[0] = {
                data: arrObj.map(item => item.number).slice(0, 10),
                label: dataChart.lineChartData[0].label
            };
            this.chartLabels5 = arrObj.map(item => item.label).slice(0, 10);
            this.showChart5 = true;
        }
    }
    // g6 estatus/cant
    chart6(data: UserChartSettings[]): void {
        const dataChart = data[4];

        if (dataChart) {
            this.chartTitle6 = {
                title1: dataChart.titleX,
                title2: dataChart.titleY
            };
            dataChart.lineChartData[0].data.forEach(d => {
                this.totalTap0 += d;
                this.totalTap1 += d;
            });
            const arrObj = this.sumOfItems(
                dataChart.lineChartLabels,
                dataChart.lineChartData[0].data,
                true
            );
            const arrObj2 = this.sumOfItems(
                dataChart.lineChartLabels,
                dataChart.lineChartData[0].data,
                false
            );
            this.chartData6Sin[0] = {
                data: arrObj.map(item => item.number).slice(0, 10),
                label: dataChart.lineChartData[0].label
            };
            this.chartData6Entregado[0] = {
                data: arrObj2.map(item => item.number).slice(0, 10),
                label: dataChart.lineChartData[0].label
            };
            this.chartLabels6 = arrObj.map(item => item.label).slice(0, 10);
            this.chartLabels6Entregado = arrObj2
                .map(item => item.label)
                .slice(0, 10);
            this.showChart6 = true;
        }
    }
    selectedTabChange(value): void {
        this.sc = value;
    }
    //  g7 Estatus / cant
    chart7(data: UserChartSettings[], isTop = true): void {
        const dataChart = data[5];

        if (dataChart) {
            this.chartTitle7 = {
                title1: dataChart.titleX,
                title2: dataChart.titleY
            };
            const arrObj = this.sumOfItems(
                dataChart.lineChartLabels,
                dataChart.lineChartData[0].data,
                isTop
            );
            this.chartData7[0] = {
                data: arrObj.map(item => item.number).slice(0, 10),
                label: dataChart.lineChartData[0].label
            };
            this.chartLabels7 = arrObj.map(item => item.label).slice(0, 10);
            this.showChart7 = true;
        }
    }
    //  g8 clientes / cant
    chart8(data: UserChartSettings[], isTop = true): void {
        const dataChart = data[7];

        if (dataChart) {
            this.chartTitle8 = {
                title1: dataChart.titleX,
                title2: dataChart.titleY
            };
            const arrObj = this.sumOfItems(
                dataChart.lineChartLabels,
                dataChart.lineChartData[0].data,
                isTop
            );
            this.chartData8[0] = {
                data: arrObj.map(item => item.number).slice(0, 10),
                label: dataChart.lineChartData[0].label
            };
            this.chartLabels8 = arrObj.map(item => item.label).slice(0, 10);
            this.showChart8 = true;
        }
    }
    // routes
    /**
     *
     * @param type columna
     * @param label filtro general
     */
    goToDetails(type, label?): void {
        const data: NavigationExtras = {
            queryParams: { type: type, label: label }
        };
        this.router.navigate(['generator-chart'], data);
    }
    // _Helpers

    /**
     * Sumatoria de items repetidos y ordeenados
     * @param labels eje x
     * @param numbers eje y
     * @param isTop ordena de mayor a menor si es true
     */
    sumOfItems(
        labels: string[],
        numbers: number[],
        isTop: boolean
    ): { label: string; number: number }[] {
        const arrObj: { label: string; number: number }[] = [];
        labels.forEach((label, i) => {
            const index = arrObj.findIndex(obj => obj.label === label);
            if (index === -1) {
                arrObj.push({
                    label: label,
                    number: numbers[i]
                });
            } else {
                arrObj[index].number += numbers[i];
            }
        });
        if (isTop) {
            arrObj.sort((a, b) => {
                return b.number - a.number;
            });
        } else {
            arrObj.sort((a, b) => {
                return a.number - b.number;
            });
        }
        return arrObj;
    }
    /**
     * Register a custom plugin
     */
    private _registerCustomChartJSPlugin(): void {
        (<any>window).Chart.plugins.register({
            // tslint:disable-next-line:typedef
            afterDatasetsDraw: function(chart, easing) {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop &&
                        chart.options.plugins.xLabelsOnTop.active === false)
                ) {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        // tslint:disable-next-line:typedef
                        meta.data.forEach(function(element, index) {
                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                            const fontSize = 16;
                            const fontStyle = 'normal';
                            const fontFamily = 'Roboto, Helvetica Neue, Arial';
                            ctx.font = (<any>window).Chart.helpers.fontString(
                                fontSize,
                                fontStyle,
                                fontFamily
                            );

                            // Just naively convert to string for now
                            const dataString = dataset.data[index].toString();

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const padding = 15;
                            const startY = 24;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, startY);

                            ctx.save();

                            ctx.beginPath();
                            ctx.setLineDash([5, 3]);
                            ctx.moveTo(position.x, startY + padding);
                            ctx.lineTo(position.x, position.y - padding);
                            ctx.strokeStyle = 'rgba(255,255,255,0.12)';
                            ctx.stroke();

                            ctx.restore();
                        });
                    }
                });
            }
        });
    }
}
