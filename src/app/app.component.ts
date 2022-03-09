import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceComponent } from './api-service/api-service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'navadhiti';
  constructor(private api: ApiServiceComponent) { }
  options = ['new-product', 'existing-product', 'mis'];
  myFormGroup!: FormGroup;
  group: any = {}

  ngOnInit(): void {
    this.getApiData()
  }
  apiResponse: any = []
  async getApiData() {
    await this.api.fetchData().subscribe((res) => {
      this.apiResponse = res.fields;
      this.apiResponse = this.apiResponse.sort((first: { order: number; }, second: { order: number; }) => 0 - (first.order > second.order ? -1 : 1));

      if (this.apiResponse) {
        this.apiResponse.forEach((data: { key: string | number; isRequired: boolean }) => {

          if (data['isRequired'] === true) {
            this.group[data.key] = new FormControl('', [Validators.required]);
          } else {
            this.group[data.key] = new FormControl('');

          }
        })
        this.myFormGroup = new FormGroup(this.group);
        console.log(this.myFormGroup);
      }
    })
  }
  submitted = false;

  onSubmit() {
    this.submitted = true;

    if (this.myFormGroup.invalid) {
      console.log(this.myFormGroup);
      return
    } 
    else {
      console.log(this.myFormGroup.value);
      window.alert("form submitted successfully")
      this.myFormGroup.reset();
    this.submitted = false;

    }
  }

}
