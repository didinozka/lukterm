import { Component } from '@angular/core';
import { MyErrorStateMatcher } from '../../shared/utils/form-error-matcher.utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../core/service/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
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
    console.log('onSubmit')
    if (!this.form.valid) {
      return;
    }

    const {email, password} = this.form.value;
    if (!email) return;
    if (!password) return;
    this.supabaseService.signUp(email, password)
      .subscribe(() => {
        this.router.navigate(['admin']);
      })
  }

  onBack() {
    this.router.navigate(['']);
  }
}
