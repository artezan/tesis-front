import { API_URL } from './../../_config/api.url';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserSessionTables } from 'models/user-session';
export interface UserChartSettings {
    showChart: boolean;
    lineChartData: {
        data: number[];
        label: string;
    }[];
    lineChartLabels: string[];
    lineChartLegend: boolean;
    lineChartColors: Array<any>;
    lineChartType: string;
    numSort: number;
    typeSort: string;
    titleX: string;
    titleY: string;
    isOneData: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class UserSessionService {
    userTableSelect = new BehaviorSubject('');
    userChartSaved = new BehaviorSubject<UserChartSettings[]>([]);

    constructor(private http: HttpClient) {}
    getUser(email): Observable<UserSessionTables[]> {
        return this.http
            .get(API_URL.USERS_GET + 'cesar@correo.com')
            .pipe(map((data: any) => data.data.tables));
    }
    saveChartUser(data: UserChartSettings): void {
        let newArr: UserChartSettings[] = [];
        this.userChartSaved.subscribe((settingsArr: UserChartSettings[]) => {
            newArr = settingsArr;
        });
        newArr.push(data);
        this.userChartSaved.next(newArr);
    }
}
