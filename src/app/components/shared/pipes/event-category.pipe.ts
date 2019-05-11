import { Pipe, PipeTransform } from '@angular/core';
import { EventCategory } from '../../../domain';
import { TranslateService } from '@ngx-translate/core';

@Pipe({name: 'appEventCategory'})
export class EventCategoryPipe implements PipeTransform {
  private icons: Map<EventCategory, string> = new Map<EventCategory, string>([
    [EventCategory.Children, 'ice-cream'],
    [EventCategory.Championship, 'trophy'],
    [EventCategory.People, 'md-contacts'],
    [EventCategory.Restaurant, 'restaurant'],
    [EventCategory.Music, 'musical-notes'],
    [EventCategory.Show, 'eye'],
  ]);

  constructor(private readonly translate: TranslateService) {}

  public transform(value: EventCategory): string {
    return this.icons.get(value) || '';
  }
}
