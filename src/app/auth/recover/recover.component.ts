import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { SupabaseService } from '../../core/service/supabase.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.less']
})
export class RecoverComponent {
  public form = new FormGroup({
    email: new FormControl('', [Validators.required]),
  })
  public errorMatcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
    ) {
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const { email } = this.form.value;
    if (!email) return;
    this.supabaseService.recoverPwd(email)
      .subscribe(() => {
        this.router.navigate([''])
      })
  }

  onBack() {
    this.router.navigate(['admin']);
  }
}
