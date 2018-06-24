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
    constructor(
        private _fuseConfigService: FuseConfigService,
        private route: ActivatedRoute,
        private userSessionService: UserSessionService,
        private tableDataService: TablesDataService,
        private _fuseSidebarService: FuseSidebarService,
        private router: Router,

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
        console.log(tableName);
        this.tableDataService.deleteTable(tableName).subscribe(data => {
            this.dataSource = this.userSessionService.getUser(this.email);
        });
    }
    detectFiles(event): void {
        const file = event.target.files[0];
        const name: string = event.target.files.item(0).name;
        const typeFile: string = name.substring(name.indexOf('.') + 1);
        console.log(typeFile);
        const tableName = name
            .substring(0, name.indexOf('.'))
            .replace(/ /g, '%20');
        const reader = new FileReader();
        reader.onload = r => {
            if (typeFile === 'csv') {
                const jsonData = this.csvTojs(reader.result);
                this.uplodadData(jsonData, tableName);
            } else {
                this.excelFile(event, tableName);
            }
        };
        reader.readAsText(file);
    }
    uplodadData(dataToUp, name: string): void {
        this.showLoader = true;
        this.tableDataService
            .sendData(dataToUp, name, this.email)
            .subscribe(res => {
                this.showLoader = false;
                console.log(res);
                this.dataSource = this.userSessionService.getUser(this.email);
            });
    }
    onSelect(row): void {
        this.userSessionService.userTableSelect.next(row);
        this.router.navigate(['panel']);
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
        const arrJson = [];
        let columsNames: string[];
        wb.SheetNames.forEach(sheetName => {
            const arrRows = [];
            const dataRows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
                header: 1
            });
            dataRows.forEach((row: Array<any>, numRow) => {
                const obj = {};
                // caputa nombre de colums
                if (numRow === 0) {
                    columsNames = row;
                } else {
                    // crea un obj con nomColumna: dato
                    if (columsNames.length === row.length) {
                        columsNames.forEach((nameColum, numColum) => {
                            obj[nameColum] = row[numColum];
                        });
                        arrRows.push(obj);
                    }
                }
            });
            arrJson.push({ name: sheetName, data: arrRows });
        });
        return arrJson;
    }
}
