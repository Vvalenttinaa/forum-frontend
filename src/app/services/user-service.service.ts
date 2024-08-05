import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User, { Permission } from '../model/User';
import { Observable, tap } from 'rxjs';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  http = inject(HttpClient); 

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${apiEndpoint.UserEndpoint.getAll}`).pipe(
      tap((res: User[]) => {
        return res;
      })
    );
  }

  getById(id:number): Observable<User> {
    console.log('Getting user by id ' + id);
    return this.http.get<User>(`${apiEndpoint.UserEndpoint.getById}` + id.toString()).pipe(
      tap((res: User) => {
        return res;
      })
    );
  }

  block(user: User, value:boolean): Observable<boolean>{
    const params = new HttpParams().set('value', value);
    return this.http.put<boolean>(`${apiEndpoint.UserEndpoint.block}` + user.id.toString(),{}, {params});
  }

  approve(user: User, value:boolean): Observable<boolean>{
    const params = new HttpParams().set('value', value);
    return this.http.put<boolean>(`${apiEndpoint.UserEndpoint.approve}` + user.id.toString(),{}, {params});
  }
  
  addPermision(userId: number, permissionId: number): Observable<void>{
    return this.http.post<void>(`${apiEndpoint.UserEndpoint.addPermission}` + userId.toString() + '/permission/' + permissionId.toString(), {});
  }

  removePermision(userId: number, permissionId: number): Observable<void>{
    return this.http.post<void>(`${apiEndpoint.UserEndpoint.removePermission}` + userId.toString() + '/permissionRemove/' + permissionId.toString(), {});
  }

  getPermissions(): Observable<Permission[]>{
    return this.http.get<Permission[]>(`${apiEndpoint.UserEndpoint.getPermissions}`);
  }


}
