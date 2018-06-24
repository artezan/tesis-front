import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { API_URL } from '_config/api.url';
import { map } from 'rxjs/operators';
import { SumaryTable } from 'models/sumary-table.model';

@Injectable({
  providedIn: 'root'
})
export class TablesDataService {

  constructor(private http: HttpClient) { }
  deleteTable(table): Observable<any> {
    const header = new HttpHeaders({
      email: 'cesar@correo.com'
    });
    return this.http.delete(API_URL.GENRAL_TABLES + table, { headers: header });
  }
  sendData(data, nameTable: string, email): Observable<any[]> {
    const header = new HttpHeaders({
      email: 'cesar@correo.com'
    });
    return this.http.post<any[]>(API_URL.GENRAL_TABLES + nameTable, data, {
      headers: header
    });
  }
  getTable(table): Observable<any> {
    return this.http.get(API_URL.GENRAL_TABLES + table).pipe(map((data: any) => data.result));
  }
  getTableSumary(table): Observable<SumaryTable> {
    return this.http.get(API_URL.GENRAL_TABLES_SUMARY + table).pipe(map((data: any) => data.data));
  }
}
