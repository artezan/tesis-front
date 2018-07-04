import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as ss from 'simple-statistics';
import * as ml from 'ml-regression';
import * as tf from '@tensorflow/tfjs';
import { DrawableDirective } from '../../directives/drawable.directive';
import { fuseAnimations } from '@fuse/animations';
import {
    yTensoExample,
    xTensorExample,
    mlX,
    mlY
} from '../../../../_config/data-model';
// const PolynomialRegression = require('ml-regression').NLR.PolynomialRegression;

@Component({
    selector: 'app-ts-test',
    templateUrl: './ts-test.component.html',
    styleUrls: ['./ts-test.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TsTestComponent implements OnInit {
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
    // ml
    SLR = ml.SLR;

    constructor() {
        this.loadModel();
        this.trainNewModel();
    }
    // tslint:disable:typedef

    ngOnInit() {
        // this.mlRegression();
    }
    //// LOAD PRETRAINED KERAS MODEL ////
    async loadModel() {
        this.model = await tf.loadModel('/assets/model.json');
    }

    async predict(imageData: ImageData) {
        const pred = await tf.tidy(() => {
            // Convert the canvas pixels to
            let img = tf.fromPixels(imageData, 1);
            const arr: any = [1, 28, 28, 1];
            img = img.reshape(arr);
            img = tf.cast(img, 'float32');

            // Make and format the predications
            const output = this.model.predict(img) as any;

            // Save predictions on the component
            this.predictions = Array.from(output.dataSync());
            // arrResult.forEach((item, i) => {
            //     const itemnumber: any = item;
            //     this.predictions[i] =  Math.round(itemnumber);
            // });

            console.log(this.predictions);
            //  this.dataNum[0].data = this.predictions;
        });
    }
    // TF
    // tslint:disable:typedef
    async trainNewModel() {
        // Define a model for linear regression.
        this.linearModel = tf.sequential();
        this.linearModel.add(tf.layers.dense({ units: 1, inputShape: [1] }));

        // Prepare the model for training: Specify the loss and the optimizer.
        this.linearModel.compile({
            loss: 'meanSquaredError',
            optimizer: 'sgd'
        });

        // Training data, completely random stuff
        const ys = tf.tensor1d(yTensoExample);
        const xs = tf.tensor1d(xTensorExample);

        // Train
        await this.linearModel.fit(xs, ys);

        console.log('model trained!');
    }
    linearPrediction(val) {
        const output = this.linearModel.predict(
            tf.tensor2d([val], [1, 1])
        ) as any;
        this.prediction = Array.from(output.dataSync())[0];
        console.log(output.dataSync());
    }
    mlRegression(): void {
        const inputs = mlX;
        const outputs = mlY;
        const regressionModel = new this.SLR(inputs, outputs);
        console.log(regressionModel.toString(3));
        console.log(regressionModel.predict(20));
        // const regression = new PolynomialRegression(inputs, outputs, 5);
        // console.log(regression.predict(80)); // Apply the model to some x value. Prints 2.547.
        // console.log(regression.coefficients); // Prints the coefficients in increasing order of power (from 0 to degree).
        // console.log(regression.toString(3)); // Prints a human-readable version of the function.
        // console.log(regression.toLaTeX());
    }
}
