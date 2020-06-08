import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { INewNotification } from 'src/app/core/model/INewNotification';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.scss'],
})
export class CreateNotificationComponent implements OnInit {
  @Output() emitNotification = new EventEmitter<INewNotification>();

  notificationForm = new FormGroup({
    unitsBefore: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), this.maxValueValidator()]),
    unitsType: new FormControl('', Validators.required),
  });

  maxValueValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (+control.value >= 60) {
        return {'maxvalue': {value: control.value}};
      } else {return null; }
    };
  }

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}

  onSubmit() {
    console.log(this.notificationForm.value);
    const notification = {
      unitsBefore: +this.notificationForm.get('unitsBefore').value,
      unitsType: this.notificationForm.get('unitsType').value
    }
    this.emitNotification.emit(notification);
  }

}
