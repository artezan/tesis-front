import { GeneratorChartComponent } from './main/components/generator-chart/generator-chart.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatChipsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { FakeDbService } from 'app/fake-db/fake-db.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LoginModule } from 'app/main/login/login.module';
import { ListTablesComponent } from './main/components/list-tables/list-tables.component';
import { CdkTableModule } from '@angular/cdk/table';
import { SideTableComponent } from './main/components/side-table/side-table.component';
import { PanelComponent } from './main/components/panel/panel.component';
import { GeneralChartComponent } from './main/components/general-chart/general-chart.component';
import { StaticsComponent } from './main/components/statics/statics.component';
import { ChartsModule } from 'ng2-charts';
import { ChartSaveComponent } from './main/components/chart-save/chart-save.component';
import { EstimateComponent } from './main/components/estimate/estimate.component';

const appRoutes: Routes = [
    { path: 'list-tables', component: ListTablesComponent },
    { path: 'panel', component: PanelComponent },
    { path: 'stat', component: StaticsComponent },
    { path: 'generator-chart', component: GeneratorChartComponent },
    { path: 'save-chart', component: ChartSaveComponent },
    {
        path: 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
    },
    // siempre ahi
    {
        path: '**',
        redirectTo: 'login'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        ListTablesComponent,
        SideTableComponent,
        PanelComponent,
        GeneralChartComponent,
        StaticsComponent,
        GeneratorChartComponent,
        ChartSaveComponent,
        EstimateComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        MatListModule,
        MatTableModule,
        CdkTableModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatSlideToggleModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatChipsModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,

        // App modules
        LayoutModule,
        // SampleModule,
        LoginModule,
        // fake DB
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        ChartsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
