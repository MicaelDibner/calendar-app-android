import { Component, OnInit, HostListener } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private navCntrl: NavController, private storageService: StorageService, public translate: TranslateService) { }

  ngOnInit() {}

/**
 * Method calls method in StorageService for writing text file
 */

writeFile() {
  this.storageService.setFileInStorage();
}


/**
 * Method calls method in StorageService for reading text file
 */

readFile() {
  this.storageService.getFileFromStorage();
}

/**
 * Method calls method in StorageService for clearing database
 */

deleteDatabase() {
  this.storageService.removeDatabase();
}

changeLanguage() {
  if (this.translate.currentLang === 'en') {
    this.translate.use('he');
  } else { this.translate.use('en'); }
  console.log(this.translate.currentLang);
}

changeGeolocation(){
  this.navCntrl.navigateForward('menu/geolocation');
}

  @HostListener('document:backbutton')
onMenu() {
    console.log('back settings pressed');
    this.navCntrl.pop();
  }
@HostListener('document:keydown.r')
onQ() {
    console.log('back settings pressed');
    this.navCntrl.pop();
    // this.location.back();
}

}
