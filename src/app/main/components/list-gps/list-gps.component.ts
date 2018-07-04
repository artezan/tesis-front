import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'app-list-gps',
    templateUrl: './list-gps.component.html',
    styleUrls: ['./list-gps.component.scss']
})
export class ListGpsComponent implements OnInit, AfterViewInit {
    @Input() items: any[] = [];
    @Output() finish: EventEmitter<boolean> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
    ngAfterViewInit(): void {
        this.finish.emit(true)
    }
}
