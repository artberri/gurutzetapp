import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Event, INotifications, ITranslator } from '../domain';

@Injectable()
export class NotificationsService implements INotifications {
  constructor(
    private readonly localNotifications: LocalNotifications,
    private readonly translator: ITranslator
  ) {}

  public schedule(event: Event): void {
    const offset = new Date().getTimezoneOffset(),
            scheduleDate = (event.id + '').substring(0, 8),
            year = scheduleDate.substring(0, 4),
            month = scheduleDate.substring(4, 6),
            day = scheduleDate.substring(6, 8),
            time = event.time.split(' ')[0].replace('.', ':'),
            dateString = year + '-' + month + '-' + day + 'T' + time + ':00',
            scheduleDateTime = new Date(new Date(dateString).getTime() - 30 * 60 * 1000 + offset * 60 * 1000);

    const text: string = this.translator.getCurrentLanguage() === 'eu' ? event.description.eu : event.description.es;

    this.localNotifications.schedule({
      id: event.id,
      text,
      led: '00FF00',
      vibrate: true,
      trigger: {
        at: scheduleDateTime
      },
    });
  }

  public cancel(event: Event): void {
    this.localNotifications.cancel(event.id);
  }
}
