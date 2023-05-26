import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { FormGroup,FormBuilder,FormControlName, Validators } from '@angular/forms';
import { DepartmentsService } from '../departments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private Studentsservices: StudentsService,private formBuilder:FormBuilder,private departmentServices: DepartmentsService) { }

  studentsDetails:any[];
  studentForm: FormGroup;
  deparmentList: any;
  studentDetail: any;

  ngOnInit() {

    this.getStudentsDetails();
    this.getDepartmentDetails();
   
    this.studentForm = this.formBuilder.group({

      studentId:['0'],
      studentName:['',Validators.required],
      course:['',Validators.required],
      specialization:['',Validators.required],
      percentage:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      departmentId:['']

    })
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
  
  getStudentsDetails(){

    this.Studentsservices.getStudentDetails().subscribe((data) => {
      this.studentsDetails = data;
  });
  }

  getDepartmentDetails()
  {
    this.departmentServices.getDepartmentDetails().subscribe((data)=>{
      this.deparmentList = data;
    });
  }

  getStudentsDetailsById(id:number)
  {
    this.Studentsservices.getStudentDetailById(id).subscribe((data)=>{
      this.studentDetail = data;
      this.studentForm.setValue({
        studentId: this.studentDetail.studentId,
        studentName: this.studentDetail.studentName,
        course: this.studentDetail.course,
        specialization: this.studentDetail.specialization,
        percentage: this.studentDetail.percentage,
        departmentId: this.studentDetail.departmentId
      });
    })
  }

  onDelete(event,id)
  {
      this.Studentsservices.deleteStudentDetails(id).subscribe((res)=>{
        window.setTimeout(() => this.getStudentsDetails(), 100);
      });
      this.showPopup('deleted successfully');
  }

  addStudentDetails()
  {
    console.log(this.studentForm.value);
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      this.Studentsservices.addStudentDetails(this.studentForm.value).subscribe(()=>{
        window.setTimeout(() => this.getStudentsDetails(), 100);
      });

      this.studentForm.reset();
      this.studentForm.setValue({
        studentId:'0',
        studentName:'',
        course:'',
        specialization:'',
        percentage:'',
        departmentId:''
      });
      this.showPopup('added successfully');
    }
  }

  onEdit(id:number){

    this.getStudentsDetailsById(id); 
  }

  editStudentDetails()
  {

    if (this.studentForm.valid) {
      console.log(this.studentForm.value.departmentId);
      this.Studentsservices.editStudentDetails(this.studentForm.value,this.studentForm.value.studentId).subscribe(()=>{
        window.setTimeout(() => this.getStudentsDetails(), 100);
      });

      this.studentForm.reset();
      this.studentForm.setValue({
        studentId:'0',
        studentName:'',
        course:'',
        specialization:'',
        percentage:'',
        departmentId:''
      });
      this.showPopup('edited successfully');
    }
  }

  clearForm()
  {
     
    this.studentForm.reset();
    this.studentForm.setValue({
      studentId:'0',
      studentName:'',
      course:'',
      specialization:'',
      percentage:'',
      departmentId:''
    });
  }

}
