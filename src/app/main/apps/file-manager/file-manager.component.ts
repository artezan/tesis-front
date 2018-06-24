import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../../../services/user-session.service';

@Component({
    selector: 'file-manager',
    templateUrl: './file-manager.component.html',
    styleUrls: ['./file-manager.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FileManagerComponent implements OnInit, OnDestroy {
    selected: any;
    pathArr: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fileManagerService: FileManagerService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseConfigService: FuseConfigService,
        private route: ActivatedRoute,
        private userSessionService: UserSessionService
    ) {
        this.route.queryParams.subscribe(params => {
            if (params.email) {
                this.userSessionService.getUser(params.email).subscribe(res => {
                    console.log(res);
                });
            }
        });
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
