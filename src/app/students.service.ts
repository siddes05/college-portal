import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  getStudentDetails() : Observable<any[]>{
 
    return (this.http.get<any>(`${environment.apiUrl}/api/Students`));

  }

  getStudentDetailById(id:number):Observable<any>{

    return (this.http.get(`${environment.apiUrl}/api/Students/${id}`));
  }

  deleteStudentDetails(id:number): Observable<any>{

    return (this.http.delete(`${environment.apiUrl}/api/Students/${id}`));
  }

  addStudentDetails(data:any):Observable<any>{
    return(this.http.post(`${environment.apiUrl}/api/Students`,data))
  }

  editStudentDetails(data:any,id:number):Observable<any>{
    return(this.http.put(`${environment.apiUrl}/api/Students/${id}`,data));
  }

}

