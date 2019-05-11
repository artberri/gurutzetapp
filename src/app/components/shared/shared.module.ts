import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultilanguagePipe, EventCategoryPipe } from './pipes';
import { ToggleLanguageDirective } from './directives';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [MultilanguagePipe, EventCategoryPipe, ToggleLanguageDirective],
  exports: [MultilanguagePipe, EventCategoryPipe, ToggleLanguageDirective]
})
export class SharedModule {}
