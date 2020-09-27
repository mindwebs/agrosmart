import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule, MatButtonToggleModule, MatSlideToggleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { DataChartsComponent } from './widgets/data-charts/data-charts.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardsComponent } from './widgets/cards/cards.component';
import { FullcontentComponent } from './components/fullcontent/fullcontent.component';
import { NlHeaderComponent } from './components/nl-header/nl-header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,    
    SidebarComponent,
    DataChartsComponent,
    CardsComponent,
    FullcontentComponent,
    NlHeaderComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FlexLayoutModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatSlideToggleModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    FullcontentComponent,
    NlHeaderComponent,
    DataChartsComponent,
    CardsComponent
  ]
})
export class SharedModule { }
