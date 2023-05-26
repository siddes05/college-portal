import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../departments.service';
import { FormBuilder, FormControl,FormGroup, FormControlName, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departmentDetails:any[];
  departmentForm: FormGroup;
  deptDetail:any;
  


  constructor(private departmentService: DepartmentsService, 
              private formBuilder: FormBuilder) { }

  ngOnInit() {

   this.getDepartmentDetails();

   this.departmentForm = this.formBuilder.group({

        departmentId:['0'],
        departmentName: ['',[Validators.required]]

   });

  }


  showPopup(message:string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500
    })
  }

  getDepartmentDetails()
  {
    this.departmentService.getDepartmentDetails().subscribe((data)=>{
      this.departmentDetails = data;
    });
  }

  getDepartmentDetailById(id:number)
  {
    this.departmentService.getDepartmentDetailById(id).subscribe((data)=>{
      this.deptDetail = data;
      this.departmentForm.setValue({
        departmentId: this.deptDetail.departmentId,
        departmentName: this.deptDetail.departmentName
      });
    })
  }
  
  onDelete(event,id)
  {
      this.departmentService.deleteDepartmentDetails(id).subscribe((res)=>{
        window.setTimeout(() => this.getDepartmentDetails(), 100);
      });
      this.showPopup('deleted successfully');
  }


  addDepartmentDetails()
  {
    if (this.departmentForm.valid) {
      console.log(this.departmentForm.value);
      this.departmentService.addDepartmentDetails(this.departmentForm.value).subscribe(()=>{
        window.setTimeout(() => this.getDepartmentDetails(), 100);
      });

      this.departmentForm.reset();
      this.departmentForm.setValue({
        departmentId: '0',
        departmentName: ''
      });
     
      this.showPopup('added successfully');
    }
  }

  editDepartmentDetails()
  {

    if (this.departmentForm.valid) {
      console.log(this.departmentForm.value.departmentId);
      this.departmentService.editDepartmentDetails(this.departmentForm.value,this.departmentForm.value.departmentId).subscribe(()=>{
        window.setTimeout(() => this.getDepartmentDetails(), 100);
      });

      this.departmentForm.reset();
      this.departmentForm.setValue({
        departmentId: '0',
        departmentName: ''
      });
      this.showPopup('edited successfully');
    }
  }

  onEdit(id:number){

    this.getDepartmentDetailById(id);
    
    
  }

  clearForm()
  {
     this.departmentForm.reset();
      this.departmentForm.setValue({
        departmentId: '0',
        departmentName: ''
      });
  }
}
