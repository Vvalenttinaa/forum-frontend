import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import Comment from '../model/Comment';
import { apiEndpoint } from '../constants/constants';
import CommentRequest from '../model/requests/CommentRequest';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  http = inject(HttpClient);
  
  getAll(id:number): Observable<Comment[]> {
    console.log('get all');
    return this.http.get<Comment[]>(`${apiEndpoint.CommentEndpoint.getAllByThema}` + id.toString()).pipe(
      tap((res: Comment[]) => {
        return res;
      })
    );
  }

  getLast(id:number): Observable<Comment[]> {
    console.log('get last');

    return this.http.get<Comment[]>(`${apiEndpoint.CommentEndpoint.getLast}` + id.toString()).pipe(
      tap((res: Comment[]) => {
        return res;
      })
    );
  }

  block(comment: Comment, value:boolean): Observable<boolean>{
    const params = new HttpParams().set('value', value);
    console.log(params);
    return this.http.put<boolean>(`${apiEndpoint.CommentEndpoint.block}` + comment.id.toString(),{}, {params});
  }

  approve(comment: Comment, value:boolean): Observable<boolean>{
    const params = new HttpParams().set('value', value);
    return this.http.put<boolean>(`${apiEndpoint.CommentEndpoint.approve}` + comment.id.toString(),{}, {params});
  }

  addComment(comment: CommentRequest): Observable<void>{
    return this.http.post<void>(`${apiEndpoint.CommentEndpoint.add}`, comment);
  }
}
