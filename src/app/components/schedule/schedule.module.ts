import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulePage } from './schedule.page';
import { DayPage } from './day/day.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: SchedulePage },
      { path: 'day/:id', component: DayPage }
    ]),
    TranslateModule,
    SharedModule
  ],
  declarations: [SchedulePage, DayPage]
})
export class ScheduleModule {}
