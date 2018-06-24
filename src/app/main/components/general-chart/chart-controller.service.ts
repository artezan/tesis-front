import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartControllerService {
    backup1 = new BehaviorSubject({});
    backup2 = new BehaviorSubject({});

  constructor() { }
}
