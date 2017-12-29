import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html'
})
export class ModalsPage {

   public form                  : any;
   public projetImage  	        : any;
   public projects              : any;
   public projectId             : string  = '';
   public projectTitle          : any     = '';
   public projectDate           : any     = '';
   public projectImage          : any     = '';
   public projectResume         : any     = '';
   public projectSubjects       : any     = [];
   public projectPlaces         : any     = [];
   public projectRendersType    : any     = [];
   public projectPropositionsNb : number  = 0;
   public projectIsAgreement    : boolean = false;
   public isEditable            : boolean = false;


   constructor(
      public navCtrl        : NavController,
      public params         : NavParams,
      private _FB 	        : FormBuilder,
      private _IMG          : ImageProvider,
      public viewCtrl       : ViewController,
      private _LOADER       : PreloaderProvider,
      private _DB           : DatabaseProvider
   )
   {
      this.form 		= _FB.group({
         'title' 		   : ['', Validators.required],
         'resume' 		 : ['', Validators.minLength(10)],
         'date' 		   : ['', Validators.maxLength(4)],
         'image'		   : ['', Validators.required],
         'subjects'	   : ['', Validators.required],
         'places'		   : ['', Validators.required],
         'rendersType' : ['', Validators.required],
      });

      this.projects = firebase.database().ref('projets/');


      if(params.get('isEdited'))
      {
          let movie 		    = params.get('movie'),
              k;

          this.projectTitle	  = project.title;
          this.projectResume	= project.resume;
          this.projectDate   	= project.date;
          this.projectImage   = project.image;
          this.projetImage    = project.image;
          this.projectId      = project.id;


          for(k in project.subjects)
          {
             this.projectSubjects.push(movie.subjects[k].name);
          }

          for(k in project.places)
          {
             this.projectPlaces.push(project.places[k].name);
          }

          for(k in project.rendersType)
          {
             this.projectRendersType.push(project.rendersType[k].name);
          }

          this.isEditable      = true;
      }
   }




   saveProject(val)
   {
      this._LOADER.displayPreloader();

      let title	    : string = this.form.controls["title"].value,
	 	    resume     	: string = this.form.controls["resume"].value,
  		  date  	    : number = this.form.controls["date"].value,
  		  subjects  	: string = this.form.controls["subjects"].value,
  		  places    	: string = this.form.controls["places"].value,
  		  rendersType : string = this.form.controls["rendersType"].value,
  		  image       : string = this.projetImage,
  		  types       : any    = [],
        people      : any = [],
  		  k           : any;


      for(k in subjects)
      {
         types.push({
            "name" : subjects[k]
         });
      }


      for(k in places)
      {
         people.push({
            "name" : places[k]
         });
      }

      for(k in rendersType)
      {
         people.push({
            "name" : rendersType[k]
         });
      }


      if(this.isEditable)
      {

         if(image !== this.projectImage)
         {
            this._DB.uploadImage(image)
            .then((snapshot : any) =>
            {
               let uploadedImage : any = snapshot.downloadURL;

               this._DB.updateDatabase(this.projectId,
               {
	              title       : title,
	              resume      : resume,
	              date        : date,
                image       : uploadedImage,
	              subjects    : duration,
                places      : places,
	              rendersType : types,
	              people      : people,
	           })
               .then((data) =>
               {
                  this._LOADER.hidePreloader();
               });

            });
         }
         else
         {

           this._DB.updateDatabase(this.projectId,
           {
             title       : title,
             resume      : resume,
             date        : date,
             subjects    : duration,
             places      : places,
             rendersType : types,
             people      : people,
	       })
           .then((data) =>
           {
              this._LOADER.hidePreloader();
           });
	     }

      }
      else
      {
         this._DB.uploadImage(image)
         .then((snapshot : any) =>
         {
            let uploadedImage : any = snapshot.downloadURL;

            this._DB.addToDatabase({
              title       : title,
              resume      : resume,
              date        : date,
              image       : uploadedImage,
              subjects    : duration,
              places      : places,
              rendersType : types,
              people      : people,
	        })
            .then((data) =>
            {
               this._LOADER.hidePreloader();
            });
         });

      }
      this.closeModal(true);
   }



   closeModal(val = null)
   {
      this.viewCtrl.dismiss(val);
   }



   selectImage()
   {
      this._IMG.selectImage()
      .then((data) =>
      {
         this.filmImage = data;
      });
   }


}
