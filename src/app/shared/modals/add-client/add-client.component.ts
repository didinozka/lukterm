import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientData } from '../../../model/ClientData';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/form-error-matcher.utils';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.less']
})
export class AddClientComponent {
  public errorMatcher = new MyErrorStateMatcher();
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientData,
  ) {
    this.form = new FormGroup({
      name: new FormControl(this.data.name ?? '', [Validators.required]),
      subtitle: new FormControl(this.data.subtitle ?? '', [Validators.required]),
      technicianName: new FormControl(this.data.technicianName ?? '', [Validators.required]),
      technicianPhone: new FormControl(this.data.technicianPhone ?? '', [Validators.required]),
      technicianEmail: new FormControl(this.data.technicianEmail ?? '', [Validators.required]),
    });
    this.form.valueChanges
      .subscribe((formData) => {
        this.data = {
          name: formData.name ?? '',
          subtitle: formData.subtitle ?? '',
          technicianName: formData.technicianName ?? '',
          technicianPhone: formData.technicianPhone ?? '',
          technicianEmail: formData.technicianEmail ?? ''
        }
      })
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
