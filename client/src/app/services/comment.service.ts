import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'src/app/models/comment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {}

  // Get comments for a content
  getComments(contentId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.apiUrl}/comment/${contentId}`);
  }

  // Post a new comment
  addComment(contentId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(`${environment.apiUrl}/comment/${contentId}`, { text });
  }

  // Delete a comment
  deleteComment(commentId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.apiUrl}/comment/${commentId}`);
  }

  // Admin: Toggle moderation
  toggleModeration(commentId: string): Observable<{ message: string, moderated: boolean }> {
    return this.http.put<{ message: string, moderated: boolean }>(`${environment.apiUrl}/comment/moderate/${commentId}`, {});
  }
}
