import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-nested-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nested-form-component.html',
  styleUrl: './nested-form-component.css'
})
export class NestedFormComponent implements OnInit {
 
  registrationForm!: FormGroup;
 
  constructor(private fb: FormBuilder) {}
 
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
 
      // ── Top-level controls ──────────────────────────────────────
      fullName: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
 
      // ── Nested FormGroup: address ───────────────────────────────
      address: this.fb.group({
        street: [''],
        city:   ['', Validators.required],
        zip:    ['', Validators.pattern(/^\d{5}$/)],
 
        // ── Doubly nested FormGroup: coordinates ──────────────────
        coordinates: this.fb.group({
          lat: [null],
          lng: [null]
        })
      }),
 
      // ── Nested FormGroup: passwordGroup (with cross-field validator) ──
      passwordGroup: this.fb.group(
        {
          password:        ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', Validators.required]
        },
        { validators: this.passwordMatchValidator }   // group-level validator
      )
 
    });
  }
 
  // ── Custom cross-field validator ────────────────────────────────
  passwordMatchValidator(group: FormGroup) {
    const pw  = group.get('password')?.value;
    const cpw = group.get('confirmPassword')?.value;
    return pw === cpw ? null : { passwordMismatch: true };
  }
 
  // ── Typed accessor helpers ──────────────────────────────────────
  get addressGroup(): FormGroup {
    return this.registrationForm.get('address') as FormGroup;
  }
 
  get coordinatesGroup(): FormGroup {
    return this.addressGroup.get('coordinates') as FormGroup;
  }
 
  get passwordGroup(): FormGroup {
    return this.registrationForm.get('passwordGroup') as FormGroup;
  }
 
  // ── Submit ──────────────────────────────────────────────────────
  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Submitted:', this.registrationForm.value);
      alert('Form submitted successfully!');
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
 