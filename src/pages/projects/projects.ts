import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';


@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html'
})
export class ProjectsPage {

   private auth     : any;
   public projects    : any;

   constructor( public navCtrl       : NavController,
                private platform     : Platform,
                private modalCtrl    : ModalController,
                private _IMG         : ImageProvider,
                private _LOADER      : PreloaderProvider,
                private _DB          : DatabaseProvider)
   {
   }


   loadAndParseProjects()
   {
      this.projects = this._DB.renderProjects();
      this._LOADER.hidePreloader();
   }


   addRecord()
   {
      let modal = this.modalCtrl.create('Modals');
      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this.loadAndParseProjects();
         }
      });
      modal.present();
   }


   editProject(project)
   {
      let params = { project: project, isEdited: true },
          modal  = this.modalCtrl.create('Modals', params);

      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this.loadAndParseProjects();
         }
      });
      modal.present();
   }



   deleteProject(project)
   {
      this._DB.deleteProject(project.id)
      .then((data) =>
      {
         this.loadAndParseProjects();
      });
   }


}
