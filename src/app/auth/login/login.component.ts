import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../shared/utils/form-error-matcher.utils';
import { Router } from '@angular/router';
import { SupabaseService } from '../../core/service/supabase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  public errorMatcher = new MyErrorStateMatcher();
  public form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {
  }

  onSubmit() {
    // login
    if (this.form.invalid) {
      return;
    }

    const {email, password} = this.form.value;
    if (!email) return;
    if (!password) return;
    this.supabaseService.signIn(email, password)
      .subscribe(() => {
        this.router.navigate(['admin']);
      })
  }

  onBack() {
    this.router.navigate(['']);
  }

  onRegister() {
    this.router.navigate(['auth', 'register']);
  }
}
