import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { FormModel } from './form.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formValue !: FormGroup;
  formModelObj : FormModel = new FormModel();
  showAdd!: boolean;
  showUpdate!: boolean;
  formData !: any;
  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      gender: [''],
    })
this.getAllForm();
  }

  clickAddForm(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;

  }

postEmployeeDetails(){
  this.formModelObj.firstName = this.formValue.value.firstName;
  this.formModelObj.lastName = this.formValue.value.lastName;
  this.formModelObj.gender = this.formValue.value.gender;
  this.api.postForm(this.formModelObj)
.subscribe(res=>{
  console.log(res);
  alert("Employee Added Successfully");
  let ref = document.getElementById('cancel')
  ref?.click();
  this.formValue.reset();
  this.getAllForm();
},
error=>{
  alert("Something Went Wrong");
}
)

}

getAllForm(){
  this.api.getForm()
  .subscribe(res=>{
    this.formData = res;

  })
}
deleteForms(row : any){
  this.api.deleteForm(row.id)
  .subscribe(res=>{
    alert("Employee Deleted")
    this.getAllForm();
  })

  }
  onEditForm(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.formModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['gender'].setValue(row.gender);
  }

  updateFormDetails(){
    this.formModelObj.firstName = this.formValue.value.firstName;
    this.formModelObj.lastName = this.formValue.value.lastName;
    this.formModelObj.gender = this.formValue.value.gender;
    this.api.updateForm(this.formModelObj,this.formModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllForm();
    })
 
  }
}


