import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import {Category} from "../models/category";

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  public create(name: string): Observable<Category> {
    return this.http.post<Category>(`${environment.apiUrl}/categories`, { name });
  }

  public update(id: string, name: string): Observable<Category> {
    return this.http.put<Category>(`${environment.apiUrl}/categories/${id}`, { name });
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`);
  }
}
