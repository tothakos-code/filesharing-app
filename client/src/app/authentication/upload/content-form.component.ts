import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category-manager.service';
import { ContentService } from 'src/app/services/content.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Category } from "src/app/models/category";

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent implements OnInit {
  contentForm!: FormGroup;
  categories: Category[] = [];
  selectedFile!: File | null;
  uploadError = '';
  isEditMode = false;
  contentId!: string;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      file: [null]
    });

    this.categoryService.getAll().subscribe({
      next: (cats: Category[]) => this.categories = cats,
      error: () => this.uploadError = 'Failed to load categories'
    });

    this.contentId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.contentId;

    if (this.isEditMode) {
      this.contentService.getContentById(this.contentId).subscribe((content) => {
        this.contentForm.patchValue({
          title: content.title,
          description: content.description,
          category: content.category._id
        });
      });
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.contentForm.patchValue({ file: event.target.files[0] });
    }
  }

  onSubmit(): void {
    // if (this.contentForm.invalid || !this.selectedFile) {
    //   this.uploadError = 'Please fill out all required fields.';
    //   return;
    // }

    const formData = new FormData();
    formData.append('title', this.contentForm.get('title')?.value);
    formData.append('description', this.contentForm.get('description')?.value);
    formData.append('category', this.contentForm.get('category')?.value);

    if (!this.isEditMode && this.contentForm.get('file')?.value) {
      formData.append('file', this.contentForm.get('file')?.value);
    }
    if (this.isEditMode) {
      this.contentService.updateContent(this.contentId, formData).subscribe(() => {
        this.router.navigate(['/content', this.contentId]);
      });
    } else {
      this.contentService.uploadContent(formData).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          this.uploadError = err.error?.message || 'Upload failed';
        }
      });
    }
  }
}
