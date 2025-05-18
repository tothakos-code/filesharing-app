import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { CommentService } from '../../services/comment.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Location } from '@angular/common';
import { Content } from 'src/app/models/content';
import { Comment } from 'src/app/models/comment';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
})
export class ContentDetailComponent implements OnInit {
  content!: Content;
  comments: Comment[] = [];
  contentId!: string;
  commentForm!: FormGroup;
  ratingForm!: FormGroup;
  userId: string | undefined;
  userRole: string | undefined;
  userRatingValue: number | null = null;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private commentService: CommentService,
    private authService: AuthenticationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.contentId = this.route.snapshot.paramMap.get('id')!;
    this.userId = this.authService.getUserId();
    this.userRole = this.authService.getRole();

    this.commentForm = this.fb.group({
      text: ['', Validators.required]
    });

    this.ratingForm = this.fb.group({
      rating: [null, Validators.required]
    });

    this.loadContent();
    this.loadComments();
  }

  loadContent(): void {
    this.contentService.getContentById(this.contentId).subscribe(content => {
      this.content = content;
      const rating = this.content.ratings.find(r => r.user._id === this.authService.getUserId());
      this.userRatingValue = rating ? rating.value : null;
      this.isLoading = false;
    });
  }

  loadComments(): void {
    this.commentService.getComments(this.contentId).subscribe(comments => {
      this.comments = comments;
    });
  }

  submitComment(): void {
    if (this.commentForm.valid) {
      const text = this.commentForm.value.text;
      this.commentService.addComment(this.contentId, text).subscribe(() => {
        this.commentForm.reset();
        this.loadComments();
      });
    }
  }

  deleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.loadComments();
    });
  }

  moderateComment(commentId: string): void {
    this.commentService.toggleModeration(commentId).subscribe(() => {
      this.loadComments();
    });
  }

  submitRating(): void {
    const ratingValue = this.ratingForm.value.rating;
    if (ratingValue) {
      this.contentService.rateContent(this.contentId, ratingValue).subscribe(() => {
        this.ratingForm.reset();
        this.loadContent(); // refresh content to show new average
      });
    }
  }

  canDelete(): boolean {
    return this.userRole === 'admin' || this.userId === this.content.uploadedBy._id;
  }

  public deleteContent(id: string): void {
    if (confirm('Are you sure you want to delete this content?')) {
      this.contentService.deleteContent(id).subscribe(() => {
        this.location.back();
      });
    }
  }

  goBack(): void {
    this.location.back(); // This will navigate back to the previous page in history
  }

  protected readonly environment = environment;
}
