import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { ImageProvider } from '../../providers/image';
import { PreloaderProvider } from '../../providers/preloader';
import { DatabaseProvider } from '../../providers/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Component({
	selector: 'tabs-models',
	templateUrl: 'models.html'
})
export class ModelsPage {

}
