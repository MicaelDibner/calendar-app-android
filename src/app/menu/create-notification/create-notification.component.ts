import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { INewNotification } from 'src/app/core/model/INewNotification';
import { TranslateService } from '@ngx-translate/core';

/**
 * Page for Creating new Event; type IEvent
 */

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.scss'],
})
export class CreateNotificationComponent implements OnInit {
/**
 * Event emiter for emitting INewNotification to CreateEventComponent
 */
  @Output() emitNotification = new EventEmitter<INewNotification>();
  @ViewChild('select') selectView: ElementRef;

  notificationForm = new FormGroup({
    unitsBefore: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), this.maxValueValidator()]),
    unitsType: new FormControl('', Validators.required),
  });

/**
 * Custom validator for max number value for text-type input
 */

  maxValueValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (+control.value >= 60) {
        return {'maxvalue': {value: control.value}};
      } else {return null; }
    };
  }

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

/**
 * Emit INewNotification to CreateEventComponent
 */

  onSubmit() {
    console.log(this.notificationForm.value);
    const notification = {
      unitsBefore: +this.notificationForm.get('unitsBefore').value,
      unitsType: this.notificationForm.get('unitsType').value
    }
    this.emitNotification.emit(notification);
  }

}
