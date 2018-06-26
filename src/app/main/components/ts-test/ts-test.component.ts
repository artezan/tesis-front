import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as ss from 'simple-statistics';
import * as tf from '@tensorflow/tfjs';
import { DrawableDirective } from '../../directives/drawable.directive';
import { fuseAnimations } from '@fuse/animations';

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
    // chart
    constructor() {
        this.loadModel();
    }
    // tslint:disable:typedef

    ngOnInit() {}
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
}
