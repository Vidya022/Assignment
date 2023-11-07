import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignmentData } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm !: FormGroup;

 

  constructor(private fb: FormBuilder,private assignment:AssignmentData) {
    // this.myForm = this.fb.group({});
  }


  myformData = this.assignment.mydata;
  
  ngOnInit():void{
    console.log(this.myformData);
      const formControls:any = {};
    //checking the validations for the fields
      for (const field of this.myformData[0].formFields) {
        for (let index = 0; index < field.fields.length; index++) {
          const question = field.fields[index];
          const controlName = question.name;
          console.log("new.", controlName, "at index", index);
          const control: any = ['', []];
      
          if (question.validations.isRequired) {
            console.log("coming 1st")
            control[1].push(Validators.required);
          }
          if (!question.validations.isRequired) {
            console.log("coming 2nd")
            control[1].push(Validators.required);
          }
        
          if (question.validations.pattern) {
            control[1].push(Validators.pattern(question.validations.pattern));
          }
      
          formControls[controlName] = control;

          this.myForm = this.fb.group(formControls);
          console.log(this.myForm.value);
        }
       
      }
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, handle the submission here
      console.log('Form submitted successfully');
    } else {
      // Form is invalid, display error messages or perform other actions as needed
      console.log('Form contains errors');
    }
  }
 
}
