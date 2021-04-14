import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl: string = 'http://springbootstudentapp-env-1.eba-crifwi33.us-east-2.elasticbeanstalk.com/api/';
  constructor(private http:HttpClient) {}

    getStudentList():Observable<any>{
      console.log('getStudentList method called')
      return this.http.get(`${this.baseUrl}` +'students-list');

    }

createStudent(student:object):Observable<object>{
  console.log('createStudent method called')
  console.log(this.baseUrl)
  return this.http.post(`${this.baseUrl}`+ 'save-student',student);
}
   
deleteStudent(id:number):Observable<any>{
  return this.http.delete(`${this.baseUrl}/delete-student/${id}`,{responseType:'text'});
}

getStudent(id:number):Observable<object>{
  console.log('getstudent called from service')
  return this.http.get(`${this.baseUrl}/student/${id}`);
}

updateStudent(id:number,value:any):Observable<any>{
  return this.http.post(`${this.baseUrl}/update-student/${id}`,value);
}
}
