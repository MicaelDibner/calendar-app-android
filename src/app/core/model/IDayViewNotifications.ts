import { INotification } from './INotification';

export interface IDayViewNotifications{
    yomtov?: INotification[];
    holyday?: INotification[];
    omer?: INotification[];
    chanukah?: INotification[];
    roshhodesh?: INotification[];
    taanis?: INotification[];
    kidushLevana?: INotification[];
    parasha?: INotification[];
    specialParasha?: INotification[];
    shabbatMevorachim?: INotification[];
    aseresYomei?: INotification[];
    isYomShishi?: INotification[];
    isShabbat?: INotification[];
}