import { Component, OnInit } from '@angular/core';  
import { StudentService } from '../student.service';  
import { Student } from '../student';  
import { Observable,Subject } from "rxjs";  
  
import {FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';  
  
@Component({  
  selector: 'app-student-list',  
  templateUrl: './student-list.component.html',  
  styleUrls: ['./student-list.component.css']  
})  
export class StudentListComponent implements OnInit {  
  
 constructor(private studentservice:StudentService,private formBuilder: FormBuilder) { }  
 display = "none";

 //studentupdateform!:FormGroup;
  studentsArray: any[] = [];  
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  
  
  students!: any;
  student : Student=new Student();  
  deleteMessage=false;  
  studentlist:any;  
  isupdated = false;    
  infoMessage = false;  
  
  ngOnInit() {  
    this.isupdated=false;  
    this.dtOptions = {  
      pageLength: 6,  
      stateSave:true,  
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
      processing: true  
    };     
    this.studentservice.getStudentList().subscribe(data =>{  
    this.students =data;  
    this.dtTrigger.next();  
    })  
  }  
    
  deleteStudent(id: number) {  
    this.studentservice.deleteStudent(id)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.studentservice.getStudentList().subscribe(data =>{  
            this.students =data  
            })  
        },  
        error => console.log(error));  
  }  
  
  updateStudent(id: number){  
    this.display = "block";

    console.log('updateStudent- called from com-ts')
    this.studentservice.getStudent(id)  
      .subscribe(  
        data => {  
          this.studentlist=data             
        },  
        error => console.log(error));  
  }  
  
  // studentupdateform=new FormGroup({  
  //   studentId:new FormControl(),  
  //   studentName:new FormControl(),  
  //   studentEmail:new FormControl(),  
  //   studentBranch:new FormControl()  
  // });  
  
  studentupdateform = this.formBuilder.group({
    studentId : [''],
    studentName : [''],
    studentEmail : [''],
    studentBranch:['']
  }
    ) 

  updateStu(updstu: any){  
    this.student=new Student();   
   this.student.student_id=this.StudentId!.value;  
   this.student.student_name=this.StudentName!.value;  
   this.student.student_email=this.StudentEmail!.value;  
   this.student.student_branch=this.StudentBranch!.value;  
   console.log(this.StudentBranch!.value);  
     
  
   this.studentservice.updateStudent(this.student.student_id,this.student).subscribe(  
    data => {       
      this.infoMessage=data;  
      this.studentservice.getStudentList().subscribe(data =>{  
        this.students =data  
        })  
    },  
    error => console.log(error));  
  }  
  
  get StudentName(){  
    return this.studentupdateform.get('studentName');  
  }  
  
  get StudentEmail(){  
    return this.studentupdateform.get('studentEmail');  
  }  
  
  get StudentBranch(){  
    return this.studentupdateform.get('studentBranch');  
  }  
  
  get StudentId(){  
    return this.studentupdateform.get('studentId');  
  }  
  
  changeisUpdate(){  
    this.isupdated=false;  
   this.display = "none";

  }  
  
  

}  
