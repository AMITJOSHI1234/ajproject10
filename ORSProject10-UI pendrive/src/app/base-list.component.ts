import { OnInit, Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ServiceLocatorService } from './service-locator.service';
import { HttpServiceService } from './http-service.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from './base.component';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { element } from '@angular/core/src/render3';

export class BaseListCtl extends BaseCtl {

    @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
  deleteRecordList: any = [];
  isMasterSel = false ;
  checkList = 0;

  constructor(public endpoint, public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(endpoint, locator, route);
  }

  /**
   * Initialize component
   */
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.preload();
    this.search();
    this.isMasterSel = false ;
  }

  display() {
     this.search();
   // this.searchOperation('next');
  }

  submit() {
    this.form.pageNo = 0;
    if (this.form.searchParams.roleId === 'undefined' || this.form.searchParams.id === 'undefined') {

      this.form.searchParams = {};
      this.search();
    } else {
    this.search();
    }
  }

  delete(id) {
    super.delete(id, function() {
      this.search();
    });
  }


  next() {
    this.form.pageNo++;
    this.display();


  //  this.isMasterSel = false ;
  //  this.searchOperation('previous');
  }

exit() {

  location.reload();
}
  previous() {
    if (this.form.pageNo > 0) {
      this.form.pageNo--;
    //  this.display();
      this.isMasterSel = false ;
      this.searchOperation('previous');
    }
  }



  checkUncheckAll(event) {
    const checked = event.target.checked;
    // tslint:disable-next-line:no-shadowed-variable
    this.checkboxes.forEach((element) => {
        element.nativeElement.checked = checked;
    });
  }
  checklistUpdate() {

    this.isMasterSel = false;
    this.checkList = 0;
    // tslint:disable-next-line:no-shadowed-variable
    this.checkboxes.forEach((element) => {
if (element.nativeElement.checked === true) {
  this.checkList = this.checkList + 1;
}
    });
    if (this.checkList === this.form.list.length) {
      this.isMasterSel = true;

    }
  }




//   deleteMany(){
//   console.log('delete Many Records starts ');
//   console.log('this.form.pageNo ' +this.form.pageNo);
//   var msg : String =''
//   this.deleteRecordList.length=0;
//   console.log('record deleting start ')
//   var isRecordSelected:boolean = false ;

//     this.checkboxes.forEach((element) => {
//       if (element.nativeElement.checked) {
//         // console.log('record deleting ' + element.nativeElement.id)
//         this.deleteRecordList.push(element.nativeElement.id);
//         isRecordSelected = true ;
//       }
//     });

//     if(isRecordSelected){
//       console.log('record(s) for delete ' + this.deleteRecordList)
// tslint:disable-next-line:max-line-length
//       this.serviceLocator.httpService.get(this.api.deleteMany + "/" + this.deleteRecordList + '?pageNo=' +this.form.pageNo, function (res) {
//         if (res.success) {
//             console.log('Inside response success ')
//           //  this.deleteMany();
//          //  this.form.message = "Data is deleted";
//        //  msg ="Data is deleted";
//         //  this.form.message = res.result.message;

//           console.log('deleteMany Calling Callback');
//           this.search();
//     } else {
//       this.form.error = true;
//       this.form.message = res.result.message;
//     }
//   });
//   this.form.message = "Data is deleted" ;
//   console.log('this.form.pageNo ' +this.form.pageNo);

//     }else{
//       this.form.message = "Select Atleast One Record";
//         this.form.error = true;
//     console.log('No record(s) for delete ')
//   }
//   console.log('delete Many Records ends ');
// }



deleteMany() {
  console.log('delete Many Records starts ');
  console.log('this.form.pageNo ' + this.form.pageNo);
  this.form.error = false;
  this.deleteRecordList.length = 0;
  console.log('record deleting start ');
  let isRecordSelected = false ;

  // tslint:disable-next-line:no-shadowed-variable
  this.checkboxes.forEach((element) => {
      if (element.nativeElement.checked) {
        // console.log('record deleting ' + element.nativeElement.id)
        this.deleteRecordList.push(element.nativeElement.id);
        isRecordSelected = true ;
      }
    });

  if (isRecordSelected) {
      console.log('record(s) for delete ' + this.deleteRecordList) ;
      // tslint:disable-next-line:only-arrow-functions
      super.deleteMany(this.deleteRecordList + '?pageNo=' + this.form.pageNo, function() {
      //  this.search();

      });
    } else {
      this.form.message = 'Select Atleast One Record';
      this.form.error = true;
      console.log('No record(s) for delete ');
  }
  this.isMasterSel = false ;
  console.log('delete Many Records ends ');
}

}
