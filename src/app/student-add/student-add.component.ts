import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  //studentsSaveForm: FormGroup | undefined;
  
  constructor(private studentService: StudentService,private formBuilder : FormBuilder) { }

  //student!: Student;
  student: Student = new Student();

  submitted = false;
  ngOnInit(): void {
    this.submitted = false;
  }

  // studentsSaveForm = new FormGroup({
  //   student_name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //   student_email: new FormControl('', [Validators.required, Validators.email]),
  //   student_branch: new FormControl()
  // });
  studentsSaveForm = this.formBuilder.group({

    student_name : ['',[Validators.required,Validators.minLength(5)]],
    student_email :['',[Validators.required,Validators.email]],
    student_branch : ['']
  })

  saveStudent(saveStudent:any) {
    console.log(this.studentsSaveForm.value)
   // this.student = new Student();
    this.student.student_name = this.StudentName?.value;
    this.student.student_email = this.StudentEmail?.value;
    this.student.student_branch = this.StudentBranch?.value;
    console.log(this.student.student_branch)
    this.submitted = true;
    this.save();

  }

  save() {
    this.studentService.createStudent(this.student)
      .subscribe(
        data => console.log(data),
        error => console.log(error));
  //  this.student = new Student();
  }

  get StudentName(){
    return this.studentsSaveForm.get('student_name');
  }

  get StudentEmail(){
    return this.studentsSaveForm.get('student_email');
  }

  get StudentBranch(){
    return this.studentsSaveForm.get('student_branch');
  }

addStudentForm(){
  this.submitted = false;
  this.studentsSaveForm.reset();
}  
}
