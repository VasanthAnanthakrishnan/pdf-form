import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      challanNumber: ['', Validators.required], 
      challanDate: ['', Validators.required],    
      unitAccountNumber: ['', Validators.required], 
      unitNumber: ['', Validators.required],      
      nameOfAllottee: ['', Validators.required],  
      email: ['', [Validators.required,]], 
      contactNumber: ['', [Validators.required, ]],
    });
  }

 
  onSubmit(downloadButton: HTMLButtonElement): void {
   
    this.downloadPDF(downloadButton);
  }

  downloadPDF(downloadButton: HTMLButtonElement): void {
    const data = document.querySelector('.container') as HTMLElement;
  
    if (data) {
      downloadButton.style.display = 'none'; 
  
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
  
        const imgWidth = 200; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width; 
  
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight); 
        pdf.save('form-data.pdf');
  
        downloadButton.style.display = 'inline-block'; 
      }).catch(err => {
        console.error('err on pdf', err); 
      });
    } else {
      console.error("ni data"); 
    }
  }
  

  
}



