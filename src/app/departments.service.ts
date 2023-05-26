import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http:HttpClient) { }

  getDepartmentDetails(): Observable<any[]>{

    return(this.http.get<any>(`${environment.apiUrl}/api/Department`));
  }

  getDepartmentDetailById(id:number):Observable<any>{

    return (this.http.get(`${environment.apiUrl}/api/Department/${id}`));
  }

  deleteDepartmentDetails(id:number): Observable<any>{

    return (this.http.delete(`${environment.apiUrl}/api/Department/${id}`));
  }

  addDepartmentDetails(data:any):Observable<any>{
    return(this.http.post(`${environment.apiUrl}/api/Department`,data))
  }

  editDepartmentDetails(data:any,id:number):Observable<any>{
    return(this.http.put(`${environment.apiUrl}/api/Department/${id}`,data));
  }
}
