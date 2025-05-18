import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/models/category";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from "src/app/services/category-manager.service";
import {Location} from "@angular/common";

@Component({
  selector: 'category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent implements OnInit {
  public categories: Category[] = [];
  public categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private location: Location
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  public addCategory() {
    if (this.categoryForm.invalid) return;

    const name = this.categoryForm.value.name;
    this.categoryService.create(name).subscribe({
      next: () => {
        this.categoryForm.reset();
        this.loadCategories();
      }
    });
  }

  public deleteCategory(name: string) {
    this.categoryService.delete(name).subscribe(() => this.loadCategories());
  }

  public editCategory(cat: Category) {
    const newName = prompt('Edit category name:', cat.name);
    if (newName && newName !== cat.name) {
      this.categoryService.update(cat._id, newName).subscribe(() => this.loadCategories());
    }
  }

  goBack(): void {
    this.location.back(); // This will navigate back to the previous page in history
  }
}
