import { xTensorExample, yTensoExample } from './../../../../_config/data-model';
import { SumaryTable } from 'models/sumary-table.model';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TablesDataService } from '../../../services/tables-data.service';
import { UserSessionService } from '../../../services/user-session.service';
import * as ss from 'simple-statistics';
import * as tf from '@tensorflow/tfjs';
import { DrawableDirective } from '../../directives/drawable.directive';

@Component({
    selector: 'app-estimate',
    templateUrl: './estimate.component.html',
    styleUrls: ['./estimate.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EstimateComponent implements OnInit {
    // TF
    @ViewChild(DrawableDirective) canvas;
    arrInputX;
    arrInputY;
    linearModel: tf.Sequential;
    prediction: any;
    model: tf.Model;
    predictions: any = [];
    dataNum: {
        data: number[];
        label: string;
        type?: string;
        showLine?: boolean;
        fill?: boolean;
    }[] = [];
    // chart
    realData: any[] = [];
    selectX: string[] = [];
    selectY: string[] = [];
    optionY: string;
    optionX: string;
    lineChartData: {
        data: number[];
        label: string;
        type?: string;
        showLine?: boolean;
        fill?: boolean;
    }[] = [];
    lineChartLabels: any;
    showChart: boolean;
    options = {
        borderCapStyle: 'round',
        responsive: true
    };
    statisticsData = {
        variance: 0,
        standardDeviation: 0,
        sampleCorrelation: 0,
        rSquared: 0,
        error: 0
    };
    lineChartColors = [
        {
            backgroundColor: 'rgba(0,0,0,0)',
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
        },
        {
            borderCapStyle: 'round',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#5C616F',
            pointBackgroundColor: '#5C616F',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(92,97,111,0.5)',
            pointHoverBorderColor: 'rgba(92,97,111,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10
        }
    ];

    constructor(
        private tableService: TablesDataService,
        private userSessionService: UserSessionService
    ) {

    }
    ngOnInit(): void {
        // this.trainNewModel();
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
                this.selectX.push(key);
                this.selectY.push(key);
            }
        });
    }
    setfilters(): void {
        if (this.optionX && this.optionY) {
            const arrOptionsY = [];
            const arrOptionsX: number[] = [];
            const arrOptionsY2 = [];
            const arrXY: Array<Array<number>> = [];
            this.realData.forEach(row => {
                // detecta que no este vacio
                if (
                    row[this.optionY] === null ||
                    row[this.optionY] === undefined
                ) {
                    row[this.optionY] = 0;
                }
                if (
                    row[this.optionX] === null ||
                    row[this.optionX] === undefined
                ) {
                    row[this.optionX] = 0;
                }
                // ve que no se repita x
                const pos = arrOptionsX.indexOf(row[this.optionX]);
                if (pos === -1) {
                    arrOptionsX.push(row[this.optionX]);
                }
                // hace los valores de Y
                arrXY.push([row[this.optionX], row[this.optionY]]);
                arrOptionsY.push({
                    x: row[this.optionX],
                    y: row[this.optionY]
                });
            });
            // calcula la regress
            arrOptionsX.forEach(x => {
                const linearRegression = ss.linearRegressionLine(
                    ss.linearRegression(arrXY)
                )(+x);
                arrOptionsY2.push({ x: x, y: linearRegression });
            });
            // ordenar arreglos
            arrOptionsX.sort((a, b) => {
                return a - b;
            });
            arrOptionsY.sort((a, b) => {
                return a - b;
            });
            arrOptionsY2.sort((a, b) => {
                return a - b;
            });
            // otros datos
            this.statisticsData.rSquared = ss.rSquared(
                arrXY,
                ss.linearRegressionLine(ss.linearRegression(arrXY))
            );
            const arrY = [];
            arrOptionsY2.forEach(xy => {
                arrY.push(xy.y);
            });
            const arrRealY = [];
            const arrRealX = [];
            arrOptionsY.forEach(xy => {
                arrRealY.push(+xy.y);
                arrRealX.push(+xy.x);
            });
            this.statisticsData.variance = this.varianze(
                arrRealY,
                arrRealX,
                ss.linearRegression(arrXY).m,
                ss.linearRegression(arrXY).b
            );
            this.statisticsData.standardDeviation = ss.standardDeviation(arrY);
            this.statisticsData.sampleCorrelation = ss.sampleCorrelation(
                arrY,
                arrOptionsX
            );
            this.statisticsData.error = Math.sqrt(
                this.varianze(
                    arrRealY,
                    arrRealX,
                    ss.linearRegression(arrXY).m,
                    ss.linearRegression(arrXY).b
                )
            );

            // grafica de puntos
            this.lineChartData[0] = {
                data: arrOptionsY,
                label: this.optionY,
                type: 'scatter',
                showLine: false
            };
            // grafica de LR
            this.lineChartData[1] = {
                data: arrOptionsY2,
                label: 'Tendencia',
                type: 'line',
                fill: false
            };
            this.lineChartLabels = arrOptionsX;
            this.showChart = true;
            this.arrInputX = arrRealX;
            this.arrInputY = arrRealY;

        }
    }
    varianze(
        arrRealY: number[],
        arrRealX: number[],
        m: number,
        b: number
    ): number {
        let error = 0;
        arrRealX.forEach((itemRealX, i) => {
            const estimateY = itemRealX * m + b;
            const rest = estimateY - arrRealY[i];
            const restSquared = rest * rest;
            error += restSquared;
        });
        return error / (arrRealY.length / 2);
    }
    // TF
    // tslint:disable:typedef
    // async trainNewModel() {
    //     // Define a model for linear regression.
    //     this.linearModel = tf.sequential();
    //     this.linearModel.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    //     // Prepare the model for training: Specify the loss and the optimizer.
    //     this.linearModel.compile({
    //         loss: 'meanSquaredError',
    //         optimizer: 'sgd'
    //     });

    //     // Training data, completely random stuff
    //     const ys = tf.tensor1d(yTensoExample);
    //     const xs = tf.tensor1d(xTensorExample);

    //     // Train
    //     await this.linearModel.fit(xs, ys);

    //     console.log('model trained!');
    // }
    // linearPrediction(val) {
    //     const output = this.linearModel.predict(
    //         tf.tensor2d([val], [1, 1])
    //     ) as any;
    //     this.prediction = Array.from(output.dataSync())[0];
    //     console.log(output.dataSync())
    // }
}
