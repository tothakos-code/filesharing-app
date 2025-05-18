import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { Content } from "src/app/models/content";
import { Comment } from "src/app/models/comment";

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor(private http: HttpClient) {}

  getContentList(search = '', category = '', page = 1, limit = 10) {
    const params = new HttpParams()
      .set('search', search)
      .set('category', category)
      .set('page', page)
      .set('limit', limit);
    return this.http.get<{ data: any[], total: number, page: number, totalPages: number }>(`${environment.apiUrl}/content`, { params });
  }

  uploadContent(formData: FormData): Observable<Content> {
    return this.http.post<Content>(`${environment.apiUrl}/content`, formData);
  }

  deleteContent(id: string) {
    return this.http.delete(`${environment.apiUrl}/content/${id}`);
  }
  getContentById(id: string): Observable<Content> {
    return this.http.get<Content>(`${environment.apiUrl}/content/${id}`);
  }

  getComments(contentId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.apiUrl}/content/${contentId}/comments`);
  }

  addComment(contentId: string, text: string) {
    return this.http.post(`${environment.apiUrl}/content/${contentId}/comments`, { text });
  }

  deleteComment(contentId: string, commentId: string) {
    return this.http.delete(`${environment.apiUrl}/content/${contentId}/comments/${commentId}`);
  }

  rateContent(contentId: string, rating: number) {
    return this.http.post(`${environment.apiUrl}/content/${contentId}/rate`, { rating });
  }

  updateContent(contentId: string, formData: FormData): Observable<Content> {
    return this.http.post<Content>(`${environment.apiUrl}/content/${contentId}`, formData);
  }
}
