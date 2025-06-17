import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MerchantService } from '../../services/merchant/merchant.service';
import { Merchant } from '../../models/merchant.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  standalone: true,
  selector: 'app-merchants-page',
  templateUrl: './merchants-page.component.html',
  styleUrls: ['./merchants-page.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
]
})
export class MerchantsPageComponent implements OnInit {
  merchants: Merchant[] = [];
  displayedColumns = ['name', 'email', 'category', 'actions'];
  form!: FormGroup;

  editing: { [id: number]: Partial<Merchant> } = {};

  constructor(
    private merchantService: MerchantService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      category: ['Retail', Validators.required]
    });

    this.loadMerchants();
  }

  loadMerchants(): void {
    this.merchantService.getAll().subscribe((data) => (this.merchants = data));
  }

  submit(): void {
    if (this.form.invalid) return;

    this.merchantService.create(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Merchant created', 'Close', { duration: 2000 });
        this.form.reset({ category: 'Retail' });
        this.loadMerchants();
      }
    });
  }

  enableEdit(merchant: Merchant): void {
    this.editing[merchant.id] = { ...merchant };
  }

  saveEdit(id: number): void {
    const update = this.editing[id];
    this.merchantService.update(id, update).subscribe(() => {
      this.snackBar.open('Merchant updated', 'Close', { duration: 2000 });
      delete this.editing[id];
      this.loadMerchants();
    });
  }

  cancelEdit(id: number): void {
    delete this.editing[id];
  }

  deleteMerchant(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Merchant',
        message: 'Are you sure you want to delete this merchant?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.merchantService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Merchant deleted', 'Close', { duration: 3000 });
          this.loadMerchants();
        },
        error: () => {
          this.snackBar.open('Delete failed', 'Close', { duration: 3000 });
        }
      });
    });
  }
}
