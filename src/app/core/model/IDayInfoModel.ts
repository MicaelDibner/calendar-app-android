import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


export interface IDayInfoModel{
    gregorian: NgbDateStruct;
    yomtov: boolean;
    holyday: boolean;
    omer: number;
    chanukah: number;
    roshhodesh: boolean;
    holydayNumber: number;
    taanis: string;
    kidushLevana: boolean | object;
    parasha: number;
    specialParasha: number;
    shabbatMevorachim: boolean;
    aseresYomei: boolean;
    isYomShishi: boolean;
    isShabbat: boolean;
    molad: Date;
    candleLighting: boolean;
}