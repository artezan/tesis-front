import { FuseNavigationService } from './../../../../@fuse/components/navigation/navigation.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PanelComponent implements OnInit {

  constructor(private _fuseNavigationService: FuseNavigationService) {
  }

  ngOnInit() {
  }

}
