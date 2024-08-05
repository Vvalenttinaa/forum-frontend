import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { from, map, mergeMap, switchMap, toArray } from 'rxjs';
import Comment from '../../model/Comment';
import { CommentService } from '../../services/comment.service';
import { UserServiceService } from '../../services/user-service.service';
import CommentRequest from '../../model/requests/CommentRequest';


@Component({
  selector: 'app-moderator-page',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatFormFieldModule, MatSelectModule, CommonModule,
     FormsModule, ReactiveFormsModule, JsonPipe, MatButtonModule, MatLabel, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './forum-page.component.html',
  styleUrl: './forum-page.component.css'
})
export class ForumPageComponent implements OnInit{

  commentService = inject(CommentService);
  formBuilder = inject(FormBuilder);

  commentsSport: Comment[] = [];
  commentsScience: Comment[] = [];
  commentsCulture: Comment[] = [];
  commentsMusic: Comment[] = [];
  commentForms: { [key: number]: FormGroup } = {};



  userService = inject(UserServiceService);
  
  ngOnInit(): void {
    this.loadCommentsSport();
    this.loadCommentsScience();
    this.loadCommentsMusic();
    this.loadCommentsCulture();

    this.commentForms[1] = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.commentForms[2] = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.commentForms[3] = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.commentForms[4] = this.formBuilder.group({
      content: ['', Validators.required]
    });
  }

  loadCommentsSport(): void {
    this.commentService.getLast(1).pipe(
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
    this.commentService.getLast(2).pipe(
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
    this.commentService.getLast(3).pipe(
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
    this.commentService.getLast(4).pipe(
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

  addComment(themaId: number): void {
    console.log('bar to');
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error('User is not logged in');
      return;
    }
    console.log('user id is ', userId);

    const form = this.commentForms[themaId];
    console.log(form);
    if (form.invalid) {
      console.log('form is invalid');
      return;
    }

    const newComment: CommentRequest = {
      themaId,
      userId: +userId,
      content: form.value.content,
      approved: false,
      blocked: false,
    };
    
    console.log(newComment);

    this.commentService.addComment(newComment).subscribe({
      next: () => {
        console.log('Comment added');
        form.reset();
        form.markAsPristine();
        form.markAsUntouched();
        switch (themaId) {
          case 1:
            this.loadCommentsSport();
            break;
          case 2:
            this.loadCommentsScience();
            break;
          case 3:
            this.loadCommentsCulture();
            break;
          case 4:
            this.loadCommentsMusic();
            break;
        }
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      }
    });
  }
}
