import { INewNotification } from './INewNotification';

export interface IDayViewNewNotifications{
    yomtov?: INewNotification[];
    holyday?: INewNotification[];
    omer?: INewNotification[];
    chanukah?: INewNotification[];
    roshhodesh?: INewNotification[];
    taanis?: INewNotification[];
    kidushLevana?: INewNotification[];
    parasha?: INewNotification[];
    specialParasha?: INewNotification[];
    shabbatMevorachim?: INewNotification[];
    aseresYomei?: INewNotification[];
    isYomShishi?: INewNotification[];
    isShabbat?: INewNotification[];
}