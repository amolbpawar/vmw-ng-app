import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ClrDatagridModule,
  ClarityModule,
  ClrFormsModule,
  ClrModalModule,
} from '@clr/angular';
import { OrgChartComponent } from './components/org-chart/org-chart.component';

@NgModule({
  declarations: [OrgChartComponent],
  imports: [CommonModule, ClrModalModule, ClrDatagridModule, ClarityModule],
  exports: [
    ClrModalModule,
    ClrDatagridModule,
    ClarityModule,
    ClrFormsModule,
    OrgChartComponent,
  ],
})
export class SharedModule {}
