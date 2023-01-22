import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.less']
})
export class CallbackComponent {
  public params: any;
  public qParams: any;

  constructor(ar: ActivatedRoute) {
    ar.params.subscribe((params) => {
      console.log({params})
      this.params = params;
    })
    ar.queryParams.subscribe((queryParams) => {
      console.log({queryParams})
    })
  }

}
