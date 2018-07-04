import { TablesDataService } from './../../../services/tables-data.service';
import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { UserSessionService } from '../../../services/user-session.service';

@Component({
    selector: 'app-modal-detail',
    templateUrl: './modal-detail.component.html',
    styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnInit, OnChanges {
    tableName: string;
    dataItem = {};
    arrkeys = [];
    @Input() itemId: string;
    @Input() titleItem: string;

    constructor(
        private userSessionService: UserSessionService,
        private tableService: TablesDataService
    ) {
        this.userSessionService.userTableSelect.subscribe(table => {
            this.tableName = table;
        });
    }

    ngOnInit(): void {}
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemId) {
            this.itemId = changes.itemId.currentValue;
            if (this.itemId) {
                this.getItemData(this.itemId);
            }
        }
        if (changes.titleItem) {
            this.titleItem = changes.titleItem.currentValue;
        }
    }
    getItemData(id: string): void {
        this.tableService
            .getItemById(id, this.tableName)
            .subscribe(dataSource => {
                console.log(dataSource);
                this.arrkeys = Object.keys(dataSource[0]);
                Object.keys(dataSource[0]).forEach(key => {
                    if (key !== '_id') {
                        this.dataItem[key] = dataSource[0][key];
                    }
                });
            });
    }
}
