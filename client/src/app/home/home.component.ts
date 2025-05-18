import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContentService } from '../services/content.service';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category-manager.service';
import {environment} from "../../environments/environment";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  contentList: any[] = [];
  categories: any[] = [];

  currentUserId: string | undefined = '';
  currentUserRole: string | undefined = '';

  filterForm!: FormGroup;

  totalItems = 0;
  page = 1;
  limit = 10;
  totalPages = 1;

  constructor(
    private fb: FormBuilder,
    private contentService: ContentService,
    private categoryService: CategoryService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['']
    });

    this.currentUserId = this.authenticationService.getUserId();
    this.currentUserRole = this.authenticationService.getRole();

    this.categoryService.getAll().subscribe((cats) => this.categories = cats);
    this.fetchContent();

    this.filterForm.valueChanges.subscribe(() => {
      this.page = 1;
      this.fetchContent();
    });
  }

  fetchContent(): void {
    const { search, category } = this.filterForm.value;
    this.contentService.getContentList(search, category, this.page, this.limit).subscribe(res => {
      this.contentList = res.data;
      this.totalItems = res.total;
      this.totalPages = res.totalPages;
    });
  }

  onPageChange(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.page = newPage;
    this.fetchContent();
  }

  onLimitChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.limit = +target.value; // convert string to number
    this.page = 1;
    this.fetchContent();
  }


  protected readonly HTMLSelectElement = HTMLSelectElement;



  goToContent(contentId: string): void {
    this.router.navigate(['/content', contentId]);
  }

  protected readonly environment = environment;
}
