// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AssignmentData } from './data';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
  
//   title = 'assignment';
//   constructor(private assignment:AssignmentData){}
//   myformData = this.assignment.mydata;
  
//   ngOnInit() {
//     console.log(this.myformData);
//   }
//   submitForm() {
//     console.log('Form submitted with data:', this.myformData);
//   }
//   logOut() {
//     console.log('Logging out...');
//   }

  
// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignmentData } from './data';
import { AbstractControl, ValidatorFn } from '@angular/forms';


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
    // for (let i = 0; i < this.myformData[0].formFields.fields.length; i++) {
    //   // console.log(this.recruiterformData)
    //   const question = this.myformData.[i];
    //   const controlName = `question_${i}`;
  
    //   if(!question.branching){
    //     if (question.qtype === 'dropdown') {
    //       this.myForm.addControl(controlName, this.formBuilder.control('', Validators.required));
    //     } else if (question.qtype === 'Text') {
    //       this.myForm.addControl(controlName, this.formBuilder.control('', Validators.required));
    //     } else if (question.qtype === 'Date') {
    //       this.myForm.addControl(controlName, this.formBuilder.control('', Validators.required));
    //     }
    //   }
  
      
    // }
   
      const formControls:any = {};
  
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
     
      
      
      // const myForm: FormGroup = this.fb.group(formControls);
  
  
    // Create a function to build the form with generated controls
    // buildForm() {
    //   const formControls = this.generateFormControlsAndValidations();
    //   const myForm: FormGroup = this.fb.group(formControls);
    //   return myForm;
    // }
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
