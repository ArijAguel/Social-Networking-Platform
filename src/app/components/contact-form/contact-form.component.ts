import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ContactForm} from 'src/app/Models/contactForm';
import {ContactFormApiService} from 'src/app/api/contactForm-api.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
    contact: FormGroup;
    constructor(private toastr: ToastrService,private fb:FormBuilder,private contactFormService:ContactFormApiService){
      this.contact = this.fb.group({
        name: '',
      email:'',
      subject:'',
      message:'',
    })
    }
    onSubmit() {
      let contactForm= new ContactForm(this.contact.value.name,this.contact.value.email,this.contact.value.subject,this.contact.value.message);


      this.contactFormService.sendContactForm(contactForm).subscribe(
        () => {
          this.toastr.success('Your message has been sent successfully!', 'Success');
          this.contact.reset();
        },
        () => {
          this.toastr.error('An error occurred while sending your message!', 'Error');
        }
      )
    }

}
