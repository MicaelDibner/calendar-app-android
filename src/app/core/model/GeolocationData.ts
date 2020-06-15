import { IGeolocation } from './IGeolocation';

export const GeolocationData = {
    Israel: [     {country: 'Israel',
                   city: 'Jerusalem',
                    latitude: 31.76832,
                   longitude: 35.21371,
                   elevation: 779.46,
                   time_zone : 'Asia/Jerusalem'},
                    {country: 'Israel',
                    city: 'Haifa',
                    latitude: 32.79405,
                    longitude: 34.98957,
                    elevation: 256.05,
                    time_zone : 'Asia/Jerusalem'}
                ] as IGeolocation[],
    Russia: [     { country: 'Russia',
                    city: 'Moscow',
                    latitude: 55.75583,
                    longitude: 37.61730,
                    elevation: 151.78,
                    time_zone : 'Europe/Moscow'}
                 ] as IGeolocation[],
}