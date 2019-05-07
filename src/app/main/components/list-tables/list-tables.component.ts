import { UserSessionTables } from './../../../../models/user-session';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';
import { fuseAnimations } from '@fuse/animations';
import { Observable } from 'rxjs';
import { TablesDataService } from '../../../services/tables-data.service';
import * as XLSX from 'xlsx';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { SumaryTable } from 'models/sumary-table.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '_config/api.url';
import { SocketIoService } from 'app/services/socket-io.service';

// Actions you can take on the App
export enum Action {
    JOINED,
    LEFT,
    RENAME
}

// Socket.io events
export enum Event {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect'
}

@Component({
    selector: 'app-list-tables',
    templateUrl: './list-tables.component.html',
    styleUrls: ['./list-tables.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ListTablesComponent implements OnInit {
    dataSource: Observable<UserSessionTables[]>;
    document = 'spreadsheet';
    email;
    displayedColumns = [
        'icon',
        'name',
        'date',
        'detail-button',
        'delete-button',
        'enter-button'
    ];
    showLoader = false;
    nameSumary: string;
    dataSumary: SumaryTable;
    type: string;
    ioConnection: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private route: ActivatedRoute,
        private userSessionService: UserSessionService,
        private tableDataService: TablesDataService,
        private _fuseSidebarService: FuseSidebarService,
        private router: Router,
        private http: HttpClient,
        public socketService: SocketIoService
    ) {
        this.route.queryParams.subscribe(params => {
            if (params.email) {
                this.email = params.email;
            }
            // Configure the layout
            this._fuseConfigService.config = {
                layout: {
                    navbar: {
                        hidden: true
                    },
                    toolbar: {
                        hidden: false
                    },
                    footer: {
                        hidden: true
                    }
                }
            };
        });
    }

    ngOnInit(): void {
        this.dataSource = this.userSessionService.getUser(this.email);
        this.socketService.onGetEventUser().subscribe(userName => {
            this.dataSource = this.userSessionService.getUser(this.email);
        });
        this.initIoConnection();
    }
    private initIoConnection(): void {
        this.socketService.onEvent(Event.CONNECT).subscribe(() => {
            console.log('connected');
        });

        this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
            console.log('disconnected');
        });
    }
    openDetail(name): void {
        this.nameSumary = name;
        this.tableDataService.getTableSumary(name).subscribe(data => {
            this.dataSumary = {
                arrSize: data.arrSize,
                numNumber: data.numNumber,
                objSize: data.objSize,
                numString: data.numString
            };
        });
        this._fuseSidebarService.getSidebar('app-side-table').toggleOpen();
    }
    deleteTable(tableName: string): void {
        this.tableDataService.deleteTable(tableName).subscribe(data => {
            this.dataSource = this.userSessionService.getUser(this.email);
        });
    }
    detectFiles(event): void {
        const file = event.target.files[0];
        const body: FormData = new FormData();
        body.append('file', file);
        const name: string = event.target.files.item(0).name;
        const typeFile: string = name.substring(name.indexOf('.') + 1);
        this.type = typeFile;
        console.log(typeFile);
        const tableName = name
            .substring(0, name.indexOf('.'))
            .replace(/ /g, '%20');
        if (typeFile === 'docx') {
            this.getDocx(body, tableName);
        }

        const reader = new FileReader();
        const readerBuffer = new FileReader();
        reader.onload = r => {
            if (typeFile === 'csv') {
                const jsonData = this.csvTojs(reader.result);
                this.uplodadData(jsonData, tableName);
            } else if (typeFile === 'docx') {
                // this.getDocx(event.target.files[0]);
            } else {
                this.excelFile(event, tableName);
            }
        };
        reader.readAsText(file);
        readerBuffer.onload = f => {
            if (typeFile === 'docx') {
                //   this.getDocx(readerBuffer.result);
            }
        };
        readerBuffer.readAsDataURL(file);
        // refresh input value
    //    (<HTMLInputElement>document.getElementById('fileInput')).value = '';
    }
    getDocx(body, tableName): void {
        this.showLoader = true;
        this.http.post(API_URL.FILE_POST, body).subscribe((d: any) => {
            console.log(d);
            this.uplodadData(d.data, tableName);
        });
    }
    uplodadData(dataToUp, name: string): void {
        this.showLoader = true;
        this.tableDataService
            .sendData(dataToUp, name, this.email, this.type)
            .subscribe(res => {
                this.showLoader = false;
                console.log(res);
                this.dataSource = this.userSessionService.getUser(this.email);
            });
            (<HTMLInputElement>document.getElementById('fileInput')).value = '';
    }
    onSelect(row: UserSessionTables): void {
        this.userSessionService.userTableSelect.next(row.name);
        if (row.type && row.type === 'docx') {
            this.router.navigate(['docx-data']);
        } else {
            this.router.navigate(['panel']);
        }
    }
    // helper
    csvTojs(csv): any[] {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
            const obj = {};

            // tslint:disable-next-line:prefer-const
            var row = lines[i],
                queryIdx = 0,
                startValueIdx = 0,
                idx = 0;

            if (row.trim() === '') {
                continue;
            }

            while (idx < row.length) {
                /* if we meet a double quote we skip until the next one */
                let c = row[idx];

                if (c === '"') {
                    do {
                        c = row[++idx];
                    } while (c !== '"' && idx < row.length - 1);
                }

                if (
                    c === ',' ||
                    /* handle end of line with no comma */ idx ===
                        row.length - 1
                ) {
                    /* we've got a value */
                    let value = row
                        .substr(startValueIdx, idx - startValueIdx)
                        .trim();

                    /* skip first double quote */
                    if (value[0] === '"') {
                        value = value.substr(1);
                    }
                    /* skip last comma */
                    if (value[value.length - 1] === ',') {
                        value = value.substr(0, value.length - 1);
                    }
                    /* skip last double quote */
                    if (value[value.length - 1] === '"') {
                        value = value.substr(0, value.length - 1);
                    }

                    const key = headers[queryIdx++];

                    obj[key.trim()] = value;
                    startValueIdx = idx + 1;
                }

                ++idx;
            }

            result.push(obj);
        }
        // return result;
        const arrResult = [];
        result.forEach(item => {
            const objectTrasnform = {};
            Object.keys(item).forEach(key => {
                // numero
                if (item[key] !== '') {
                    if (!isNaN(item[key])) {
                        objectTrasnform[key] = +item[key];
                    } else {
                        objectTrasnform[key] = item[key];
                    }
                } else {
                    objectTrasnform[key] = item[key];
                }
            });
            arrResult.push(objectTrasnform);
        });

        return arrResult;
    }
    excelFile(evt: any, tableName: string): void {
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>evt.target;
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

            // /* grab first sheet */
            // const wsname: string = wb.SheetNames[1];
            // const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            // /* save data */
            // this.dataXls = (XLSX.utils.sheet_to_json(ws, {header: 1}));
            const dataExcelJson = this.exelToJson(wb);
            this.uplodadData(dataExcelJson[0].data, tableName);
        };
        reader.readAsBinaryString(target.files[0]);
    }
    private exelToJson(
        wb: XLSX.WorkBook
    ): Array<{ data: any[]; name: string }> {
        // arreglo que va a tener el JSON
        const arrJson = [];
        // Nombre de las columnas
        let columsNames: string[];
        // Revisa cada hoja de excel
        wb.SheetNames.forEach(sheetName => {
            // arreglo para los datos de las filas transformadas
            const arrRows = [];
            // datos de las filas
            const dataRows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
                header: 1
            });
            // recorre el arreglo de las filas
            dataRows.forEach((row: Array<any>, numRow) => {
                const obj = {};
                // caputa nombre de columnas
                if (numRow === 0) {
                    columsNames = row;
                } else {
                    // crea un obj con nomColumna: dato
                    if (columsNames.length === row.length) {
                        columsNames.forEach((nameColum, numColum) => {
                            obj[nameColum] = row[numColum];
                            if (!isNaN(obj[nameColum])) {
                                obj[nameColum] = +row[numColum];
                            }
                        });
                        arrRows.push(obj);
                    }
                }
            });
            arrJson.push({ name: sheetName, data: arrRows });
        });
        // regresa los datos en JSON y el nombre de la hoja
        return arrJson;
    }
}
