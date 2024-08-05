import { Component, inject, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import Comment from '../../model/Comment';
import { CommentService } from '../../services/comment.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import User from '../../model/User';
import { UserServiceService } from '../../services/user-service.service';
import { catchError, from, map, mergeMap, Observable, of, switchMap, toArray } from 'rxjs';


@Component({
  selector: 'app-moderator-page',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatFormFieldModule, MatSelectModule, CommonModule,
     FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './moderator-page.component.html',
  styleUrl: './moderator-page.component.css'
})
export class ModeratorPageComponent implements OnInit{

  commentService = inject(CommentService);
  commentsSport: Comment[] = [];
  commentsScience: Comment[] = [];
  commentsCulture: Comment[] = [];
  commentsMusic: Comment[] = [];

  userService = inject(UserServiceService);
  
  ngOnInit(): void {
    this.loadCommentsSport();
    this.loadCommentsScience();
    this.loadCommentsMusic();
    this.loadCommentsCulture();
    // this.commentService.getAll(1).subscribe({
    //   next: (res: Comment[]) => {
    //     console.log('sport, ', res);
    //     this.commentsSport = res;
    //   },
    // });
    // this.commentService.getAll(2).subscribe({
    //   next: (res: Comment[]) => {
    //     console.log(res);
    //     this.commentsScience = res;
    //   },
    // });
    // this.commentService.getAll(3).subscribe({
    //   next: (res: Comment[]) => {
    //     console.log(res);
    //     this.commentsCulture = res;
    //   },
    // });
    // this.commentService.getAll(4).subscribe({
    //   next: (res: Comment[]) => {
    //     console.log(res);
    //     this.commentsMusic = res;
    //   },
    // });
  }

  loadCommentsSport(): void {
    this.commentService.getAll(1).pipe(
      switchMap(comments => from(comments)),
      mergeMap(comment => this.userService.getById(comment.userId).pipe(
        map(user => ({
          ...comment,
          username: user.username
        }))
      )),
      toArray()
    ).subscribe(updatedComments => {
      this.commentsSport = updatedComments;
    });
  }

  loadCommentsScience(): void {
    this.commentService.getAll(2).pipe(
      switchMap(comments => from(comments)),
      mergeMap(comment => this.userService.getById(comment.userId).pipe(
        map(user => ({
          ...comment,
          username: user.username
        }))
      )),
      toArray()
    ).subscribe(updatedComments => {
      this.commentsScience = updatedComments;
    });
  }
  loadCommentsCulture(): void {
    this.commentService.getAll(3).pipe(
      switchMap(comments => from(comments)),
      mergeMap(comment => this.userService.getById(comment.userId).pipe(
        map(user => ({
          ...comment,
          username: user.username
        }))
      )),
      toArray()
    ).subscribe(updatedComments => {
      this.commentsCulture = updatedComments;
    });
  }
  loadCommentsMusic(): void {
    this.commentService.getAll(4).pipe(
      switchMap(comments => from(comments)),
      mergeMap(comment => this.userService.getById(comment.userId).pipe(
        map(user => ({
          ...comment,
          username: user.username
        }))
      )),
      toArray()
    ).subscribe(updatedComments => {
      this.commentsMusic = updatedComments;
    });
  }

  onBlockedChange(comment: Comment, value: boolean): void {
    console.log(`Blocked value for ${comment.username} changed to ${value}`);
    comment.blocked = value;
    this.commentService.block(comment, value).subscribe({
      next: (res: boolean) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
}

  onApprovedChange(comment: Comment, value: boolean): void {
    console.log(`Approved value for ${comment.username} changed to ${value}`);
    comment.approved = value;
    this.commentService.approve(comment, value).subscribe({
      next: (res: boolean) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
