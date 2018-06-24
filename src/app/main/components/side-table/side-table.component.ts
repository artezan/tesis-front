import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'app-side-table',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './side-table.component.html',
    styleUrls: ['./side-table.component.scss']
})
export class SideTableComponent implements OnInit, OnChanges {
    @Input()
    data: {
        arrSize: number;
        objSize: number;
        numString: number;
        numNumber: number;
    };
    @Input() name: string;
    showLoader = false;
    constructor() {}

    ngOnInit(): void {}
    ngOnChanges(changes: SimpleChanges): void {
        this.showLoader = true;
        if (changes.data) {
        this.showLoader = false;
            this.data = changes.data.currentValue;
        }
    }
}
