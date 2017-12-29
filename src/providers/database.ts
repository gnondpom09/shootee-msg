import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';


@Injectable()
export class DatabaseProvider {

   constructor(public http: Http)
   {
   }

   renderProjects() : Observable<any>
   {

      return new Observable(observer =>
      {
         let projets : any = [];
         firebase.database().ref('projets').orderByKey().once('value', (items : any) =>
         {
            items.forEach((item) =>
            {
               projets.push({
	              id                 : item.key,
	              title              : item.val().title,
	              date               : item.val().date,
	              resume             : item.val().resume,
	              subject            : item.val().subject,
	              place              : item.val().place,
	              renderType         : item.val().renderType,
	              image              : item.val().image,
	              propositionsNumber : item.val().propositionsNumber,
                isAgreement        : item.val().isAgreement
	           });
            });

            observer.next(projets);
            observer.complete();
         },
         (error) =>
         {
            console.log("Observer error: ", error);
            console.dir(error);
            observer.error(error)
         });

      });
   }



   deleteProject(id) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         let ref = firebase.database().ref('projets').child(id);
         ref.remove();
         resolve(true);
      });
   }



   addToDatabase(projectObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         let addRef = firebase.database().ref('projets');
         addRef.push(projectObj);
         resolve(true);
      });
   }



   updateDatabase(id, projectsObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref('films').child(id);
	      updateRef.update(projectsObj);
         resolve(true);
      });
   }



   uploadImage(imageString) : Promise<any>
   {
      let image       : string  = 'movie-' + new Date().getTime() + '.jpg',
          storageRef  : any,
          parseUpload : any;

      return new Promise((resolve, reject) =>
      {
         storageRef       = firebase.storage().ref('posters/' + image);
         parseUpload      = storageRef.putString(imageString, 'data_url');

         parseUpload.on('state_changed', (_snapshot) =>
         {
            // We could log the progress here IF necessary
            // console.log('snapshot progess ' + _snapshot);
         },
         (_err) =>
         {
            reject(_err);
         },
         (success) =>
         {
            resolve(parseUpload.snapshot);
         });
      });
   }


}
