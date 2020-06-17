import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  private buttonBackHandler;
  private buttonMenuHandler;
  private buttonRHandler;
  private buttonQHandler;

  constructor(private renderer: Renderer2,
              private navCntrl: NavController, private storageService: StorageService, public translate: TranslateService) { }

  ngOnInit() {}

  ionViewWillEnter(): void{
    this.buttonBackHandler = this.renderer.listen('document', 'backbutton', () => this.onMenu());
    this.buttonMenuHandler = this.renderer.listen('document', 'menubutton', () => this.onBack());
    this.buttonRHandler = this.renderer.listen('document', 'keydown.r', () => this.onMenu());
    this.buttonQHandler = this.renderer.listen('document', 'keydown.q', () => this.onBack());
  }

  ionViewWillLeave(): void{
    this.buttonBackHandler();
    this.buttonMenuHandler();
    this.buttonRHandler();
    this.buttonQHandler();
  }

  onMenu() {
    console.log('back settings pressed');
    this.navCntrl.pop();
  }

  onBack() {
    console.log('menu pressed');
  }

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

}
