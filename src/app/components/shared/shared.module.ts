import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultilanguagePipe, EventCategoryPipe } from './pipes';
import { ToggleLanguageDirective, FavouriteDirective } from './directives';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [MultilanguagePipe, EventCategoryPipe, ToggleLanguageDirective, FavouriteDirective],
  exports: [MultilanguagePipe, EventCategoryPipe, ToggleLanguageDirective, FavouriteDirective]
})
export class SharedModule {}
