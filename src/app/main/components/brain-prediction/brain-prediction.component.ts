import { UserSessionService } from './../../../services/user-session.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TablesDataService } from '../../../services/tables-data.service';

@Component({
    selector: 'app-brain-prediction',
    templateUrl: './brain-prediction.component.html',
    styleUrls: ['./brain-prediction.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BrainPredictionComponent implements OnInit {
    realData: any;
    inputOptions = [];
    isString = false;
    input: any[];
    output: string;
    tableName: string;
    arrInputsPredict = [];
    question = [];
    prediction;
    loader = false;
    optionString = [];
    constructor(
        private tableService: TablesDataService,
        private userSessionService: UserSessionService
    ) {}

    ngOnInit(): void {
        this.userSessionService.userTableSelect.subscribe(tableName => {
            if (tableName !== '') {
                this.tableName = tableName;
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
            this.inputOptions.push(key);
        });
    }
    // si es string generar opciones
    setfilters(): void {
        this.input.forEach((option, index) => {
            const arr = [];
            this.realData.forEach(data => {
                if (isNaN(data[option]) || this.isString) {
                    this.isString = true;
                    const pos = arr.indexOf(data[option]);
                    if (pos === -1) {
                        arr.push(data[option]);
                    }
                }
            });
            this.optionString[index] = arr;
        });
    }
    sendData(): void {
        this.loader = true;

        if (!this.isString) {
            this.question = this.question.map(Number);
        }
        const body = {
            output: this.output,
            tableName: this.tableName,
            input: this.input,
            question: this.question,
            isString: this.isString
        };
        this.tableService.getPredictionBrain(body).subscribe(data => {
            this.loader = false;
            this.prediction = data.toString();
        });
    }
}
