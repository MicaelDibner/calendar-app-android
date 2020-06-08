import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDates } from '../model/IDates';
import { IDayInfoModel} from '../model/IDayInfoModel';

/**
 * Service contains two observables in format BehaviorSubjec, that hame method getValue()
 * and return emitted value to component
 */

@Injectable({
  providedIn: 'root'
})
export class SelectedDateService {
  public selectedDateSubscribtion = new BehaviorSubject<IDates>(null);
  public selectedDateDayInfoSubscribtion = new BehaviorSubject<IDayInfoModel>(null);
}
