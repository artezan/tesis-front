import { Observable } from 'rxjs';
import {
    UserSessionService,
    UserChartSettings
} from './../../../services/user-session.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-chart-save',
    templateUrl: './chart-save.component.html',
    styleUrls: ['./chart-save.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChartSaveComponent implements OnInit {
    containerClass = 'col';
    arrItemFlex: { order: number; pos: number; width: any }[] = [];
    option3 = false;
    option4 = false;
    option1 = false;
    option2 = true;
    hasData = false;
    showLoader: boolean;
    chartsSaved$: Observable<UserChartSettings[]>;

    constructor(public userSessionService: UserSessionService) {
        this.showLoader = true;
        userSessionService.userChartSaved.subscribe(
            (settingsArr: UserChartSettings[]) => {
                console.log(settingsArr);
                settingsArr.forEach((item, i) => {
                    this.arrItemFlex.push({ order: i, pos: i, width: '100%' });
                });

                this.showLoader = false;
                console.log(settingsArr);
                if (settingsArr.length === 0) {
                    this.hasData = false;
                } else {
                    this.hasData = true;
                }
            }
        );
        // drag
    }

    ngOnInit(): void {
        this.chartsSaved$ = this.userSessionService.userChartSaved;
    }
    changeClass(nameClass): void {
        this.containerClass = nameClass;
        if (nameClass === 'row') {
            this.option1 = true;
            this.option2 = false;
        } else {
            this.option1 = false;
            this.option2 = true;
        }
        this.option4 = false;
        this.option3 = false;
    }
    changeOrder(isBack: boolean, index: number): void {
        if (isBack) {
            this.arrItemFlex[index].order--;
        } else {
            this.arrItemFlex[index].order++;
        }
    }
    changeToFull(index: number): void {
        this.arrItemFlex[index].width = '100%';
    }
    changeToDiv(index: number): void {
        this.arrItemFlex[index].width = 'auto';
    }
    changeOption3() {
        this.option4 = false;
        this.option3 = true;
        this.option1 = false;
        this.option2 = false;
    }
    changeOption4() {
        this.option4 = true;
        this.option3 = false;
        this.option1 = false;
        this.option2 = false;

    }
}
