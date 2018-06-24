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
    hasData = false;
    showLoader: boolean;
    chartsSaved$: Observable<UserChartSettings[]>;

    constructor(public userSessionService: UserSessionService) {
        this.showLoader = true;
        this.chartsSaved$ = userSessionService.userChartSaved;
        userSessionService.userChartSaved.subscribe(
            (settingsArr: UserChartSettings[]) => {
                this.showLoader = false;
                console.log(settingsArr);
                if (settingsArr.length === 0) {
                    this.hasData = false;
                } else {
                    this.hasData = true;
                }
            }
        );
    }

    ngOnInit(): void {}
}
