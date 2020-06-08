import { INotification } from './INotification';

export interface IEvent {
  date: Date;
  title: string;
  isUserEvent: boolean;
  text?: string;
  notifications: INotification[];
  color?: string;
  isCollapsed?: boolean;
  isNotificationsCollapsed?: boolean;
}
